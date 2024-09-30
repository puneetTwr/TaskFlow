const User = require("../../models/User");
const getAllUsersUsecase = require("../../UseCases/Users/get-all-users");
const createUserUsecase = require("../../UseCases/Users/create-user");
const authenticateUserUsecase = require("../../UseCases/Users/authenticate-user");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersUsecase();
    res.json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    res.status(201).json({
      message: "User created successfully",
      data: await createUserUsecase(req.body),
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authenticateUserUsecase(username, password);
    res.json({
      message: "Login successful",
      data: user,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Authorization header missing");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    res.json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  authenticateUser,
  getCurrentUser,
};
