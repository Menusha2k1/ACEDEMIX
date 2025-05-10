require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const config = require("./config.json");
const mongoose = require("mongoose");
const Note = require("./Models/note.model");



mongoose.connect(config.connectionString);

const authRoutes = require("./Routes/userRoutes");
const quizRoutes = require("./Routes/quizRouter");
const pdfRoutes = require("./Routes/pdfRouter");



const app = express();

app.use('/api/quiz', quizRoutes);
app.use('/api/convert', pdfRoutes);



const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: "*" }));


app.use('/api/quiz', quizRoutes);

app.get("/", (req, res) => {
    res.json({data: "hello"});
});

const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./utilies");
const { title } = require("process");

//create account
app.use("/", authRoutes);



// ✅ Setup Socket.io for Real-Time Collaboration
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });
  
  let documentContent = "";
  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);
  
    // Load latest note from MongoDB
    const latestNote = await Note.findOne().sort({ updatedAt: -1 });
    documentContent = latestNote ? latestNote.content : "";
    console.log("Loaded document:", documentContent);
    socket.emit("load-document", documentContent);
  
    // Save changes to MongoDB & Broadcast to Users
    socket.on("send-changes", async (content) => {
      console.log("Received changes from client:", content);
  
  
      documentContent = content;
      socket.broadcast.emit("receive-changes", content);
      console.log("Broadcasting changes...");
  
      await Note.findOneAndUpdate({}, { content, updatedAt: Date.now() }, { upsert: true });
      console.log("Document updated in MongoDB");
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  //Add Note
app.post("/add-note", async (req, res) => {
    const { title, content, tags} = req.body;
  
    if (!title ) {
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
    } catch(error) {
      return res.status(500).json({ error: error.message });
    } 
    
  });
  
  //Edit Note
  app.put("/edit-note/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;
  
    
    if (!title && !content && !tags) {
      return res
             .status(400)
             .json({ error: "Title is required" });
    }
  
    try {
      const note = await Note.findByIdAndUpdate({_id: noteId
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
  });
  
  //Get All Notes
  app.get("/get-all-notes", async (req, res) => {
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
  });
  
  //Delete Note
  app.delete("/delete-note/:noteId", async (req, res) => {
    const { noteId } = req.params;
  
    try {
      const note = await Note.findByIdAndDelete({_id: noteId});
  
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
  });
  
  //Update isPinned value
  app.put("/update-note-pinned/:noteId", async (req, res) => {
    const  noteId = req.params.noteId;
    const { isPinned } = req.body;
  
  
  
    try {
      const note = await Note.findByIdAndUpdate({_id: noteId});
  
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
  });
  
  // ✅ Start Server on Port 8000
  server.listen(4000, () => console.log("🚀 Server running on port 8000"));
  
  

//app.listen(4000);


module.exports = app;
