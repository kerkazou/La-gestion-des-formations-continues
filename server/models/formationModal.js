const mongoose = require("mongoose");

const Formation = mongoose.model(
  "Formation",
  new mongoose.Schema({
    name: String,
    dateDebut: Date,
    dateFin: Date,
    image: String,
    status: {
      type: Boolean,
      default: true
    }
  })
);

module.exports = Formation;