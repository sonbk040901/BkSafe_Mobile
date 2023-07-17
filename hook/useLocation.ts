import {
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
  enableNetworkProviderAsync,
} from "expo-location";
import {
  defineTask,
  unregisterAllTasksAsync,
  isTaskDefined,
} from "expo-task-manager";
import { useEffect, useState } from "react";
type StatusType = "loading" | "granted" | "denied";
type LocationType = {
  latitude: number;
  longitude: number;
};
const LOCATION_TASK_NAME = "background-location-task";
export default function useLocation() {
  const [status, setStatus] = useState<StatusType>("loading");
  const [location, setLocation] = useState<LocationType>();
  useEffect(() => {
    async function request() {
      await enableNetworkProviderAsync();
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
      defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
        const { locations } = data as {
          locations: { coords: { latitude: number; longitude: number } }[];
        };
        if (error) {
          // check `error.message` for more details.
          console.log("error: ", error.message);
          setStatus("denied");
          return;
        }
        setLocation(locations[0].coords);
        setStatus("granted");
      });
    }
    request();
    return () => {
      unregisterAllTasksAsync();
    };
  }, []);
  useEffect(() => {
    if (location) {
      if (isTaskDefined(LOCATION_TASK_NAME)) {
        stopLocationUpdatesAsync(LOCATION_TASK_NAME).then(() => {
          unregisterAllTasksAsync();
        });
      }
    }
  }, [location]);
  // useEffect(() => {
  //   getCurrentPositionAsync({ timeInterval: 1000 })
  //     .then((res) => {
  //       setStatus("granted");
  //       setLocation(res.coords);
  //     })
  //     .catch(() => setStatus("denied"));
  // }, []);

  return [status, location] as [StatusType, LocationType | undefined];
}
// export function useRealTimeLocation() {}
