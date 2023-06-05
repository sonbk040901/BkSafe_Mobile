import React, {
  FC,
  createContext,
  useContext,
  ComponentProps,
  PropsWithChildren,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal as DefaultModal,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants/Colors";
interface AlertProps extends ComponentProps<typeof DefaultModal> {
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
const AlertContext = createContext<{
  show: (props: {
    message: string;
    title: string;
    type?: AlertProps["type"];
    onCancel?: () => void;
    onOk?: () => void;
  }) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  show: () => {},
});
const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [onOk, setOnOk] = React.useState<(() => void) | undefined>();
  const [onCancel, setOnCancel] = React.useState<(() => void) | undefined>();
  const [type, setType] = React.useState<AlertProps["type"]>("info");

  return (
    <AlertContext.Provider
      value={{
        show: ({ message, title, type, onCancel, onOk }) => {
          setModalVisible(true);
          setTitle(title);
          setMessage(message);
          setOnOk(onOk);
          setOnCancel(onCancel);
          setType(type);
        },
      }}
    >
      {children}
      <Alert
        title={title}
        message={message}
        visible={modalVisible}
        type={type}
        onRequestClose={() => setModalVisible(false)}
        onOk={() => {
          setModalVisible(false);
          onOk?.();
        }}
        onCancel={() => {
          setModalVisible(false);
          onCancel?.();
        }}
      />
    </AlertContext.Provider>
  );
};
const useAlert = () => useContext(AlertContext);
export { AlertProvider, useAlert };
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
