import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Status.css";

const Status = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking/status")
      .then((res) => {
        // Filter only valid bookings (where emailID and status are not empty)
        const validBookings = res.data.filter(
          (b) => b.emailID && b.status && b.emailID.trim() !== "" && b.status.trim() !== ""
        );
        setBookings(validBookings);
      })
      .catch((err) => console.error("Failed to fetch booking status:", err));
  }, []);

  const formatToIndianDate = (isoDateStr) => {
    const date = new Date(isoDateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;

    return `${day}-${month}-${year} ${hour12}:${minutes} ${period}`;
  };

  return (
    <div className="status-container">
      <h2>📋 Booking Status</h2>
      <table className="status-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Booked At</th>
            <th>Valid Till</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  {bookings.map((b, i) => (
    <tr key={i}>
      <td data-label="Email">{b.emailID}</td>
      <td data-label="Book Name">{b["Book Name"]}</td>
      <td data-label="Author">{b.Author}</td>
      <td data-label="Category">{b.category}</td>
      <td data-label="Booked At">{formatToIndianDate(b.bookedAt)}</td>
      <td data-label="Valid Till">{formatToIndianDate(b.validTill)}</td>
      <td data-label="Status">{b.status}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default Status;
