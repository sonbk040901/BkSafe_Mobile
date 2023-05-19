import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function useInitApp() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  return { loaded, error };
}
