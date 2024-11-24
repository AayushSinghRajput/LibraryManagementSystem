// src/pages/BorrowHistory.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const BorrowHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch borrowing history for the logged-in user (replace with actual API)
      const fetchHistory = async () => {
        const response = await fetch(`/api/borrow-history/${user.id}`);
        const data = await response.json();
        setHistory(data);
      };
      fetchHistory();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your borrow history.</p>;
  }

  return (
    <div>
      <h2>Your Borrow History</h2>
      <ul>
        {history.map((record) => (
          <li key={record._id}>
            <p>Book: {record.bookTitle}</p>
            <p>
              Borrowed on: {new Date(record.borrowDate).toLocaleDateString()}
            </p>
            <p>
              Returned on:{" "}
              {record.returnDate
                ? new Date(record.returnDate).toLocaleDateString()
                : "Not yet returned"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowHistory;
