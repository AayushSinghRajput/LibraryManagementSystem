import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBook.css"; // Import the CSS file for styling

const AddBook = ({ addBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedDate: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (
      !formData.title ||
      !formData.author ||
      !formData.genre ||
      !formData.publishedDate
    ) {
      setError("All fields are required!");
      return;
    }

    setError(""); // Clear error message
    setLoading(true); // Start loading state

    // Simulate book addition process (could be an API call)
    const newBook = {
      ...formData,
      id: Date.now(), // Generate a unique ID for the book
    };

    // Simulate a delay for adding a book (like an API request)
    setTimeout(() => {
      addBook(newBook); // Pass the new book data to the parent component
      setLoading(false); // Stop loading state
      setSuccessMessage("Book added successfully!"); // Show success message

      // Clear form fields after adding the book
      setFormData({
        title: "",
        author: "",
        genre: "",
        publishedDate: "",
      });

      // Navigate to the Books page after adding the book
      setTimeout(() => {
        navigate("/books");
      }, 1000); // Delay navigation to show success message
    }, 1000); // Simulate network delay
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter book title"
          />
        </div>
        <div className="input-container">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Enter author's name"
          />
        </div>
        <div className="input-container">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            placeholder="Enter genre"
          />
        </div>
        <div className="input-container">
          <label htmlFor="publishedDate">Published Date</label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}{" "}
        {/* Display success message */}
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>

      {/* Optional: Display loading spinner */}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default AddBook;
