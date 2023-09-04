const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  reactions: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
      emoji: {
        type: String,
      },
    },
  ],
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
