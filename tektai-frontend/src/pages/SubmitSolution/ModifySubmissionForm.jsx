import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import submissionService from '../../services/submissionService';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';

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


      <form onSubmit={handleSubmit} className="p-8 ">
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
      </div>
    </section>
    <Footer/>
  </>
  );
};

export default ModifySubmissionForm;
