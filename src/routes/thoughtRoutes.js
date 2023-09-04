const express = require("express");
const router = express.Router();
const thoughtController = require("../controllers/thoughtController");

// Route to create a new thought
router.post("/thoughts", thoughtController.createThought);

// Route to get all thoughts
router.get("/thoughts", thoughtController.getAllThoughts);

// Route to get a single thought by ID
router.get("/thoughts/:thoughtId", thoughtController.getThoughtById);

// Route to update a thought by ID
router.put("/thoughts/:thoughtId", thoughtController.updateThought);

// Route to delete a thought by ID
router.delete("/thoughts/:thoughtId", thoughtController.deleteThought);

module.exports = router;
