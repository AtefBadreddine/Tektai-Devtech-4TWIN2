import React, { useState, useEffect } from 'react';
import challengesData from '../challenges.json';
import { Link } from "react-router-dom";

// Challenge component
const Challenge = ({ challenge, status }) => {
  const isOngoing = challenge.status === status;


  
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg my-2 relative hover:shadow-xl">
      <img 
        className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-110" 
        src={challenge.image} 
        alt="Challenge" 
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{challenge.name}</div>
        <p className="text-gray-700 text-base">Host: {challenge.host}</p>
        <p className="text-gray-700 text-base">Prize: ${challenge.price}</p>
        <p className="text-gray-700 text-base">Status: {challenge.status}</p>
      </div>
      <Link 
        to={`/challenges/${challenge.id}`} 
        className={`bg-blue-500 ${isOngoing ? 'hover:bg-blue-700' : 'bg-gray-400'} text-white font-bold py-2 px-4 rounded absolute bottom-0 right-0 m-4`}
        disabled={!isOngoing}
      >
        Participate
      </Link>
    </div>
  );
};

// Challenges component
const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setChallenges(challengesData);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const classifyChallenges = () => {
    const classifiedChallenges = {
      Completed: [],
      Ongoing: [],
      Upcoming: []
    };

    challenges.forEach(challenge => {
      classifiedChallenges[challenge.status].push(challenge);
    });

    return classifiedChallenges;
  };

  const categorizedChallenges = classifyChallenges();

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
          categorizedChallenges.Ongoing.map(challenge => (
            <Challenge key={challenge.id} challenge={challenge} status="Ongoing" />
          ))
        )}
      </div>

      {/* Completed Challenges */}
      {/* Include loading skeleton and actual challenges rendering similarly for other categories */}
    </div>
  );
};

export default Challenges;
