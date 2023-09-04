const User = require("../models/User");

// Add a friend to a user's friend list
exports.addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Check if the user and friend exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    // Check if the friend is not already in the user's friend list
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
      res.status(200).json({ message: "Friend added successfully" });
    } else {
      res
        .status(400)
        .json({ message: "Friend is already in the user's friend list" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a friend from a user's friend list
exports.removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the friend is in the user's friend list
    const friendIndex = user.friends.indexOf(friendId);

    if (friendIndex !== -1) {
      user.friends.splice(friendIndex, 1);
      await user.save();
      res.status(200).json({ message: "Friend removed successfully" });
    } else {
      res
        .status(400)
        .json({ message: "Friend is not in the user's friend list" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
