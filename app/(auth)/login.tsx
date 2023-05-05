import axios from "axios";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Button, View, TextInput as MyTextInput } from "~components";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { colors } from "../../constants/Colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://192.168.1.61:3000/auth/login", {
        email,
        password,
      });
      const data = res.data.data;
      Alert.alert("Sign up successfully", `Hello ${data.fullname}`);
    } catch (error: any) {
      Alert.alert("Error", error.response.data.message);
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
              onPress={() => router.replace("/signup")}
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
    color: colors.primary,
  },
  signupGroup: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginVertical: 15,
    justifyContent: "space-evenly",
    alignItems: "baseline",
  },
});
