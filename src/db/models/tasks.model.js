const mongoose = require("mongoose");

const VALID_STATUSES = ["pending", "in-progress", "completed"];

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: VALID_STATUSES,
            default: "pending"
        },
        assigned_to: {
            type: String,
            default: ''
        },
        due_date: {
            type: Date
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Exporta como modelo
const Task = mongoose.model("Task", taskSchema);

module.exports = { Task, VALID_STATUSES };
