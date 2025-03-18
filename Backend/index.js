require("dotenv").config();


const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const authRoutes = require("./Routes/userRoutes");

const express = require("express");
const cors = require("cors");
const app = express();



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
app.listen(8000);

module.exports = app;
