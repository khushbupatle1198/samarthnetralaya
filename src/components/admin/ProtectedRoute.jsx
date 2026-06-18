// components/admin/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  console.log('ProtectedRoute check - Token exists:', !!token);
  
  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;