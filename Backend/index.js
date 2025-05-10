require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const config = require("./config.json");
const mongoose = require("mongoose");
const Note = require("./Models/note.model");

const app = express();

mongoose.connect(config.connectionString);
app.use(express.json());
app.use(cors());

//menusha
const authRoutes = require("./Routes/userRoutes");
const quizRoutes = require("./Routes/quizRouter");
const pdfRoutes = require("./Routes/pdfRouter");

//darren
const eventRoutes = require('./Routes/eventRouter');

//vishmi
const noteRouter = require('./Routes/noteRouter');

//menusha
app.use("/", authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/convert', pdfRoutes);

//darren
app.use('/api/events', eventRoutes)

//vishmi
app.use('/',noteRouter)



const server = http.createServer(app);


app.get("/", (req, res) => {
  res.json({ data: "hello" });
});







// ✅ Setup Socket.io for Real-Time Collaboration
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with '*' only for testing, not production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false
  },
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

// ✅ Start Server on Port 8000
server.listen(4000, () => console.log("🚀 Server running on port 4000"));





module.exports = app;
