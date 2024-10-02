import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("Unauthorized");
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Task added successfully", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const getAllTasks = async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("Unauthorized");
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Tasks retrieved successfully", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

