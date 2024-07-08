/** @format */

import axios from "axios";
import toast from "react-hot-toast";
import { getToken } from "../../../Utils/utils_helpers";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
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
      const { data, status } = error.response;
      toast.error(data.message || `Request failed with status: ${status}`);
      console.error("Response Error:", error.response);
    } else if (error.request) {
      toast.error("No response received from server");
      console.error("Request Error:", error.request);
    } else {
      toast.error("Error setting up the request");
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const fetchDataGroups = async () => {
  try {
    const response = await apiClient.get("/api/datagroups/");
    return response.data;
  } catch (error) {
    console.error("Error fetching data groups:", error);
    throw error;
  }
};

export const signupUser = async (formData) => {
  try {
    const response = await apiClient.post("/api/auth/signup/", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating data group:", error);
    throw error;
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await apiClient.patch(`/api/users/${id}/`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating data group:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/api/users/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data group:", error);
    throw error;
  }
};
