import React, { useState, useEffect } from 'react';
import UserList from '../components/users/UserList';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../utils/auth';

const UsersPage = ({ initialSearchTerm = '' }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const [currentView, setCurrentView] = useState('grid'); // 'grid' or 'table'
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setShowSearchOnMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleView = () => {
    setCurrentView(currentView === 'grid' ? 'table' : 'grid');
  };

  const toggleSearch = () => {
    setShowSearchOnMobile(!showSearchOnMobile);
  };
  
  return (
    <div className="dashboard-container">
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        {sidebarCollapsed ? '☰' : '✕'}
      </button>
      
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">👤</div>
            {!sidebarCollapsed && <h2 className="sidebar-logo-text">User<span className="text-highlight">Hub</span></h2>}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <div className="sidebar-menu">
          <div className="sidebar-menu-item active">
            <div className="menu-icon">👥</div>
            {!sidebarCollapsed && <span className="menu-text">Users</span>}
          </div>
          <div className="sidebar-menu-item">
            <div className="menu-icon">📊</div>
            {!sidebarCollapsed && <span className="menu-text">Dashboard</span>}
          </div>
          <div className="sidebar-menu-item">
            <div className="menu-icon">⚙️</div>
            {!sidebarCollapsed && <span className="menu-text">Settings</span>}
          </div>
        </div>
        
        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <div className="menu-icon">🚪</div>
            {!sidebarCollapsed && <span className="menu-text">Sign Out</span>}
          </button>
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {!sidebarCollapsed && <div className="" onClick={toggleSidebar}></div>}
      
      {/* Main content */}
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-title">
            <h1>User Management</h1>
            <p className="header-subtitle">Manage and organize your users</p>
          </div>
          
          <div className="mobile-header-actions">
            <button className="mobile-search-toggle" onClick={toggleSearch}>
              🔍
            </button>
            <button className="mobile-view-toggle" onClick={toggleView}>
              {currentView === 'grid' ? '📋' : '📊'}
            </button>
          </div>
          
          <div className={`header-search ${showSearchOnMobile ? 'mobile-show' : ''}`}>
            <div className="search-icon">🔍</div>
            <input 
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {showSearchOnMobile && (
              <button className="search-close" onClick={toggleSearch}>✕</button>
            )}
          </div>
          
          <div className="header-actions">
            <button className="view-toggle" onClick={toggleView}>
              {currentView === 'grid' ? '📋 Table View' : '📊 Grid View'}
            </button>
            <div className="user-profile">
              <div className="user-avatar">A</div>
              <div className="user-info">
                <div className="user-name">Admin</div>
                <div className="user-role">Administrator</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-content">
          <UserList searchTerm={searchTerm} viewMode={currentView} />
        </div>
      </div>
    </div>
  );
};

export default UsersPage; 