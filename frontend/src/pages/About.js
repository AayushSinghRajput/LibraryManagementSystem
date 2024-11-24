// src/pages/About.js
import React from "react";
import "./About.css"; // Import CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About the Library Management System</h2>
      <p className="about-text">
        Welcome to the Library Management System! Our system is designed to
        manage the library's book collection, track borrowed books, manage
        users, and provide various features to ensure smooth operation of the
        library.
      </p>
      <p className="about-subtext">
        The Library Management System includes functionalities such as:
      </p>
      <ul className="about-list">
        <li className="about-list-item">
          <span className="about-icon">📚</span> Manage Books: Add, update, and
          remove books.
        </li>
        <li className="about-list-item">
          <span className="about-icon">👥</span> User Management: Keep track of
          users and their borrowing history.
        </li>
        <li className="about-list-item">
          <span className="about-icon">📖</span> Borrow History: View users'
          borrowing activities.
        </li>
        <li className="about-list-item">
          <span className="about-icon">📊</span> Reports: Generate various
          reports for library management.
        </li>
      </ul>
      <p className="about-footer">
        Thank you for using our Library Management System!
      </p>
    </div>
  );
};

export default About;
