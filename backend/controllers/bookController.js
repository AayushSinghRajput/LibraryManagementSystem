const bookService = require("../services/bookService");
// import bookServie from "../services/bookService";

// Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a Book
const addBook = async (req, res) => {
  const bookData = req.body;
  try {
    const book = await bookService.addBook(bookData);
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await bookService.deleteBook(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get a Book by ID
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

module.exports = { getBooks, addBook, deleteBook, getBookById };
