import React from "react";
import MapView, { Circle, Marker, MapMarker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // initialRegion={{
        //   latitude: 21.0071505,
        //   longitude: 105.8468554,
        //   latitudeDelta: 1,
        //   longitudeDelta: 1,
        // }}
        camera={{
          center: {
            latitude: 21.0071505,
            longitude: 105.8468554,
          },
          pitch: 0,
          heading: 0,
          altitude: -13.5,
          zoom: 15,
        }}
        provider="google"
      >
        <MapMarker
          coordinate={{
            latitude: 21.0071505,
            longitude: 105.8468554,
          }}
          // title="Monas"
          // description="Monumen Nasional"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
