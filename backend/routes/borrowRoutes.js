const express = require("express");
const router = express.Router();
const Borrow = require("../models/Borrow");

// Issue a book
router.post("/issue", async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    const borrowEntry = new Borrow({ bookId, userId });
    await borrowEntry.save();
    res.status(201).json({ message: "Book issued successfully", borrowEntry });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to issue book", error: error.message });
  }
});

// Return a book
router.post("/return", async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    const borrowEntry = await Borrow.findOneAndDelete({ bookId, userId });
    if (!borrowEntry) {
      return res.status(404).json({ message: "Borrow record not found" });
    }
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to return book", error: error.message });
  }
});

// Get borrow history for a user
router.get("/borrow-history/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const borrowHistory = await Borrow.find({ userId }).populate("bookId");
    res.status(200).json(borrowHistory);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch borrow history",
        error: error.message,
      });
  }
});

module.exports = router;
