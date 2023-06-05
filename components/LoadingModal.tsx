import { COLORS } from "../constants/Colors";
import { Images } from "../constants/Image";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  View,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";

const LoadingModal = () => {
  const router = useRouter();
  return (
    <Modal
      visible
      onRequestClose={() => {
        router.back();
      }}
      transparent
    >
      <View style={styles.container}>
        <Image
          source={Images.logo}
          style={styles.logo}
        />
        <ActivityIndicator
          color={COLORS.primary}
          size="large"
        />
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1 },
  logo: { resizeMode: "contain", width: 300, height: 300 },
});
