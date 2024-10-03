const Task = require("../../models/Task");

const updateTaskUsecase = async (taskData) => {
  try {
    const task = await Task.findById(taskData._id);
    if (!task) throw new Error("Task not found");
    Object.keys(taskData).forEach((key) => {
      task[key] = taskData[key];
    });
    await task.save();
    return task;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = updateTaskUsecase;
