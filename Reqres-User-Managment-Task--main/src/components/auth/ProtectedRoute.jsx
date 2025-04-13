import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      removeToken();
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 