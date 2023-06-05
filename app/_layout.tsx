import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AuthProvider, useAuth } from "~components/context/Auth";
import { AlertProvider } from "~components/custom/Alert";
import { useInitApp } from "../hook";
import { StatusBar } from "expo-status-bar";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(pages)",
// };

export default function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Root />
      </AlertProvider>
    </AuthProvider>
  );
}
function Root() {
  const { loaded, error } = useInitApp();
  const { status } = useAuth();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  return loaded && status !== "pending" ? <RootLayoutNav /> : <SplashScreen />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "login") {
      router.replace("home");
    } else if (status === "logout") {
      router.replace("auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <StatusBar style="auto" />
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          key={status}
          initialRouteName={status === "login" ? "home" : "auth"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="map"
            options={{
              headerShown: false,
              header: MapHeader,
            }}
          />
        </Stack>
      </ThemeProvider>
    </>
  );
}
const MapHeader = () => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            height: "100%",
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
          }}
        >
          <FontAwesome
            size={21}
            style={{ marginBottom: -3 }}
            name="arrow-left"
            color="black"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
});
