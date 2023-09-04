const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
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
