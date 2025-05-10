const express = require("express");
const stickynoteController = require("../Controllers/stickynotesController");

const router = express.Router();

router.post('/add-note', stickynoteController.addNote);
router.put('/edit-note/:noteId', stickynoteController.editNote);
router.get('/get-all-notes', stickynoteController.getallNotes);
router.delete('/delete-note/:noteId', stickynoteController.deleteNote);
router.put('/update-note-pinned/:noteId', stickynoteController.pinnedNote);
router.get('/search-notes', stickynoteController.searchNote);

module.exports = router;