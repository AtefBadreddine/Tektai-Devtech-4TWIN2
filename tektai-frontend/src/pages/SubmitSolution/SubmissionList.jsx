import React, { useEffect, useState } from 'react';
import axios from 'axios';
import submissionService from "../../services/submissionService"; // Service pour gérer les soumissions
import teamsService from "../../services/teamServices"; // Service pour gérer les équipes
import { useParams, useNavigate } from "react-router-dom";
import ModifySubmissionForm from '../SubmitSolution/ModifySubmissionForm';
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
    <div className="container mx-auto">
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
      <div className="mb-4">
        <label htmlFor="challengeFilter" className="block text-gray-800 text-sm font-medium mb-1">Filter by Challenge:</label>
        <select id="challengeFilter" value={challengeName} onChange={handleChallengeFilterChange} className="form-select w-full text-gray-800">
          <option value="">All Challenges</option>
          {userChallenges.map(challenge => (
            <option key={challenge._id} value={challenge.title}>{challenge.title}</option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Team</th>
            <th className="border px-4 py-2">Challenge</th>
            <th className="border px-4 py-2">Download PDF</th>
            <th className="border px-4 py-2">Download Notebook</th>
            <th className="border px-4 py-2">Actions</th> {/* Nouvelle colonne pour les actions */}
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            ((userTeamName === '' || submission.team.name === userTeamName) && (challengeName === '' || (submission.challenge && submission.challenge.title === challengeName))) && (
              <tr key={submission._id} className="border-t">
                <td className="border px-4 py-2">{submission.team.name}</td>
                <td className="border px-4 py-2">{submission.challenge ? submission.challenge.title : 'No challenge assigned'}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDownload(`http://localhost:3000/${submission.pdf}`)}>Download PDF</button>
                </td>
                
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDownload(`http://localhost:3000/${submission.notebook}`)}>Download Notebook</button>
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteSubmission(submission._id)}>Delete</button>
                </td> {/* Bouton pour supprimer la soumission */}
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleModifySubmission(submission._id)}>Modify</button>
                </td>
              </tr>
              
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionList;
