import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  // ToastAndroid,
  // Platform,
} from "react-native";
import {
  Text,
  Button,
  View,
  TextInput as MyTextInput,
  useAuth,
  Alert,
} from "~components";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { COLORS } from "../../constants/Colors";

type D = { success: boolean; message?: string; data?: any };
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertProps, setAlertProps] = useState<
    React.ComponentProps<typeof Alert>
  >({
    visible: false,
    title: "",
    message: "",
    type: "info",
  });
  const { action } = useAuth();
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await axios.post<any, AxiosResponse<D, any>>(
        "http://192.168.1.20:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      const data = res.data.data;
      setAlertProps({
        visible: true,
        title: "Success",
        message: "Login successfully",
        type: "success",
        onOk: () => {
          action.login(data);
        },
      });
    } catch (e: any) {
      if (e instanceof AxiosError) {
        const error: AxiosError<D> = e;
        setAlertProps({
          visible: true,
          title: "Error",
          message: error.response?.data.message || "",
          type: "error",
          onOk: () => setAlertProps({ ...alertProps, visible: false }),
          onCancel: () => setAlertProps({ ...alertProps, visible: false }),
        });
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      style={{
        flex: 1,
      }}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              source={require("~assets/images/logo.png")}
              style={styles.image}
              contentFit="cover"
              transition={500}
            />
          </View>
          <View style={styles.inputs}>
            <MyTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
            <MyTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              keyboardType="hidden-password"
            />
          </View>
          <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
            <Button
              title="Đăng nhập"
              height={50}
              width="85%"
              onPress={handleLogin}
            />
          </View>

          <View style={styles.signupGroup}>
            <Text>Don{"'"}t have an account?</Text>
            <Button
              onPress={() => router.replace("auth/signup")}
              title="Sign Up"
              type="text"
              fw="400"
            />
          </View>
        </ScrollView>
        <Alert {...alertProps} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "70%",
    height: undefined,
    aspectRatio: 735 / 571,
  },
  inputs: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  input: {
    color: "#000000",
  },
  inputPlaceholder: {
    color: COLORS.primary,
  },
  signupGroup: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginVertical: 15,
    justifyContent: "space-evenly",
    alignItems: "baseline",
  },
});
