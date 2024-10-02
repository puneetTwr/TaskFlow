// routes/userRoutes.js
const express = require("express");
const { createTask, getAllTasks } = require("../Controllers/task-contoller");
const authenticateToken = require("../Middlewares/authenticateToken");

const router = express.Router();


router.post("/", authenticateToken, createTask);
router.get("/", authenticateToken, getAllTasks);


module.exports = router;
