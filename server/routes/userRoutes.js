const express = require("express");
const router = express.Router();
const User = require("../models/User");
const PreBook = require("../models/PreBook");

// Fetch user profile using email (stored in localStorage on frontend)
router.get("/profile/:email", async (req, res) => {
  const { email } = req.params;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const preBookCount = await PreBook.countDocuments({ emailID: email });

    res.json({
      username: user.username,
      email: user.email,
      preBookCount,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
