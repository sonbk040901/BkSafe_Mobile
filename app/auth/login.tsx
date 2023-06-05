import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  // ToastAndroid,
  // Platform,
} from "react-native";
import { Button, TextInput as MyTextInput } from "~components";
import { useAuth } from "~components/context/Auth";
import { useAlert } from "~components/custom/Alert";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { COLORS } from "../../constants/Colors";
import { login as loginAPI } from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { action } = useAuth();
  const router = useRouter();
  const Alert = useAlert();
  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      const data = await loginAPI(email, password);
      action.login(data);
    } catch (error: any) {
      Alert.show({
        title: "Error",
        message: error ?? "Network error",
        type: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              onPress={() => handleLogin(email, password)}
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
