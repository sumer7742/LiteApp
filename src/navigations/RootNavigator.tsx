import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/Login";
import AppNavigator from "./AppNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      
      {/* Login FIRST */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* After login → Tabs */}
      <Stack.Screen
        name="Tabs"
        component={AppNavigator}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}