import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../services/api';
import { setToken, removeToken } from '../../utils/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const data = await login({ email, password });
      
      if (data && data.token) {
        setToken(data.token);
        toast.success('Login successful!');
        
        setTimeout(() => {
          navigate('/users');
        }, 300);
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <div className="input-group">
            <div className="input-icon">✉️</div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input-with-icon"
              autoComplete="email"
            />
          </div>
        </div>
        
        <div className="form-group">
          <div className="input-group">
            <div className="input-icon">🔒</div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="input-with-icon"
              autoComplete="current-password"
            />
          </div>
        </div>
        
        <div className="form-action">
          <button 
            type="submit" 
            className="btn-login" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                <span>Signing in...</span>
              </>
            ) : 'Sign In'}
          </button>
        </div>
      </form>
      
      <div className="credential-info">
        <div className="credential-info-header">
          <div className="credential-icon">🔑</div>
          <h3 className="credential-title">Demo Credentials</h3>
        </div>
        <div className="credential-details">
          <div className="credential-row">
            <div className="credential-label">Email:</div>
            <div className="credential-value">eve.holt@reqres.in</div>
          </div>
          <div className="credential-row">
            <div className="credential-label">Password:</div>
            <div className="credential-value">cityslicka</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 