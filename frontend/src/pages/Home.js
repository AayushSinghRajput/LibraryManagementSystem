import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [hoveredLink, setHoveredLink] = useState("");

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink("");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Welcome to the Library
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        Explore a wide collection of books!
      </p>
      <nav>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <li>
            <Link
              to="/books"
              onMouseEnter={() => handleMouseEnter("Browse Books")}
              onMouseLeave={handleMouseLeave}
              style={{
                textDecoration: "none",
                color: hoveredLink === "Browse Books" ? "blue" : "black",
                fontSize: "1.2rem",
                transition: "color 0.3s",
              }}
            >
              Browse Books
            </Link>
          </li>
          <li>
            <Link
              to="/borrow-history"
              onMouseEnter={() => handleMouseEnter("Borrow History")}
              onMouseLeave={handleMouseLeave}
              style={{
                textDecoration: "none",
                color: hoveredLink === "Borrow History" ? "blue" : "black",
                fontSize: "1.2rem",
                transition: "color 0.3s",
              }}
            >
              Your Borrow History
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              onMouseEnter={() => handleMouseEnter("Manage Users")}
              onMouseLeave={handleMouseLeave}
              style={{
                textDecoration: "none",
                color: hoveredLink === "Manage Users" ? "blue" : "black",
                fontSize: "1.2rem",
                transition: "color 0.3s",
              }}
            >
              Manage Users
            </Link>
          </li>
        </ul>
      </nav>
      {hoveredLink && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            display: "inline-block",
          }}
        >
          <p>{`You are hovering over: ${hoveredLink}`}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
