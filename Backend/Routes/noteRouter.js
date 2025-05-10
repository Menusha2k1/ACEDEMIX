const express = require("express");
const noteController = require("../Controllers/noteController");

const router = express.Router();

router.post('/add-note' , noteController.createNote);
router.put('/edit-note/:noteId', noteController.editNote);
router.get('/get-all-notes' ,noteController.getAllNotes);
router.delete('/delete-note/:noteId', noteController.deleteNote);
router.put('/update-note-pinned/:noteId' , noteController.updateIsPinned);

module.exports = router;

