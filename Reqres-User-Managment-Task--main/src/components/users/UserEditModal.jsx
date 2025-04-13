import React, { useState, useEffect } from 'react';
import { updateUser } from '../../services/api';
import { toast } from 'react-toastify';

const indianFirstNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", 
  "Reyansh", "Ayaan", "Divya", "Neha", "Ananya", 
  "Diya", "Saanvi", "Rajesh", "Sunil", "Vikram"
];

const indianLastNames = [
  "Sharma", "Patel", "Singh", "Kumar", "Gupta", 
  "Verma", "Joshi", "Rao", "Malhotra", "Reddy", 
  "Kapoor", "Agarwal", "Shah", "Mehta", "Chopra"
];

const UserEditModal = ({
  user,
  show,
  onClose,
  onUpdateSuccess
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionType, setSuggestionType] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await updateUser(user.id, {
        first_name: firstName,
        last_name: lastName,
        email: email
      });
      
      const updatedUser = {
        ...user,
        first_name: firstName,
        last_name: lastName,
        email: email
      };
      
      onUpdateSuccess(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const selectName = (name, type) => {
    if (type === 'first') {
      setFirstName(name);
    } else {
      setLastName(name);
    }
    setShowSuggestions(false);
  };

  const showNameSuggestions = (type) => {
    setSuggestionType(type);
    setShowSuggestions(true);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <div className="modal-icon">✏️</div>
              <h2>Edit User</h2>
            </div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-user-preview">
            <img src={user.avatar} alt={`${user.first_name}'s avatar`} className="modal-avatar" />
            <div className="modal-user-info">
              <h3 className="modal-user-name">{user.first_name} {user.last_name}</h3>
              <p className="modal-user-email">{user.email}</p>
              <span className="modal-user-id">ID: {user.id}</span>
            </div>
          </div>
          
          <div className="modal-divider"></div>
          
          <div className="modal-body">
            <div className="modal-note">
              <p>Note: Since Reqres is a mock API, changes are client-side only and won't persist on the server.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-2-col">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      required
                      className="form-input"
                    />
                    <button 
                      type="button" 
                      className="input-button"
                      onClick={() => showNameSuggestions('first')}
                    >
                      Suggestions
                    </button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      required
                      className="form-input"
                    />
                    <button 
                      type="button" 
                      className="input-button"
                      onClick={() => showNameSuggestions('last')}
                    >
                      Suggestions
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="form-input"
                />
              </div>

              {showSuggestions && (
                <div className="suggestion-panel">
                  <div className="suggestion-header">
                    <h4>Select a {suggestionType === 'first' ? 'first' : 'last'} name</h4>
                    <button 
                      type="button" 
                      className="suggestion-close" 
                      onClick={() => setShowSuggestions(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="suggestion-list">
                    {(suggestionType === 'first' ? indianFirstNames : indianLastNames).map((name, index) => (
                      <button
                        key={index}
                        type="button"
                        className="suggestion-item"
                        onClick={() => selectName(name, suggestionType === 'first' ? 'first' : 'last')}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-save"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span>
                      <span>Saving...</span>
                    </>
                  ) : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal; 