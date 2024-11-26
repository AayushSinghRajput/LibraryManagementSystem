const mongoose = require("mongoose");

const borrowHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: String, required: true },
  issuedDate: { type: Date, default: Date.now },
});

const BorrowHistory = mongoose.model("BorrowHistory", borrowHistorySchema);

module.exports = BorrowHistory;
