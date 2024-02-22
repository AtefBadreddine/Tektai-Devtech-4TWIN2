import React, { useState, useEffect } from 'react';
import challengesData from '../challenges.json';
import {Link} from "react-router-dom"; // Importing the JSON data directly

const Challenge = ({ challenge }) => {
  const isOngoing = challenge.status === 'Ongoing';

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
      <Link to={`/challenges/${challenge.id}`} className={`bg-blue-500 ${isOngoing ? 'hover:bg-blue-700' : 'bg-gray-400'} text-white font-bold py-2 px-4 rounded absolute bottom-0 right-0 m-4`}
        disabled={!isOngoing}
      >
        Participate
      </Link>
    </div>
  );
};

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Set the challenges data directly from the imported JSON file
    setChallenges(challengesData);
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

  <h1 className="text-xl font-bold my-4">Ongoing Challenges</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {categorizedChallenges.Ongoing.map(challenge => (
      <Challenge key={challenge.id} challenge={challenge} />
    ))}
  </div>
  <h1 className="text-xl font-bold mb-4">Completed Challenges</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {categorizedChallenges.Completed.map(challenge => (
      <Challenge key={challenge.id} challenge={challenge} />
    ))}
  </div>

  <h1 className="text-xl font-bold my-4">Upcoming Challenges</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {categorizedChallenges.Upcoming.map(challenge => (
      <Challenge key={challenge.id} challenge={challenge} />
    ))}
  </div>
</div>


  );
};

export default Challenges;
