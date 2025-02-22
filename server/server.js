const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables


const Project = require("./models/project"); // Import Project model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API route to get all projects from MongoDB
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from MongoDB
    res.json(projects);
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Default API Route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const manualDataProjects = async () => {
  await Project.create([
    { title: "Portfolio Website", description: "Built using React and Node.js" },
 ]);
  console.log("✅ Sample projects added!");
};

// Uncomment this to run it once
// manualDataProjects();
