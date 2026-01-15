// frontend/src/EditTaskModal.js
import { useState, useEffect } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Select, MenuItem, FormControl, InputLabel 
} from "@mui/material";
import { updateTask } from "./api";

export default function EditTaskModal({ task, open, onClose, onSave }) {
  // Internal state to manage the form fields
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Medium",
  });

  // When the 'task' prop changes, update the form's state
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        category: task.category || "",
        priority: task.priority || "Medium",
        // Note: We are not editing the dueDate here for simplicity
      });
    }
  }, [task]);

  // Handle changes to any form field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle the save button click
  const handleSave = async () => {
    if (!task) return;
    
    // Call the API to update the task
    await updateTask(task._id, formData);
    
    // Tell the parent components to refresh and close
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          type="text"
          fullWidth
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          margin="dense"
          label="Category"
          type="text"
          fullWidth
          variant="outlined"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px' }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}