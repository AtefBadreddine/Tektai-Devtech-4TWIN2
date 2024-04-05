import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// Default image path
const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

// Challenges component
const Challenges = ({ status }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/challenges/filter?status=${status}`);
        setChallenges(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, [status]);

  // Challenge component
  const Challenge = ({ challenge }) => {
    const [companyName, setCompanyName] = useState('');
    const [loadingCompany, setLoadingCompany] = useState(true);

    useEffect(() => {
      const fetchCompany = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/users/getById/${challenge.company_id}`);
          setCompanyName(response.data.companyName); // Assuming companyName is the field name in the user collection
          setLoadingCompany(false);
        } catch (error) {
          console.error('Error fetching company:', error);
        }
      };

      fetchCompany();
    }, [challenge.company_id]);

    // Determine image source
    const imageSrc = challenge.image ? challenge.image : defaultImagePath;
    return (
      <div className="max-w-xs rounded overflow-hidden shadow-lg my-2 relative hover:shadow-xl">
         <img 
          className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-110" 
          src={imageSrc} 
          alt="Challenge" 
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{challenge.title}</div>
          <p className="text-gray-700 text-base">Company: {loadingCompany ? 'Loading...' : companyName}</p>
          <p className="text-gray-700 text-base">Prize: <span className='text-[#3aa856] font-bold'>{challenge.prize}</span></p>
          <p className="text-gray-700 text-base mb-20">Status: <span className='text-[#7747ff] font-bold'>{challenge.status}</span></p>
        </div>
      
        <div className="absolute bottom-0 left-0 m-4">
          {status !== 'Ongoing' && status !== 'Upcoming' && (
            <Link to={`/challenges/${challenge._id}`} className="menu__link">View Details</Link>
          )}
          {status === 'Ongoing' && (
            <Link to={`/challenges/${challenge._id}`} className="btn-smm font-bold py-2 px-4 rounded">
              Participate
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Ongoing Challenges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? (
          // Loading skeleton
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
          // Render actual challenges
          challenges.map(challenge => (
            <Challenge key={challenge.id} challenge={challenge} />
          ))
        )}
      </div>
    </div>
  );
};

export default Challenges;
