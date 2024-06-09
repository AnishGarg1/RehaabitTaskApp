const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");

const userRoutes = require("./routes/User");

// Connecting to database
database.dbConnect();

dotenv.config(); // parsing .env file variables

// middlewares
app.use(express.json());

const port = process.env.PORT || 4000;

// routes
app.use("/api/v1/auth", userRoutes);

app.get("/", (req, res) => {
    res.send("Rehaabit Task App");
})

app.listen(port, () => {
    console.log(`App is listerning on port ${port}`);
})