const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const GuestEntry = require("./models/GuestEntry"); // Import Guest model

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// GET Guestbook Entries
app.get("/api/guestbook", async (req, res) => {
  const entries = await GuestEntry.find();
  res.json(entries);
});

// POST New Guestbook Entry
app.post("/api/guestbook", async (req, res) => {
  const { name, message } = req.body;
  const newEntry = new GuestEntry({ name, message });
  await newEntry.save();
  res.json(newEntry);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
