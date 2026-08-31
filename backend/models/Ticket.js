const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  userId: String,
  movie: String,
  location: String,
  theatre: String,
  timing: String,
  seats: Number,
  date: String
});

module.exports = mongoose.model("Ticket", TicketSchema);
