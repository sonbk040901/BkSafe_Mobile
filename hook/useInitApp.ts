import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { requestForegroundPermissionsAsync } from "expo-location";
import { useEffect, useState } from "react";

export default function useInitApp() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [granted, setGranted] = useState(false);
  const [fontLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Pacifico: require("../assets/fonts/Pacifico-Regular.ttf"),
    Nunito: require("../assets/fonts/Nunito-Light.ttf"),
    ...FontAwesome.font,
  });
  useEffect(() => {
    requestForegroundPermissionsAsync()
      .then(({ granted }) => {
        setGranted(granted);
      })
      .catch(() => setLoaded(true));
  }, []);
  useEffect(() => {
    if (fontLoaded && granted) {
      setLoaded(true);
    }
    if (fontError) {
      setError(fontError);
    }
  }, [fontLoaded, fontError, granted]);
  return <[boolean, Error | null]>[loaded, error];
}
