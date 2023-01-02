const mongoose = require("mongoose");

const Formation = mongoose.model(
  "Formation",
  new mongoose.Schema({
    name: String,
    duration: Number,
    image: String
  })
);

module.exports = Formation;