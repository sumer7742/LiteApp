import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SimpleDashboard from "../components/dashboard";
import CustomNavbar from "../components/Nav";
import Withdraw from "../components/Withdraw";
import LoginScreen from "../screen/Login";
import RegisterScreen from "../screen/Signup";
import AppNavigator from "./AppNavigation";
<<<<<<< HEAD
import DepositListScreen from "../components/DepositNew";
const Stack = createNativeStackNavigator();
=======
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
>>>>>>> 245bf0af1bda2ac7e379f8f7857a34eec3adeb9c

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
<<<<<<< HEAD
        name="/payin/new"
        component={DepositListScreen}
      
      />

      {/* After login → Tabs */}
      <Stack.Screen
        name="Tabs"
        component={AppNavigator}
        // options={{ headerShown: false }}
=======
        name="Withdraw"
        component={Withdraw}
      
>>>>>>> 245bf0af1bda2ac7e379f8f7857a34eec3adeb9c
      />
     
      

    </Stack.Navigator>
  );
}