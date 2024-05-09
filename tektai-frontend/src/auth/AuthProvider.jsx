import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import userService from "../services/userService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState( '');
  const navigate = useNavigate();
  const login = (access_token,loggedInUser) => {

    setToken(access_token);
    setUser(loggedInUser);
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));


  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  useEffect(() => {

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
       const loggedInUser =  await userService.getConnectedUser(token);
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      }
    }

    fetchUser();

  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
