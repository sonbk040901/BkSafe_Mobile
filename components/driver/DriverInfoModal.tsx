import { ComponentProps, FC, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
  Image,
  Linking,
  TouchableWithoutFeedback,
  TouchableHighlight,
  NativeSyntheticEvent,
} from "react-native";
import { Driver } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constants/Colors";
import { Rating } from "react-native-ratings";

interface DriverInfoProps extends ComponentProps<typeof Modal> {
  driver?: Driver;
  onRequestClose?: (e?: NativeSyntheticEvent<any>) => void;
}
const mockDriver: Driver = {
  _id: "1",
  username: "driver1",
  fullname: "Nguyễn Văn A",
  email: "leducson@gmail.com",
  phone: "0123456789",
  avatar: "https://i.pravatar.cc/150?img=1",
  isActivated: true,
  birthday: new Date("1999-01-01"),
  address: "Hà Nội",
  starAvg: 4.5,
  lat: 21.02,
  lng: 105.8,
};
const Bd2Age = (birthday: Date | string) => {
  const bd = new Date(birthday);
  const age = new Date().getFullYear() - bd.getFullYear();
  return age;
};
const DriverInfo: FC<DriverInfoProps> = (props) => {
  const { driver = mockDriver, ...rest } = props;
  const { fullname, birthday, address, email, phone, starAvg, avatar } = driver;
  const opcAnm = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const opacity = rest.visible ? 1 : 0;
    const timeout = rest.visible ? 150 : 0;
    const to = setTimeout(() => {
      Animated.timing(opcAnm, {
        toValue: opacity,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, timeout);
    return () => {
      clearTimeout(to);
    };
  }, [opcAnm, rest.visible]);
  return (
    <Modal
      animationType="slide"
      transparent
      {...rest}
    >
      <Animated.View style={[styles.modal, { opacity: opcAnm }]}>
        <TouchableOpacity
          style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
          onPress={() => rest.onRequestClose?.()}
        >
          <FontAwesome
            name="arrow-left"
            style={{ fontSize: 20, color: COLORS.primary }}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <TouchableHighlight
            style={{
              position: "absolute",
              width: 60,
              height: 60,
              backgroundColor: "#4db4fd",
              borderRadius: 30,
              top: 300 - 30,
              right: 90,
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => Linking.openURL(`mailto: ${email}`)}
          >
            <FontAwesome
              name="envelope"
              size={28}
              color="white"
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              position: "absolute",
              width: 60,
              height: 60,
              backgroundColor: "#4db4fd",
              borderRadius: 30,
              top: 300 - 30,
              right: 20,
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => Linking.openURL(`tel: ${phone}`)}
          >
            <FontAwesome
              name="phone"
              size={30}
              color="white"
            />
          </TouchableHighlight>
          <Image
            source={{
              uri:
                avatar ||
                "https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg",
            }}
            style={{ height: 300, resizeMode: "cover" }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.textTitle}>
              {fullname}, {Bd2Age(birthday)}
            </Text>
            <Text style={styles.textSubTitle}>{address}</Text>
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL(`mailto: ${email}`)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginVertical: 5,
                }}
              >
                <FontAwesome
                  name="envelope"
                  size={18}
                  style={{ width: 25 }}
                />
                <Text style={styles.textEmail}>{email}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL(`tel:${phone}`)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginVertical: 5,
                }}
              >
                <FontAwesome
                  name="phone-square"
                  size={20}
                  style={{ width: 25 }}
                />
                <Text style={styles.textPhone}>{phone}</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ width: 200, paddingTop: 10 }}>
              <Rating startingValue={starAvg} />
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default DriverInfo;

const styles = StyleSheet.create({
  modal: { backgroundColor: "white", flex: 1 },
  container: {
    flex: 1,
  },
  infoContainer: { flex: 1, backgroundColor: "white", padding: 25 },
  textTitle: { fontSize: 30, fontWeight: "600", color: "#676767" },
  textSubTitle: {
    fontSize: 25,
    fontWeight: "500",
    color: "#43c0ff",
    marginBottom: 10,
  },
  textEmail: {
    fontSize: 22,
    fontWeight: "normal",
    color: "#676767",
    textDecorationLine: "underline",
  },
  textPhone: { fontSize: 22, fontWeight: "normal", color: "#676767" },
});
