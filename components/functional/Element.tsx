import { COLORS } from "../../constants/Colors";
import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

interface ElementProps {
  title: string;
  image: any;
  onPress?: () => void;
}

const Element = ({ image, title, onPress }: ElementProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Image
          style={{ height: "100%", aspectRatio: 1 }}
          source={image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default Element;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: COLORS.primary,
    height: 70,
    aspectRatio: 1,
    borderRadius: 10,
    borderRightColor: COLORS.primary,
    padding: 5,
    // boxShadow: "0px 0px 10px 10px rgba(201, 53, 53, 0.5)",
    shadowColor: "#090909",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  titleText: {
    fontSize: 15,
    fontFamily: "SpaceMono",
  },
});
