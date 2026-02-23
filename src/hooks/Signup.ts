import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../constant/ApiClient";
import { getOrCreateDeviceId } from "../utils/device_id.utils";
import { getLocation } from "../utils/user";
/* =============================
   SANITIZE
============================= */

const sanitize = (value: any) =>
  value ? value.toString().trim() : "";

/* =============================
   ERROR PARSER
============================= */

const parseError = (error: AxiosError<any>) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error.message ||
    "Request failed"
  );
};

/* =============================
   REGISTER HOOK
============================= */

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: any) => {

      const cleanPayload = {
        email: sanitize(payload.email).toLowerCase(),
        fullName: sanitize(payload.fullName),
        mobile: sanitize(payload.mobile),
        password: sanitize(payload.password),
        role: payload.role || "user",
      };

      console.log("🔥 REGISTER PAYLOAD →", cleanPayload);

      const response = await apiClient.post(
        "register",
        cleanPayload
      );

      return response.data;
    },

    onError: (error: AxiosError<any>) => {
      alert(parseError(error))
      console.log("🔴 REGISTER ERROR →", parseError(error));
    },
  });
};

/* =============================
   VERIFY OTP HOOK ⭐
============================= */

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (payload: any) => {

      const device_id = await getOrCreateDeviceId();

      const location = await getLocation();

      const cleanPayload = {
        user_id: sanitize(payload.user_id),
        emailOtp: sanitize(payload.emailOtp),
        mobileOtp: sanitize(payload.mobileOtp),
        device_id: device_id,
        latitude: location.latitude || 0,
        longitude: location.longitude || 0,
      };

      console.log("🔥 VERIFY PAYLOAD →", cleanPayload);

      const response = await apiClient.post(
        "register/verify-otp",
        cleanPayload
      );

      return response.data;
    },

    onSuccess: async (data: any) => {
      console.log("✅ OTP VERIFIED →", data);

      if (data?.token) {
        await AsyncStorage.setItem("token", data.token);
      }
    },

    onError: (error: AxiosError<any>) => {
      console.log("❌ OTP VERIFY ERROR →", parseError(error));
    },
  });
};