const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // Use a regular expression to validate email format
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  // Add more fields as needed, e.g., profile picture, bio, etc.
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend", // Reference to the Friend model for managing friends
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
