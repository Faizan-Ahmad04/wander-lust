const express = require("express")
const mongoose = require("mongoose");

const app = express();

const PORT = 8000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/venderDB").then(()=>console.log("Connected to MongoDB")).catch((err)=> console.log("Error while connecting to MongoDB", err))

app.listen(PORT, ()=> console.log(`server listening on port ${PORT}`));