const Prebook = require("../models/PreBook");

// Utility function to format date to 'DD-MM-YYYY'
const formatToIndianDate = (date = new Date()) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

// Pre-book a book
exports.prebookBook = async (req, res) => {
  const {
    emailID,
    category,
    Author,
    bookedAt,
    validTill,
    status,
    "Book Name": bookName,
  } = req.body;

  if (!emailID || !bookName) {
    return res
      .status(400)
      .json({ message: "Email ID and Book Name are required" });
  }

  const bookedDate = bookedAt ? new Date(bookedAt) : new Date();
  const validDate = validTill ? new Date(validTill) : new Date();

  const newBooking = new Prebook({
    emailID,
    category,
    Author,
    bookedAt: bookedDate,
    validTill: validDate,
    status: status || "Booked",
    "Book Name": bookName,
  });

  try {
    const booking = await newBooking.save();

    const bookingWithId = {
      ...booking._doc,
      bookId: Math.floor(Math.random() * 1000000),
    };

    res.status(200).json({
      message: "Book pre-booked successfully!",
      booking: bookingWithId,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Booking failed!", error: err.message || err });
  }
};


// Get all booking statuses
exports.getBookingStatus = async (req, res) => {
  try {
    const bookings = await Prebook.find({});
    res.json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: err.message || err });
  }
};
