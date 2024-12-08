const express = require("express");
const BorrowHistory = require("../models/Borrow");
const verifyToken = require("../middlewares/verifyToken");
const {
  getBooksController,
  addBookController,
} = require("../controllers/bookController");
const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  // res.json(booksData);
  res.json("/", getBooksController);
});
bookRouter.post("/", verifyToken, addBookController); //protect this route with token

bookRouter.post("/issue", verifyToken, async (req, res) => {
  const { userId, bookId } = req.body;
  // Issue book logic here
  res.status(200).json({ message: "Book issued successfully" });
});

bookRouter.post("/issue/:bookId", async (req, res) => {
  const { userId } = req.body;
  const { bookId } = req.params;

  try {
    const issuedBook = new BorrowHistory({ userId, bookId });
    await issuedBook.save();
    res.status(201).json({ message: "Book issued successfully", issuedBook });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to issue book", error: err.message });
  }
});

bookRouter.get("/borrow-history/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const borrowHistory = await BorrowHistory.find({ userId }).populate(
      "bookId"
    );
    res.status(200).json(borrowHistory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch borrow history", error: err.message });
  }
});
bookRouter.delete("/return/:bookId", async (req, res) => {
  const { userId } = req.body;
  const { bookId } = req.params;

  try {
    await BorrowHistory.findOneAndDelete({ userId, bookId });
    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to return book", error: err.message });
  }
});

module.exports = { bookRouter };
