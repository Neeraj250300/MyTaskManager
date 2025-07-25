import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './pages/TaskListPage';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Sync token with localStorage when it changes (e.g., after login or logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
