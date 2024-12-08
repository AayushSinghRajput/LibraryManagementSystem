const express = require("express");
const {
  loginUserController,
  logoutUserController,
  SignUserController,
} = require("../controllers/authController");

const loginRouter = express.Router();
const logoutRouter = express.Router();
const SignRouter = express.Router();
// Login route
loginRouter.post("/login", loginUserController);
//Logout route
logoutRouter.post("/logout", logoutUserController);
//signup route
SignRouter.post("/Sign", SignUserController);
module.exports = { loginRouter, logoutRouter, SignRouter };
