import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserSearchF = () => {
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
        `http://localhost:3000/users/searchusers?username=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.status}`);
      }
      const users = await response.json();
      navigate('/resultsf', { state: { users } }); // Navigate with search results
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
        className="border border-gray-300 rounded-lg py-1 px-3 mr-4 focus:outline-none focus:border-indigo-500" 
        // value={searchTerm}
        onChange={handleSearchChange}
      />
      
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

export default UserSearchF;
