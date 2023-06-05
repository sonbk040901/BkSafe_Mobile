import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Element from "./Element";
import { COLORS } from "../../constants/Colors";
import { useRouter } from "expo-router";
interface FunctionContainerProps {
  title: string;
  data: { image: any; title: string; path?: string }[];
}

const FunctionContainer = ({ data, title }: FunctionContainerProps) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.mainContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            width: "100%",
          }}
        >
          {data.map((item, index) => (
            <Element
              key={index}
              image={item.image}
              title={item.title}
              onPress={() => {
                if (item.path) {
                  router.push(`/${item.path}`);
                }
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default FunctionContainer;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "white",
    height: 170,
    overflow: "hidden",
    padding: 0,
    shadowColor: "#090909",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  titleContainer: {
    backgroundColor: COLORS.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
