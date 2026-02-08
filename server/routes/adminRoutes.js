const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Admin = require("../models/Admin");
const User = require("../models/User");
const PreBook = require("../models/PreBook");

// Route: POST /api/admin/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ Email: email });

    if (!admin || admin.Password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.Email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// Route: POST /api/admin/add-book
router.post("/add-book", async (req, res) => {
  const { "Book Name": bookName, Author, Description, category } = req.body;

  try {
    const existingBook = await Book.findOne({ "Book Name": bookName, Author });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists in the system." });
    }

    const newBook = new Book({
      "Book Name": bookName,
      Author,
      Description,
      category,
      status: "Available",
      bookedAt: "",
      validTill: ""
    });

    await newBook.save();
    res.status(201).json({ message: "✅ Book added successfully", book: newBook });
  } catch (error) {
    console.error("❌ Error adding book:", error);
    res.status(500).json({ message: "Server Error. Could not add book." });
  }
});

// Route: GET /api/admin/get-all-prebooks
router.get("/get-all-prebooks", async (req, res) => {
  try {
    // Fetch only prebooks with a valid email and non-empty status
    const prebookings = await PreBook.find({
      emailID: { $exists: true, $ne: "" },
      status: { $exists: true, $ne: "" }
    });

    const users = await User.find();

    // Create a map of users by email for quick lookup
    const userMap = {};
    users.forEach(user => {
      userMap[user.email] = user;
    });

    // Merge each prebook entry with its corresponding user details
    const mergedData = prebookings.map(prebook => {
      const user = userMap[prebook.emailID];
      return {
        ...prebook._doc,
        userDetails: user
          ? {
              id: user._id,
              username: user.username,
              email: user.email
            }
          : null
      };
    });

    res.status(200).json(mergedData);
  } catch (error) {
    console.error("❌ Error fetching prebook-user data:", error);
    res.status(500).json({ message: "Server error while fetching prebook data." });
  }
});

module.exports = router;
