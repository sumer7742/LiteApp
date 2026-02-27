import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { navLinks } from "../constant/Navlink";
import { useUser } from "../constant/Userprovider";

/* =============================
   TYPES ⭐
============================= */

type RootStackParamList = {
  Tabs: {
    screen?: string;
    params?: object;
  };
  Login: undefined;
  [key: string]: any;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface User {
  role?: string;
  name?: string;
  profileImage?: string;
}

interface NavChild {
  name: string;
  path: keyof RootStackParamList;
  icon: string;
  visible?: string[];
  screen?: string; // ⭐ Tabs support
}

interface NavItem {
  name: string;
  path: keyof RootStackParamList;
  icon: string;
  visible: string[];
  screen?: string;
  children?: NavChild[];
}

/* =============================
   PLATFORM FIX
============================= */

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/* =============================
   CONSTANTS
============================= */

const SIDEBAR_WIDTH = 300;
const HEADER_HEIGHT = 60;

/* =============================
   COMPONENT
============================= */

export default function PremiumSidebar() {

  const { logout, user } = useUser() as {
    logout: () => void;
    user: User | null;
  };

  const navigation = useNavigation<NavigationProp>();

  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  /* =============================
     MENU TOGGLE
  ============================= */

  const toggleMenu = (name: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newSet = new Set(openMenus);

    newSet.has(name) ? newSet.delete(name) : newSet.add(name);

    setOpenMenus(newSet);
  };

  /* =============================
     NAVIGATION ⭐ SAFE HANDLER
  ============================= */

  const handleNavigation = (item: NavItem) => {
    setOpen(false);

    if (item.path === "Tabs" && item.screen) {
      navigation.navigate("Tabs", {
        screen: item.screen,
      });
      return;
    }

    navigation.navigate(item.path as any);
  };

  return (
    <View style={{ flex: 1 }}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Icon name="menu" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Lite</Text>
      </View>

      {/* SIDEBAR MODAL */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalContainer}>

          {/* SIDEBAR */}
          <View style={styles.sidebar}>

            {/* PROFILE IMAGE */}
            <View style={styles.profileContainer}>
              <Image source={user?.profileImage ? { uri: user.profileImage } : { uri: "https://elitepg.co.in/assets/ElitePg.CR-KFz7v.jpg" }} style={styles.profileImage} />
            </View>

            {/* MENU LIST */}
            <ScrollView showsVerticalScrollIndicator={false}>

              {(navLinks as NavItem[]).map((item) => {

                const hasChildren =
                  item.children && item.children.length > 0;

                const visibleStatus =
                  item.visible.includes(user?.role ?? "");

                const isOpenMenu =
                  openMenus.has(item.name);

                if (!visibleStatus) return null;

                return (
                  <View key={item.name}>

                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        if (hasChildren) {
                          toggleMenu(item.name);
                          return;
                        }

                        if (item.path === "#") return;

                        handleNavigation(item);
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
                          name={isOpenMenu ? "chevron-up" : "chevron-down"}
                          size={20}
                          color="#E0F2F1"
                          style={{ marginLeft: "auto" }}
                        />
                      )}
                    </TouchableOpacity>

                    {/* CHILD MENU */}
                    {hasChildren && isOpenMenu && (
                      <View style={styles.childContainer}>
                        {item.children
                          ?.filter(
                            (child) =>
                              !child.visible ||
                              child.visible.includes(user?.role ?? "")
                          )
                          .map((child) => (
                            <TouchableOpacity
                              key={child.name}
                              style={styles.childItem}
                              onPress={() => {
                                setOpen(false);

                                if (child.path === "Tabs" && child.screen) {
                                  navigation.navigate("Tabs", {
                                    screen: child.screen,
                                  });
                                  return;
                                }

                                navigation.navigate(child.path as any);
                              }}
                            >


                              <Icon
                                name={child.icon}
                                size={18}
                                color="#B2DFDB"
                              />
                              <Text style={styles.childText}>
                                {child.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                      </View>
                    )}

                  </View>
                );
              })}

            </ScrollView>

            {/* LOGOUT */}
            <View style={styles.logoutContainer}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  logout();
                  setOpen(false);

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

          </View>

          <TouchableOpacity
            style={styles.overlayTouch}
            onPress={() => setOpen(false)}
          />

        </View>
      </Modal>
    </View>
  );
}

/* =============================
   STYLE
============================= */

const styles = StyleSheet.create({

  header: {
    height: HEADER_HEIGHT,
    backgroundColor: "#081c1f",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 10,
    zIndex: 9999,
  },

  headerTitle: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
    color: "white",
  },

  modalContainer: {
    flex: 1,
    flexDirection: "row",
  },

  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: "#0D2B2F",
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  profileImage: {
    width: 180,
    height: 90,
    resizeMode: "contain",
  },

  overlayTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
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

  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: "white",
    paddingTop: 15,
    marginBottom: 20,
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