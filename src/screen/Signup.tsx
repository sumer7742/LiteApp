import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRegister, useVerifyOtp } from "../hooks/Signup";

const SignupScreen = ({ navigation }: any) => {

  const [userId, setUserId] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = useRegister();
  const verifyMutation = useVerifyOtp();

  const [form, setForm] = useState<any>({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    emailOtp: "",
    mobileOtp: "",
  });

  const [errors, setErrors] = useState<any>({});

  /* =============================
     CHANGE HANDLER
  ============================= */

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [key]: "",
    }));
  };

  /* =============================
     VALIDATION ⭐
  ============================= */

  const validateForm = () => {
    let newErrors: any = {};

    if (!form.fullName)
      newErrors.fullName = "Full name required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";

    if (!/^[0-9]{10}$/.test(form.mobile))
      newErrors.mobile = "Mobile must be 10 digits";

    if (!form.role)
      newErrors.role = "Select role";

    if (!form.password || form.password.length < 6)
      newErrors.password = "Password min 6 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =============================
     SUBMIT HANDLER
  ============================= */

  const handleSubmit = async () => {

    try {

      /* REGISTER FLOW */
      if (!userId) {

        if (!validateForm()) return;

        const payload = {
          email: form.email.trim(),
          fullName: form.fullName.trim(),
          mobile: form.mobile.trim(),
          password: form.password,
          role: form.role,
        };

        const res = await registerMutation.mutateAsync(payload);

        setUserId(res?.user_id || "temp-user");

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();

        return;
      }

      /* OTP VERIFY FLOW */

      if (!form.emailOtp)
        return setErrors({ emailOtp: "Email OTP required" });

      if (!form.mobileOtp)
        return setErrors({ mobileOtp: "Mobile OTP required" });

      const payload = {
        user_id: userId,
        emailOtp: form.emailOtp,
        mobileOtp: form.mobileOtp,
      };

      await verifyMutation.mutateAsync(payload);

      navigation.replace("Login");

    } catch (err: any) {
      console.log(err.message);
    }
  };

  /* =============================
     UI
  ============================= */

  const ErrorText = ({ msg }: any) =>
    msg ? <Text style={styles.errorText}>{msg}</Text> : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {userId ? "Verify OTP" : "Create Account"}
      </Text>

      {/* FULL NAME */}
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={form.fullName}
        onChangeText={(v) => handleChange("fullName", v)}
      />
      <ErrorText msg={errors.fullName} />

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />
      <ErrorText msg={errors.email} />

      {/* MOBILE */}
      <TextInput
        placeholder="Mobile"
        keyboardType="numeric"
        style={styles.input}
        value={form.mobile}
        onChangeText={(v) => handleChange("mobile", v)}
      />
      <ErrorText msg={errors.mobile} />

      {/* ROLE */}
      {!userId && (
        <>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={form.role}
              onValueChange={(v) => handleChange("role", v)}
            >
              <Picker.Item label="Select Role" value="" />
              <Picker.Item label="API User" value="API_USER" />
              <Picker.Item label="App User" value="APP_USER" />
              <Picker.Item label="Payout API User" value="PAYOUT_API_USER" />
              <Picker.Item label="Payout App User" value="PAYOUT_APP_USER" />
            </Picker>
          </View>
          <ErrorText msg={errors.role} />
        </>
      )}

      {/* PASSWORD */}
      {!userId && (
        <View style={{ position: "relative" }}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={form.password}
            onChangeText={(v) => handleChange("password", v)}
          />

          <Text
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </Text>
        </View>
      )}

      <ErrorText msg={errors.password} />

      {/* OTP SECTION */}
      {userId && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <TextInput
            placeholder="Email OTP"
            keyboardType="numeric"
            style={styles.input}
            value={form.emailOtp}
            onChangeText={(v) => handleChange("emailOtp", v)}
          />
          <ErrorText msg={errors.emailOtp} />

          <TextInput
            placeholder="Mobile OTP"
            keyboardType="numeric"
            style={styles.input}
            value={form.mobileOtp}
            onChangeText={(v) => handleChange("mobileOtp", v)}
          />
          <ErrorText msg={errors.mobileOtp} />
        </Animated.View>
      )}

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={registerMutation.isPending || verifyMutation.isPending}
      >
        {(registerMutation.isPending || verifyMutation.isPending) ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {userId ? "Verify OTP" : "Sign Up"}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
  onPress={() => navigation.navigate("login")}
  style={{ marginTop: 20 }}
>
  <Text style={{ textAlign: "center", color: "#185e91" }}>
    Already have an account? Login
  </Text>
</TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

/* =============================
   STYLE
============================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f5f7fb",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#123C82",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: "#fff",
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 6,
  },

  button: {
    backgroundColor: "#185e91",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },

  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
    fontSize: 18,
    color: "#555",
  },
});