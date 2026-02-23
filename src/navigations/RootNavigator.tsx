import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screen/Signup";
import AppNavigator from "./AppNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      
      {/* Login FIRST */}
      <Stack.Screen
        name="signup"
        component={RegisterScreen}
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