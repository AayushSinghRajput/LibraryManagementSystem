const authService = require("../services/authService");

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token } = await authService.loginUser(email, password);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User Logout
const logoutUser = async (req, res) => {
  try {
    // Handle logout logic here if using session-based authentication
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, registerUser, logoutUser };
