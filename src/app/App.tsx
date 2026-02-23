
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootNavigator from "../navigations/RootNavigator";


const queryclient = new QueryClient()

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
       
            <QueryClientProvider client={queryclient}>
              <RootNavigator />
           </QueryClientProvider>
         
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
