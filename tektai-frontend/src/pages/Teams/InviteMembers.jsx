import React, { useState, useEffect } from 'react';
import UserService from '../../services/userService'; // Import your UserService
import TeamService from '../../services/teamServices'; // Import your TeamService
import { useToast } from '@chakra-ui/react'
import PromiseBasedToastExample from './toast';
// Define the user object
const user = {
  _id: "",
  username: "",
  email: "",
  // Other fields...
};

function InviteMembers({ teamId, onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
const toast = useToast()

  useEffect(() => {
    // Fetch list of users that can be invited
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await UserService.getAll(); // Assuming UserService has a fetchUsers function
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInvite = async () => {
    try {
      if (selectedUsers.length === 0) { // Check if no user is selected
        console.error('No users selected.');
        return;
      }
  
      // Send invitation to each selected user
      await Promise.all(selectedUsers.map(userId => TeamService.sendInvitation(teamId, userId)));
      
      console.log(`Invitations sent to ${selectedUsers.length} users.`);
      const examplePromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 5000)
      })

      // Will display the loading toast until the promise is either resolved
      // or rejected.
      toast.promise(examplePromise, {
        success: { title: 'All good', description: `Invitations sent to ${selectedUsers.length} users.` },
        error: { title: 'Rejected', description: 'Something wrong' },
        loading: { title: 'Processing', description: 'Please wait' },
      })
    
      onClose();
    } catch (error) {
      console.error('Error sending invitations:', error);
    }
  };
  
  
  const handleCancel = () => {
    onClose();
  };

  const handleUserToggle = (userId) => {
    // Toggle selection of user
    const updatedSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(updatedSelectedUsers);
    console.log("hatha=="+userId)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Invite Members</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <label>
                <input
                  type="checkbox"
                  value={user.id}
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserToggle(user._id)}
                />
                {user.username}
              </label>
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
        <div className="flex justify-end">
    {selectedUsers.length > 0 ? (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mr-2"
        onClick={handleInvite}
      >
        Invite
        
      </button>
    ) : (
      <button
        onClick={() =>
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Show Toast
      </button>
    )}
  </div>
          <button 
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteMembers;
