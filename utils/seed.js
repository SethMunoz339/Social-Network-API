const mongoose = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");
const {
  getRandomUsername,
  getRandomEmail,
  getRandomPassword,
  getRandomThoughtText,
} = require("./data");

// MongoDB connection URI
const dbURI = "mongodb://localhost:27017/socialAPI";

// Number of users and thoughts to seed
const numUsers = 5;
const numThoughtsPerUser = 3;

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Connected to MongoDB");

    // Clear existing data (optional)
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed users
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      const user = new User({
        username: getRandomUsername(),
        email: getRandomEmail(),
        password: getRandomPassword(),
      });
      await user.save();
      users.push(user);
    }
    console.log("Seeded users:", users);

    // Seed thoughts for each user
    const thoughts = [];
    for (const user of users) {
      for (let i = 0; i < numThoughtsPerUser; i++) {
        const thought = new Thought({
          text: getRandomThoughtText(10), // Generate a random thought text
          user: user._id,
        });
        await thought.save();
        thoughts.push(thought);
      }
    }
    console.log("Seeded thoughts:", thoughts);

    // Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

// Call the seeding function
seedDatabase();
