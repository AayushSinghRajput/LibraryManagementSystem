import React, { useState } from "react";
import "./Sign.css";
import { useNavigate } from "react-router-dom";

const Sign = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const isDuplicateEmail = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some((user) => user.email === email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (isDuplicateEmail(formData.email)) {
      alert("This email is already registered. Please use a different email.");
      return;
    }

    // Save user data in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    setIsAuthenticated(true);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="sign-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="sign-form">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Sign;
