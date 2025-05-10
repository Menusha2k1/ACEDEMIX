require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

try{
    mongoose.connect(config.connectionString);

}catch{

}

const authRoutes = require("./Routes/userRoutes");
const quizRoutes = require("./Routes/quizRouter");
const pdfRoutes = require("./Routes/pdfRouter");


const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use('/api/quiz', quizRoutes);
app.use('/api/convert', pdfRoutes);


app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({data: "hello"});
});

//create account
app.use("/", authRoutes);
app.listen(4000);

module.exports = app;
