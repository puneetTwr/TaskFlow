// routes/userRoutes.js
const express = require("express");
const { getAllUsers, createUser, authenticateUser, getCurrentUser } = require("../Controllers/user-controller");

const router = express.Router();


router.get("/", getAllUsers);
router.get("/me", getCurrentUser);

router.post("/signup", createUser);
router.post("/login", authenticateUser);

module.exports = router;
