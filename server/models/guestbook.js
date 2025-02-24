// MongoDB
// Saves visitor name, message, and date.

const mongoose = require("mongoose");

// Set up the guestbook entry format
const GuestBookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Create a model so we can use it in the app
module.exports = mongoose.model("GuestBook", GuestBookSchema);