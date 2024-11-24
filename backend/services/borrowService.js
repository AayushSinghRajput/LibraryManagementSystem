// services/borrowService.js

const Borrow = require("../models/Borrow"); // Assuming you have a Borrow model for MongoDB

// Example service function to borrow a book
const borrowBook = async (borrowData) => {
  try {
    const newBorrow = new Borrow(borrowData);
    await newBorrow.save();
    return newBorrow;
  } catch (error) {
    throw new Error("Error borrowing book");
  }
};

// Example service function to get all borrowed books
const getAllBorrows = async () => {
  try {
    const borrows = await Borrow.find(); // Fetching all borrowed books from the database
    return borrows;
  } catch (error) {
    throw new Error("Error fetching borrowed books");
  }
};

// Example service function to return a borrowed book
const returnBook = async (id) => {
  try {
    const borrow = await Borrow.findByIdAndDelete(id); // Deleting a borrowed record by ID
    return borrow;
  } catch (error) {
    throw new Error("Error returning book");
  }
};

module.exports = { borrowBook, getAllBorrows, returnBook };
