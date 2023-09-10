const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the length of the text is between 1 and 280 characters
        return value.length >= 1 && value.length <= 280;
      },
      message: "Thought text must be between 1 and 280 characters",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  user: {
    type: String, // Change this to store the username as a string
    required: true,
  },
  reactions: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      emoji: {
        type: String,
      },
    },
  ],
});

//virtual reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
