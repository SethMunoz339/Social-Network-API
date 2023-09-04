const Thought = require("../models/Thought");

// Create a reaction to a thought
exports.createReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { userId, emoji } = req.body;

    // Check if the thought exists
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    // Create a new reaction
    thought.reactions.push({ userId, emoji });
    await thought.save();

    res.status(201).json({ message: "Reaction created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a reaction from a thought
exports.deleteReaction = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    // Check if the thought exists
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    // Find and remove the reaction by reactionId
    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction._id == reactionId
    );

    if (reactionIndex !== -1) {
      thought.reactions.splice(reactionIndex, 1);
      await thought.save();
      res.status(200).json({ message: "Reaction deleted successfully" });
    } else {
      res.status(404).json({ message: "Reaction not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
