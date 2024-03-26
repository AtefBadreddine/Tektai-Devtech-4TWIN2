import React, { useState } from 'react';
import submissionService from "../../services/submissionService";

function FileUploadForm() {
  const [TeamId, setTeamId] = useState('');
  const [pdf, setPdf] = useState(null);
  const [notebook, setNotebook] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('TeamId', TeamId);
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
          <label htmlFor="TeamId" className="block text-gray-800 text-sm font-medium mb-1">Team ID:</label>
          <input type="text" id="TeamId" value={TeamId} onChange={(e) => setTeamId(e.target.value)} className="form-input w-full text-gray-800" />
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
