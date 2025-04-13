import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUsers, deleteUser } from '../../services/api';
import UserEditModal from './UserEditModal';

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

const getIndianName = (id) => {
  const firstNameIndex = id % indianFirstNames.length;
  const lastNameIndex = (id * 2) % indianLastNames.length;
  return {
    first_name: indianFirstNames[firstNameIndex],
    last_name: indianLastNames[lastNameIndex]
  };
};

const UserList = ({ searchTerm = '', viewMode = 'table' }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getUsers(page);
      
      const usersWithIndianNames = response.data.map(user => {
        const indianName = getIndianName(user.id);
        return {
          ...user,
          first_name: indianName.first_name,
          last_name: indianName.last_name,
          original_first_name: user.first_name,
          original_last_name: user.last_name
        };
      });
      
      setUsers(usersWithIndianNames);
      setTotalPages(response.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        toast.success('User deleted successfully');
        
        // Client-side update: Remove user from the list
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleUpdateSuccess = (updatedUser) => {
    setShowEditModal(false);
    
    // Client-side update: Update the user in the list
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    
    toast.success('User updated successfully');
  };

  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderUserGrid = () => {
    if (filteredUsers.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">No users found</h3>
          <p className="empty-message">We couldn't find any users matching your search criteria.</p>
        </div>
      );
    }

    return (
      <div className="user-grid">
        {filteredUsers.map(user => (
          <div className="user-card-grid" key={user.id}>
            <div className="user-card-header-grid">
              <img src={user.avatar} alt={`${user.first_name}'s avatar`} className="avatar-grid" />
              <div className="user-status-badge">Active</div>
            </div>
            <div className="user-card-body-grid">
              <h3 className="user-name-grid">{user.first_name} {user.last_name}</h3>
              <p className="user-email-grid">{user.email}</p>
              <div className="user-meta-grid">
                <span className="user-id-grid">ID: {user.id}</span>
              </div>
            </div>
            <div className="user-card-actions-grid">
              <button
                className="action-btn edit-btn"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderUserTable = () => {
    return (
      <>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th style={{ width: '180px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>
                    No users found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img src={user.avatar} alt={`${user.first_name}'s avatar`} className="avatar" />
                    </td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{user.first_name} {user.last_name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>ID: {user.id}</div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(user)}
                          style={{ padding: '6px 12px', fontSize: '14px' }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(user.id)}
                          style={{ padding: '6px 12px', fontSize: '14px' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile view for table */}
        <div className="mobile-user-list">
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3 className="empty-title">No users found</h3>
              <p className="empty-message">We couldn't find any users matching your search criteria.</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div className="user-mobile-card" key={user.id}>
                <div className="user-mobile-header">
                  <img src={user.avatar} alt={`${user.first_name}'s avatar`} className="avatar" />
                  <div className="user-mobile-info">
                    <div className="user-mobile-name">{user.first_name} {user.last_name}</div>
                    <div className="user-mobile-email">{user.email}</div>
                  </div>
                </div>
                <div className="user-mobile-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <div className="user-list-container">
      <div className="info-card">
        <div className="info-card-icon">ℹ️</div>
        <div className="info-card-content">
          <h3 className="info-card-title">Reqres API Demo</h3>
          <p className="info-card-message">
            Since Reqres is a mock API, changes are not persisted on the server.
            Updates appear client-side only and reset on page refresh.
          </p>
        </div>
      </div>

      <div className="user-list-header">
        <div className="list-stats">
          <span className="stats-count">{filteredUsers.length} users</span>
          {searchTerm && <span className="stats-filter">Filtered by: "{searchTerm}"</span>}
        </div>
        <button className="btn-add-user">
          <span className="btn-icon">+</span>
          Add New User
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" style={{ width: '40px', height: '40px' }}></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? renderUserGrid() : renderUserTable()}

          {filteredUsers.length > 0 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default UserList; 