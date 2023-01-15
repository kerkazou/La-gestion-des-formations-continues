const mongoose = require("mongoose");

const Formation = mongoose.model(
  "Formation",
  new mongoose.Schema({
    name: String,
    dateDebut: String,
    dateFin: String,
    image: String,
    status: {
      type: Boolean,
      default: true
    }
  })
);

module.exports = Formation;