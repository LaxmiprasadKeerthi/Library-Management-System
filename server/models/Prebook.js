const mongoose = require("mongoose");

const prebookSchema = new mongoose.Schema({
  emailID: String,
  category: String,
  Author: String,
  bookedAt: Date,
  validTill: Date,
  status: String,
  "Book Name": String,
});

module.exports = mongoose.model("Prebook", prebookSchema);
