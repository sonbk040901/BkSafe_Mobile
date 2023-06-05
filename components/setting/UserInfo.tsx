import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

interface UserInfoProps {
  username: string;
  fullname: string;
  avatar?: string;
}

const UserInfo = (props: UserInfoProps) => {
  const { username, fullname, avatar } = props;
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            avatar ? { uri: avatar } : require("../../assets/images/car.jpg")
          }
          style={styles.avatar}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.fullname}>{fullname}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    shadowColor: "#676767",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 999,
    // backgroundColor: "red",
  },

  avatarContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    width: 70,
    height: 70,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  fullname: { fontSize: 20, fontWeight: "bold" },
  username: { fontSize: 16, color: "gray" },
});
