import { Text, View, Button } from "react-native";
import {
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
  hasServicesEnabledAsync,
  enableNetworkProviderAsync,
} from "expo-location";
import {
  defineTask,
  // getRegisteredTasksAsync,
  unregisterAllTasksAsync,
} from "expo-task-manager";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useAuth, Alert } from "~components";
const LOCATION_TASK_NAME = "background-location-task";
unregisterAllTasksAsync().then(() => {
  defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    const { locations } = data as { locations: any };
    if (error) {
      // check `error.message` for more details.
      console.log("error: ", error.message);
      return;
    }
    console.log("Received new locations", locations[0]);
  });
});
function Home() {
  // const [location, setLocation] = useState(null);
  const [isLocationUpdate, setIsLocationUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { status, action } = useAuth();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (status === "login") {
        e.preventDefault();
        console.log("beforeRemove: ");
      }
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      navigation.removeListener("beforeRemove", () => {});
    };
  });

  const getLocation = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    console.log("status: ", status);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      await requestBackgroundPermissionsAsync();
      return;
    }
  };
  const toggleLocationUpdate = async () => {
    setIsLocationUpdate((v) => !v);
    // const tasks = await getRegisteredTasksAsync();
    // console.log("tasks: ", tasks);

    if (isLocationUpdate) {
      await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      return;
    }
    const enabled = await hasServicesEnabledAsync();
    if (!enabled) {
      console.log("Location services are not enabled");
      await enableNetworkProviderAsync();
    }
    await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: 6,
      timeInterval: 2000,
      distanceInterval: 0,
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch something off.",
      },
    });
  };
  return (
    <View>
      <Alert
        title="Success"
        message="Login successfully"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
      <Text>Home</Text>
      <Button
        title="Request Permissions"
        onPress={() => getLocation()}
      />
      <Button
        title="Toggle Location Update"
        onPress={() => toggleLocationUpdate()}
      />
      <Button
        title="Logout"
        onPress={() => {
          action.logout();
        }}
      />
      <Button
        title="Show modal"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
}

export default Home;
