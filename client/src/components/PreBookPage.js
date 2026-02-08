import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/PreBook.css"; // Optional, for styling

const PreBookPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch all books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setMessage("❌ Could not load books. Try again later.");
      }
    };

    fetchBooks();
  }, []);

  const handlePreBook = async (e) => {
    e.preventDefault();
  
    // Find the full book object using the selected book name
    const selected = books.find((book) => book["Book Name"] === selectedBook);
  
    if (!selected || !user) {
      setMessage("❌ Please select a book and ensure you are logged in.");
      return;
    }
  
    // Generate dates
    const bookedAt = new Date();
    const validTill = new Date();
    validTill.setDate(bookedAt.getDate() + 15); // 15 days later
  
    try {
      const response = await axios.post("http://localhost:5000/api/booking/prebook", {
        emailID: user.email,
        "Book Name": selected["Book Name"],
        Author: selected.Author,
        category: selected.category,
        bookedAt: bookedAt.toISOString().split("T")[0],   // e.g., 2025-04-16
        validTill: validTill.toISOString().split("T")[0], // e.g., 2025-04-18
        status: "Booked",
      });
  
      setMessage(`✅ ${response.data.message} | Booking ID: ${response.data.booking.bookId}`);
    } catch (err) {
      console.error("Pre-booking error:", err);
      setMessage("❌ Failed to pre-book. Please try again.");
    }
  };
  

  return (
    <div className="prebook-page">
      <h2>📚 Pre-Book a Book</h2>
      <form onSubmit={handlePreBook} className="prebook-form">
        <label htmlFor="book-select">Select a Book</label>
        <select
          id="book-select"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          required
        >
          <option value="">-- Choose a Book --</option>
          {books.map((book) => (
            <option key={book._id} value={book["Book Name"]}>
              {book["Book Name"]} — {book.Author}
            </option>
          ))}
        </select>

        <button type="submit" disabled={!user}>
          {user ? "Pre-Book Now" : "Login to Pre-Book"}
        </button>
      </form>

      {message && <div className="confirmation-message">{message}</div>}
    </div>
  );
};

export default PreBookPage;
