import { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  Animated,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Rating } from "react-native-ratings";
import { useRouter, useSearchParams } from "expo-router";
import LoadingModal from "~components/LoadingModal";
import useLocation from "../hook/useLocation";
import {
  geocodeAsync,
  reverseGeocodeAsync,
  setGoogleApiKey,
} from "expo-location";
import { Images } from "../constants/Image";
import { findCarDrivers, createRequest } from "../api";
import { API_KEY } from "../api/ggmap";
import { COLORS } from "../constants/Colors";
import FindAdressModal from "~components/custom/FindAddressModal";
import { Driver } from "../types";
import { showNativeAlert } from "../utils";
import DriverInfo from "~components/driver/DriverInfoModal";
import { useAlert } from "~components/custom/Alert";
setGoogleApiKey(API_KEY);
const MapScreen = () => {
  const { type } = useSearchParams();
  const [status, location] = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [center, setCenter] = useState(location);
  const [endPos, setEndPos] = useState(location);
  const [currentLocationValue, setCurrentLocationValue] = useState("");
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const headerAnimated = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver>();
  const Alert = useAlert();
  const router = useRouter();
  useEffect(() => {
    if (!location) return;
    const { latitude, longitude } = location;
    reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: true },
    ).then((v) => {
      if (v.length === 0) return;
      const { street, subregion, region } = v.filter((v) => v.street)[0];
      setCurrentLocationValue(`${street}, ${subregion}, ${region}`);
      setStartValue(`${street}, ${subregion}, ${region}`);
    });
  }, [location]);
  useEffect(() => {
    geocodeAsync(startValue).then((v) => {
      if (v.length === 0) return;
      setCenter(v[0]);
    });
  }, [startValue]);
  useEffect(() => {
    geocodeAsync(endValue).then((v) => {
      if (v.length === 0) return;
      setEndPos(v[0]);
    });
  }, [endValue]);
  useEffect(() => {
    Animated.timing(headerAnimated, {
      toValue: showHeader ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [showHeader, headerAnimated]);
  // useEffect(() => {
  //   if (status !== "granted" || !location) return;
  //   setCenter(location);
  // }, [status, location]);
  useEffect(() => {
    if (!center) return;
    showNativeAlert("Đang tìm tài xế gần đây");
    findCarDrivers({ lat: center.latitude, lng: center.longitude }).then(
      (res) => {
        setDrivers(res);
        showNativeAlert(`Tìm thấy ${res.length} tài xế gần đây`);
      },
    );
  }, [center]);
  const handlePressDriver = (driver: Driver) => {
    setSelectedDriver(driver);
  };
  const handleCreateRequest = async () => {
    if (!location || !center || !endPos || !selectedDriver) return;
    await createRequest({
      currentLocation: {
        address: currentLocationValue,
        latLng: { lat: location.latitude, lng: location.longitude },
      },
      startLocation: {
        address: startValue,
        latLng: { lat: center.latitude, lng: center.longitude },
      },
      endLocation: {
        address: endValue,
        latLng: { lat: endPos.latitude, lng: endPos.longitude },
      },
      driver: selectedDriver._id,
      suggestedDriver: drivers.map((v) => v._id),
    });
  };
  if (status !== "granted" || !location) return <LoadingModal />;
  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[styles.header, { opacity: headerAnimated }]}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => router.back()}
          >
            <FontAwesome
              name="arrow-left"
              style={{ fontSize: 20, color: COLORS.primary }}
            />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <SearchInput
              placeholder="Nhập điểm đón tài xế"
              value={startValue}
              source={Images.locationIcon2}
              onPress={() => {
                setModalVisible(true);
                setModalValue(startValue);
              }}
            />
            <SearchInput
              placeholder="Nhập điểm đến"
              value={endValue}
              source={Images.locationIcon1}
              onPress={() => {
                setModalVisible(true);
                setModalValue(endValue);
              }}
            />
          </View>
        </Animated.View>
        <MapView
          style={styles.map}
          camera={{
            center: location,
            pitch: 0,
            heading: 0,
            altitude: -13.5,
            zoom: 15,
          }}
          provider={PROVIDER_GOOGLE}
          onPanDrag={() => {
            setShowHeader(false);
            setSelectedDriver(undefined);
          }}
          onRegionChangeComplete={() => {
            setShowHeader(true);
          }}
        >
          {endPos && (
            <MapViewDirections
              apikey={API_KEY}
              origin={center}
              destination={endPos}
              strokeWidth={4}
              strokeColor={COLORS.primary}
              language="vi"
              mode="DRIVING"
              onReady={({ distance, duration, fares }) => {
                console.log("Distance: ", distance);
                console.log("Duration: ", duration);
                console.log("Fares: ", fares);
              }}
            />
          )}
          <Marker
            coordinate={location}
            title="Vị trí hiện tại"
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
          <Marker
            coordinate={center || { latitude: 0, longitude: 0 }}
            title="Vị trí đón tài xế"
            draggable
            onDragEnd={(e) => {
              setCenter(e.nativeEvent.coordinate);
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,

                // height: 30,
                borderWidth: 5,
                borderColor: COLORS.primary,
                borderRadius: 20,
              }}
            />
          </Marker>
          {endPos && (
            <Marker
              coordinate={endPos}
              title="Điểm đến"
            ></Marker>
          )}
          {drivers.map((driver) => {
            const coord = { latitude: driver.lat, longitude: driver.lng };
            return (
              <Marker
                key={driver._id}
                coordinate={coord}
                title={driver.fullname}
                onPress={() => handlePressDriver(driver)}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                  }}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={
                      type === "car" ? Images.carMarker : Images.bikeMarker
                    }
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
        <Animated.View style={[styles.footer, { opacity: headerAnimated }]}>
          {selectedDriver && (
            <DriverContainer
              disabled={!showHeader}
              driver={selectedDriver}
            />
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.bookingBtn,
              { opacity: selectedDriver && endValue ? 1 : 0.8 },
            ]}
            onPress={() => {
              const condition = selectedDriver && endValue;
              if (!condition) {
                showNativeAlert("Vui lòng chọn tài xế và điểm đến");
                return;
              }
              handleCreateRequest().then(() => {
                Alert.show({
                  title: "Success",
                  message: "Đặt tài xế thành công",
                  type: "success",
                  onCancel: () => {
                    setTimeout(() => {
                      router.replace("history");
                    }, 300);
                  },
                });
              });
            }}
          >
            <Text style={styles.bookingBtnText}>Đặt tài xế</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <FindAdressModal
        visible={modalVisible}
        value={modalValue}
        placeholder="Nhập địa chỉ"
        onChangeText={(v) => {
          setModalVisible(false);
          const setResult =
            modalValue === startValue ? setStartValue : setEndValue;
          setResult(v);
          setModalValue(v);
        }}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default MapScreen;
interface SearchInputProps {
  placeholder: string;
  value?: string;
  source: any;
  onPress?: () => void;
}
const SearchInput = ({
  placeholder,
  value,
  source,
  onPress,
}: SearchInputProps) => {
  return (
    <TouchableOpacity
      style={[styles.searchInput]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        style={{
          height: 25,
          width: 50,
          resizeMode: "contain",
        }}
        source={source}
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 16,
          color: !value ? "gray" : "black",
          flex: 1,
          paddingRight: 10,
        }}
      >
        {value || placeholder}
      </Text>
    </TouchableOpacity>
  );
};
interface DriverContainerProps {
  driver: Driver;
  disabled?: boolean;
}
const DriverContainer = ({
  driver,
  disabled = false,
}: DriverContainerProps) => {
  const [isShowShadow, setIsShowShadow] = useState(!disabled);
  const [driverInfoVisible, setDriverInfoVisible] = useState(false);
  useEffect(() => {
    if (disabled) {
      setIsShowShadow(false);
      return;
    }
    const timeout = setTimeout(() => {
      setIsShowShadow(true);
    }, 150);
    return () => {
      clearTimeout(timeout);
    };
  }, [disabled]);
  return (
    <TouchableWithoutFeedback onPress={() => setDriverInfoVisible(true)}>
      <View
        style={[
          {
            height: 120,
            width: "100%",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
            gap: 15,
          },
          isShowShadow ? styles.shadow : {},
        ]}
      >
        <View
          style={[
            {
              height: "100%",
              aspectRatio: 1,
              borderRadius: 10,
              overflow: "hidden",
            },
            isShowShadow ? styles.shadow : {},
          ]}
        >
          <Image
            source={{
              uri: "https://us.123rf.com/450wm/harunatsukobo/harunatsukobo2101/harunatsukobo210100005/161493383-male-taxi-driver-with-glasses.jpg?ver=6",
            }}
            style={{
              resizeMode: "cover",
              flex: 1,
            }}
          />
        </View>
        <View style={styles.driverInfo}>
          <Text style={styles.driverFullname}>
            {driver.fullname}{" "}
            <FontAwesome
              name="eye"
              size={25}
              color="gray"
            />
          </Text>
          <Text style={styles.driverPhone}>{driver.phone}</Text>
          <View style={{ width: 110 }}>
            <Rating
              type="custom"
              readonly
              imageSize={21}
              startingValue={driver.starAvg}
              style={{ paddingVertical: 10 }}
            />
          </View>
        </View>

        <DriverInfo
          driver={driver}
          visible={driverInfoVisible}
          onRequestClose={() => setDriverInfoVisible(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: { color: COLORS.primary, marginHorizontal: 15 },
  startPos: {},
  endPos: {},
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  driverInfo: { flex: 1 },
  bookingBtn: {
    height: 50,
    width: 250,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bookingBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  driverFullname: {
    fontSize: 20,
    fontWeight: "bold",
  },
  driverPhone: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
