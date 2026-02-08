import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Admin.css";
import AddBook from "./AddBook"; // Make sure the path is correct

const AdminDashBoard = () => {
  const [books, setBooks] = useState([]);
  const [bookedCount, setBookedCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [preBookings, setPreBookings] = useState([]);
  const [showAddBook, setShowAddBook] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books"); // Corrected endpoint
        setBooks(res.data);
        setAvailableCount(res.data.length); // Total number of books in DB
      } catch (err) {
        console.error("Error fetching book data:", err);
      }
    };

    const fetchPreBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/get-all-prebooks");
        setPreBookings(res.data);
        const booked = res.data.length;
        setBookedCount(booked);
      } catch (err) {
        console.error("Error fetching pre-booking data:", err);
      }
    };

    fetchBooks();
    fetchPreBookings();
  }, []);

  const handleToggleAddBook = () => {
    setShowAddBook(!showAddBook);
  };

  return (
    <div className="admin-container">
      <h2>📚 Admin Book Dashboard</h2>

      <div className="summary">
        <div className="box booked">
          <h4>Booked Books</h4>
          <p>{bookedCount}</p>
        </div>
        <div className="box available">
          <h4>Available Books</h4>
          <p>{availableCount}</p>
        </div>
      </div>

      <button className="add-book-toggle-btn" onClick={handleToggleAddBook}>
        {showAddBook ? "Close Add Book Form" : "➕ Add New Book"}
      </button>

      {showAddBook && <AddBook />}

      <h3>📋 All Pre-Bookings</h3>
      <table className="books-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Booked At</th>
            <th>Valid Till</th>
          </tr>
        </thead>
        <tbody>
          {preBookings.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.emailID}</td>
              <td>{entry["Book Name"]}</td>
              <td>{entry.Author}</td>
              <td>{entry.category}</td>
              <td>{entry.status}</td>
              <td>{new Date(entry.bookedAt).toLocaleDateString()}</td>
              <td>{new Date(entry.validTill).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashBoard;
