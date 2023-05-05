import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet } from "react-native";
import { useSearchParams, useRouter } from "expo-router";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "~components";

export default function ModalScreen() {
  const { name, icon } = useSearchParams<{ name: string; icon: string }>();
  const router = useRouter();
  console.log("Params: ", name, icon);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Button
          title="Modal"
          onPress={() => {
            router.back();
          }}
        />
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,.1)"
      />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
