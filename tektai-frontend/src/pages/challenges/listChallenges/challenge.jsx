import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

const Challenges = ({ status }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(10);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/challenges/filter?status=${status}&page=${currentPage}&limit=${challengesPerPage}`);
        setChallenges(response.data.reverse()); // Reverse the array of challenges
        setLoading(false);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
  
    fetchChallenges();
  }, [status, currentPage, challengesPerPage]);


  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(indexOfFirstChallenge, indexOfLastChallenge);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const Challenge = ({ challenge }) => {
    const [companyName, setCompanyName] = useState('');
    const [loadingCompany, setLoadingCompany] = useState(true);

    useEffect(() => {
      const fetchCompany = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/users/getById/${challenge.company_id}`);
          setCompanyName(response.data.companyName);
          setLoadingCompany(false);
        } catch (error) {
          console.error('Error fetching company:', error);
        }
      };

      fetchCompany();
    }, [challenge.company_id]);

    const imageSrc = challenge.image ? challenge.image : defaultImagePath;
    
    return (
      <div className="max-w-xs rounded overflow-hidden shadow-lg my-2 relative hover:shadow-xl">
         <img 
          className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-110" 
          src={imageSrc} 
          alt="Challenge" 
        />
        <div className="px-6 py-4">
           {/* Truncate the title to display a specific length */}
        <div className="font-bold text-xl mb-2">{truncateText(challenge.title, 15)}</div>
        {/* Truncate the company name to display a specific length */}
        <p className="text-gray-700 text-base">Company: {loadingCompany ? 'Loading...' : companyName}</p>
        {/* Display prize without truncation */}
        <p className="text-gray-700 text-base">Prize: <span className='text-[#3aa856] font-bold'>{truncateText(challenge.prize, 10)}</span></p>
          <p className="text-gray-700 text-base mb-20">Status: <span className='text-[#7747ff] font-bold'>{challenge.status}</span></p>
        </div>
      
        <div className="absolute bottom-0 left-0 m-4">
          {status !== 'Ongoing' && status !== 'Upcoming' && (
            <Link to={`/challenges/${challenge._id}`} className="menu__link">View Details</Link>
          )}
          {status === 'Ongoing' && (
     <Link 
     to={isLoggedIn() ? `/challenges/${challenge._id}` : "/signin"} 
     className={`btn-smm font-bold py-2 px-4 rounded ${isLoggedIn() ? "" : "cursor-not-allowed opacity-50"} ${isLoggedIn() ? "" : "bg-black text-white"}`}
   >
     {isLoggedIn() ? "Participate" : "Sign In to Participate"}
   </Link>
          )}
          {status === 'Upcoming' && (
            <button className="bg-[#6fc5ff] text-white font-bold py-2 px-4 rounded" disabled>
              Upcoming ...
            </button>
          )}
        </div>
      </div>
    );
  };
  const isLoggedIn = () => {
    const storedToken = localStorage.getItem('token');
    return !!storedToken;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg my-2">
              <div className="animate-pulse">
                <div className="w-full h-40 bg-gray-300"></div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-gray-300 h-6 w-3/4"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-1/2 mt-2"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-2/3 mt-1"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-1/3 mt-1"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          currentChallenges.map(challenge => (
            <Challenge key={challenge.id} challenge={challenge} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(challenges.length / challengesPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="mx-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-200">
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
