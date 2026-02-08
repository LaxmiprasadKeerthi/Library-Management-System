import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/PreBook.css";

const PreBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch books from DB when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data); // Make sure your backend sends an array of books
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setMessage("❌ Failed to load books.");
      }
    };

    fetchBooks();
  }, []);

  // Update selectedBook when user selects a book title
  useEffect(() => {
    const book = books.find((b) => b["Book Name"] === selectedBookTitle);
    setSelectedBook(book || null);
  }, [selectedBookTitle, books]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("❌ Please login to pre-book a book.");
      return;
    }

    if (!selectedBook) {
      setMessage("❌ Please select a valid book.");
      return;
    }

    const bookedAt = new Date();
    const validTill = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // valid for 7 days

    try {
      const response = await axios.post("http://localhost:5000/api/booking/prebook", {
        emailID: user.email,
        category: selectedBook.category,
        Author: selectedBook.Author,
        bookedAt,
        validTill,
        status: "Booked",
        "Book Name": selectedBook["Book Name"],
      });

      setMessage(`${response.data.message} 📚 ID: ${response.data.booking.bookId}`);
    } catch (err) {
      console.error("Pre-booking error:", err);
      setMessage("❌ Failed to pre-book. Try again later.");
    }
  };

  return (
    <div className="prebook">
      <h2>Pre-Book a Book</h2>
      <form onSubmit={handleSubmit} className="prebook-form">
        <label htmlFor="bookSelect">Select Book</label>
        <select
          id="bookSelect"
          value={selectedBookTitle}
          onChange={(e) => setSelectedBookTitle(e.target.value)}
          required
        >
          <option value="">-- Choose a Book --</option>
          <optgroup label="Technical Books">
            {books
              .filter((book) => book.category === "Technical Books")
              .map((book, index) => (
                <option key={index} value={book["Book Name"]}>
                  {book["Book Name"]}
                </option>
              ))}
          </optgroup>
          <optgroup label="Non-Technical Books">
            {books
              .filter((book) => book.category === "Non-Technical Books")
              .map((book, index) => (
                <option key={index} value={book["Book Name"]}>
                  {book["Book Name"]}
                </option>
              ))}
          </optgroup>
        </select>
        <button type="submit" disabled={!user}>
          {user ? "Pre-Book" : "Login to Pre-Book"}
        </button>
      </form>

      {message && <div className="confirmation-message">{message}</div>}
    </div>
  );
};

export default PreBook;
