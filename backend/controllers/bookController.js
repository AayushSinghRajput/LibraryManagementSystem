const bookService = require("../services/bookService");

const getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  const bookData = req.body;
  try {
    const book = await bookService.addBook(bookData);
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const issueBook = async (req, res) => {
  const { bookId } = req.body; // Get book ID from request body
  const userId = req.user.id; // Get user ID from the token (user is attached to req in the middleware)

  try {
    const book = await bookService.issueBook(bookId, userId);
    res.status(200).json({ message: "Book issued successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBooks, addBook, issueBook, getBookById };
