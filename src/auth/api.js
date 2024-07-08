/** @format */

import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/login/`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", response.data.token.access_token);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred. Please try again.");
  }
};

export const logout = () => {
  localStorage.removeItem("token"); 
};
