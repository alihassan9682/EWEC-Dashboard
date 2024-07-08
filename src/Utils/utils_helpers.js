/** @format */
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
});

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

export const fetchEntities = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    toast.error(error.response.data[0]);
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createEntity = async (url, formData) => {
  try {
    const response = await apiClient.post(url, formData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data[0]);
    console.error("Error submitting form:", error);
    throw error;
  }
};

export const deleteEntity = async (url, id) => {
  try {
    const response = await apiClient.delete(`${url}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateEntity = async (url, formData, id) => {
  try {
    const response = await apiClient.patch(`${url}${id}/`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating Data group:", error);
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

export const isExpired = (token) => {
  if (!token) {
    return true;
  }
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please login to access the system");
  } else {
    if (isExpired(token)) {
      toast.error("Session Expired! Please login again");
      localStorage.removeItem("token");
      return null;
    } else {
      return token;
    }
  }
};
