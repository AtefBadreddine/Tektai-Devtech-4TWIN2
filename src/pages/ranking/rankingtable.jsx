import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faMedal, faFireAlt, faBrain, faSeedling } from '@fortawesome/free-solid-svg-icons'; // Import icons from Font Awesome
import axios from 'axios'; // Import axios for making HTTP requests
import userData from './users.json'; // Import users data directly
import GoldCoin from './goldcoin'; // Import GoldCoin component

// Badge descriptions component
function BadgeDescriptions() {
  const badgeStyle = {
    fontSize: '1.5rem', // Define the desired font size
  };
  const badgeT = {
    fontSize: '2rem', // Define the desired font size
  };
  return (
    <div className="flex justify-center mb-2">
  <div className="flex items-center mr-4">
    <FontAwesomeIcon icon={faFireAlt} className="text-red-500 mr-1" style={badgeT} />
    <span className="text-500 font-custom mr-1" style={badgeStyle}>100+<span className="text-500 font-custom mr-1" style={badgeStyle}></span> Gold medals</span>
  </div>
  <div className="flex items-center mr-4">
    <FontAwesomeIcon icon={faBrain} className="text-purple-300 mr-1" style={badgeT} />
    <span className="text-300 font-custom mr-1" style={badgeStyle}> 100+ Silver medals  </span>
  </div>
  <div className="flex items-center">
    <FontAwesomeIcon icon={faSeedling} className="text-green-500 mr-1" style={badgeT} />
    <span className="text-500 font-custom mr-1" style={badgeStyle}> 100+ Bronze medals  </span>
  </div>
</div>

  );
}
function BadgeDescriptions2() {
  const badgeStyle = {
    fontSize: '1rem', // Define the desired font size
  };

  return (
    <div className="flex justify-center mb-2">
  <div className="flex items-center mr-4">
    <FontAwesomeIcon icon={faMedal} className="text-yellow-500 mr-1" style={badgeStyle} />
    <span className="text-gold-500 font-custom mr-1" style={badgeStyle}>Gold Badge</span>
    <span className="text-gray-500">(+3 points)</span> {/* Added points for gold badge */}
  </div>
  <div className="flex items-center mr-4">
    <FontAwesomeIcon icon={faMedal} className="text-gray-300 mr-1" style={badgeStyle} />
    <span className="text-300 font-custom mr-1" style={badgeStyle}>Silver Badge</span>
    <span className="text-gray-500">(+2 points)</span> {/* Added points for silver badge */}
  </div>
  <div className="flex items-center">
    <FontAwesomeIcon icon={faMedal} className="text-orange-500 mr-1" style={badgeStyle} />
    <span className="text-500 font-custom mr-1" style={badgeStyle}>Bronze Badge</span>
    <span className="text-gray-500">(+1 point)</span> {/* Added points for bronze badge */}
  </div>
</div>

  );
}
function RankingTable() {
  const [users, setUsers] = useState([]); // State to store user data

  useEffect(() => {
    // Sort users by total points (descending order)
    const sortedUsers = [...userData].sort((a, b) => {
      const totalPointsA = (a.goldBadges * 3) + (a.silverBadges * 2) + a.bronzeBadges;
      const totalPointsB = (b.goldBadges * 3) + (b.silverBadges * 2) + b.bronzeBadges;
      return totalPointsB - totalPointsA;
    });

    // Set sorted user data
    setUsers(sortedUsers);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {/* Badge descriptions */}
      <BadgeDescriptions />
      <BadgeDescriptions2 />
      
      
      {/* Container with full width and height */}
      <div className=" mx-auto px-4 sm:px-6" style={{ width:'1400px', height: '500px', overflowY: 'auto' }}>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-center">Rank</th>
              <th className="py-2 px-4 text-center">User</th>
              <th className="py-2 px-4 text-center">Badges</th>
              <th className="py-2 px-4 text-center">Total Points</th> {/* New column for total points */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.name} className={index < 3 ? 'font-bold' : ''}>
                <td className="py-2 px-4 text-center">
                  {index < 3 ? <FontAwesomeIcon icon={faCrown} className="text-yellow-500 mr-2" /> : index + 1}
                </td>
                <td className="py-2 px-4 text-center"> {/* Center the user name */}
                  <div className="flex justify-center items-center">
                    <img
                      src={`https://i.pravatar.cc/50?u=${user.name}`} // Random user image
                      alt="User"
                      className="rounded-full h-8 w-8 mr-2"
                    />
                    {user.name}
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
                <td className="py-2 px-4 text-center"> {/* Center the badges */}
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
                <td className="py-2 px-4 text-center">
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
    </div>
  );
}

export default RankingTable;
