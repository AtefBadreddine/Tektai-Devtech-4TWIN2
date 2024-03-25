import React, { useEffect, useState } from 'react';
import TeamsService from '../../services/teamServices';
import UsersService from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUser, faCog, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

function MyTeams() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUsers = await UsersService.getAll();
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const allTeams = await TeamsService.getAllTeams();
        // For each team, fetch user details for leader and members
        const teamsWithUsers = await Promise.all(allTeams.map(async (team) => {
          const leader = await UsersService.getUserById(team.leader);
          const members = await Promise.all(team.members.map(async (memberId) => {
            const user = await UsersService.getUserById(memberId);
            return user.username.charAt(0).toUpperCase() + user.username.slice(1); // Convert first letter to uppercase
          }));
          return { ...team, leader: leader.username.charAt(0).toUpperCase() + leader.username.slice(1), members };
        }));
        setTeams(teamsWithUsers);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }

    fetchTeams();
  }, []);

  // Function to handle deleting a team
  const handleDeleteTeam = async (teamId) => {
    try {
      // Call the delete team API endpoint
      await TeamsService.deleteTeam(teamId);
      // Remove the deleted team from the state
      setTeams(teams.filter(team => team._id !== teamId));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  // Function to handle creating a new team
  const handleCreateTeam = async () => {
    try {
      // Call the create team API endpoint
      const newTeam = await TeamsService.createTeam({ name: newTeamName, members: selectedMembers });
      // Add the newly created team to the state
      setTeams([...teams, newTeam]);
      // Close the modal
      setShowModal(false);
      // Reset the new team name and selected members
      setNewTeamName('');
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  // Function to handle opening the manage team modal
  const handleManageTeam = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  // Function to handle saving changes in the manage team modal
  const handleSaveChanges = async () => {
    try {
      // Call the update team API endpoint with the modified team
      await TeamsService.updateTeam(selectedTeam._id, { name: selectedTeam.name }); // Pass selectedTeam._id and { name: selectedTeam.name }
      // Update the teams state with the modified team
      setTeams(teams.map(team => (team._id === selectedTeam._id ? selectedTeam : team)));
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  return (
    // add condition to display only teams that belong to the current user
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Teams</h1>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlus} className="mr-2" />Create New Team</button>
      </div>
      {/* Modal for creating or managing a team */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            {selectedTeam ? (
             <>
             <h2 className="text-xl font-semibold mb-4">Manage Team</h2>
             <div className="mb-4">
               <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name:</label>
               <input
  type="text"
  id="teamName"
  value={selectedTeam.name}
  onChange={(e) => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
  className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
/>
             </div>
             {/* Add additional fields for team modification */}
             <div className="flex justify-end mt-4">
               <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2" onClick={handleSaveChanges}>Save Changes</button>
               <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400" onClick={() => setShowModal(false)}>Cancel</button>
             </div>
           </>
           
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Create New Team</h2>
                <input type="text" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="Enter Team Name" className="border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <div className="overflow-y-auto max-h-60">
                  {users.map((user) => (
                    <div key={user._id} className="flex items-center mb-2">
                      <input type="checkbox" id={user._id} checked={selectedMembers.includes(user._id)} onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMembers([...selectedMembers, user._id]);
                        } else {
                          setSelectedMembers(selectedMembers.filter(memberId => memberId !== user._id));
                        }
                      }} />
                      <label htmlFor={user._id} className="ml-2">{user.username}</label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2" onClick={handleCreateTeam}>Create</button>
                  <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {teams.map((team) => (
          <div key={team._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{team.name}</h2>
              <div>
                <button className="text-red-500 mr-2 hover:text-red-700" onClick={() => handleDeleteTeam(team._id)}><FontAwesomeIcon icon={faTrash} /></button>
                <button className="text-purple-500 hover:text-purple-700" onClick={() => handleManageTeam(team)}><FontAwesomeIcon icon={faCog} /></button>
              </div>
            </div>
            <p className="text-gray-600 mb-2">Leader: <a href={`/profile/${team.leader}`} className="text-black dark:text-white flex items-center hover:text-blue-500"><FontAwesomeIcon icon={faCrown} className="mr-2" />{team.leader}</a></p>
            <p className="text-gray-600 mb-2">Members:</p>
            <ul className="list-disc list-inside">
              {team.members.map((member, index) => (
                <div key={index} className="ml-4"><a href={`/profile/${member}`} className="text-black dark:text-white flex items-center hover:text-blue-500"><FontAwesomeIcon icon={faUser} className="mr-2" />{member}</a></div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTeams;

