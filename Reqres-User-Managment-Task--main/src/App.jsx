import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/common/Navbar';
import { isAuthenticated, initAuth } from './utils/auth';

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    initAuth();
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1500); // Short delay to show the loading screen
    
    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return (
      <div className="app-splash">
        <div className="splash-content">
          <div className="splash-logo">
            <div className="splash-logo-pulse"></div>
            <div className="splash-logo-icon">👤</div>
          </div>
          <h1 className="splash-title">User<span className="splash-highlight">Hub</span></h1>
          <div className="splash-tagline">User management platform</div>
          <div className="splash-loading">
            <div className="splash-loading-bar">
              <div className="splash-loading-progress"></div>
            </div>
            <div className="splash-loading-text">Loading application...</div>
          </div>
        </div>
      </div>
    );
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <Router>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {isAuthenticated() && (
        <Navbar 
          title="UserHub" 
          onSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />
      )}
      
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/users" /> : <LoginPage />} 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UsersPage initialSearchTerm={searchTerm} />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App; 