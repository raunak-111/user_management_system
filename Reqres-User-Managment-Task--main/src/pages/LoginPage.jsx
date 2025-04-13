import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-left-panel">
        <div className="login-branding">
          <div className="login-logo">
            <div className="login-logo-icon">
              <span className="login-icon-pulse"></span>
              <span className="login-icon-inner">👤</span>
            </div>
            <h1 className="login-logo-text">User<span className="text-gradient">Hub</span></h1>
          </div>
          <p className="login-tagline">Next-gen user management platform</p>
        </div>
        
        <div className="login-features">
          <div className="login-feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">Simple user authentication</div>
          </div>
          <div className="login-feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">Comprehensive user management</div>
          </div>
          <div className="login-feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">Seamless data syncing</div>
          </div>
        </div>
        
        <div className="login-illustration">
          <div className="illustration-element el-1"></div>
          <div className="illustration-element el-2"></div>
          <div className="illustration-element el-3"></div>
          <div className="illustration-element el-4"></div>
        </div>
      </div>
      
      <div className="login-right-panel">
        <div className="login-form-container">
          <div className="login-header">
            <div className="login-mobile-branding">
              <div className="login-logo">
                <div className="login-logo-icon">
                  <span className="login-icon-pulse"></span>
                  <span className="login-icon-inner">👤</span>
                </div>
                <h1 className="login-logo-text">User<span className="text-gradient">Hub</span></h1>
              </div>
            </div>
            
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to access your dashboard</p>
          </div>
          
          <LoginForm />
          
          <div className="login-powered-by">
            <span>Powered by </span>
            <a href="https://reqres.in/" target="_blank" rel="noopener noreferrer" className="reqres-link">
              Reqres API
            </a>
          </div>
        </div>
        
        <div className="tech-info">
          <div className="tech-stack">
            <div className="tech-badge">React</div>
            <div className="tech-badge">Axios</div>
            <div className="tech-badge">React Router</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 