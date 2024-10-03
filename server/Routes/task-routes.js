// routes/userRoutes.js
const express = require("express");
const {
  createTask,
  getAllTasks,
  updateTask,
} = require("../Controllers/task-contoller");
const authenticateToken = require("../Middlewares/authenticateToken");

const router = express.Router();

router.post("/", authenticateToken, createTask);
router.put("/", authenticateToken, updateTask);
router.get("/", authenticateToken, getAllTasks);

module.exports = router;
