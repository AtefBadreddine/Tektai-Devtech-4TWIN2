import React, { useContext } from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "./auth/useAuth";


const ProtectedRoute = ({ adminOnly}) => {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <Navigate to="/signin" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Outlet/>;
};

export default ProtectedRoute;
