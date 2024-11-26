import React from "react";
import "./Books.css";

const Books = ({ books }) => {
  return (
    <div className="books-container">
      <h2 className="books-heading">Books List</h2>
      {books.length > 0 ? (
        <ul className="books-list">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">Author: {book.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default Books;
