const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");

// Connecting to database
database.dbConnect();

dotenv.config(); // parsing .env file variables

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is listerning on port ${port}`);
})