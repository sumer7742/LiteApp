import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SimpleDashboard from "../components/dashboard";
import CustomNavbar from "../components/Nav";
import LoginScreen from "../screen/Login";
import RegisterScreen from "../screen/Signup";
import AppNavigator from "./AppNavigation";
import DepositListScreen from "../components/DepositNew";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login"
    
    screenOptions={{
        header: () => <CustomNavbar/>,
      }}
    >
      
      {/* Login FIRST */}
      <Stack.Screen
        name="signup"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
     <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
 
       <Stack.Screen
        name="SimpleDashboard"
        component={SimpleDashboard}
      
      />
       <Stack.Screen
        name="/payin/new"
        component={DepositListScreen}
      
      />

      {/* After login → Tabs */}
      <Stack.Screen
        name="Tabs"
        component={AppNavigator}
        // options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}