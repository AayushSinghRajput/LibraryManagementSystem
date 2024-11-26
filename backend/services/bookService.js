const Book = require("../models/Book");
const User = require("../models/User");

const getAllBooks = async () => {
  return await Book.find();
};

const addBook = async (bookData) => {
  const newBook = new Book(bookData);
  return await newBook.save();
};

const getBookById = async (id) => {
  return await Book.findById(id);
};

const issueBook = async (bookId, userId) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.isIssued) {
    throw new Error("Book is already issued");
  }

  if (book.availableCopies <= 0) {
    throw new Error("No available copies left");
  }

  // Update book to mark it as issued
  book.isIssued = true;
  book.issuedTo = userId;
  book.availableCopies -= 1; // Reduce the available copies

  await book.save();

  // Optionally, you can add the issued book to the user's history
  const user = await User.findById(userId);
  user.borrowedBooks.push(bookId);
  await user.save();

  return book;
};

module.exports = { getAllBooks, addBook, getBookById, issueBook };
