const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find(); // Get all books from MongoDB
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Failed to load books" });
  }
});

module.exports = router;

