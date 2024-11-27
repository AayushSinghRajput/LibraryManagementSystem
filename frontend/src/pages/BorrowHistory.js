import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./BorrowHistory.css";

const BorrowHistory = () => {
  const { user, token } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowHistory = async () => {
      try {
        const response = await axios.get(
          `/api/books/borrow-history/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBorrowedBooks(response.data);
      } catch (err) {
        console.error("Error fetching borrow history:", err.message);
      }
    };

    if (user) {
      fetchBorrowHistory();
    }
  }, [user, token]);
  return (
    <div className="borrow-history-container">
      <h2 className="borrow-history-heading">Your Borrowed Books</h2>
      {borrowedBooks.length > 0 ? (
        <ul className="borrow-history-list">
          {borrowedBooks.map((entry) => (
            <li key={entry._id} className="borrow-history-item">
              <h3 className="book-title">{entry.bookId.title}</h3>
              <p className="book-author">Author: {entry.bookId.author}</p>
              <p className="issued-date">
                Issued Date: {new Date(entry.issuedDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books have been borrowed yet.</p>
      )}
    </div>
  );
};

export default BorrowHistory;
