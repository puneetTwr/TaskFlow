const Task = require("../../models/Task");

const getAllTasksUsecase = async (userId) => {
  try {
    const tasks = await Task.find({ userId });
    return tasks;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getAllTasksUsecase;
