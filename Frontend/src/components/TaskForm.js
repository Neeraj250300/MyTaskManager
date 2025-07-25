import { useState, useEffect } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

export default function TaskForm({ onSave, editingTask }) {
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    } else {
      setForm({ title: "", description: "" });
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ title: "", description: "" });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editingTask ? "Edit Task" : "Add New Task"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          fullWidth
        />
        <TextField
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </Box>
    </Paper>
  );
}
