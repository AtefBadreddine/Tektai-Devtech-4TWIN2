import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchBy, setSearchBy] = useState('username'); // Default search by username

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
        `http://localhost:3000/users/searchusers?${searchBy}=${searchTerm}`
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
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
        value={searchTerm}
        onChange={handleSearchChange}
      />
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
