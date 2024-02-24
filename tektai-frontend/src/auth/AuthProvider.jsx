import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = async (email, password) => {
    // Perform your login logic here
    // Assuming login is successful and you receive a token
    const token = 'example_token'; // Replace with actual token
    setToken(token);
    localStorage.setItem('token', token);
    return token; // Return the token
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  const redirect = (url) => {
    // Redirect logic goes here
    console.log(`Redirecting to ${url}`);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, redirect }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
