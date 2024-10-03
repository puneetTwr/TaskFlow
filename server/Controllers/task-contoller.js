const User = require("../models/User");
const Task = require("../models/Task");
const createTaskUsecase = require("../UseCases/Tasks/create-task");
const getAllTasksUsecase = require("../UseCases/Tasks/get-all-tasks");
const updateTaskUsecase = require("../UseCases/Tasks/update-task");


const createTask = async (req, res) => {
  try {
    res.status(201).json({
      message: "Task created successfully",
      data: await createTaskUsecase(req.body),
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async(req, res) => {
  try{
    res.status(201).json({
      message: "Task updated successfully",
      data: await updateTaskUsecase(req.body),
    });
  }catch(err){
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}
const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAllTasksUsecase(req.body.userId);
    res.json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask
};
