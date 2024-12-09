import React, { useState, useEffect } from "react";
import "./Books.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Books = ({ books, setBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [loading, setLoading] = useState(false);
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const authToken = localStorage.getItem("authToken");
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);
  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, books]);

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      alert("Book deleted successfully!");
    }
  };

  const handleIssue = async (book) => {
    if (!authUser || !authToken) {
      alert("Please log in to issue a book.");
      return;
    }
    // const token = localStorage.getItem("authToken");
    // if (!token) {
    //   alert("No token found. Please log in.");
    //   return;
    // }
    setLoading(true);
    try {
      const response = await fetch("/api/borrow/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, //Include token
        },
        body: JSON.stringify({ userId: user._id, bookId: book.id }),
      });
      if (response) {
        alert("Book issued successfully!");
        navigate("./borrow-history");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to issue book.");
      }
    } catch (error) {
      alert("Error issuing book. Please try again later.");
      console.error("Issue book error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (book) => {
    if (!authUser || !authToken) {
      alert("Please log in to return a book.");
      return;
    }
    // const token = localStorage.getItem("authToken");
    // if (!token) {
    //   alert("No token found. Please log in.");
    //   return;
    // }
    setLoading(true);
    try {
      const response = await fetch("/api/borrow/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, bookId: book.id }),
      });
      if (response) {
        alert("Book returned successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to return book.");
      }
    } catch (error) {
      alert("Error returning book. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="books-container">
      <div className="search-container">
        <h2>Books List</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      <ul className="books-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.id} className="book-item">
              <img
                className="book-image"
                src="https://i0.wp.com/apeejay.news/wp-content/uploads/2023/10/281023-10-most-read-books-Blog.jpg?resize=740%2C524&ssl=1"
                alt="book-image"
              ></img>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre || "Not specified"}</p>
              <p>
                Published Date:{" "}
                {book.publishedDate
                  ? new Date(book.publishedDate).toLocaleDateString()
                  : "Unknown"}
              </p>
              <button
                onClick={() => handleIssue(book)}
                disabled={loading}
                className="issue-button"
              >
                Issue
              </button>
              <button
                onClick={() => handleReturn(book)}
                disabled={loading}
                className="return-button"
              >
                Return
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="return-button"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>
    </div>
  );
};

export default Books;
