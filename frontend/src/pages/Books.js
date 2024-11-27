import React, { useState, useEffect } from "react";
import "./Books.css";
import { useAuth } from "../context/AuthContext";

const Books = ({ books, setBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      alert("Book deleted successfully!");
    }
  };

  const handleSearch = () => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) setFilteredBooks(books);
  };

  const handleIssue = async (book) => {
    if (!user) return alert("Please log in to issue a book.");
    try {
      const response = await fetch("/api/borrow/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          bookId: book.id,
        }),
      });

      if (response.ok) {
        alert("Book issued successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to issue book.");
      }
    } catch (error) {
      alert("Error issuing book.");
    }
  };

  const handleReturn = async (book) => {
    if (!user) return alert("Please log in to return a book.");
    try {
      const response = await fetch("/api/borrow/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          bookId: book.id,
        }),
      });

      if (response.ok) {
        alert("Book returned successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to return book.");
      }
    } catch (error) {
      alert("Error returning book.");
    }
  };

  return (
    <div className="books-container">
      <div className="search-container">
        <h2>Books List</h2>
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className="books-list">
        {filteredBooks.map((book) => (
          <li key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre || "Not specified"}</p>
            <p>
              Published Date:{" "}
              {book.publishedDate
                ? new Date(book.publishedDate).toLocaleDateString()
                : "Unknown"}
            </p>
            <button onClick={() => handleIssue(book)}>Issue</button>
            <button onClick={() => handleReturn(book)}>Return</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
