import React, { useContext } from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "./auth/useAuth";


const ProtectedRoute = ({ adminOnly}) => {
  // const { token, user } = useAuth();
const user=JSON.parse(localStorage.getItem("user"))
const token=  localStorage.getItem("token")


  if (!token || !user) {
    return <Navigate to="/signin" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/NotAdmin" />;
  }

  return <Outlet/>;
};

export default ProtectedRoute;
