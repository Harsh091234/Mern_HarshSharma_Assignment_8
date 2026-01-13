import mongoose, { Mongoose } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,

    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium"
    },

    dueDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },

    category: {
        type: String
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    reminderSent: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;