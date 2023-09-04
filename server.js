const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const dbURI = process.env.DB_URI;
const port = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const thoughtRoutes = require("./routes/thoughtRoutes");
const reactionRoutes = require("./routes/reactionRoutes");
const friendRoutes = require("./routes/friendRoutes");

app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/friends", friendRoutes);

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost/social_network_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
