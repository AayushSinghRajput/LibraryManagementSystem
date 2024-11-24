const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Add a new book (Admin only)
router.post("/", authMiddleware, addBook);

// Get all books (Admin and User)
router.get("/", getBooks);

// Get book details by ID (Admin and User)
router.get("/:id", getBookById);

module.exports = router;
