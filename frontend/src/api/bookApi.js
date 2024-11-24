// src/api/bookApi.js

// Function to fetch books from the backend
export const fetchBooks = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/books"); // Replace with your actual backend API URL
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data; // Returns the fetched data
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
