

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { UserProvider } from "../constant/Userprovider";
import RootNavigator from "../navigations/RootNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#020202" }}>
          <RootNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}