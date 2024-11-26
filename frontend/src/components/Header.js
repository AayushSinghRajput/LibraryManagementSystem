import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  // Persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="header">
      <h1 className="header__title">Library Management System</h1>
      <nav className="header__nav">
        <ul className={`header__nav-list ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" id="navlink1">
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" id="navlink2">
              Books
            </Link>
          </li>
          <li>
            <Link to="/users" id="navlink3">
              Users
            </Link>
          </li>
          <li>
            <Link to="/about" id="navlink4">
              About
            </Link>
          </li>
        </ul>
        <Link to="/signup">
          <button className="auth-button">Signup</button>
        </Link>
        <Link to="/login">
          <button className="auth-button">Login</button>
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
