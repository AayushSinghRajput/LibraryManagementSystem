// src/api/borrowHistoryApi.js

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

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
