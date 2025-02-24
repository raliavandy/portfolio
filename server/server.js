// Backend
// Stores and gets guestbook messages from MongoDB.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const GuestBook = require("./models/guestbook"); // Import Guest model

const app = express(); // Create an Express app
const PORT = process.env.PORT || 5000; // Set the port (use .env if available)

// Middleware
app.use(cors());
app.use(express.json()); // Automatically turn JSON data into JavaScript objects

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // Use the secret MongoDB URL from .env
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Show all guestbook messages
app.get("/api/guestbook", async (req, res) => {
  try {
    const entries = await GuestEntry.find().sort({ createdAt: -1 }); // Get all saved guest messages from MongoDB & Sort by newest first
    res.json(entries); // Send the messages back to the frontend as a response
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Add a new guestbook message
app.post("/api/guestbook", async (req, res) => {
  try {
    const { name, message } = req.body; // Get the name and message from the request
    const newEntry = new GuestBook({ name, message }); // Create a new entry
    await newEntry.save(); // Save it in MongoDB
    res.json(newEntry); // Send back the saved entry
  } catch (error) {
    res.status(500).json({ error: "Could not save your message" }); 
  }
});

// Delete guestbook message
app.delete("/api/guestbook/:id", async (req, res) => {
  try {
    // Find the guestbook entry by its ID and delete it from the database
    await GuestEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete message" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
