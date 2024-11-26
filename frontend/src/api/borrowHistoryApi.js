// src/api/borrowHistoryApi.js

export const fetchBorrowHistory = async (userId) => {
  try {
    const response = await fetch(`/api/borrow-history/${userId}`);
    if (!response.ok) {
      // Extract error message from the response if available
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch borrow history");
    }
    const data = await response.json();
    return data; // Returns the borrow history data
  } catch (error) {
    console.error("Error fetching borrow history:", error);
    throw new Error(
      error.message || "An error occurred while fetching borrow history"
    );
  }
};
