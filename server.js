const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost/social_network_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose models and schemas (create User and Thought models)

// API Routes (create routes for users, thoughts, reactions, and friends)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
