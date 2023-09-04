const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

// Route to add a friend to a user's friend list
router.post("/users/:userId/friends/:friendId", friendController.addFriend);

// Route to remove a friend from a user's friend list
router.delete(
  "/users/:userId/friends/:friendId",
  friendController.removeFriend
);

module.exports = router;
