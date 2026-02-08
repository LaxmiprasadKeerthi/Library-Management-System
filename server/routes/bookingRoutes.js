const express = require("express");
const router = express.Router();
const { prebookBook, getBookingStatus } = require("../controllers/statusController");

// Route to handle pre-booking
router.post("/prebook", prebookBook);

// Route to fetch all booking statuses
router.get("/status", getBookingStatus);

module.exports = router;

