import axios from "axios";
import API_BASE_URL from "../config";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};