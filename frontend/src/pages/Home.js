import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Importing the external CSS
import { booksData } from "../data/booksData";

const Home = () => {
  const [hoveredLink, setHoveredLink] = useState("");

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink("");
  };

  return (
    <div className="home-container">
      <h1 className="home-header">Welcome to the Library</h1>
      <p className="home-subheader">Explore a wide collection of books!</p>
      <nav>
        <ul>
          <li>
            <Link
              to="/books"
              onMouseEnter={() => handleMouseEnter("Browse Books")}
              onMouseLeave={handleMouseLeave}
              className={hoveredLink === "Browse Books" ? "active-link" : ""}
            >
              Browse Books
            </Link>
          </li>
          <li>
            <Link
              to="/borrow-history"
              onMouseEnter={() => handleMouseEnter("Borrow History")}
              onMouseLeave={handleMouseLeave}
              className={hoveredLink === "Borrow History" ? "active-link" : ""}
            >
              Your Borrow History
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              onMouseEnter={() => handleMouseEnter("Manage Users")}
              onMouseLeave={handleMouseLeave}
              className={hoveredLink === "Manage Users" ? "active-link" : ""}
            >
              Manage Users
            </Link>
          </li>
        </ul>
      </nav>

      {/* Most Popular Books Section */}
      <div className="popular-books-section">
        <h2 className="popular-books-header">Most Popular Books</h2>
        <ul className="popular-books-list">
          {booksData.slice(0, 5).map((book, index) => (
            <li key={index} className="popular-book-item">
              <img src={book.image} alt={book.title} className="book-image" />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-genre">Genre: {book.genre}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
