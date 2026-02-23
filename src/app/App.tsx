<<<<<<< HEAD

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
=======
import React from "react";
>>>>>>> 0afa3c524585946f6568d7465239f34b25832eb2
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootNavigator from "../navigations/RootNavigator";

<<<<<<< HEAD

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
=======
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <RootNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
>>>>>>> 0afa3c524585946f6568d7465239f34b25832eb2
  );
}