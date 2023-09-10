const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  user: {
    type: String, // Change this to store the username as a string
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  thoughtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thought", // Reference to the Thought model
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
});

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
