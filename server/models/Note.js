const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: String,
    title: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Note", noteSchema);
