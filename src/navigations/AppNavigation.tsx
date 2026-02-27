import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import SimpleDashboard from "../components/dashboard";
import Withdraw from "../components/Withdraw";
import MyAccount from "../screen/MyAccount";
import Payin from "../screen/Payin";

/* ================================
   TYPES ⭐
================================ */

export type TabParamList = {
  Dashboard: undefined;
  Payin: undefined;
  Withdraw: {
    type?: string;
    STATUS?: string;
  };
  User: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

/* ================================
   COMPONENT
================================ */

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "white",
          height: 60,
        },

        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",

        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {

          let iconName: any = "home-outline";

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          }

          if (route.name === "User") {
            iconName = focused ? "person" : "person-outline";
          }

          if (route.name === "Payin") {
            iconName = focused
              ? "arrow-down-circle"
              : "arrow-down-circle-outline";
          }

          if (route.name === "Withdraw") {
            iconName = focused
              ? "arrow-up-circle"
              : "arrow-up-circle-outline";
          }

          return (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
      })}
    >

      <Tab.Screen
        name="Dashboard"
        component={SimpleDashboard}
      />

      <Tab.Screen
        name="Payin"
        component={Payin}
      />

      <Tab.Screen
        name="Withdraw"
        component={Withdraw}
      />

      <Tab.Screen
        name="User"
        component={MyAccount}
        options={{
          tabBarLabel: "My Account",
        }}
      />

    </Tab.Navigator>
  );
}