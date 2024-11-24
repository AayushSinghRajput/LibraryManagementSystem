const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all users (Admin only)
router.get("/", authMiddleware, getAllUsers);

// Get user by ID (Admin only)
router.get("/:id", authMiddleware, getUser);

// Update user details (Self and Admin)
router.put("/:id", authMiddleware, updateUser);

//Delete user (Admin only)
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
