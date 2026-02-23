import { AxiosError } from "axios";
import { useState } from "react";
import apiClient from "../constant/ApiClient";

interface LoginPayload {
  email: string;
  password: string;
  latitude: number;
  longitude: number;
  device_id: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

export default function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    payload: LoginPayload
  ): Promise<LoginResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.post<LoginResponse>(
        "/user/login",
        payload
      );

      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      console.log(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message || "Something went wrong"
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}