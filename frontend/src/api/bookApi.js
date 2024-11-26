// src/api/bookApi.js

// Function to fetch books from the backend
export const fetchBooks = async () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Use an environment variable for the base URL

  try {
    const response = await fetch(`${apiUrl}/api/books`); // Dynamically use the API URL
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Returns the fetched data
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error(
      "An error occurred while fetching the books. Please try again later."
    );
  }
};
