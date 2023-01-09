const mongoose = require("mongoose");

const Organisme = mongoose.model(
  "Organisme",
  new mongoose.Schema({
    name: String,
    status: {
      type: Boolean,
      default: true
    }
  })
);

module.exports = Organisme;