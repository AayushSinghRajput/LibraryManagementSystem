const Book = require("../models/Book"); // Assuming you have a Book model for MongoDB

// Example service function to get all books
const getAllBooks = async () => {
  try {
    const books = await Book.find(); // Fetching all books from the database
    return books;
  } catch (error) {
    throw new Error("Error fetching books");
  }
};

// Example service function to add a new book
const addBook = async (bookData) => {
  try {
    const newBook = new Book(bookData);
    await newBook.save();
    return newBook;
  } catch (error) {
    throw new Error("Error adding new book");
  }
};

//Get a book by its ID
const getBookById = async (id) => {
  try {
    const book = await Book.findById(id);
    return book;
  } catch (error) {
    throw new Error("Error fetching book");
  }
};

//Delete a book
const deleteBook = async (id) => {
  try {
    const book = await Book.findByIdAndDelete(id);
    return book;
  } catch (error) {
    throw new Error("Error deleting book");
  }
};
module.exports = { getAllBooks, addBook, getBookById, deleteBook };
