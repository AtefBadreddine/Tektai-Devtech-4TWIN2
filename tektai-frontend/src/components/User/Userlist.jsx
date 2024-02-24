import React, { useState, useEffect } from 'react';

import TableComponent from '../Tables/TableComponent';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    
    if (token) {
      setToken(token);
      fetchUsers(token);
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      // Step 3: Fetch users using the obtained token
      const response = await fetch('http://localhost:3000/auth/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const userData = await response.json();
      console.log('Response:', userData);
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <TableComponent data={users} />
    </div>
  );
};

export default UserList;
