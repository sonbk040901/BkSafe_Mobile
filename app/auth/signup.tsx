import * as React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import { Button, TextInput as MyTextInput } from "~components";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/Colors";
import { signup as signupAPI } from "../../api";
import { useAlert } from "~components/custom/Alert";
import { useDispatch, useSelector } from "~redux/index";
import {
  clear,
  setConfirmPass,
  setEmail,
  setFullname,
  setPassword,
  setPhone,
  setUsername,
} from "~redux/slice/formData";

const Signup = () => {
  const { confirmPass, email, fullname, password, phone, username } =
    useSelector((state) => state.formData);
  const dispatch = useDispatch();
  const Alert = useAlert();
  const router = useRouter();
  const handleSignup = async () => {
    try {
      await signupAPI(email, username, fullname, phone, password);
      Alert.show({
        title: "Success",
        message: "Sign up successfully",
        type: "success",
      });
      dispatch(clear());
      router.replace("/login");
    } catch (e: any) {
      Alert.show({
        title: "Error",
        message: e ?? "Network error",
        type: "error",
      });
    }
  };
  return (
    <>
      <TouchableWithoutFeedback
        style={{
          flex: 1,
          width: "100%",
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
                onChangeText={(v) => dispatch(setUsername(v))}
                placeholder="Username"
              />
              <MyTextInput
                onChangeText={(v) => dispatch(setFullname(v))}
                placeholder="Full Name"
              />
              <MyTextInput
                onChangeText={(v) => dispatch(setPhone(v))}
                placeholder="Phone"
              />
              <MyTextInput
                onChangeText={(v) => dispatch(setPassword(v))}
                placeholder="Password"
                keyboardType="hidden-password"
              />
              <MyTextInput
                onChangeText={(v) => dispatch(setConfirmPass(v))}
                placeholder="Confirm password"
                keyboardType="hidden-password"
              />
            </View>
            <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
              <Button
                title="Sign Up"
                height={50}
                width="85%"
                onPress={handleSignup}
              />
            </View>

            <View style={styles.loginGroup}>
              <Text>You had a account?</Text>
              <Button
                onPress={() =>
                  dispatch(clear()) && router.replace("auth/login")
                }
                title="Login"
                type="text"
                fw="400"
              />
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
  loginGroup: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginVertical: 15,
    justifyContent: "space-evenly",
    alignItems: "baseline",
  },
});
