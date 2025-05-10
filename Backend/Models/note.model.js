const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
  creadedOn: { type: Date, default: new Date().getTime() },
  updatedOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Note", NoteSchema);
