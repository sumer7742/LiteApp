

import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

import { getToken, removeToken } from "../utils/Token";
import { getOrCreateDeviceId } from "../utils/device_id.utils";

export const apiClient = axios.create({
  // baseURL: "http://localhost:3500/api/user",
  baseURL: "https://api.unibcomp.co.in/api/v1/user/",
  headers: {
    "Cache-Control": "no-cache",
  },
  timeout: 30000,
});

const serverHeaders = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const token = await getToken();
  const deviceId = await getOrCreateDeviceId();

  if (
    token &&
    config.url !== "login/" &&
    config.url !== "verify-otp/"
  ) {
    config.headers.Authorization = `Bearer ${token}`;

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
  }

  if (deviceId) {
    config.headers.DeviceId = deviceId;
  }

  return config;
};


const handle401Error = async (error: AxiosError) => {
  console.log("--------->",error?.message)
  if (error.response?.status === 401) {
    await removeToken();
    // optional: reset navigation / force logout
  }
  return Promise.reject(error);
};


apiClient.interceptors.request.use(
  serverHeaders,
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  handle401Error
);

export default apiClient;
