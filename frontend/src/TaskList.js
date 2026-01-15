// frontend/src/TaskList.js
import { useState } from "react";
import { updateTask, deleteTask } from "./api";
import { 
  List, ListItem, ListItemText, Checkbox, IconButton, Typography, Chip, Box 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditTaskModal from "./EditTaskModal";

export default function TaskList({ tasks = [], onRefresh }) {
  const [editingTask, setEditingTask] = useState(null);

  const toggleComplete = async (task) => {
    await updateTask(task._id, { isCompleted: !task.isCompleted });
    onRefresh();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    onRefresh();
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleModalClose = () => {
    setEditingTask(null);
  };

  const handleModalSave = () => {
    onRefresh();
  };

  // --- THIS IS THE UPDATED FUNCTION ---
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);

    // Get the time in UTC (the universal standard)
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();

    // Check if the time is our "noon UTC" default OR "midnight UTC"
    const isDefaultUtcTime = (utcHours === 12 && utcMinutes === 0) || (utcHours === 0 && utcMinutes === 0);

    if (isDefaultUtcTime) {
      // If it's the default time, just show the local date
      return date.toLocaleDateString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric'
      });
    } else {
      // If the user set a specific time, show the local date and time
      return date.toLocaleString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit'
      });
    }
  };
  // --- END OF UPDATED FUNCTION ---

  const getPriorityChip = (priority) => {
    let color = "default";
    if (priority === "High") color = "error";
    if (priority === "Medium") color = "warning";
    if (priority === "Low") color = "info";
    return <Chip label={priority} color={color} size="small" sx={{ mx: 1 }} />;
  };

  if (tasks.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
        No tasks to display.
      </Typography>
    );
  }

  return (
    <>
      <List>
        {tasks.map(task => (
          <ListItem 
            key={task._id} 
            divider
            sx={{ 
              bgcolor: 'background.paper', 
              borderRadius: 1, 
              mb: 1,
              opacity: task.isCompleted ? 0.6 : 1,
            }}
            secondaryAction={
              <Box>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => removeTask(task._id)} sx={{ ml: 1 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <Checkbox
              edge="start"
              checked={task.isCompleted}
              onChange={() => toggleComplete(task)}
            />
            <ListItemText
              primary={
                <Typography 
                  sx={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
                >
                  {task.title}
                </Typography>
              }
              secondary={
                <>
                  <Chip label={task.category} size="small" />
                  {getPriorityChip(task.priority)}
                  {task.dueDate && (
                    <Typography variant="caption" sx={{ ml: 1, color: 'primary.main' }}>
                      Due: {formatDate(task.dueDate)}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <EditTaskModal
        task={editingTask}
        open={Boolean(editingTask)}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </>
  );
}