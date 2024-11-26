import React, { useState } from "react";
import "./Books.css";

const Books = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredBooks(books); // Reset to full book list if search input is empty
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered.length > 0 ? filtered : []);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      setFilteredBooks(books); // Reset to full book list as user clears the search
    }
  };

  return (
    <div className="books-container">
      <div className="search-container">
        <h2 className="books-heading">Books List</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {filteredBooks.length > 0 ? (
        <ul className="books-list">
          {filteredBooks.map((book) => (
            <li key={book.id} className="book-item">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-genre">Genre: {book.genre}</p>
              <p className="book-publishedDate">
                Published Date: {book.publishedDate}
              </p>
              <button
                className="issue-button"
                onClick={() =>
                  alert(`The book "${book.title}" has been issued!`)
                }
              >
                Issue
              </button>
              <button
                className="return-button"
                onClick={() =>
                  alert(`The book "${book.title}" has been returned!`)
                }
              >
                Return
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default Books;
