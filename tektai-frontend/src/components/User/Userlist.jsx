import React, { useState, useEffect } from 'react';

import TableComponent from '../Tables/TableComponent';
import userService from "../../services/userService";
import {useAuth} from "../../auth/useAuth";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
    const auth = useAuth();
  useEffect( () => {
    const token = localStorage.getItem('token');
    console.log(auth.user);
    if (token) {
      setToken(token);
      fetchUsers(token);
    }
  }, []);

  const fetchUsers = async (token) => {

      const userData = await userService.getAll(token);
      if (!userData.error)
      setUsers(userData);
  };

  return (
    <div>
      <h2>User List</h2>
      <TableComponent data={users} />
    </div>
  );
};

export default UserList;
