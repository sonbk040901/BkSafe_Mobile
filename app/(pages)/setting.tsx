import { View, StyleSheet, FlatList } from "react-native";
import { SettingElement, UserInfo } from "~components/setting";
import { useDispatch, useSelector } from "~redux/index";
import { logout } from "~redux/slice/auth";

function Setting() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  if (!user) return null;
  return (
    <View style={styles.container}>
      <UserInfo
        username={user.username}
        fullname={user.fullname}
        // avatar="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
      />
      <FlatList
        data={[
          { title: "Account", icon: "account" },
          { title: "Notification", icon: "bell" },
          { title: "Privacy", icon: "lock" },
          {
            title: "About",
            icon: "information",
          },
          {
            title: "Logout",
            icon: "logout",
            onPress: () => {
              dispatch(logout());
            },
          },
        ]}
        renderItem={({ item }) => (
          <SettingElement
            title={item.title}
            onPress={item.onPress}
          />
        )}
        keyExtractor={(item, i) => i.toString()}
        style={styles.settingList}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  settingList: {
    backgroundColor: "white",
    flex: 1,
  },
});
export default Setting;
