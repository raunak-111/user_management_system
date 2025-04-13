import axios from 'axios';

const API_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: API_URL
});

// Add authorization header for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const getUsers = async (page = 1) => {
  const response = await api.get(`/users?page=${page}`);
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    

    console.log('API update response:', response.data);
    
    return { success: true };
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    
    console.log('Delete response status:', response.status);
    
    return { success: response.status === 204 };
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
};

export default api; 