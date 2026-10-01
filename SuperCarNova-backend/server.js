
const express = require("express");
const cors = require("cors");
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require("dotenv").config();

const app = express();

const connectDB = require("./config/db");

// Port
const PORT = process.env.PORT || 5000;

// --------------------
// Connect to MongoDB 
// --------------------

connectDB();

// --------------------
// Middleware
// --------------------

// Allow requests from frontend
app.use(cors());
// Allow JSON request bodies
app.use(express.json());
// Allow URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// --------------------
// Test Route
// --------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SuperCarNova API is running successfully",
  });
});

// --------------------
// Server
// --------------------

app.listen(PORT, () => {
  console.log(`SuperCarNova backend running on port ${PORT}`);
});