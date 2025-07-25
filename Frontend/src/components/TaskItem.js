import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskItem({ task, onDelete, onEdit }) {
  return (
    <ListItem
      divider
      secondaryAction={
        <Box>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => onEdit(task)}
            sx={{ mr: 1 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            color="error"
            onClick={() => onDelete(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemText
        primary={task.title}
        secondary={task.description}
      />
    </ListItem>
  );
}
