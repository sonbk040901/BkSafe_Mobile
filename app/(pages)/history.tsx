import MapScreen from "../map";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <MapScreen></MapScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
