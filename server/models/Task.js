// models/user.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    category: {
      type: String,
    },
    color: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    // subtasks: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Subtask",
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
