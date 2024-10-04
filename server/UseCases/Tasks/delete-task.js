const Task = require("../../models/Task");

const deleteTaskUsecase = async (taskId) => {
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) throw new Error("Task not found");
    return task;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = deleteTaskUsecase;
