import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Button from "~components/custom/Button";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "~redux/index";

const DefaultAuthScreen = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (!isLogin) {
        e.preventDefault();
      }
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      navigation.removeListener("beforeRemove", () => {});
    };
  });
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <LinearGradient
      style={styles.container}
      colors={[
        "#0099dd",
        "transparent",
        "transparent",
        "transparent",
        "#0099dd",
      ]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        source={require("~assets/images/logo.png")}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        // transition={500}
      />
      <Button
        href="auth/login"
        title="Login"
        width="70%"
        height={40}
        style={styles.loginBtn}
      />
      <View style={styles.signupGroup}>
        <Text>Don{"'"}t have an account?</Text>
        <Button
          href="auth/signup"
          title="Sign Up"
          type="text"
          fw="400"
        />
      </View>
    </LinearGradient>
  );
};

export default DefaultAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 735 / 571,
  },
  loginBtn: { marginTop: 20, marginBottom: 10, height: 50 },
  signupGroup: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingTop: 10,
    justifyContent: "space-evenly",
    alignItems: "baseline",
    width: "70%",
  },
});
