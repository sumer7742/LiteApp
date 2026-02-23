// import DeviceInfo from "react-native-device-info";
import Geolocation from "react-native-geolocation-service";

/* =====================================================
   DEVICE ID
===================================================== */

// export const getDeviceId = async (): Promise<string> => {
//   try {
//     let deviceId = await AsyncStorage.getItem("device_id");

//     if (!deviceId) {
//       deviceId = DeviceInfo.getUniqueIdSync();

//       await AsyncStorage.setItem("device_id", deviceId);
//     }

//     return deviceId;
//   } catch (error) {
//     console.log("Device ID Error:", error);
//     return "unknown-device";
//   }
// };

/* =====================================================
   LOCATION PERMISSION REQUIRED
===================================================== */

export const getLocation = async (): Promise<{
  latitude: number | null;
  longitude: number | null;
}> => {
  return new Promise((resolve) => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location Error:", error.message);
          resolve({
            latitude: null,
            longitude: null,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (error) {
      console.log("Geolocation Crash:", error);
      resolve({
        latitude: null,
        longitude: null,
      });
    }
  });
};

/* =====================================================
   LATITUDE HELPER
===================================================== */

export const getLatitude = async (): Promise<number | null> => {
  const location = await getLocation();
  return location.latitude;
};

/* =====================================================
   LONGITUDE HELPER
===================================================== */

export const getLongitude = async (): Promise<number | null> => {
  const location = await getLocation();
  return location.longitude;
};