import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import FunctionBox from "~components/functional/Container";
import { Images } from "../../constants/Image";
import { useSelector } from "~redux/index";
const DATA = [
  [
    { image: Images.car, title: "Car", path: "map?type=car" },
    { image: Images.motorbike, title: "Bike", path: "map?type=bike" },
  ],
  [
    { image: Images.car, title: "Car" },
    { image: Images.motorbike, title: "Bike" },
    { image: Images.motorbike, title: "Bike" },
    { image: Images.motorbike, title: "Bike" },
  ],
];
function Home() {
  const navigation = useNavigation();
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (isLogin) {
        e.preventDefault();
      }
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      navigation.removeListener("beforeRemove", () => {});
    };
  });
  return (
    <View style={styles.container}>
      <FunctionBox
        data={DATA[0]}
        title="Looking for drivers"
      />
      <FunctionBox
        data={DATA[1]}
        title="Other"
      />
    </View>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "flex-start",
    gap: 15,
  },
});

// console.log("location: ", location);

// useEffect(() => {
//   defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//     const { locations } = data as {
//       locations: { coords: { latitude: number; longitude: number } }[];
//     };
//     if (error) {
//       // check `error.message` for more details.
//       console.log("error: ", error.message);
//       return;
//     }
//     setLocation(locations[0].coords);
//     console.log("locations: ", locations[0].coords);
//   });
//   return () => {
//     unregisterAllTasksAsync();
//   };
// }, []);
// const getLocation = async () => {
//   const { status } = await requestForegroundPermissionsAsync();
//   console.log("status: ", status);
//   if (status !== "granted") {
//     console.log("Permission to access location was denied");
//     await requestBackgroundPermissionsAsync();
//     return;
//   }
// };
// const toggleLocationUpdate = async () => {
//   setIsLocationUpdate((v) => !v);
//   // const tasks = await getRegisteredTasksAsync();
//   // console.log("tasks: ", tasks);

//   if (isLocationUpdate) {
//     await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
//     return;
//   }
//   const enabled = await hasServicesEnabledAsync();
//   if (!enabled) {
//     console.log("Location services are not enabled");
//     await enableNetworkProviderAsync();
//   }
//   await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//     accuracy: 6,
//     timeInterval: 2000,
//     distanceInterval: 0,
//     foregroundService: {
//       notificationTitle: "Using your location",
//       notificationBody:
//         "To turn off, go back to the app and switch something off.",
//     },
//   });
// };
