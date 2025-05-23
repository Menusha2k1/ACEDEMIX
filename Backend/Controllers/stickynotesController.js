const Note = require('../Models/stickyNotes_Model');


//add note
exports.addNote = async (req, res) => {
    const { title, content, tags} = req.body;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }

    if (!content) {
        return res
        .status(400)
        .json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || []
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch (error) { 
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};

//edit note
exports.editNote = async (req, res) => {
    const noteId = req.params.noteId;
    const {title, content, tags, isPinned} = req.body;

    if(!title && !content && !tags){
        return res
            .status(400)
            .json({error: true, message: "No changes provided"});
    }

    try{
        const note = await Note.findOne({_id: noteId});

        if(!note){
            return res.status(404).json({error: true, message: "Note not found"});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (error){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};

// Get all Notes

exports.getallNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};

// Delete Notes
exports.deleteNote = async (req, res) => {

    const noteId = req.params.noteId;

    try{
        const note = await Note.findOne({_id: noteId});

        if(!note){
            return res.status(404).json({error: true, message: "Note not found"
            });
        }

        await Note.deleteOne({_id: noteId});

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};

// Update isPinned Value
exports.pinnedNote =  async (req, res) => {
    const noteId = req.params.noteId;
    const {isPinned} = req.body;

    try{
        const note = await Note.findOne({_id: noteId});

        if(!note){
            return res.status(404).json({error: true, message: "Note not found"});
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (error){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};

//search note
exports.searchNote = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Search query is required" });
    }

    try {
        const matchingNotes = await Note.find({
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};
 


