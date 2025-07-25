// src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button
      color="inherit"
      onClick={handleLogout}
      sx={{ marginLeft: "auto" }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
