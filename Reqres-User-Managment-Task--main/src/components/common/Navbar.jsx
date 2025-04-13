import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const Navbar = ({ title, onSearchChange, searchTerm }) => {
  const navigate = useNavigate();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };
  
  return (
    <div className="navbar">
      <h3>{title || 'UserHub'} <span className="brand-highlight">Dashboard</span></h3>
      
      <div className={`search-bar ${showMobileSearch ? 'mobile-visible' : ''}`}>
        <div className="search-icon">🔍</div>
        <input 
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {showMobileSearch && (
          <button className="search-close-btn" onClick={toggleMobileSearch}>✕</button>
        )}
      </div>
      
      <div className="navbar-actions">
        <button className="mobile-search-btn" onClick={toggleMobileSearch}>
          🔍
        </button>
        <button className="nav-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar; 