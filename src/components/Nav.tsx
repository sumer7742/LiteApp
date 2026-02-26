import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { navLinks } from "../constant/Navlink";
import { useUser } from "../constant/Userprovider";

/* ---------------- TYPES ---------------- */

// Navigation screens
type RootStackParamList = {
  [key: string]: undefined;
};

// Navigation type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// User type
interface User {
  role?: string;
}

// Nav child type
interface NavChild {
  name: string;
  path: any;
  icon: string;
  visible?: string[];
}

// Nav item type
interface NavItem {
  name: string;
  path:any;
  icon: string;
  visible: string[];
  children?: NavChild[];
}

/* --------------------------------------- */

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const SIDEBAR_WIDTH = 260;

export default function PremiumSidebar() {

  const { logout, user } = useUser() as {
    logout: () => void;
    user: User | null;
  };
// console.log(user)
  const navigation = useNavigation<NavigationProp>();

  const [open, setOpen] = useState<boolean>(false);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const animation = useRef<Animated.Value>(new Animated.Value(0)).current;

  const toggleSidebar = (): void => {
    Animated.timing(animation, {
      toValue: open ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const toggleMenu = (name: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newSet = new Set(openMenus);
    newSet.has(name) ? newSet.delete(name) : newSet.add(name);
    setOpenMenus(newSet);
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-SIDEBAR_WIDTH, 0],
  });

  return (
    <View>
      {/* SIDEBAR */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX }] },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {(navLinks as NavItem[]).map((item) => {
            const hasChildren =
              item.children && item.children.length > 0;

            const visibleStatus =
              item.visible.includes(user?.role ?? "");

            const isOpenMenu =
              openMenus.has(item.name);

            return (
              visibleStatus && (
                <View key={item.name}>
                  {/* Parent Item */}
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      if (hasChildren) {
                        toggleMenu(item.name);
                      } else if (item.path !== "#") {
                        navigation.navigate(item.path);
                      }
                    }}
                  >
                    <Icon
                      name={item.icon}
                      size={22}
                      color="#E0F2F1"
                    />
                    <Text style={styles.menuText}>
                      {item.name}
                    </Text>

                    {hasChildren && (
                      <Icon
                        name={
                          isOpenMenu
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={20}
                        color="#E0F2F1"
                        style={{ marginLeft: "auto" }}
                      />
                    )}
                  </TouchableOpacity>

                  {/* Children */}
                  {hasChildren && isOpenMenu && (
                    <View style={styles.childContainer}>
                      {item.children
                        ?.filter(
                          (child) =>
                            !child.visible ||
                            child.visible.includes(
                              user?.role ?? ""
                            )
                        )
                        .map((child) => (
                          <TouchableOpacity
                            key={child.name}
                            style={styles.childItem}
                            onPress={() =>
                              navigation.navigate(child.path)
                            }
                          >
                            <Icon
                              name={child.icon}
                              size={18}
                              color="#B2DFDB"
                            />
                            <Text
                              style={styles.childText}
                            >
                              {child.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}
                </View>
              )
            );
          })}
        </ScrollView>
        <View style={styles.logoutContainer}>
  <TouchableOpacity
    style={styles.logoutButton}
    onPress={() => {
      logout(); // user clear
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }}
  >
    <Icon name="log-out" size={20} color="white" />
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
</View>
      </Animated.View>

      {/* HEADER */}
      <Animated.View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={toggleSidebar}
          >
            <Icon
              name="menu"
              size={28}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Lite
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    width: SIDEBAR_WIDTH,
    height: 800,
    backgroundColor: "#0D2B2F",
    paddingTop: 40,
    paddingHorizontal: 20,
    elevation: 10,
    marginTop: 50,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    color: "#E0F2F1",
    marginLeft: 15,
    fontSize: 16,
  },
  childContainer: {
    paddingLeft: 30,
  },
  childItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  childText: {
    color: "#B2DFDB",
    marginLeft: 10,
    fontSize: 14,
  },
  header: {
    height: 60,
    backgroundColor: "#081c1f",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
    color: "white",
  },
  logoutContainer: {
  borderTopWidth: 1,
  borderTopColor: "white",
  paddingTop: 15,
  marginBottom: 150,
},

logoutButton: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 12,
},

logoutText: {
  color: "white",
  marginLeft: 12,
  fontSize: 15,
  fontWeight: "500",
},
});