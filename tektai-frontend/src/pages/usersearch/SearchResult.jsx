import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import UserSearch from './UserSearch';
import DefaultLayout from '../../layout/DefaultLayout';
import SearchTableComponent from '../../components/Tables/Searchatble';

const SearchResult = () => {
  const location = useLocation();
  const users = location.state?.users || []; // Access passed users or an empty array
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  return (
    <div>
      <DefaultLayout>
        {/* <UserSearch/> */}
      <h2>Search Results</h2>
      <SearchTableComponent users={users} ></SearchTableComponent>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.role} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
        
      )}</DefaultLayout>
    </div>
    
  );
};

export default SearchResult;
