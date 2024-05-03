import React, { useState, useEffect } from 'react';
import submissionService from "../../services/submissionService";
import teamsService from "../../services/teamServices";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

function FileUploadForm() {
  const [teamId, setTeamId] = useState('');
  const [pdf, setPdf] = useState(null);
  const [notebook, setNotebook] = useState(null);
  const [presentation, setPresentation] = useState(null);
  const [excel, setExcel] = useState(null);
  const [archive, setArchive] = useState(null);
  const [teams, setTeams] = useState([]);
  const { id: challengeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found in local storage');
      return;
    }

    fetchUserTeams(token);
  };

  const fetchUserTeams = async (token) => {
    try {
      const userTeams = await teamsService.getTeamsByToken(token);
      setTeams(userTeams);
    } catch (error) {
      console.error('Error fetching user teams:', error);
    }
  };

  const handleTeamChange = (e) => {
    setTeamId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedTeam = teams.find(team => team._id === teamId);

      if (!selectedTeam) {
        console.error('Error: No team found with the selected ID');
        return;
      }

   /*   if (!pdf || !notebook || !presentation || !excel || !archive) {
        console.error('Error: All files (PDF, Notebook, Presentation, Excel, and Archive) are required');
        return;
      }*/

      const formData = new FormData();
      formData.append('teamId', teamId);
      formData.append('challengeId', challengeId);
      formData.append('pdf', pdf);
      formData.append('notebook', notebook);
      formData.append('presentation', presentation);
      formData.append('excel', excel);
      formData.append('archive', archive);

      await submissionService.uploadSubmission(formData);
      navigate('/');
    } catch (error) {
      console.error('Error submitting files:', error.message);
    }
  };

  return (
    <>
      <Header />
      <section className="p-40 bg-gray-100 bg-opacity-50 h-screen">
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">

          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <h1 className="text-gray-600">Submit Solution</h1>
              </div>
            </div>
          </div>

          <div className="bg-white space-y-6">
            <hr />

            <div>
              <form onSubmit={handleFormSubmit} className="p-8">
                <div className="mb-4">
                  <label htmlFor="teamId" className="block text-gray-800 text-sm font-medium mb-1">Team:</label>
                  <select id="teamId" value={teamId} onChange={handleTeamChange} className="form-select w-full text-gray-800">
                    <option value="">Select Team</option>
                    {teams.map(team => (
                      <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="pdf" className="block text-gray-800 text-sm font-medium mb-1">PDF File (.pdf):</label>
                  <input type="file" id="pdf" accept=".pdf" onChange={(e) => setPdf(e.target.files[0])} className="form-input w-full text-gray-800" />
                </div>

                <div className="mb-4">
                  <label htmlFor="notebook" className="block text-gray-800 text-sm font-medium mb-1">Notebook File (.py):</label>
                  <input type="file" id="notebook" accept=".py" onChange={(e) => setNotebook(e.target.files[0])} className="form-input w-full text-gray-800" />
                </div>

                <div className="mb-4">
                  <label htmlFor="presentation" className="block text-gray-800 text-sm font-medium mb-1">Presentation File (.mp4):</label>
                  <input type="file" id="presentation" accept=".mp4" onChange={(e) => setPresentation(e.target.files[0])} className="form-input w-full text-gray-800" />
                </div>

                <div className="mb-4">
                  <label htmlFor="excel" className="block text-gray-800 text-sm font-medium mb-1">Excel File (.xlsx, .xls):</label>
                  <input type="file" id="excel" accept=".xlsx, .xls" onChange={(e) => setExcel(e.target.files[0])} className="form-input w-full text-gray-800" />
                </div>

                <div className="mb-4">
                  <label htmlFor="archive" className="block text-gray-800 text-sm font-medium mb-1">Archive File (.rar):</label>
                  <input type="file" id="archive" accept=".rar" onChange={(e) => setArchive(e.target.files[0])} className="form-input w-full text-gray-800" />
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Submit</button>
              </form>
            </div>

          </div>
        </div>
      </section>

     
    </>
  );
}

export default FileUploadForm;
