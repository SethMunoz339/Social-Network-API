const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to create a new user
router.post("/users", userController.createUser);

// Route to get all users
router.get("/users", userController.getAllUsers);

// Route to get a single user by ID
router.get("/users/:userId", userController.getUserById);

// Route to update a user by ID
router.put("/users/:userId", userController.updateUser);

// Route to delete a user by ID
router.delete("/users/:userId", userController.deleteUser);

module.exports = router;
