// backend/routes.js
import express from "express";
import Task from "./taskModel.js";
import { getSmartTaskDetails } from "../aiService.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();



// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task (MODIFIED)
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    // 1. Get smart details from AI
    const smartDetails = await getSmartTaskDetails(title);

    // 2. Create the new task object
    const taskData = {
      title,
      category: smartDetails.category,
      priority: smartDetails.priority,
      dueDate: smartDetails.dueDate,
      isCompleted: false, // Ensure default
    };

    // 3. Save to database
    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});


// Update task
router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

export default router;