const mongoose = require("mongoose");

const Organisme = mongoose.model(
  "Organisme",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Organisme;