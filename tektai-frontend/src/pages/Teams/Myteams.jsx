import React, { useEffect, useState } from 'react';
import TeamsService from '../../services/teamServices';
import UsersService from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUser, faCog, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { Alert, AlertIcon, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
function MyTeams() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

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
        const allTeams = await TeamsService.getAllTeams();
        setTeams(allTeams);
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
        setSuccessMessage(null);      }, 3000);
    } catch (error) {
      console.error('Error removing member:', error);
      // Handle error (e.g., display an error message)
    }
  };
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
  }
  
  return (
    // add condition to display only teams that belong to the current user
    <div>       <div className='pb-16'><Header/></div> 
    
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
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search members..." className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full" />
      <div className="overflow-y-auto max-h-60">
  {filteredUsers && filteredUsers.map((user) => (
    <div key={user._id} className="flex items-center mb-2">
      <input type="checkbox" id={user._id} checked={selectedMembers.includes(user._id)} onChange={() => handleMemberSelection(user._id)} />
      <label htmlFor={user._id} className="ml-2">{user.username}</label>
    </div>
  ))}
</div>

      <div className="flex justify-end">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2" onClick={handleCreateTeam}>Create</button>
        <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400" onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}



{showModal2 && (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    {/* Overlay */}
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
    
    {/* Modal content */}
    <div className="bg-white rounded-lg p-8 relative z-10 w-full max-w-md">
    <h2 className="text-xl font-semibold mb-4">Manage Team</h2>
{/* Input field for team name */}
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
        <button className='btn bg-green-300 m-2 w-10 text-sm h-4' onClick={() => sendInvitation(selectedTeam?.teamId)}>Invite</button>
        {/* Use optional chaining to avoid errors if selectedTeam is null or undefined */}
      </div>
  ))}
      {successMessage &&   
      <div className='m-2' >
       <Alert status='success' variant='subtle'>
       <AlertIcon />
       {successMessage}
     </Alert></div>}
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
      {/* Buttons */}
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

    <div className="grid grid-cols-2 gap-4">
  {teams.map((team) => (
    <div key={team._id} className="bg-white rounded-lg shadow-md p-4">
       
       <div className="mt-4 grid gap-4 md:flex md:flex-row md:overflow-x-auto">
  <h3 className="text-lg font-semibold mb-2">Most Valued Member</h3>
  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {team.members
      .map(member => ({
        ...member,
        totalScore: parseInt(member.gpts) * 3 + parseInt(member.spts) * 2 + parseInt(member.bpts)
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3)
      .map((member, index) => (
        <div key={index} className={`bg-white rounded-lg shadow-md p-4 ${index === 0 ? 'bg-yellow-100' : ''} sm:flex sm:flex-col sm:items-center`}>
          {/* Render crown icon for the top member */}
          {index === 0 && <FontAwesomeIcon icon={faCrown} className="text-yellow-500 mb-2 sm:mb-0" />}
          <div className="flex items-center mb-2">
            {/* Conditionally apply classes based on the index */}
            <span className={`text-gray-600 mr-2 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-600' : ''}`}>
              {index + 1}
           
              <div>
              <div><Avatar className='mx-2 transition duration-300 ease-in-out transform hover:scale-110' size='sm' name={member.username} src={`http://localhost:3000/uploads/${member.image}`} /></div>
  <span className="text-gray-600">{member.username} </span>
</div>
 </span>
            
          </div>
          <div><FontAwesomeIcon icon="fa-solid fa-award" className='text-green-500' /> {member.totalScore} Points</div>
        </div>
      ))
    }
  </div>
</div>




      <div className="flex justify-between items-center mb-2">
        <h2 className="my-4 text-xl font-semibold">{team.name}</h2>
        <div>
          <button className="text-2xl text-red-500 mr-2 hover:text-red-700" onClick={() => handleDeleteTeam(team._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="text-2xl text-purple-500 hover:text-purple-700" onClick={() => handleManageTeam(team)}>
            <FontAwesomeIcon icon={faCog} />
          </button>
        </div>
      </div>
      <div className="mb-2 flex items-center">
        <div className="text-gray-600 mr-2">Leader:</div>
        <div className="text-gray-600 mb-2 flex items-center  dark:text-white hover:text-blue-500">
          <div><Avatar className='mx-2 transition duration-300 ease-in-out transform hover:scale-110' size='md' name={team.leader.username} src={`http://localhost:3000/uploads/${team.leader.image}`} /></div>
          {team.leader.username}  {/*<FontAwesomeIcon icon={faCrown} className="mx-2" /> */}
        </div>
      </div>
      <div className="text-gray-600 mb-2">Members:</div>
      <div className="text-gray-600 mb-2 ml-auto">Number of Members: {team.members.length}</div>


      <ul className="list-disc list-inside">  
        {team.members.map((member) => (
          <div key={member._id} className="ml-4">
            <a href={`/profile/${member.username}`} className="text-black dark:text-white flex items-center hover:text-blue-500">
            <div> <Avatar className='m-2 transition duration-300 ease-in-out transform hover:scale-110' size='sm' name={member.username} src={`http://localhost:3000/uploads/${member.image}`} /></div>
              {member.username} <FontAwesomeIcon icon={faUser} className="mx-2" />
            </a>
          </div>
        ))}
      </ul>
    </div>
  ))}
</div>

                  
    </div>
    <Footer/>
    </div>
  );
}

export default MyTeams;

