import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
              
      
        tabBarStyle: { backgroundColor: "white", height: 60 },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({focused , color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === "User") {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === "Profile") {
            return (
              <MaterialIcons
                name="category"
                
                size={size}
                color={color}
              />
            );
          }
          if (route.name === "Cart") {
            return (
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
    >
         {/* Search header ONLY on Home */}
     <Tab.Screen
  name="Home"
  component={Home}
  options={{headerShown:false}}
  
/>
 {/* <Tab.Screen name="Profile" component={ProfileScreen}options={{headerShown:false, tabBarLabel: "Category" }}/>
      <Tab.Screen name="User" component={UserScreen}options={{headerShown:false}} />
      <Tab.Screen name="Cart" component={CartScreen}options={{headerShown:false}} /> */}
    </Tab.Navigator>
  );
}