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