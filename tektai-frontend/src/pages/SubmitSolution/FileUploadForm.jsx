import React, { useState, useEffect } from 'react';
import submissionService from "../../services/submissionService";
import teamsService from "../../services/teamServices"; // Importez le service pour récupérer les équipes

function FileUploadForm() {
  const [teamId, setTeamId] = useState('');
  const [pdf, setPdf] = useState(null);
  const [notebook, setNotebook] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Chargez les équipes lorsque le composant est monté
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const fetchedTeams = await teamsService.getAllTeams();
      setTeams(fetchedTeams);
    } catch (error) {
      console.error('Error fetching teams:', error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('teamId', teamId);
      formData.append('pdf', pdf);
      formData.append('notebook', notebook);

      await submissionService.uploadSubmission(formData);
      console.log('Submission successful');
    } catch (error) {
      console.error('Error submitting files:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleFormSubmit} className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="teamId" className="block text-gray-800 text-sm font-medium mb-1">Team:</label>
          <select id="teamId" value={teamId} onChange={(e) => setTeamId(e.target.value)} className="form-select w-full text-gray-800">
            <option value="">Select Team</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="pdf" className="block text-gray-800 text-sm font-medium mb-1">PDF File:</label>
          <input type="file" id="pdf" accept=".pdf" onChange={(e) => setPdf(e.target.files[0])} className="form-input w-full text-gray-800" />
        </div>
        <div className="mb-4">
          <label htmlFor="notebook" className="block text-gray-800 text-sm font-medium mb-1">Notebook File (.py only):</label>
          <input type="file" id="notebook" accept=".py" onChange={(e) => setNotebook(e.target.files[0])} className="form-input w-full text-gray-800" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Submit</button>
      </form>
    </div>
  );
}

export default FileUploadForm;
