const express = require("express");
const router = express.Router();
const reactionController = require("../controllers/reactionController");

// Route to create a reaction to a thought
router.post(
  "/thoughts/:thoughtId/reactions",
  reactionController.createReaction
);

// Route to delete a reaction from a thought
router.delete(
  "/thoughts/:thoughtId/reactions/:reactionId",
  reactionController.deleteReaction
);

module.exports = router;
