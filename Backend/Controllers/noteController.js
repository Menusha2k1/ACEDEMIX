const Note = require("../Models/note.model");


//create note
exports.createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title and Content are required  " });
  }

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags,
    });
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

//edit note
exports.editNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;


  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: "Title is required" });
  }

  try {
    const note = await Note.findByIdAndUpdate({
      _id: noteId
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();


    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get all notes

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    return res.json({
      error: false,
      notes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete notes

exports.deleteNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findByIdAndDelete({ _id: noteId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update isPinned value

exports.updateIsPinned = async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;



  try {
    const note = await Note.findByIdAndUpdate({ _id: noteId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (isPinned) note.isPinned = isPinned || false;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


