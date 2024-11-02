import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiConfig } from "../../config/apiConFig";

export const fetchAccessToken = async () => {
  try {
    // Attempt to retrieve the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found.");
    }
    // Return the retrieved access token
    return accessToken;
  } catch (error) {
    console.error("Error retrieving access token:", error);
    throw error; // Rethrow the error to handle it upstream
  }
};

export const refreshToken = async () => {
  try {
    // Retrieve the current refresh token from AsyncStorage
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token found.");
    }

    // Make a POST request to the refresh token endpoint
    const refreshTokenURL = `${apiConfig.api.baseUrl}${apiConfig.api.endpoints.tokenRefresh}`;

    const response = await fetch(refreshTokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    // Parse the JSON response to extract the new access token and refresh token
    const { accessToken, refreshToken: newRefreshToken } =
      await response.json();

    // Store the new access token and refresh token in AsyncStorage
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error; // Rethrow the error to handle it upstream
  }
};

export const invalidateToken = () => {
  // Implementation for invalidating access token
};

// function isTokenExpired(token) {
//   try {
//     // Split the token into its components
//     const [header, payload, signature] = token.split('.');

//     // Decode the payload from Base64Url to UTF-8
//     const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64Payload).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     // Parse the JSON payload as JSON
//     const payloadObj = JSON.parse(jsonPayload);

//     // Check if the token is expired || checks the exp claim against the current time.
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     if (payloadObj.exp && currentTime >= payloadObj.exp) {
//       return true;
//     }

//     return false;
//   } catch (error) {
//     console.error("Error decoding or parsing token:", error);
//     return true; // Assuming token is expired if there's any error during processing
//   }
// }

// // Usage example
// const token = "your_access_token_here";
// if (isTokenExpired(token)) {
//   console.log("Token is expired.");
// } else {
//   console.log("Token is still valid.");
// }

// import JSBase64 from "js-base64";
// import CryptoJS from "crypto-js";

// function isTokenExpired(token, secretKey) {
//   try {
//     // Split the token into its components
//     const [header, payload, signature] = token.split(".");

//     // Decode the header and payload from Base64Url to UTF-8
//     const base64Header = header.replace(/-/g, "+").replace(/_/g, "/");
//     const base64Payload = payload.replace(/-/g, "+").replace(/_/g, "/");
//     const headerJson = JSON.parse(
//       decodeURIComponent(JSBase64.decode(base64Header))
//     );
//     const payloadJson = JSON.parse(
//       decodeURIComponent(JSBase64.decode(base64Payload))
//     );

//     // Verify the signature
//     const hash = CryptoJS.HmacSHA256(
//       `${base64Header}.${base64Payload}`,
//       secretKey
//     ).toString();
//     if (hash !== signature) {
//       throw new Error("Invalid signature");
//     }

//     // Check if the token is expired
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     if (payloadJson.exp && currentTime >= payloadJson.exp) {
//       return true;
//     }

//     return false;
//   } catch (error) {
//     console.error("Error verifying or decoding token:", error);
//     return true; // Assuming token is expired if there's any error during processing
//   }
// }

// // Usage example
// const token = "your_access_token_here";
// const secretKey = "your_secret_key_here"; // Ensure this matches the key used to sign the token
// if (isTokenExpired(token, secretKey)) {
//   console.log("Token is expired or invalid.");
// } else {
//   console.log("Token is still valid.");
// }
