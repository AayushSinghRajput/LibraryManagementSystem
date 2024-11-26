const borrowService = require("../services/borrowService");

// Borrow a Book
const borrowBook = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const borrowRecord = await borrowService.borrowBook(userId, bookId);
    res
      .status(201)
      .json({ message: "Book borrowed successfully", borrowRecord });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Return a Book
const returnBook = async (req, res) => {
  const { borrowId } = req.body;
  try {
    const updatedRecord = await borrowService.returnBook(borrowId);
    res
      .status(200)
      .json({ message: "Book returned successfully", updatedRecord });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Borrow History
const getBorrowHistory = async (req, res) => {
  try {
    const borrowHistory = await borrowService.getBorrowHistory(req.user.id); // Assuming req.user is set by auth middleware
    res.status(200).json(borrowHistory);
  } catch (error) {
    console.error("Error fetching borrow history:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { borrowBook, returnBook, getBorrowHistory };
