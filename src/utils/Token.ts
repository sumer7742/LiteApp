<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN_KEY = "userToken";

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};


export const setToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};


=======
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "user_token";

// save token
export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

// get token
export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

// remove token
export const removeToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
>>>>>>> 0afa3c524585946f6568d7465239f34b25832eb2
