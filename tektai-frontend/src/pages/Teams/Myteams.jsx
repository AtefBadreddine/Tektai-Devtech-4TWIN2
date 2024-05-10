import React, { useEffect, useState } from 'react';
import TeamsService from '../../services/teamServices';
import UsersService from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUser, faCog, faTrash, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { Alert, AlertIcon, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import InviteMembers from './InviteMembers';
import PendingInvitations from './pedning';
import JoinedTeams from './joine';

function MyTeams() {
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null); // Add warning message state

  const [newTeamName, setNewTeamName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null); // Initialize updateSuccess state
  const [searchQuery, setSearchQuery] = useState('');

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
        const loggedInUser = JSON.parse(localStorage.getItem('user')); // Get the logged-in user from local storage
        const allTeams = await TeamsService.getAllTeams();
        const userTeams = allTeams.filter(team => team.leader?.username === loggedInUser.username);
        setTeams(userTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }

    fetchTeams();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      const loggedInUser = JSON.parse(localStorage.getItem('user')); // Get the logged-in user from local storage

      // Call the create team API endpoint
      const newTeam = await TeamsService.createTeam({ name: newTeamName, members: selectedMembers, leader: loggedInUser._id });

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
    setShowModal2(true);
  };

  // Function to handle saving changes in the manage team modal
  const handleSaveChanges = async () => {
    try {
      // Call the update team API endpoint with the modified team
      await TeamsService.updateTeam(selectedTeam._id, { name: selectedTeam.name }); // Pass selectedTeam._id and { name: selectedTeam.name }
      // Update the teams state with the modified team
      setTeams(teams.map(team => (team._id === selectedTeam._id ? selectedTeam : team)));
      // Close the modal
      setShowModal2(false);
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(null);
      }, 7000);
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const handleMemberSelection = (userId) => {
    // Check if the user ID is already in the selectedMembers array
    const isSelected = selectedMembers.includes(userId);

    // If the user ID is selected, remove it from the array
    // If not selected, add it to the array
    if (isSelected) {
      setSelectedMembers(selectedMembers.filter(id => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      // Remove the member from the selected team's members list
      setSelectedTeam(prevTeam => ({
        ...prevTeam,
        members: prevTeam.members.filter(member => member._id !== memberId)
      }));
      // Call the remove member API endpoint
      await TeamsService.removeMember(selectedTeam._id, memberId);
      // Set success message
      setSuccessMessage('Member removed successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error removing member:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const [invitationSent, setInvitationSent] = useState({});

  const sendInvitation = async (teamId) => {
    try {
      // Iterate over selectedMembers array and send individual invitations
      for (const memberId of selectedMembers) {
        await TeamsService.sendInvitation(teamId, memberId);
      }
      console.log('Invitations sent successfully');
      // Logic to indicate invitations sent successfully
    } catch (error) {
      console.error('Error sending invitations:', error);
      // Handle error
    }
  };

  const [showInviteMembers, setShowInviteMembers] = useState(false);

  const toggleInviteMembers = () => {
    setShowInviteMembers(!showInviteMembers);
  };

  const handleLeaveTeam = (teamId) => {
    const memberId = JSON.parse(localStorage.getItem('user')).id; // Assuming you have currentUser stored somewhere
    const url = `${API_URL}/teams/${teamId}/members/${memberId}`;

    // Sending a DELETE request to the API endpoint
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other required headers like authorization token
      },
    })
      .then(response => {
        if (response.ok) {
          // Remove the member from the team in the frontend
          setTeams(teams.map(team => {
            if (team._id === teamId) {
              return {
                ...team,
                members: team.members.filter(member => member._id !== memberId)
              };
            }
            return team;
          }));
          console.log("Left team successfully");
        } else {
          throw new Error('Failed to leave the team');
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error leaving team:", error);
        // Optionally, show an error message
      });
  };
  useEffect(() => {
    if (selectedMembers.length > 5) {
      setWarningMessage('Warning: The number of team members exceeds 5.');
    } else if (selectedMembers.length === 5) {
      setWarningMessage('Maximum number of team members (5) reached.');
    } else {
      setWarningMessage(null);
    }
  }, [selectedMembers]);
  return (
    <div>
      <div className='pb-16'>
        <Header />
      </div>

      <div className="container mx-auto px-4 py-8 pt-7">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">My Teams</h1>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create New Team
          </button>
        </div>

        {/* Modal for creating or managing a team */}
        {showModal && (
          <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Create New Team</h2>
              <input type="text" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="Enter Team Name" className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full" />

              <div className="flex justify-end">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2" onClick={handleCreateTeam}>Create</button>
                <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showModal2 && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>

            <div className="bg-white rounded-lg p-8 relative z-10 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Manage Team</h2>
              <input
                type="text"
                value={selectedTeam ? selectedTeam.name : ''}
                onChange={(e) => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
                placeholder="Enter Team Name"
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search members..."
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
              />
              <div className="overflow-y-auto max-h-60">
                {searchQuery &&
                  filteredUsers &&
                  filteredUsers.map((user) => (
                    <div key={user._id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={user._id}
                        checked={selectedMembers.includes(user._id)}
                        onChange={() => handleMemberSelection(user._id)}
                        className="mr-2"
                      />
                      <label htmlFor={user._id}>{user.username}</label>
                      <button
                        className='btn bg-green-300 m-2 w-10 text-sm h-4'
                        disabled={invitationSent[user._id]}
                        onClick={() => sendInvitation(selectedTeam?._id, user._id)}
                      >
                        {invitationSent[user._id] ? 'Invited' : 'Invite'}
                      </button>
                    </div>
                  ))}
                  {warningMessage &&
                  <div className='m-2' >
                    <Alert status='warning' variant='subtle'>
                      <AlertIcon />
                      {warningMessage}
                    </Alert>
                  </div>}
                {successMessage &&
                  <div className='m-2' >
                    <Alert status='success' variant='subtle'>
                      <AlertIcon />
                      {successMessage}
                    </Alert>
                  </div>}
                {selectedTeam.members.map((member) => (
                  <div key={member._id} className="flex items-center mb-2">
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="bg-red-500 text-white py-1 mx-2 px-3 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                    <p className="mr-2">{member.username}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-end">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-2 sm:mb-0 sm:mr-2"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                  onClick={() => setShowModal2(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {updateSuccess !== null && (
          <div className={`${updateSuccess ? 'bg-green-200' : 'bg-red-200'} w-full p-4 text-center transition-opacity duration-500 ease-in-out opacity-100`}>
            <div className="text-sm text-green-800">
              {updateSuccess ?
                <Alert status='success' variant='subtle'>
                  <AlertIcon />
                  Team updated successfully!
                </Alert>
                :
                <Alert status='error'>
                  <AlertIcon />
                  Error updating team. Please try again
                </Alert>
              }
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teams.map((team) => (
              <div key={team._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 bg-gray-50">
                  <h2 className="text-xl font-semibold mb-3">Team : {team.name}</h2>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className='w-10 h-10' name={team.leader?.username} src={`${API_URL}/uploads/${team.leader?.image}`} />
                      <span className="font-medium">{team.leader?.username}</span>
                    </div>
                    <span className="px-3 py-1 text-sm text-white bg-green-500 rounded-full">{team.members.length} Members</span>
                  </div>
                </div>
                <div className="px-4 py-2">
                  {team.members.length >= 5 && (
                      <div className="text-red-500 text-sm mb-2">Warning: Maximum number of members exceeded (5 members allowed).</div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {team.members.map((member) => (
                        <a key={member._id} href={`/profile/${member?.username}`} className="flex items-center space-x-2 hover:text-blue-500">
                          <Avatar className='w-8 h-8' name={member?.username} src={`${API_URL}/uploads/${member?.image}`} />
                          <span>{member?.username}</span>
                        </a>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-100 p-4">
                  <button className={`bg-blue-500 flex  ml-auto  text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 ${team.members.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => team.members.length < 5 && toggleInviteMembers()}>
                    Invite Members
                  </button>
                  {showInviteMembers && <InviteMembers teamId={team._id} onClose={() => setShowInviteMembers(false)} />}
                  <PendingInvitations teamId={team._id} />
                  <div className="flex justify-end space-x-2 mt-3">
                    <button className="text-2xl text-red-500 hover:text-red-700" onClick={() => handleDeleteTeam(team._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="text-2xl text-purple-500 hover:text-purple-700" onClick={() => handleManageTeam(team)}>
                      <FontAwesomeIcon icon={faCog} />
                    </button>
                    <button className="text-2xl text-red-500 hover:text-red-700" onClick={() => handleLeaveTeam(team._id)}>
                      Leave <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>

        <JoinedTeams></JoinedTeams>
      </div>
      <Footer />
    </div>
  );
}

export default MyTeams;
