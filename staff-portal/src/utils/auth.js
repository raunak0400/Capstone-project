import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_BASE_URL = 'http://localhost:5000/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('staffUser');
    const savedToken = localStorage.getItem('staffToken');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('staffUser');
        localStorage.removeItem('staffToken');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/staff/auth/login`, {
        email,
        password
      });

      if (response.data.token) {
        const userData = {
          ...response.data.user,
          loginTime: new Date().toISOString()
        };
        
        // Store token and user data
        localStorage.setItem('staffToken', response.data.token);
        localStorage.setItem('staffUser', JSON.stringify(userData));
        
        setUser(userData);
        setLoading(false);
        return { success: true, user: userData };
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        return { success: false, message: 'Invalid credentials. Only authorized staff can access this portal.' };
      } else {
        return { success: false, message: 'Login failed. Please try again.' };
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('staffUser');
    localStorage.removeItem('staffToken');
  };

  const hasRole = (allowedRoles) => {
    if (!user) return false;
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    hasRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
