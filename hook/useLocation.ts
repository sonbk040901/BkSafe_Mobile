import {
  requestForegroundPermissionsAsync,
  // requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useLayoutEffect, useState } from "react";
async function requestLocationPermission() {
  const { granted } = await requestForegroundPermissionsAsync();
  // if (granted) {
  //   const { granted } = await requestBackgroundPermissionsAsync();
  //   if (!granted) return false;
  // }
  return granted;
}
type StatusType = "loading" | "granted" | "denied";
type LocationType = {
  latitude: number;
  longitude: number;
};
export default function useLocation() {
  const [status, setStatus] = useState<StatusType>("loading");
  const [location, setLocation] = useState<LocationType>();
  useEffect(() => {
    requestLocationPermission().then(() => setStatus("granted"));
  }, []);
  useLayoutEffect(() => {
    if (status === "granted") {
      getCurrentPositionAsync().then(({ coords }) => setLocation(coords));
      return;
    }
    setStatus("denied");
  }, [status]);
  return [status, location] as [StatusType, LocationType | undefined];
}
// export function useRealTimeLocation() {}
