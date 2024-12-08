// const authService = require("../services/authService");
const {
  loginUserService,
  logoutUserService,
  signUserService,
} = require("../services/authService");

// User Login
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== "String") {
    throw new Error("Invalid email format");
  }
  try {
    const user = await loginUserService({ email, password });
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//User Signup
const SignUserController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await signUserService({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User Signed up successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// User Logout
const logoutUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Handle logout logic here if using session-based authentication
    const user = await logoutUserService({ email, password });
    res.status(200).json({ message: "Logout successful", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  loginUserController,
  logoutUserController,
  SignUserController,
};
