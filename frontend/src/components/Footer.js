import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Library Management System. All rights
        reserved.
      </p>
      <p>
        Contact us: <a href="mailto:support@library.com">support@library.com</a>
      </p>
    </footer>
  );
};

export default Footer;
