import * as React from "react";
import {
  StyleSheet,
  Animated,
  KeyboardTypeOptions,
  useColorScheme,
} from "react-native";
import { View, TextInput as DefaultTextInput } from "./Themed";
import { useState, useEffect, useRef } from "react";
import { COLORS } from "../constants/Colors";

interface TextInputProps {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | "hidden-password";
  value?: string;
  onChangeText?: (text: string) => void;
}

const TextInput = (props: TextInputProps) => {
  const {
    placeholder,
    keyboardType = "default",
    value: initValue,
    onChangeText,
  } = props;
  const [value, setValue] = useState(initValue);
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedIsFocused, {
      toValue: value || isFocused ? 1 : 0,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedIsFocused, isFocused]);

  const color = useColorScheme();
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Animated.Text
          style={[
            styles.placeholder,
            { color: color === "dark" ? "#ffffff" : "#000000" },
            {
              transform: [
                {
                  translateY: animatedIsFocused.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -37],
                  }),
                },
                {
                  translateX: animatedIsFocused.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30],
                  }),
                },
                {
                  scale: animatedIsFocused.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                  }),
                },
              ],
              opacity: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [0.7, 1],
              }),
            },
          ]}
        >
          {placeholder}
        </Animated.Text>
        <DefaultTextInput
          style={[
            styles.textInput,
            {
              borderColor: isFocused
                ? COLORS.primary
                : value
                ? COLORS.primary + "80"
                : "#aaaaaa",
              borderWidth: isFocused ? 1.5 : 1,
            },
          ]}
          onChangeText={(text) => {
            setValue(text);
            if (onChangeText) onChangeText(text);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={
            keyboardType !== "hidden-password" ? keyboardType : "default"
          }
          secureTextEntry={keyboardType === "hidden-password"}
        />
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    justifyContent: "flex-end",
  },
  inputGroup: {
    position: "relative",
    width: "100%",
    height: 45,
    justifyContent: "center",
  },
  placeholder: {
    position: "absolute",
    paddingHorizontal: 15,
    width: 200,
  },
  textInput: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    borderRadius: 15,
  },
});
