const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the title of the book"],
    },
    author: {
      type: String,
      required: [true, "Please enter the author of the book"],
    },
    genre: {
      type: String,
      required: [true, "Please enter the genre of the book"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the book"],
    },
    availableCopies: {
      type: Number,
      required: [true, "Please enter the number of available copies"],
      default: 0,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
