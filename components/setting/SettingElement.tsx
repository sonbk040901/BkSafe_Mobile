import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ComponentProps, FC } from "react";
import { FontAwesome } from "@expo/vector-icons";
interface IconProps {
  name: ComponentProps<typeof FontAwesome>["name"];
}

const Icon: FC<IconProps> = (props) => {
  return (
    <FontAwesome
      size={18}
      // style={{ marginBottom: -3 }}
      {...props}
    />
  );
};

interface SettingElementProps {
  title: string;
  icon?: ComponentProps<typeof FontAwesome>["name"];
  onPress?: () => void;
}

const SettingElement: FC<SettingElementProps> = (props) => {
  const { title, icon, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Icon name={icon ?? "chevron-right"} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.2,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});
