import {} from "react-native";
import { Tabs } from "expo-router";
import { ComponentProps } from "react";
import { FontAwesome } from "@expo/vector-icons";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "Home",
};
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={21}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
export default function PageLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStatusBarHeight: 10,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      {screens.map((screenProps, index) => {
        const { tabBarIconName, options, ...other } = screenProps;
        const tabBarIcon = ({ color }: any) => (
          <TabBarIcon
            name={tabBarIconName || "code"}
            color={color}
          />
        );

        return (
          <Tabs.Screen
            key={index}
            options={{
              ...options,
              tabBarIcon,
            }}
            {...other}
          />
        );
      })}
    </Tabs>
  );
}
type ScreenProps = ComponentProps<typeof Tabs.Screen> & {
  tabBarIconName?: ComponentProps<typeof FontAwesome>["name"];
};
const screens: ScreenProps[] = [
  {
    name: "home",
    tabBarIconName: "home",
    options: {
      title: "Home",
    },
  },
  {
    name: "history",
    tabBarIconName: "history",
    options: {
      title: "History",
    },
  },
  {
    name: "notification",
    tabBarIconName: "bell",
    options: {
      title: "Notification",
    },
  },
  {
    name: "profile",
    tabBarIconName: "user",
    options: {
      title: "Profile",
    },
  },
  {
    name: "setting",
    tabBarIconName: "cog",
    options: {
      title: "Setting",
    },
  },
];
