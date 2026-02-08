const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  "Book Name": { type: String, required: true },
  Author: { type: String, required: true },
  Description: { type: String },
  category: { type: String }
});

module.exports = mongoose.model("Book", BookSchema);
