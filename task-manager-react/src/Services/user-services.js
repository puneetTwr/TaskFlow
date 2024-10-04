import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData);    
    localStorage.setItem("jwtToken", response.data.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const authenticateUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    localStorage.setItem("jwtToken", response.data.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
