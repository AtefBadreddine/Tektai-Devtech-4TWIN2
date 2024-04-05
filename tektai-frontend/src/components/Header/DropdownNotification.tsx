import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const DropdownNotification = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [notifying, setNotifying] = useState(true);
  const loggedInUser = JSON.parse(localStorage.getItem('user')); // Get the logged-in user from local storage

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user._id : null;

        const response = await axios.get(`http://localhost:3000/teams/invitations/`);
        console.log('Response:', response); // Log the response to inspect its structure
        const sortedInvitations = response.data
          .filter(invitation => invitation.recipient === loggedInUser._id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
          .map(invitation => ({
            ...invitation,
            _id: String(invitation._id) // Convert _id to string
          }));
        console.log('Sorted Invitations:', sortedInvitations); // Log the sorted invitations to inspect their structure
        setInvitations(sortedInvitations);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };

    fetchInvitations();
  }, []);


  const handleAccept = async (invitationId) => {
    try {
      await axios.post(`http://localhost:3000/teams/invitations/${invitationId}/accept`);
      // After accepting, fetch updated invitations

    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  const handleDecline = async (invitationId, userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/teams/invitations/${invitationId}/remove/${userId}`);
    
      // Log the response
      console.log('Response:', response);
      // Remove the declined invitation from the invitations array
      setInvitations(invitations.filter(invitation => invitation._id !== invitationId));

    } catch (error) {
      console.error('Error removing invitation:', error);
    }
  };



  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen1(!dropdownOpen1);
        }}
        to="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        {setInvitations.length}
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen1(true)}
        onBlur={() => setDropdownOpen1(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${dropdownOpen1 === true ? 'block' : 'hidden'
          }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification </h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {invitations.length === 0 ? (
            <li className="px-4.5 py-2 text-sm text-gray-500 dark:text-gray-400">No notifications for you.</li>
          ) : (
            invitations.map((invitation) => {
              const createdTime = new Date(invitation.createdAt);
              const currentTime = new Date();
              const timeDiffMinutes = Math.floor((currentTime - createdTime) / (1000 * 60)); // Difference in minutes
              const timeDiffHours = Math.floor(timeDiffMinutes / 60); // Difference in hours

              let timeAgoMessage = "";
              if (timeDiffMinutes < 1) {
                timeAgoMessage = "Just now";
              } else if (timeDiffMinutes === 1) {
                timeAgoMessage = "1 minute ago";
              } else if (timeDiffHours < 1) {
                timeAgoMessage = `${timeDiffMinutes} minutes ago`;
              } else if (timeDiffHours === 1) {
                timeAgoMessage = "1 hour ago";
              } else {
                timeAgoMessage = `${timeDiffHours} hours ago`;
              }

              return (
                <li key={invitation._id}>
                  <div className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
                    <div className="flex items-center">
                      <Avatar className="mx-2 transition duration-300 ease-in-out transform hover:scale-110" size="md" name={invitation.team?.leader?.username} src={`http://localhost:3000/uploads/${invitation.team?.leader?.image}`} />
                      <strong className="text-black dark:text-white">{invitation.team?.leader?.username}</strong>
                    </div>
                    <div className="flex items-center">
                      <div className="text-black dark:text-white">Invited you to <b>{invitation.team?.name.toUpperCase()}</b></div>
                    </div>
                    <p className="text-xs">{timeAgoMessage}</p>

                    <div className="flex items-center justify-between mt-2">
                      {invitation.accepted ? (
                        <div className="text-green-500">Invite Already Accepted</div>
                      ) : (
                        <>
                          {invitation.deleted ? (
                            <div className="text-red-500">This invitation has been declined.</div>
                          ) : (
                            <>
                              <button className="pl-25 text-green-500 hover:text-green-600 hover:scale-110" onClick={() => handleAccept(invitation._id)}>
                                <FontAwesomeIcon icon={faCheck} className="text-lg" />
                              </button>
                              <button className="pr-25 text-red-500 hover:text-red-600 hover:scale-110" onClick={() => handleDecline(invitation?._id, invitation?.recipient)}>
  <FontAwesomeIcon icon={faTimes} className="text-lg" />
</button>

                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })

          )}
        </ul>
      </div>
    </div>
  );
};

export default DropdownNotification;
