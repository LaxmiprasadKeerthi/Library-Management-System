const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// 1. Search books by name using regex - GET /api/books/search?query=SomeText
router.get("/search", async (req, res) => {
  const query = req.query.query || "";

  try {
    const regex = new RegExp("^" + query, "i"); // Starts with, case-insensitive
    const books = await Book.find({ "Book Name": { $regex: regex } });

    if (books.length === 0) {
      return res.json([{ "Book Name": "Not Found", Description: "Book not available in library." }]);
    }

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error. Unable to search books." });
  }
});

// 2. Get all books - GET /api/books/get-all-books
router.get("/get-all-books", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.json(allBooks);
  } catch (error) {
    console.error("Error fetching all books:", error);
    res.status(500).json({ message: "Failed to retrieve books" });
  }
});

// 3. Get book by name - GET /api/books/get-book-name/:bookName
router.get("/get-book-name/:bookName", async (req, res) => {
  const bookName = req.params.bookName;

  try {
    const book = await Book.find({ "Book Name": bookName });

    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book by name:", error);
    res.status(500).json({ message: "Failed to retrieve book" });
  }
});

// 4. Get books by category and author - GET /api/books/get-by-category-author?category=...&author=...
router.get("/get-by-category-author", async (req, res) => {
  const { category, author } = req.query;

  try {
    const query = {};
    if (category) query.category = category;
    if (author) query["Author"] = author;

    const books = await Book.find(query);

    if (books.length === 0) {
      return res.json([{ message: "No books found for given filters." }]);
    }

    res.json(books);
  } catch (error) {
    console.error("Error fetching books by category/author:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
