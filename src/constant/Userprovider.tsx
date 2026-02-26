import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAdminDetails } from "../hooks/useAdmindetails";
import apiClient from "./ApiClient";

/* =====================================================
   🔹 TYPES
===================================================== */

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AdminDetailsResponse {
  success: boolean;
  data: User;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  login: (data: LoginResponse) => Promise<boolean>;
  logout: () => Promise<void>;
  refetch: () => void;
}

/* =====================================================
   🔹 CONTEXT
===================================================== */

const UserContext = createContext<UserContextType | undefined>(undefined);

/* =====================================================
   🔹 PROVIDER
===================================================== */

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const {
    data,
    refetch,
    isError,
    isLoading,
  } = useAdminDetails();


//   console.log(data)

  /* =====================================================
     🔥 Load Token On App Start
  ===================================================== */

  const loadToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        await refetch();
      }
    } catch (error) {
      console.log("Token load error:", error);
    } finally {
      setInitialLoading(false);
    }
  }, [refetch]);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  /* =====================================================
     🔥 Set User When API Returns Data
  ===================================================== */

  useEffect(() => {
    if (data?.success && data.data) {
      setUser(data.data);
    }
  }, [data,refetch]);

  /* =====================================================
     🔥 LOGIN
  ===================================================== */

  const login = async (data: LoginResponse): Promise<boolean> => {
    try {
      if (!data?.token) return false;

      await AsyncStorage.setItem("accessToken", data.token);

      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      setUser(data.user);

      return true;
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  };

  /* =====================================================
     🔥 LOGOUT
  ===================================================== */

  const logout = async (): Promise<void> => {
    try {
      await apiClient.post("/admin-auth/logOut/");
    } catch (error) {
      console.log("Logout API failed:", error);
    } finally {
      await AsyncStorage.removeItem("accessToken");
      delete apiClient.defaults.headers.common["Authorization"];
      setUser(null);
        window.location.reload(); 
    }
  };

 


  /* =====================================================
     🔹 CONTEXT VALUE
  ===================================================== */

  const value: UserContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: initialLoading || isLoading,
    isError,
    login,
    logout,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/* =====================================================
   🔹 CUSTOM HOOK
===================================================== */

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};