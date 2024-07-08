/** @format */

import axios from "axios";
import { getToken } from "../../../Utils/utils_helpers";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
});

// Request interceptor to add authorization header with token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response Error:", error.response);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/api/users/");
    return response.data;
  } catch (error) {
    toast.error(response.detail)
    console.error("Error fetching users:", error);
    throw error;
  }
};
