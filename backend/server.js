const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const morgan = require("morgan");
// morgan can be used to log requests, errors, and more to the console.
const {
  SignRouter,
  loginRouter,
  logoutRouter,
} = require("./routes/authRoutes");
// Middlewares
const errorHandler = require("./middlewares/errorHandler");
dotenv.config(); // Load environment variables from .env file
// Create an Express app
const app = express();
// Database connection
(async () => await dbConnect())();
// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Logger middleware for requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// routes
app.use(SignRouter);
app.use(loginRouter);
app.use(logoutRouter);

// Error handling middleware (Should be the last middleware)
app.use(errorHandler);

// Default route for the server status
app.get("/", (req, res) => {
  res.send("Library Management System API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at  http://localhost:${PORT}`);
});
