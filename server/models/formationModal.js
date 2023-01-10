const mongoose = require("mongoose");

const Formation = mongoose.model(
  "Formation",
  new mongoose.Schema({
    name: String,
    dateDebut: Date,
    dateFin: Date,
    image: String
  })
);

module.exports = Formation;