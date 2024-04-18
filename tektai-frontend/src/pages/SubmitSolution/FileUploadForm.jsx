import React, { useState, useEffect } from 'react';
import submissionService from "../../services/submissionService"; // Service pour gérer les soumissions
import teamsService from "../../services/teamServices"; // Service pour gérer les équipes
import { useParams ,useNavigate } from "react-router-dom";
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

function FileUploadForm() {
  const [teamId, setTeamId] = useState(''); // État pour stocker l'ID de l'équipe sélectionnée
  const [pdf, setPdf] = useState(null); // État pour stocker le fichier PDF sélectionné
  const [notebook, setNotebook] = useState(null); // État pour stocker le fichier de notebook sélectionné
  const [teams, setTeams] = useState([]); // État pour stocker la liste des équipes disponibles
const { id: challengeId } = useParams();
 const navigate = useNavigate(); // Initialisez useNavigate
  useEffect(() => {
    checkUserLoggedIn(); // Vérifier si l'utilisateur est connecté au chargement du composant
  }, []);

  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification depuis le stockage local

    if (!token) {
      console.log('Token not found in local storage'); // Afficher un message si le jeton n'est pas trouvé
      return;
    }

    console.log('Token found in local storage:', token); // Afficher le jeton s'il est trouvé
    fetchUserTeams(token); // Récupérer les équipes de l'utilisateur
  };

  const fetchUserTeams = async (token) => {
    try {
      const userTeams = await teamsService.getTeamsByToken(token);
      console.log('User teams:', userTeams); // Vérifiez que les équipes sont correctement récupérées
      setTeams(userTeams);
    } catch (error) {
      console.error('Error fetching user teams:', error);
    }
  };

  const handleTeamChange = (e) => {
    const selectedTeamId = e.target.value;
    console.log('Selected Team ID:', selectedTeamId); // Vérifiez que l'ID de l'équipe sélectionnée est correct
    setTeamId(selectedTeamId);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire
    try {
      const selectedTeam = teams.find(team => team._id === teamId); // Trouver l'objet équipe correspondant à l'ID sélectionné
      console.log("Selected Team:", selectedTeam); // Afficher l'équipe sélectionnée dans la console

      if (!selectedTeam) {
        console.error('Error: No team found with the selected ID'); // Afficher un message d'erreur si aucun objet équipe correspondant n'est trouvé
        return;
      }

      if (!pdf || !notebook) {
        console.error('Error: PDF and Notebook files are required'); // Afficher un message d'erreur si les fichiers PDF et Notebook ne sont pas sélectionnés
        return;
      }

      console.log("Team ID before submission:", teamId); // Afficher l'ID de l'équipe avant l'envoi
       console.log("Challenge ID:", challengeId);// Afficher l'ID du challenge récupéré de l'URL
      console.log("Form Data:", { teamId, pdf, notebook }); // Afficher les données du formulaire dans la console

      const formData = new FormData(); // Créer un nouvel objet FormData pour envoyer les données du formulaire
      formData.append('teamId', teamId); // Envoyer l'ID de l'équipe sélectionnée
      formData.append('challengeId', challengeId); // Envoyer l'ID du challenge
      formData.append('pdf', pdf); // Envoyer le fichier PDF sélectionné
      formData.append('notebook', notebook); // Envoyer le fichier de notebook sélectionné
    
      await submissionService.uploadSubmission(formData); // Envoyer les données du formulaire pour soumission
      console.log('Submission successful'); 
       navigate('/');// Afficher un message si la soumission est réussie
    } catch (error) {
      console.error('Error submitting files:', error.message); // Gérer les erreurs lors de la soumission du formulaire
    }
  };

  return (
  <>
    <Header/>

    <section className="p-40 bg-gray-100  bg-opacity-50 h-screen">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
{/* section1      */}
        <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <h1 className="text-gray-600">Submit solution</h1>
            </div>
          </div>
        </div>


        <div className="bg-white space-y-6">
{/* section2     */}
          <hr />

    <div className="">
      <form onSubmit={handleFormSubmit} className="p-8">
        <div className="mb-4">
          <label htmlFor="teamId" className="block text-gray-800 text-sm font-medium mb-1">Team:</label>
          <select id="teamId" value={teamId} onChange={handleTeamChange} className="form-select w-full text-gray-800">
            <option key="default" value="">Select Team</option>
            {teams.map(team => (
              <option key={team._id} value={team._id}>{team.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="pdf" className="block text-gray-800 text-sm font-medium mb-1">PDF File : (.pdf only)</label>
          <input type="file" id="pdf" accept=".pdf" onChange={(e) => setPdf(e.target.files[0])} className="form-input w-full text-gray-800" />
        </div>
        <div className="mb-4">
          <label htmlFor="notebook" className="block text-gray-800 text-sm font-medium mb-1">Notebook File (.py only):</label>
          <input type="file" id="notebook" accept=".py" onChange={(e) => setNotebook(e.target.files[0])} className="form-input w-full text-gray-800" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Submit</button>
      </form>
    </div>


    </div>
      </div>
    </section>
<div className="pt-3">
    <Footer/>
</div>
  </>
  );
}

export default FileUploadForm;
