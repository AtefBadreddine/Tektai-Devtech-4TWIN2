import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tag,TagLabel } from '@chakra-ui/react';

const PendingInvitations = ({ teamId }) => {
  const [invitations, setInvitations] = useState([]);
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  useEffect(() => {
    const fetchInvitationsByTeamId = async () => {
      try {
        const response = await axios.get(`${API_URL}/teams/invitations`);
        // Filter invitations where the team ID matches the teamId prop and accepted is true
        const filteredInvitations = response.data.filter(invitation => invitation.team._id === teamId && invitation.accepted);
        const uniqueInvitations = filterUniqueByUsername(filteredInvitations);
        setInvitations(uniqueInvitations);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };

    fetchInvitationsByTeamId();
  }, [teamId]);

  // Function to filter out duplicate invitations based on username
  const filterUniqueByUsername = (invitations) => {
    const uniqueInvitations = [];
    const usernamesSet = new Set();
    
    invitations.forEach(invitation => {
      if (!usernamesSet.has(invitation.recipient.username)) {
        uniqueInvitations.push(invitation);
        usernamesSet.add(invitation.recipient.username);
      }
    });

    return uniqueInvitations;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
    <h2 className="text-xl font-bold mb-2">Pending Invitations</h2>
    <ul>
      {invitations.map(invitation => (
        <li key={invitation._id} className="flex items-center space-x-2 mb-2">
          {invitation.recipient.image && (
            <img
              src={`${API_URL}/uploads/${invitation.recipient.image}`}
              alt={`${invitation.recipient.username}'s avatar`}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-gray-800">{invitation.recipient.username} <div className='pl-10'><Tag  size='lg' colorScheme='red' borderRadius='full'>
  
  <TagLabel>Invited </TagLabel>
</Tag></div></span>
        </li>
      ))}
    </ul>
  </div>
);
};

export default PendingInvitations;
