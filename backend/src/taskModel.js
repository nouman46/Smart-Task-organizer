import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  dueDate: Date,
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
