const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Borrow", borrowSchema);
