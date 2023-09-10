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

// Get all thoughts with thoughtCount
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate("user");

    // Calculate thoughtCount for each thought
    const thoughtsWithCount = await Promise.all(
      thoughts.map(async (thought) => {
        const thoughtCount = thought.reactionCount;
        const thoughtObject = thought.toObject(); // Convert to plain JavaScript object
        thoughtObject.thoughtCount = thoughtCount;
        return thoughtObject;
      })
    );

    res.status(200).json(thoughtsWithCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single thought by ID with thoughtCount
exports.getThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findById(thoughtId).populate("user");

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    // Calculate thoughtCount for the thought
    const thoughtCount = thought.reactionCount;
    const thoughtObject = thought.toObject(); // Convert to plain JavaScript object
    thoughtObject.thoughtCount = thoughtCount;

    res.status(200).json(thoughtObject);
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
