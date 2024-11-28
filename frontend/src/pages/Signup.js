import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

const Sign = ({ setIsAuthenticated, isLoading, setIsLoading }) => {
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

    const newUser = {
      id: Date.now(), // Unique ID
      ...formData,
    };

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser)); // Save the logged-in user

    setIsLoading(true); // Simulate async process

    setTimeout(() => {
      alert("Signup successful!");
      setIsAuthenticated(true); // Mark user as authenticated
      navigate("/login"); // Redirect to the login page
      setIsLoading(false); // End loading state
    }, 1500); // Simulated delay
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Sign;
