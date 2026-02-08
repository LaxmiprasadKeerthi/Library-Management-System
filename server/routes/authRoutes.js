const express = require("express");
const 
router = express.Router();
const User = require("../models/User");
const authController = require("../controllers/authController")

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    // Check if user with same email or username exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Create and save new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});


router.post("/login", authController.login)

module.exports = router;
