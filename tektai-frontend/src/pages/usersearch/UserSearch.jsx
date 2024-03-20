import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import useNavigate

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
    <div className="search-input-container border border-blue flex items-center bg-transparent focus:outline-none  rounded-full overflow-hidden">
      <div className="relative flex-grow dark:text-white  text-black">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full mr-[17.3rem] pl-12 bg-transparent border-none focus:ring-0 rounded-full" // Adjust padding and styles
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="divider h-full bg-blue" style={{ width: '1px' }}></div> {/* Adjust the width */}
      <select
        value={searchBy}
        onChange={handleSearchByChange}
        className="bg-transparent border-0  border-l focus:ring-0  pr-4 pl-2 rounded-r-full" // Match styles with input
      >
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
