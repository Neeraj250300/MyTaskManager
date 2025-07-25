// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.19.222.66:8080', // your backend base URL
});

// Request interceptor to attach token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach JWT
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // force logout
    }
    return Promise.reject(error);
  }
);

export default instance;
