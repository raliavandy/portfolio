const mongoose = require("mongoose");

const GuestEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GuestEntry", GuestEntrySchema);
