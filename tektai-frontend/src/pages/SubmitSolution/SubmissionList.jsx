import React, { useEffect, useState } from 'react';
import axios from 'axios';
import submissionService from "../../services/submissionService"; // Service pour gérer les soumissions
import teamsService from "../../services/teamServices"; // Service pour gérer les équipes
import { useParams, useNavigate } from "react-router-dom";
import ModifySubmissionForm from '../SubmitSolution/ModifySubmissionForm';
import { FiDownload, FiTrash, FiEdit } from 'react-icons/fi'

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [userTeams, setUserTeams] = useState([]);
  const [userTeamName, setUserTeamName] = useState(''); // State to store the team name of the connected user
  const [challengeName, setChallengeName] = useState(''); // State to store the selected challenge name
  const [userChallenges, setUserChallenges] = useState([]); // State to store the challenges submitted by the user
  const { id: challengeId } = useParams();
  const navigate = useNavigate(); // Initialisez useNavigate

  useEffect(() => {
    checkUserLoggedIn(); // Vérifier si l'utilisateur est connecté au chargement du composant
  }, []);

  // Fonction pour vérifier si l'utilisateur est connecté
  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification depuis le stockage local

    if (!token) {
      console.log('Token not found in local storage'); // Afficher un message si le jeton n'est pas trouvé
      return;
    }

    console.log('Token found in local storage:', token); // Afficher le jeton s'il est trouvé
    fetchUserTeams(token); // Récupérer les équipes de l'utilisateur
    fetchUserChallenges(token); // Récupérer les challenges soumis par l'utilisateur
    fetchSubmissions(); // Fetch submissions once user is logged in
  };

  // Fonction pour récupérer les équipes de l'utilisateur
  const fetchUserTeams = async (token) => {
    try {
      const userTeams = await teamsService.getTeamsByToken(token);
      console.log('User teams:', userTeams); // Vérifiez que les équipes sont correctement récupérées
      setUserTeams(userTeams);
      if (userTeams.length > 0) {
        setUserTeamName(userTeams[0].name); // Set the default team name to the first team in the list
      }
    } catch (error) {
      console.error('Error fetching user teams:', error);
    }
  };

  // Fonction pour récupérer les challenges soumis par l'utilisateur
  const fetchUserChallenges = async (token) => {
    try {
      const userChallenges = await submissionService.getUserChallenges(token);
      console.log('User challenges:', userChallenges); // Vérifiez que les challenges soumis par l'utilisateur sont correctement récupérés
      setUserChallenges(userChallenges);
    } catch (error) {
      console.error('Error fetching user challenges:', error);
    }
  };

  // Fonction pour récupérer toutes les soumissions
  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/submissions/Allsubmition');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  // Fonction pour télécharger un fichier
  const handleDownload = (filePath) => {
    console.log('Downloading file from:', filePath);
    window.open(filePath, '_blank');
  };

  // Fonction pour changer le filtre par équipe
  const handleTeamFilterChange = (e) => {
    const teamName = e.target.value;
    setUserTeamName(teamName);
  };

  // Fonction pour changer le filtre par challenge
  const handleChallengeFilterChange = (e) => {
    const challengeName = e.target.value;
    setChallengeName(challengeName);
  };

  // Fonction pour supprimer une soumission
  const handleDeleteSubmission = async (submissionId) => {
    try {
      await submissionService.deleteSubmission(submissionId);
      // Recharger les soumissions après la suppression
      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };
   const handleModifySubmission = (submissionId) => {
    // Redirigez l'utilisateur vers le formulaire de modification avec l'ID de la soumission
    navigate(`/modify-submission/${submissionId}`);
  };

  return (

    <div className="container mx-auto overflow-x-auto">
      <h1 className="text-center text-3xl font-bold mb-6">List of Submissions</h1>
      <div className="mb-4">
        <label htmlFor="teamFilter" className="block text-gray-800 text-sm font-medium mb-1">Filter by Team:</label>
        <select id="teamFilter" value={userTeamName} onChange={handleTeamFilterChange} className="form-select w-full text-gray-800">
          <option value="">All Teams</option>
          {userTeams.map(team => (
            <option key={team._id} value={team.name}>{team.name}</option>
          ))}
        </select>
      </div>
      {/* <div className="mb-4">
        <label htmlFor="challengeFilter" className="block text-gray-800 text-sm font-medium mb-1">Filter by Challenge:</label>
        <select id="challengeFilter" value={challengeName} onChange={handleChallengeFilterChange} className="form-select w-full text-gray-800">
          <option value="">All Challenges</option>
          {userChallenges.map(challenge => (
            <option key={challenge._id} value={challenge.title}>{challenge.title}</option>
          ))}
        </select>
      </div> */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 sm:w-1/5">Team</th>
              <th className="border px-2 py-1 sm:w-1/5">Challenge</th>
              <th className="border px-2 py-1 sm:w-1/5">Download PDF</th>
              <th className="border px-2 py-1 sm:w-1/5">Download Notebook</th>
              <th className="border px-2 py-1 sm:w-1/5">Actions</th> {/* Nouvelle colonne pour les actions */}
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              ((userTeamName === '' || submission.team.name === userTeamName) && (challengeName === '' || (submission.challenge && submission.challenge.title === challengeName))) && (
                <tr key={submission._id} className="border-t">
                  <td className="border px-2 py-1">{submission.team.name}</td>
                  <td className="border px-2 py-1">{submission.challenge ? submission.challenge.title : 'No challenge assigned'}</td>
                  <td className="border px-2 py-1">
                  <button className="bg-blue-200 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded" onClick={() => handleDownload(`http://localhost:3000/${submission.pdf}`)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1 .1-.2 .1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"/>
                  </svg>
                </button>
                  </td>
                  <td className="border px-2 py-1">
                  <button className="bg-blue-200 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded" onClick={() => handleDownload(`http://localhost:3000/${submission.notebook}`)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-4 h-4">
                    <path d="M128 32C92.7 32 64 60.7 64 96V352h64V96H512V352h64V96c0-35.3-28.7-64-64-64H128zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480H563.2c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2H19.2z"/>
                  </svg>
                </button>

                  </td>
                  <td className="border px-2 py-1">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mx-2 rounded" onClick={() => handleDeleteSubmission(submission._id)}>
                      <FiTrash size={16} />
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-2 rounded" onClick={() => handleModifySubmission(submission._id)}>
                      <FiEdit size={16} />
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
    


  
  );
};

export default SubmissionList;
