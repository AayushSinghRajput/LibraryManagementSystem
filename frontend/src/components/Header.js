import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="header">
      <h1 className="header__title">Library Management System</h1>
      <nav className="header__nav">
        <ul className={`header__nav-list ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
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
      </nav>
    </header>
  );
};

export default Header;
