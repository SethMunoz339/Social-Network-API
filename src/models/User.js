const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove whitespace from both ends of a string
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
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought", // Reference to the Thought model for managing thoughts
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend", // Reference to the Friend model for managing friends
    },
  ],
});

// virtual friendCount
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
