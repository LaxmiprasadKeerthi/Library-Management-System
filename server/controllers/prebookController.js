const Booking = require("../models/Booking");
const Book = require("../models/Book");

exports.prebook = async (req, res) => {
  const { bookId, validTill } = req.body;
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    const newBooking = new Booking({
      user: req.user.id,
      book: book._id,
      validTill,
    });

    await newBooking.save();
    res.status(201).json({ msg: "Book successfully pre-booked" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
