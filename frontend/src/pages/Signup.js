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

    // Set loading to true
    setIsLoading(true);

    // Simulate async signup process (you can replace this with your actual API call)
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful!");
      setIsAuthenticated(true);
      navigate("/login"); // Redirect to login page
      setIsLoading(false); // Set loading to false after signup
    }, 1500); // Simulate a delay for the signup process
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
