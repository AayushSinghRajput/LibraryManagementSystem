// src/api/bookApi.js

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch books`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error(
      error.message ||
        "An error occurred while fetching the books. Please try again later."
    );
  }
};
