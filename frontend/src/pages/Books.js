import React, { useState, useEffect } from "react";
import { booksData } from "../data/booksData"; // Import the static data
import "./Books.css"; // Import the CSS file for styling

const Books = ({ newBook }) => {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  // Load the initial static data and also update when a new book is added
  useEffect(() => {
    setBooks(booksData); // Load initial data
  }, []);

  // Add the new book to the list if provided
  useEffect(() => {
    if (newBook) {
      setBooks((prevBooks) => [...prevBooks, newBook]); // Update books list with the new book
    }
  }, [newBook]);

  // Handle issuing a book
  const handleIssue = (bookId) => {
    setIssuedBooks((prevIssued) => [...prevIssued, bookId]);
    alert("Book Issued!");
  };

  // Handle returning a book
  const handleReturn = (bookId) => {
    setIssuedBooks((prevIssued) => prevIssued.filter((id) => id !== bookId));
    alert("Book Returned!");
  };

  return (
    <div className="books-container">
      <h2 className="books-heading">Books List</h2>
      <ul className="books-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-genre">Genre: {book.genre}</p>
            <p className="book-published-date">
              Published Date: {book.publishedDate}
            </p>
            <div className="book-actions">
              {issuedBooks.includes(book.id) ? (
                <button
                  onClick={() => handleReturn(book.id)}
                  className="return-button"
                >
                  Return
                </button>
              ) : (
                <button
                  onClick={() => handleIssue(book.id)}
                  className="issue-button"
                >
                  Issue
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
