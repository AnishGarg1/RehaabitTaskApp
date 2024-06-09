const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    title: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["In Progress", "Pending", "Completed"],
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    }
})

module.exports = new mongoose.model("Task", taskSchema);