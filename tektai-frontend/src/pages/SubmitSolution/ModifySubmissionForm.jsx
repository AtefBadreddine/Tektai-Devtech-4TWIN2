import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import submissionService from '../../services/submissionService';

const ModifySubmissionForm = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [notebookFile, setNotebookFile] = useState(null);
  const navigate = useNavigate();
  const { submissionId } = useParams();

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleNotebookChange = (e) => {
    setNotebookFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submission ID before update:", submissionId);
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('notebook', notebookFile);

      await submissionService.updateSubmission(submissionId, formData);
      console.log('Submission updated successfully.');
      navigate('/submissionslist');
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full mt-20">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white border rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="pdf" className="block text-gray-700">Upload New PDF:</label>
          <input type="file" id="pdf" accept=".pdf" onChange={handlePdfChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="notebook" className="block text-gray-700">Upload New Notebook:</label>
          <input type="file" id="notebook" accept=".ipynb" onChange={handleNotebookChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
    </div>
  );
};

export default ModifySubmissionForm;
