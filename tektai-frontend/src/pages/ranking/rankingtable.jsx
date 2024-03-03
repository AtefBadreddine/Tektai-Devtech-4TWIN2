import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faMedal, faFireAlt, faBrain, faSeedling } from '@fortawesome/free-solid-svg-icons'; // Import icons from Font Awesome
import axios from 'axios'; // Import axios for making HTTP requests
import userData from './users.json'; // Import users data directly
import GoldCoin from './goldcoin'; // Import GoldCoin component

// Badge descriptions component
function BadgeDescriptions() {
  return (
    <div className="flex flex-wrap justify-center mb-2">
      <BadgeIcon icon={faFireAlt} color="text-red-500" label="Gold medals" />
      <BadgeIcon icon={faBrain} color="text-purple-300" label="Silver medals" />
      <BadgeIcon icon={faSeedling} color="text-green-500" label="Bronze medals" />
    </div>
  );
}

function BadgeDescriptions2() {
  return (
    <div className="flex flex-wrap justify-center mb-2">
      <BadgeIcon icon={faMedal} color="text-yellow-500" label="Gold Badge (+3 points)" />
      <BadgeIcon icon={faMedal} color="text-gray-300" label="Silver Badge (+2 points)" />
      <BadgeIcon icon={faMedal} color="text-orange-500" label="Bronze Badge (+1 point)" />
    </div>
  );
}

function BadgeIcon({ icon, color, label }) {
  return (
    <div className="flex items-center mr-4">
      <FontAwesomeIcon icon={icon} className={`${color} mr-1`} style={{ fontSize: '1.5rem' }} />
      <span className="text-500 font-custom mr-1">{label}</span>
    </div>
  );
}

function RankingTable() {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulate data fetching delay
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2-second delay
      // Sort users by total points (descending order)
      const sortedUsers = [...userData].sort((a, b) => {
        const totalPointsA = (a.goldBadges * 3) + (a.silverBadges * 2) + a.bronzeBadges;
        const totalPointsB = (b.goldBadges * 3) + (b.silverBadges * 2) + b.bronzeBadges;
        return totalPointsB - totalPointsA;
      });
      // Set sorted user data
      setUsers(sortedUsers);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Badge descriptions */}
      <BadgeDescriptions />
      <BadgeDescriptions2 />

      {/* Show loading skeleton if data is still loading */}
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
        <div className="animate-pulse">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 sm:px-4 text-center">Rank</th>
                <th className="py-2 px-2 sm:px-4 text-center">User</th>
                <th className="py-2 px-2 sm:px-4 text-center">Badges</th>
                <th className="py-2 px-2 sm:px-4 text-center">Total Points</th> {/* New column for total points */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-2 sm:px-4 text-center bg-gray-300"> {/* Rank */}
                  <div className="h-4 bg-gray-400 rounded"></div>
                </td>
                <td className="py-2 px-2 sm:px-4 text-center bg-gray-300"> {/* User */}
                  <div className="h-8 w-8 rounded-full bg-gray-400"></div>
                  <div className="h-4 bg-gray-400 rounded mt-2"></div>
                </td>
                <td className="py-2 px-2 sm:px-4 text-center bg-gray-300"> {/* Badges */}
                  <div className="flex justify-center">
                    <div className="h-4 bg-gray-400 rounded mr-1"></div>
                    <div className="h-4 bg-gray-400 rounded mr-1"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                  </div>
                </td>
                <td className="py-2 px-2 sm:px-4 text-center bg-gray-300"> {/* Total Points */}
                  <div className="gold-coin-container">
                    <div className="h-4 bg-gray-400 rounded"></div>
                  </div>
                </td>
              </tr>
              {/* You can repeat the above row to show multiple rows of skeleton */}
            </tbody>
          </table>
        </div>
      </div>
      
      ) : (
        // Show table when data is loaded
        <div className="overflow-x-auto mx-auto" style={{ maxWidth: '100%' }}>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 sm:px-4 text-center">Rank</th>
                <th className="py-2 px-2 sm:px-4 text-center">User</th>
                <th className="py-2 px-2 sm:px-4 text-center">Badges</th>
                <th className="py-2 px-2 sm:px-4 text-center">Total Points</th> {/* New column for total points */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.name} className={index < 3 ? 'font-bold' : ''}>
                  <td className="py-2 px-2 sm:px-4 text-center">
                    {index < 3 ? <FontAwesomeIcon icon={faCrown} className="text-yellow-500 mr-1 sm:mr-2" /> : index + 1}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-center">
                    {/* Center the user name */}
                    <div className="flex justify-center items-center">
                      <img
                        src={`https://i.pravatar.cc/50?u=${user.name}`} // Random user image
                        alt="User"
                        className="rounded-full h-8 w-8 mr-2"
                      />
                      <span className="text-sm">{user.name}</span>
                      {user.goldBadges >= 100 && (
                        <span title="Gold Badge" className="ml-2">
                          <FontAwesomeIcon icon={faFireAlt} className="text-red-500" />
                        </span>
                      )}
                      {user.silverBadges >= 100 && (
                        <span title="Silver Badge" className="ml-2">
                          <FontAwesomeIcon icon={faBrain} className="text-purple-300" />
                        </span>
                      )}
                      {user.bronzeBadges >= 100 && (
                        <span title="Bronze Badge" className="ml-2">
                          <FontAwesomeIcon icon={faSeedling} className="text-green-500" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-center">
                    {/* Center the badges */}
                    <div className="flex justify-center">
                      {user.goldBadges > 0 && (
                        <span className="text-yellow-500 mr-1">
                          <FontAwesomeIcon icon={faMedal} className="text-yellow-500 mr-1" />
                          gold: {user.goldBadges}
                        </span>
                      )}
                      {user.silverBadges > 0 && (
                        <span className="text-gray-300 mr-1">
                          <FontAwesomeIcon icon={faMedal} className="text-gray-300 mr-1" />
                          silver: {user.silverBadges}
                        </span>
                      )}
                      {user.bronzeBadges > 0 && (
                        <span className="text-orange-500">
                          <FontAwesomeIcon icon={faMedal} className="text-orange-500 mr-1" />
                          bronze: {user.bronzeBadges}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-center">
                    {/* Total Points */}
                    <div className="gold-coin-container">
                      <GoldCoin points={(user.goldBadges * 3) + (user.silverBadges * 2) + user.bronzeBadges} />
                      {index < 3 && (
                        <div className="gold-coin-hover"></div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RankingTable;
