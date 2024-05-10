import React, { useEffect, useState } from 'react';
import TeamsService from '../../services/teamServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUser, faCog, faTrash, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { Alert, AlertIcon, Avatar } from '@chakra-ui/react';

function JoinedTeams() {
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  useEffect(() => {
    async function fetchJoinedTeams() {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        const joinedTeams = await TeamsService.findAllJoinedTeams(loggedInUser._id); // Assuming you pass user id to the API
        setJoinedTeams(joinedTeams);
        setLoading(false); // Set loading to false after fetching teams
      } catch (error) {
        console.error('Error fetching joined teams:', error);
      }
    }

    fetchJoinedTeams();
  }, []);

  return (
    <div>
      <div className='pb-16'>
        {/* <Header /> */}
      </div>
      <div className="container mx-auto px-4 py-8 pt-7">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Joined Teams</h1>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {joinedTeams.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-4">
                <Alert status="warning">
                  <AlertIcon />
                  You haven't joined any teams yet.
                </Alert>
              </div>
            ) : (
              joinedTeams.map((team) => (
                <div key={team._id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="my-4 text-xl font-semibold">Team : {team.name}</h2>
                    <div>
                      <button className="text-2xl text-red-500 mr-2 hover:text-red-700 inline-flex gap-x-1 items-center" onClick={() => handleLeaveTeam(team._id)}> Leave
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </button>
                    </div>
                  </div>
                  <div className="mb-2 flex items-center">
                    <div className=" mr-2 font-bold">Leader :</div>
                    <div className="text-gray-600 mb-2 flex items-center hover:text-blue-500">
                      <div><Avatar className='mx-2 transition duration-300 ease-in-out transform hover:scale-110' size='md' name={team.leader?.username} src={`${API_URL}/uploads/${team.leader?.image}`} /></div>
                      {team.leader?.username}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <span className="px-3 py-1   text-sm text-white bg-green-500 rounded-full">{team.members.length} Members</span>

                  </div>

                  <div className="list-disc list-inside">
                    {team.members.map((member) => (
                      <div key={member._id} className="ml-4">
                        <a href={`/profile/${member?.username}`} className="text-black dark:text-white flex items-center hover:text-blue-500">
                          <div><Avatar className='m-2 transition duration-300 ease-in-out transform hover:scale-110' size='sm' name={member?.username} src={`${API_URL}/uploads/${member?.image}`} /></div>
                          {member?.username}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default JoinedTeams;
