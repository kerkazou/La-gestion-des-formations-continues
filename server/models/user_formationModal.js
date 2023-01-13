const mongoose = require("mongoose");

const User_formation = mongoose.model(
  "User_formation",
  new mongoose.Schema({
    employee: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    formation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Formation"
      }
    ],
    status: {
      type: Boolean,
      default: true
    }
  })
);

module.exports = User_formation;