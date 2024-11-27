import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

const AddBook = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setpublishedDate] = useState("");
  const [genre, setgenre] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !publishedDate || !genre) {
      alert("Please fill out all fields");
      return;
    }

    const newBook = {
      id: Date.now(),
      title,
      author,
      genre,
      publishedDate,
    };

    addBook(newBook);
    setTitle("");
    setAuthor("");
    setpublishedDate("");
    setgenre("");
    alert("Book added successfully!");
    navigate("/books");
  };

  return (
    <div className="add-book-container">
      <h2 className="add-book-heading">Add Book</h2>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setgenre(e.target.value)}
          />
        </div>
        <div>
          <label>PublishedDate:</label>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setpublishedDate(e.target.value)}
          />
        </div>
        <button className="add-book-button" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
