// frontend/src/api.js
import axios from "axios";

// CHANGE THIS LINE BACK:
export const API_URL = "http://localhost:5000/api/tasks"; 
// ^^^ (Was "/api/tasks" for Docker)

export const fetchTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// ... rest of the file is the same
export const addTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};