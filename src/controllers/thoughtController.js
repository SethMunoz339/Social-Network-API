const Thought = require("../models/Thought");
// Create a new thought
exports.createThought = async (req, res) => {
  try {
    const { text, userId } = req.body;

    // Create a new thought
    const thought = new Thought({ text, user: userId });
    await thought.save();

    res.status(201).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all thoughts
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate("user");
    res.status(200).json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single thought by ID
exports.getThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findById(thoughtId).populate("user");

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.status(200).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a thought by ID
exports.updateThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { text } = req.body;

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { text },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.status(200).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a thought by ID
exports.deleteThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;

    const thought = await Thought.findByIdAndRemove(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
