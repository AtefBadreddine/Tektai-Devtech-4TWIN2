import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // Import useNavigate

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchBy, setSearchBy] = useState('username'); // Default search by username
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.trim());
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/users/searchusers?${searchBy}=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.status}`);
      }
      const users = await response.json();
      navigate('/results', { state: { users } }); // Navigate with search results
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchUsers();
    }
  }, [searchTerm, searchBy]);

  const renderSearchInput = () => (
    <div className="search-input-container flex">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div>
        <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 bg-transparent text-black focus:outline-none dark:text-white xl:w-125"
            value={searchTerm}
            onChange={handleSearchChange}
        />
      </div>


      <select value={searchBy} onChange={handleSearchByChange}>
        <option value="username">Username</option>
        <option value="role">Role</option>
        <option value="email">Email</option>
      </select>
    </div>
  );

  return (
    <div>
      {renderSearchInput()}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UserSearch;
