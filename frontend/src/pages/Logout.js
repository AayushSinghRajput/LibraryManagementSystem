import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth(); //Access logout from context
  const navigate = useNavigate();

  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout(); // Calls context logout
      navigate("/login");
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h1>Logout</h1>
        <p>Are you sure you want to log out?</p>
        <button onClick={confirmLogout} className="logout-button">
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
