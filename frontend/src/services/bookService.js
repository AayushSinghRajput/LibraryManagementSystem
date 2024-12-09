// src/services/bookService.js
import axios from "axios";
const API_URL = "/api/books"; // Adjust this to match your backend endpoint

// Fetch all books
const getBooks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

//issue a book
const issueBook = async (bookId, userId) => {
  const response = await axios.post(`${API_URL}/borrow/issue`, {
    bookId,
    userId,
  });
  return response.data;
};

// Borrow a book
const borrowBook = async (bookId, userId) => {
  const response = await axios.post(`${API_URL}/borrow`, { bookId, userId });
  return response.data;
};

// Return a book
const returnBook = async (bookId, userId) => {
  const response = await axios.post(`${API_URL}/borrow/return`, {
    bookId,
    userId,
  });
  return response.data;
};

export default {
  getBooks,
  issueBook,
  borrowBook,
  returnBook,
};
