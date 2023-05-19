import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal as DefaultModal,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/Colors";
interface AlertProps extends React.ComponentProps<typeof DefaultModal> {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info" | "confirm";
  onOk?: () => void;
  onCancel?: () => void;
}
const colorS = {
  success: "green",
  error: "red",
  warning: "orange",
  info: COLORS.primary,
  confirm: COLORS.primary,
};

const Alert = (props: AlertProps) => {
  const {
    onRequestClose,
    title,
    message,
    type = "info",
    onOk,
    onCancel,
  } = props;

  const color = colorS[type];
  return (
    <DefaultModal
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={(e) => {
        onRequestClose?.(e);
        onCancel?.();
      }}
      {...props}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color }]}>{title}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onOk}
              style={styles.btn}
            >
              <Text style={styles.btnText}>OKE</Text>
            </TouchableOpacity>

            {type === "confirm" && (
              <TouchableOpacity
                onPress={onCancel}
                style={styles.btn}
              >
                <Text style={styles.btnText}>CANCEL</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </DefaultModal>
  );
};
export default Alert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6e6e6e56",
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: 250,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  titleContainer: {
    padding: 15,
    paddingVertical: 10,
    backgroundColor: "#eeeeee",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  messageContainer: {
    padding: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: "#eeeeee",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  message: {},
  btn: {
    flex: 1,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
  btnText: {
    fontWeight: "500",
  },
});
