import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/Login";
import AppNavigator from "./AppNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={AppNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}