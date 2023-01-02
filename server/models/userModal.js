const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    formation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Formation"
      }
    ],
    organisme: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisme"
      }
    ]
  })
);

module.exports = User;