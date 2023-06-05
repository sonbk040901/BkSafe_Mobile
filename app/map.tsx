import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import LoadingModal from "~components/LoadingModal";
import useLocation from "../hook/useLocation";
import { Images } from "../constants/Image";
import { findCarDrivers, findBikeDrivers } from "../api";
import { COLORS } from "../constants/Colors";
type Driver = {
  name: string;
  coord: {
    latitude: number;
    longitude: number;
  };
};
const MapScreen = () => {
  const { type } = useSearchParams();
  const [status, location] = useLocation();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [showHeader, setShowHeader] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (status !== "granted" || !location) return;
    const getData = type === "car" ? findCarDrivers : findBikeDrivers;
    (async () => {
      const drivers = await getData(location);
      ToastAndroid.show(
        `Tìm thấy ${drivers.length} tài xế ${
          type === "car" ? "ô tô" : "xe máy"
        }`,
        ToastAndroid.SHORT
      );
      setDrivers(drivers);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, location]);

  if (status !== "granted" || !location) return <LoadingModal />;
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.header, { opacity: showHeader ? 1 : 0 }]}>
          <View style={styles.backIcon}>
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesome
                name="arrow-left"
                style={{ fontSize: 25, color: COLORS.primary }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <View style={[styles.searchInput, styles.startPos]}>
              <FontAwesome
                name="search"
                style={styles.icon}
              />
              <Text style={{ fontSize: 20 }}>
                {location.latitude.toFixed(3)}, {location.longitude.toFixed(3)}
              </Text>
            </View>
            <View style={[styles.searchInput, styles.endPos]}>
              <FontAwesome
                name="search"
                style={styles.icon}
              />
              <Text style={{ fontSize: 20 }}>Điểm đến</Text>
            </View>
          </View>
        </View>
        <MapView
          style={styles.map}
          camera={{
            center: location,
            pitch: 0,
            heading: 0,
            altitude: -13.5,
            zoom: 15,
          }}
          provider="google"
          onPanDrag={() => setShowHeader(false)}
          onRegionChangeComplete={() => setShowHeader(true)}
        >
          <Marker
            coordinate={location}
            title="You are here"
          >
            <View
              style={{
                width: 40,
                height: 40,
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                source={Images.userMarker}
                resizeMode="contain"
              />
            </View>
          </Marker>
          {drivers.map((driver, index) => (
            <Marker
              key={index}
              coordinate={driver.coord}
              title={driver.name}
              onPress={() => {
                if (Platform.OS === "android") {
                  ToastAndroid.show(
                    `Tài xế ${driver.name}`,
                    ToastAndroid.SHORT
                  );
                } else {
                  alert(`Đã chọn tài xế ${driver.name}`);
                }
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={type === "car" ? Images.carMarker : Images.bikeMarker}
                  resizeMode="contain"
                />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    top: 30,
    left: 0,
    width: "100%",
    height: 150,

    backgroundColor: "transparent",
    zIndex: 1,
    paddingHorizontal: 10,
    gap: 5,
  },
  backIcon: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    gap: 5,
  },
  searchInput: {
    height: 50,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 17,
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: { fontSize: 22, color: COLORS.primary, marginHorizontal: 15 },
  startPos: {},
  endPos: {},
});
