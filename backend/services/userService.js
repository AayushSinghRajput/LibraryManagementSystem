// services/userService.js

const User = require("../models/User"); // Assuming you have a User model for MongoDB

// Example service function to register a user
const registerUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error registering user");
  }
};

// Example service function to get all users (Admin only)
const getAllUsers = async () => {
  try {
    const users = await User.find(); // Fetching all users from the database
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

// Example service function to get a user by ID
const getUserById = async (id) => {
  try {
    const user = await User.findById(id); // Fetching user by ID
    return user;
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

//Update user by ID
const updateUser = async (id, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

// Delete user by ID
const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return "User deleted successfully";
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
