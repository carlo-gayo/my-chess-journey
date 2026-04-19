// src/components/ProtectedRoute.js
// Guards pages from unauthorized access.
//
// Usage in App.js:
//   <ProtectedRoute>                 → any logged-in user
//   <ProtectedRoute role='admin'>    → admins only
//
// Not logged in  → redirects to /login
// Wrong role     → redirects to /home

import { Navigate } from 'react-router-dom';
import { useAuth }  from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to='/login' replace />;
  if (role && user.role !== role) return <Navigate to='/home' replace />;

  return children;
};

export default ProtectedRoute;
