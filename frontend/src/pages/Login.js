import React, { useState } from "react";
import "./Login.css";
import { loginUser } from "../api/authApi";

const Login = ({ setIsAuthenticated, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
      login: "",
    });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email
    if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate password length
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      if (response) {
        setIsAuthenticated(true);
        setFormData({ email: "", password: "" }); //Reset form
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          login: response.error || "Invalid email or password.",
        }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        login: "An error occured. Please try again later.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        {errors.login && <p className="error-message">{errors.login}</p>}
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
