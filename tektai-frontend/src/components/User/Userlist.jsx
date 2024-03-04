import React, { useState, useEffect } from 'react';

import TableComponent from '../Tables/TableComponent';
import userService from "../../services/userService";
import {useAuth} from "../../auth/useAuth";
import { useNavigate } from 'react-router-dom';
const UserList = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to /signup route
  };
  return (
    <div>
      <h2>User List</h2>
      <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSignUpClick}
    >
      Add User
    </button>
      <TableComponent />
    </div>
  );
};

export default UserList;
