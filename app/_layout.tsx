import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "~components/custom/Alert";
import { useInitApp } from "../hook";
import { Provider } from "react-redux";
import store from "~redux/store";
import { useDispatch, useSelector } from "~redux";
import LoadingModal from "~components/LoadingModal";
import { getData } from "../utils";
import { login, logout } from "~redux/slice/auth";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AlertProvider>
          <Root />
        </AlertProvider>
      </Provider>
    </QueryClientProvider>
  );
}
function Root() {
  const [loaded, error] = useInitApp();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  useEffect(() => {
    getData("user").then((v) => {
      if (!v) dispatch(logout());
      else dispatch(login(v));
    });
  }, [dispatch]);
  if (!loaded || isLoading) return <LoadingModal />;
  return <StackScreen />;
}

function StackScreen() {
  const { isLogin } = useSelector((state) => state.auth);
  const router = useRouter();
  const key = isLogin ? "home" : "auth";
  useEffect(() => {
    router.replace(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);
  return (
    /* key: Bắt buộc Layout phải render lại toàn bộ khi key khác nhau */
    <Stack
      key={key}
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      initialRouteName={key}
    />
  );
}
