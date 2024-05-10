import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import UserSearch from './UserSearch';
import DefaultLayout from '../../layout/DefaultLayout';
import SearchTableComponent from '../../components/Tables/Searchatble';
import SearchTableComponentF from '../../components/Tables/SearchtableF';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const SearchResultF = () => {
  const location = useLocation();
  const users = location.state?.users || []; // Access passed users or an empty array
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  return (
    <div>
      <Header/>
        {/* <UserSearch/> */}
      <h2>Search Results</h2>
      <SearchTableComponentF users={users} ></SearchTableComponentF>
     
      <Footer></Footer>
    </div>
    
  );
};

export default SearchResultF;
