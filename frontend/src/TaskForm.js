// frontend/src/TaskForm.js
import { useState } from "react";
import { addTask } from "./api";
import { TextField, Button, Box, Stack } from "@mui/material"; // Import components

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    
    await addTask({ title }); 
    
    onTaskAdded(true); // Tell App to refresh
    setTitle("");
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ marginBottom: "20px" }}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          label="What needs to be done?"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ whiteSpace: 'nowrap' }} // Prevents button text from wrapping
        >
          Add Smart Task
        </Button>
      </Stack>
    </Box>
  );
}