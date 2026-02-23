import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useLoginHook } from "../hooks/useLogin";
import { getOrCreateDeviceId } from "../utils/device_id.utils";
import { saveToken } from "../utils/Token";
import { getToken } from "../utils/Token";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLoginHook();
const checkToken = async () => {
  const token = await getToken();
  console.log("TOKEN =>", token);

};
  const getLocation = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission required");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return location.coords;
  };

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Please enter email & password");
    return;
  }

  try {
    const deviceId = await getOrCreateDeviceId();
    const coords = await getLocation();

    const payload = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
      device_id: deviceId,
      latitude: Number(coords?.latitude) || 0,
      longitude: Number(coords?.longitude) || 0,
    };

    console.log("LOGIN PAYLOAD =>", payload); 

 mutate(payload, {
  onSuccess: async (res) => {   
    console.log("Login success:", res);

    await saveToken(res.token);  
    checkToken();              
  navigation.replace("Tabs");
    Alert.alert("Success", "Login Successfully");
  },

  onError: (error: any) => {
    console.log("Login error:", JSON.stringify(error , null , 2));
    Alert.alert(
      "Error",
      error?.response?.data?.message || "Login failed"
    );
  },
});
  } catch (error) {
    console.log("Login error:", error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});