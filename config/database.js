const mongoose = require("mongoose");

//MongoDB connection URI
const dbURI = "mongodb://localhost:27017/socialAPI";

// Mongoose connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

// Connect to the MongoDB database
mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Export the Mongoose connection
module.exports = mongoose.connection;
