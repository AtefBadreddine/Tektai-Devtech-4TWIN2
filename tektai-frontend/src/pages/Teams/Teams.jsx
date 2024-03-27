import React, { useEffect, useState } from 'react';
import TeamsService from '../../services/teamServices';
import UsersService from '../../services/userService';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const allTeams = await TeamsService.getAllTeams();
        // For each team, fetch user details for leader and members
        const teamsWithUsers = await Promise.all(allTeams.map(async (team) => {
          const leader = await UsersService.getUserById(team.leader);
          const members = await Promise.all(team.members.map(async (memberId) => {
            const user = await UsersService.getUserById(memberId);
            return user.username; // Assuming username is the field containing the name
          }));
          return { ...team, leader: leader.username, members };
        }));
        setTeams(teamsWithUsers);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Teams</h1>
      <div className="grid grid-cols-2 gap-4">
        {teams.map((team) => (
          <div key={team._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{team.name}</h2>
            <p className="text-gray-600 mb-2">Leader: <a href={`/profile/${team.leader}`} className="text-black dark:text-white flex items-center hover:text-blue-500">{team.leader}</a></p>
            <p className="text-gray-600 mb-2">Members:</p>
            <ul className="list-disc list-inside">
              {team.members.map((member, index) => (
                
                <div key={index} className="ml-4"><a href={`/profile/${member}`} className="text-black dark:text-white flex items-center hover:text-blue-500">{member}</a></div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
