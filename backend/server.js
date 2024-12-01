const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const morgan = require("morgan");

// Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const userRoutes = require("./routes/userRoutes");

// Middlewares
const errorHandler = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config(); // Load environment variables from .env file

// Create an Express app
const app = express();

// Database connection
 (async () => await dbConnect())();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Logger middleware for requests
app.use(cors({ origin: "http://localhost:3000" })); // Enable Cross-Origin Resource Sharing (CORS)

// API Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/books", bookRoutes); // Book routes
app.use("/api/borrow", authMiddleware, borrowRoutes); // Borrow book routes
app.use("/api/users", userRoutes); // User routes

// Error handling middleware (Should be the last middleware)
app.use(errorHandler);

// Default route for the server status
app.get("/", (req, res) => {
  res.send("Library Management System API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
