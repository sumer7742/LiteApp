import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useLogin from "../hooks/login";

export default function LoginScreen() {
  const { login, loading, error } = useLogin();

  const handleLogin = async () => {
    const data = await login({
      email: "kpranav612@gmail.com",
      password: "Puma5532#",
      latitude: 28.422441904482,
      longitude: 77.03712303600295,
      device_id: "d5c4f5d2-1aa9-4c76-a597-f349890bd884",
    });

    if (data) {
      console.log("SUCCESS:", data);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogin}>
        <Text>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>

      {error && <Text>{error}</Text>}
    </View>
  );
}