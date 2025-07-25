import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, deleteTask, updateTask } from "../services/taskService";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

// MUI Components
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  List,
  Paper,
  Box,
} from "@mui/material";

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSave = async (task) => {
    if (task.id) {
      await updateTask(task.id, task);
    } else {
      await createTask(task);
    }
    setEditingTask(null);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Task Manager</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            {editingTask ? "Edit Task" : "Add Task"}
          </Typography>
          <TaskForm onSave={handleSave} editingTask={editingTask} />
        </Paper>

        <Paper sx={{ p: 2 }} elevation={2}>
          <Typography variant="h5" gutterBottom>
            Your Tasks
          </Typography>
          <List>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
}
