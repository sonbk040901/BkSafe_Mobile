import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import DriverInfo from "~components/driver/DriverInfoModal";

export default function App() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text>History</Text>
      <Button
        onPress={() => {
          setVisible(true);
        }}
        title="Show Driver Info"
      />
      <DriverInfo
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
