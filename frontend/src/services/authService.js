// src/services/authService.js
import axios from "axios";

const API_URL = "/api/auth"; // Adjust this to match your backend endpoint

// Login function
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout function
const logout = () => {
  localStorage.removeItem("user");
};

// Get current user from localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};
