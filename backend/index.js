require("dotenv").config();  // Load environment variables first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();  // Initialize app

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Enable cross-origin requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes - Place after app is initialized
app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Campus Connect Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
