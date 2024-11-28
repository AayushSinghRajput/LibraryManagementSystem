// src/api/borrowHistoryApi.js

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

//issue logic
export const issuehistory = async (userId, bookId, token) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/borrow/issue/${userId && bookId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch issue history");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching issue history:", error);
    throw new Error(
      error.message || "An error occurred while fetching issue history"
    );
  }
};

//return logic
export const returnhistory = async (userId, bookId, token) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/borrow/return/${userId && bookId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch return history");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching return history:", error);
    throw new Error(
      error.message || "An error occurred while fetching return history"
    );
  }
};

export const fetchBorrowHistory = async (userId, token) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/borrow/borrow-history/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch borrow history");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching borrow history:", error);
    throw new Error(
      error.message || "An error occurred while fetching borrow history"
    );
  }
};
