import * as React from "react";
import { StyleSheet, TouchableOpacity, TextStyle } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "./Themed";
import { colors } from "../constants/Colors";

interface AdditionalProps {
  title: string;
  lightColor?: string;
  darkColor?: string;
  type?: "outline" | "solid" | "text";
  fw?: TextStyle["fontWeight"];
  width?: string | number;
  height?: string | number;
  href?: string;
}
type ButtonProps = AdditionalProps &
  React.ComponentProps<typeof TouchableOpacity>;
const Button = (props: ButtonProps) => {
  const {
    href,
    onPress,
    title,
    lightColor,
    darkColor,
    type = "solid",
    fw = "bold",
    width,
    height,
    style,
    ...other
  } = props;
  const router = useRouter();
  const textColor = type === "solid" ? "white" : colors.primary;
  const handlePress = href ? () => router.push(href) : onPress;

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...styles[`${type}Type`],
        width,
        height,
        ...(style as any),
      }}
      onPress={handlePress}
      {...other}
      activeOpacity={0.7}
    >
      <Text
        style={{ color: textColor, fontWeight: fw }}
        lightColor={lightColor}
        darkColor={darkColor}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  textType: {
    backgroundColor: "transparent",
  },
  outlineType: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  solidType: {
    backgroundColor: colors.primary,
  },
});
