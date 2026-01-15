// frontend/src/App.js
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskControls from "./TaskControls";
import { useState, useEffect, useMemo } from "react";
import { 
  Container, 
  Typography, 
  CssBaseline,
  Box,
  Paper, // Our new layout component
  AppBar, // The header bar
  Toolbar,
  IconButton,
  CircularProgress // The loading spinner
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { fetchTasks } from "./api";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // For loading spinner
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false); // For dark mode

  // 1. Create our theme (light or dark)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  // 2. Fetch all tasks
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true); // Start loading
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        // You could add an error message here
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    loadTasks();
  }, [refresh]);

  const onRefresh = () => setRefresh(prev => prev + 1);

  // 3. Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(tasks.map(t => t.category));
    return ["all", ...uniqueCategories];
  }, [tasks]);

  // 4. Calculate displayed tasks
  const displayedTasks = useMemo(() => {
    const filteredTasks = tasks.filter(task => {
      if (filterCategory === "all") return true;
      return task.category === filterCategory;
    });

    const priorityMap = { High: 3, Medium: 2, Low: 1 };
    return filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0);
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [tasks, sortBy, filterCategory]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* 1. PROFESSIONAL HEADER (APPBAR) */}
     <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Smart Task Organizer
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        {/* 2. LAYOUT WRAPPER (PAPER) */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          
          <TaskForm onTaskAdded={onRefresh} />
          
          <TaskControls
            sortBy={sortBy}
            onSortChange={setSortBy}
            categories={categories}
            filterCategory={filterCategory}
            onFilterChange={setFilterCategory}
          />
          
          {/* 3. LOADING SPINNER */}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TaskList tasks={displayedTasks} onRefresh={onRefresh} />
          )}
        
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;