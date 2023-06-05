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
import { useState } from "react";
import { COLORS } from "../../constants/Colors";
import { signup as signupAPI } from "../../api";
import { useAlert } from "~components/custom/Alert";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
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
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
              />
              <MyTextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
              />
              <MyTextInput
                value={fullname}
                onChangeText={setFullname}
                placeholder="Full Name"
              />
              <MyTextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
              />
              <MyTextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                keyboardType="hidden-password"
              />
              <MyTextInput
                value={confirmPass}
                onChangeText={setConfirmPass}
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
                onPress={() => router.replace("auth/login")}
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
