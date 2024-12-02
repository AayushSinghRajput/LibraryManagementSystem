// backend/services/authService.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found')

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new Error('Invalid credentials')

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token };

};

const logoutUser = async (email) => {
  // Remove the user from the session
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  // Remove the user from the session
  await user.updateOne({ $unset: { session: "" } });
  return { message: "User logged out successfully" };
};

module.exports = { registerUser, loginUser, logoutUser };
