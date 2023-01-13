const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    organisme: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisme"
      }
    ],
    status: {
      type: Boolean,
      default: true
    }
  })
);

module.exports = User;