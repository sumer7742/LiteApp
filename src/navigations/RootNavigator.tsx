import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SimpleDashboard from "../components/dashboard";
import CustomNavbar from "../components/Nav";
import Withdraw from "../components/Withdraw";
import LoginScreen from "../screen/Login";
import RegisterScreen from "../screen/Signup";
import AppNavigator from "./AppNavigation";
// navigation/types.ts

export type RootStackParamList = {
  signup: undefined;
  Login: undefined;
  SimpleDashboard: undefined;
  Tabs: undefined;
  Withdraw: {
    type: "Initial" | "Pending" | "Completed" | "Rejected";
    STATUS: "ALL" | "PENDING" | "SUCCESS" | "FAILED";
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login"
    
    screenOptions={{
        header: () => <CustomNavbar/>,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={AppNavigator}
        // options={{ headerShown: false }}
      />
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
        name="Withdraw"
        component={Withdraw}
      
      />
     
      

    </Stack.Navigator>
  );
}