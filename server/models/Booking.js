const mongoose = require("mongoose");

// Utility function to convert JS Date to 'DD-MM-YYYY' format
function formatToIndianDate(date = new Date()) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

const bookingSchema = new mongoose.Schema({
  emailID: { type: String, required: true },
  "Book Name": { type: String, required: true },
  Author: { type: String, required: true },
  category: { type: String, required: true },
  bookedAt: { type: String, required: true },  // Indian format enforced
  validTill: { type: String, required: true }, // Indian format enforced
  status: { type: String, default: "Booked" },
});

// ✅ Pre-save middleware to enforce Indian date format
bookingSchema.pre("save", function (next) {
  if (this.bookedAt) {
    this.bookedAt = formatToIndianDate(new Date(this.bookedAt));
  }
  if (this.validTill) {
    this.validTill = formatToIndianDate(new Date(this.validTill));
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
