import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import { Button, TextInput as MyTextInput } from "~components";
import { useAlert } from "~components/custom/Alert";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { COLORS } from "../../constants/Colors";
import { login as loginAPI } from "../../api";
import { useDispatch, useSelector } from "~redux/index";
import { login } from "~redux/slice/auth";
import { clear, setEmail, setPassword } from "~redux/slice/formData";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const { email, password } = useSelector((state) => state.formData);
  const { mutate, isLoading, data, error } = useMutation(() =>
    loginAPI(email, password)
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const Alert = useAlert();
  useEffect(() => {
    if (isLoading) return;
    if (error) {
      Alert.show({
        title: "Error",
        message: (error as any) ?? "Network error",
        type: "error",
      });
      return;
    }
    if (data) {
      dispatch(login(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
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
              onChangeText={(v) => dispatch(setEmail(v))}
              placeholder="Email"
              keyboardType="email-address"
            />
            <MyTextInput
              onChangeText={(v) => dispatch(setPassword(v))}
              placeholder="Password"
              keyboardType="hidden-password"
            />
          </View>
          <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
            <Button
              title="Đăng nhập"
              height={50}
              width="85%"
              onPress={async () => {
                try {
                  mutate();
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          </View>

          <View style={styles.signupGroup}>
            <Text>Don{"'"}t have an account?</Text>
            <Button
              onPress={() => dispatch(clear()) && router.replace("auth/signup")}
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
