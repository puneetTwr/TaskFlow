const Task = require("../../models/Task");

const createTaskUsecase = async (taskData) => {
  try {
    const task = new Task(taskData);
    await task.save();
    return task;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = createTaskUsecase;
