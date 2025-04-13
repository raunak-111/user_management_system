
(function clearInitialToken() {
  localStorage.removeItem('token');
})();

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null && token !== '';
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const initAuth = () => {
  removeToken();
  return true; 
};

export const logout = () => {
  removeToken();
}; 