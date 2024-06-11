const express = require("express");
const { createTask, deleteTask, getAllTaskDetails, getTaskDetails } = require("../controllers/Task");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/createTask", auth, createTask);
router.get("/getTask", auth, getTaskDetails);
router.get("/getAllTasks", auth, getAllTaskDetails);
router.delete("/deleteTask", auth, deleteTask);

module.exports = router;