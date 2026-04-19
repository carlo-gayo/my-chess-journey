// src/api/axios.js
// Pre-configured Axios instance used by every page and component.
// Two things it does automatically:
//   1. Prepends http://localhost:5000/api to every request URL
//   2. Reads the saved JWT from localStorage and adds it as a Bearer token
//      header — so you never have to add Authorization manually
//
// Usage anywhere in the frontend:
//   import API from '../api/axios';
//   const { data } = await API.get('/posts');
//   const { data } = await API.post('/auth/login', { email, password });

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// ── Request interceptor ───────────────────────────────────────────────────
// Runs before EVERY request sent through this instance
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
