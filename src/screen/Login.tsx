import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import * as Location from "expo-location";
import { useLoginHook } from "../hooks/useLogin";
import { getOrCreateDeviceId } from "../utils/device_id.utils";
import { saveToken, getToken } from "../utils/Token";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      mutate(payload, {
        onSuccess: async (res) => {
          await saveToken(res.token);
          checkToken();
          navigation.replace("Tabs");
          Alert.alert("Success", "Login Successfully");
        },
        onError: (error: any) => {
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
    <View style={styles.safeArea}>
  <StatusBar barStyle="dark-content" />

  <View style={styles.container}>
    
    {/* Login Heading */}
   <Text style={styles.loginTitle}>Login</Text>

<Text style={styles.loginSubtitle}>
  Securely access your merchant account and manage payments with ease.
</Text>
      {/* Email */}
<Text style={styles.label}>Email ID</Text>
<TextInput
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  style={styles.input}
  keyboardType="email-address"
  autoCapitalize="none"
/>

{/* Password */}
<Text style={styles.label}>Password</Text>
<View style={styles.passwordContainer}>
  <TextInput
    placeholder="Enter your password"
    value={password}
    onChangeText={setPassword}
    style={styles.passwordInput}
    secureTextEntry={!showPassword}
  />

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Text style={styles.eyeText}>
      {showPassword ? "Hide" : "Show"}
    </Text>
  </TouchableOpacity>
</View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Google Sign In */}
        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={styles.googleText}> Sign in with Google</Text>
        </TouchableOpacity>

        {/* Sign Up Option */}
        <View style={styles.signupContainer}>
          <Text style={{ color: "#666" }}>
            Don’t have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("signup" as never)}
          >
            <Text style={styles.signupText}> Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loginTitle: {
  fontSize: 28,
  fontWeight: "bold",
  textAlign: "center",
  color: "#123C82",
  marginBottom: 6,
},

loginSubtitle: {
  textAlign: "center",
  color: "#6b7280",
  fontSize: 13,
  marginBottom: 28,
  paddingHorizontal: 10,
  lineHeight: 18,
},

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
loginHeading: {
  fontSize: 30,
  fontWeight: "bold",
  color: "#111",
  marginBottom: 6,
},

loginCondition: {
  fontSize: 14,
  color: "#666",
  marginBottom: 25,
},
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#111",
  },

  subHeading: {
    color: "#666",
    marginBottom: 30,
    fontSize: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 15,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 18,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
  },

  eyeText: {
    color: "#007bff",
    fontWeight: "600",
    fontSize: 13,
  },

  loginButton: {
    backgroundColor: "#185e91",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  orText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 13,
  },

  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  googleText: {
    fontWeight: "600",
    color: "#444",
    fontSize: 14,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  signupText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 14,
  },
});