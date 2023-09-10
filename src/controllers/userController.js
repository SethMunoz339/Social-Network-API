const User = require("../models/User");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users with friendCount
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // Calculate friendCount for each user
    const usersWithFriendCount = await Promise.all(
      users.map(async (user) => {
        const friendCount = user.friends.length;
        const userObject = user.toObject(); // Convert to plain JavaScript object
        userObject.friendCount = friendCount;
        return userObject;
      })
    );

    res.status(200).json(usersWithFriendCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single user by ID with friendCount
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate friendCount for the user
    const friendCount = user.friends.length;
    const userObject = user.toObject(); // Convert to plain JavaScript object
    userObject.friendCount = friendCount;

    res.status(200).json(userObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
