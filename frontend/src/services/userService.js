// src/services/userService.js
import axios from "axios";

const API_URL = "/api/users"; // Adjust this to match your backend endpoint

// Fetch all users
const getUsers = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Add a new user
const addUser = async (userData) => {
  const response = await axios.post(`${API_URL}`, userData);
  return response.data;
};

// Delete a user
const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data;
};

// Get user details by ID
const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export default {
  getUsers,
  addUser,
  deleteUser,
  getUserById,
};
