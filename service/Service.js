import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://172.20.0.18:3001/api";

// Signup request
export const signup = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    await AsyncStorage.setItem("user_data", JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

// Login request
export const login = async (useremail, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { useremail, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(response.data);
    await AsyncStorage.setItem("user_data", JSON.stringify(response.data.data));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

export const updateData = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/update-data`, user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    await AsyncStorage.clear();
    await AsyncStorage.setItem("user_data", JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

export const getData = async () => {
  try {
    console.log("method called");
    const response = await fetch(`${API_URL}/get-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};
