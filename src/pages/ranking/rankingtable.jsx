import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUser, faMedal,faFireAlt,faBrain,faSeedling } from '@fortawesome/free-solid-svg-icons'; // Import icons from Font Awesome

// Predefined list of user names
const userNames = [
  'John Doe',
  'Jane Smith',
  'Michael Johnson',
  'Emily Brown',
  'David Wilson',
  'Sarah Taylor',
  // Add more names as needed
];

function RankingTable() {
  // Simulated data with 100 users
  const users = Array.from({ length: 100 }, (_, index) => ({
    name: userNames[Math.floor(Math.random() * userNames.length)], // Random user name from the list
    goldBadges: Math.max(10, Math.floor(Math.random() * 14)), // Random gold badges count (at least 10)
    silverBadges: Math.max(10, Math.floor(Math.random() * 14)), // Random silver badges count (at least 10)
    bronzeBadges: Math.max(10, Math.floor(Math.random() * 14)) // Random bronze badges count (at least 10)
  }));

  // Assign weights to badge types
  const goldWeight = 3;
  const silverWeight = 2;
  const bronzeWeight = 1;

  // Calculate weighted total for each user and sort by it
  const sortedUsers = users.sort((a, b) => {
    const totalA = a.goldBadges * goldWeight + a.silverBadges * silverWeight + a.bronzeBadges * bronzeWeight;
    const totalB = b.goldBadges * goldWeight + b.silverBadges * silverWeight + b.bronzeBadges * bronzeWeight;
    return totalB - totalA;
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Container with full width and height */}
      <div className="w-full mx-auto px-4 sm:px-6">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-center">Rank</th>
              <th className="py-2 px-4 text-center">User</th>
              <th className="py-2 px-4 text-center">Badges</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
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
                    {user.goldBadges >= 10 && (
                      <span title="Gold Badge" className="ml-2">
                        <FontAwesomeIcon icon={faFireAlt} className="text-red-500" />
                      </span>
                    )}
                    {user.silverBadges >= 10 && (
                      <span title="Silver Badge" className="ml-2">
                        <FontAwesomeIcon icon={faBrain} className="text-purple-300" />
                      </span>
                    )}
                    {user.bronzeBadges >= 10 && (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RankingTable;
