import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider, useAuth } from "~components";
import { useInitApp } from "../hook";
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
      <Root />
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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          key={status}
          initialRouteName={status === "login" ? "home" : "auth"}
          screenOptions={{ headerShown: false }}
        ></Stack>
      </ThemeProvider>
    </>
  );
}
