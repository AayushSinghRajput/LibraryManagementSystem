const express = require("express");
const {
  borrowBook,
  returnBook,
  getBorrowHistory,
} = require("../controllers/borrowController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Borrow a book
router.post("/borrow", authMiddleware, borrowBook);

// Return a book
router.post("/return", authMiddleware, returnBook);

// Get borrow history for a user
router.get("/", authMiddleware, getBorrowHistory);

module.exports = router;
