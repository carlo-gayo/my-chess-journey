// src/context/AuthContext.js
// Provides global authentication state to the entire React app.
// Any component or page can call useAuth() to access the current user,
// or call login() / logout().
//
// On app load: if a token exists in localStorage, it fetches /api/auth/me
// to restore the logged-in session automatically (no re-login needed on refresh).

import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

// ── Provider ──────────────────────────────────────────────────────────────
// Wrap the entire app with <AuthProvider> inside index.js
export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true); // prevents flash of wrong state

  // Restore session from localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.get('/auth/me')
        .then(res  => setUser(res.data))
        .catch(()  => localStorage.removeItem('token')) // token bad/expired
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // login: calls POST /api/auth/login, saves token, updates user state
  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data.user; // return so caller can check role and redirect
  };

  // logout: clears token and user from memory
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ── Custom hook ───────────────────────────────────────────────────────────
// const { user, login, logout } = useAuth();
export const useAuth = () => useContext(AuthContext);
