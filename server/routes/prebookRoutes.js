const express = require("express");
const router = express.Router();
const Prebook = require("../models/PreBook");

// Utility to auto-assign authors based on book name
const getAuthor = (bookName) => {
  const authors = {
    "Engineering Mechanics": "S Timoshenko",
    "Strength of Materials": "T.D.Gunneswara Rao,Mudimby Andal",
    "Control Systems of Engineering": "Nagrath and Gopal",
    "English for Engineering Students": "Kiran Publication",
    "Engineering Drawing and Graphics": "N D Bhatt",
    "SSC Multi Tasking Staff": "Arihant Experts",
  };
  return authors[bookName] || "Unknown Author";
};

const getCategory = (bookName) => {
  if (
    bookName.includes("Engineering") ||
    bookName.includes("Control") ||
    bookName.includes("Strength")
  ) {
    return "Technical Books";
  } else {
    return "Non-Technical Books";
  }
};

// ✅ GET all booking status
router.get("/status", async (req, res) => {
  try {
    const bookings = await Prebook.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching status", error: err });
  }
});

// ✅ POST - Pre-book a book (only emailID & Book Name are required)
router.post("/prebook", async (req, res) => {
  const { emailID, bookName } = req.body;

  if (!emailID || !bookName) {
    return res.status(400).json({
      message: "Missing required fields: emailID or Book Name.",
    });
  }

  const bookedAt = new Date();
  const validTill = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  const author = getAuthor(bookName);
  const category = getCategory(bookName);

  try {
    const newBooking = new Prebook({
      emailID,
      "Book Name": bookName,
      Author: author,
      category,
      bookedAt,
      validTill,
      status: "Booked",
    });

    await newBooking.save();

    const bookId = Math.floor(100000 + Math.random() * 900000); // 6-digit ID (for UI reference)

    res.status(201).json({
      message: "Book pre-booked successfully",
      booking: { ...newBooking._doc, bookId },
    });
  } catch (err) {
    console.error("Pre-book error:", err);
    res.status(500).json({ message: "Error while pre-booking", error: err });
  }
});

// ✅ GET - Fetch all bookings
router.get("/get-all-my-bookings", async (req, res) => {
  try {
    const bookings = await Prebook.find().sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err });
  }
});

// ✅ GET - Filter bookings by Book Name, Category, or Author
router.get("/filter", async (req, res) => {
  const { bookName, category, author } = req.query;
  const filter = {};

  if (bookName) filter["Book Name"] = new RegExp(bookName, "i");
  if (category) filter.category = new RegExp(category, "i");
  if (author) filter.Author = new RegExp(author, "i");

  try {
    const bookings = await Prebook.find(filter);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error filtering bookings", error: err });
  }
});

module.exports = router;
