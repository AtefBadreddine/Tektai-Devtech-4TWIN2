import React, { useState, useEffect } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { FaFilePdf, FaFileVideo, FaDatabase } from 'react-icons/fa';
import { Box, Button, Text } from '@chakra-ui/react';
import { FaMoneyBill, FaUsers, FaEye, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import {FaNoteSticky, FaRegNoteSticky} from "react-icons/fa6";

function CompanySubmissionsn() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [evaluation, setEvaluation] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const companyId = JSON.parse(localStorage.getItem('user')).id;
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch(`${API_URL}/submissions/Allsubmition`);
        const data = await response.json();
        console.log(data)
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    }

    fetchSubmissions();
  }, []);

  // Function to open the modal and set the selected submission
  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setEvaluation(submission.evaluation || 0); // Set evaluation from submission
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setShowSuccessMessage(false); // Hide success message when closing modal
  };

  // Function to handle evaluation slider change
  const handleEvaluationChange = (e) => {
    setEvaluation(parseInt(e.target.value));
  };

  // Function to submit evaluation
  const submitEvaluation = async () => {
    try {
      const response = await fetch(`${API_URL}/submissions/evaluation/${selectedSubmission._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ evaluation })
      });
      if (response.ok) {
        // If evaluation is successfully updated, close the modal and update the submission
        setModalIsOpen(false);
        setShowSuccessMessage(true);
        const updatedSubmissions = submissions.map(submission =>
          submission._id === selectedSubmission._id ? { ...submission, evaluation } : submission
        );
        setSubmissions(updatedSubmissions);
      } else {
        console.error('Failed to update evaluation');
      }
    } catch (error) {
      console.error('Error updating evaluation:', error);
    }
  };

  // Define a function to determine the color based on the evaluation value
  const getColor = (evalValue) => {
    if (evalValue >= 75) return 'bg-green-500'; // Green
    if (evalValue >= 50) return 'bg-yellow-500'; // Yellow
    if (evalValue >= 25) return 'bg-orange-500'; // Orange
    return 'bg-red-500'; // Red
  };
  
  return (
    <div>
      <Header />
      <div className="p-32">
        {submissions.map(submission => (
          (submission.challenge.status === 'Ongoing' || submission.challenge.status === 'Completed') &&
          <div key={submission._id} className="border border-gray-300 rounded-lg p-4 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Challenge : {submission.challenge.title}</h2>
            <div className="mb-4">
              <div className="flex gap-4">
                <p className="flex items-center"><strong className="m-2 text-blue-500 text-3xl"><FaMoneyBill /></strong> Prize: {submission.challenge.prize} DT</p>
                <p className="flex items-center"><strong className="m-2 text-green-500 text-3xl"><FaUsers /></strong> Eligible Participants: {submission.challenge.eligible_participants}</p>
                <div className="flex gap-2 flex-1 justify-end">
                  <p className="flex items-center"><strong className="m-2 text-yellow-500 text-3xl"><FaEye /></strong> Visibility: {submission.challenge.visibility}</p>
                  <p className="flex items-center"><strong className="m-2 text-gray-500 text-3xl"><FaInfoCircle /></strong> Status: {submission.challenge.status}</p>
                </div>

              </div>
              <div className="flex gap-4">

                <p className="flex items-center"><strong className="m-2 text-gray-500 text-3xl"><FaCalendarAlt /></strong> Start Date: {new Date(submission.challenge.start_date).toLocaleDateString()}</p>
                <p className="flex items-center"><strong className="m-2 text-gray-500 text-3xl"><FaCalendarAlt /></strong> Deadline: {new Date(submission.challenge.deadline).toLocaleDateString()}</p>
              </div>
              <p className="flex items-center"><strong className="m-2 text-gray-500 text-3xl"><FaRegNoteSticky /></strong> Description: {submission.challenge.description}</p>

          </div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Team Name</th>
                  <th className="px-4 py-2">PDF</th>
                  <th className="px-4 py-2">Notebook</th>
                  <th className="px-4 py-2">Presentation</th>
                  <th className="px-4 py-2">Dataset</th>
                  <th className="px-4 py-2">Evaluation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">{submission.team.name || 'Not Required'}</td>
                  <td className="px-4 py-2">
                    {submission.pdf ? (
                      <a href={`${API_URL}/${submission.pdf}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                        <FaFilePdf /> PDF
                      </a>
                    ) : (
                      <span>Not Required</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {submission.notebook ? (
                      <a href={`${API_URL}/${submission.notebook}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                        Notebook
                      </a>
                    ) : (
                      <span>Not Required</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {submission.presentation ? (
                      <a href={`${API_URL}/${submission.presentation}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                        {submission.presentation.endsWith('.mp4') ? <FaFileVideo /> : <FaFilePdf />} Presentation
                      </a>
                    ) : (
                      <span>Not Required</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {submission.dataset ? (
                      <a href={`${API_URL}/${submission.dataset}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                        <FaDatabase /> Dataset
                      </a>
                    ) : (
                      <span>Not Required</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                  <td className="px-4 py-2">
  <div className="flex items-center justify-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getColor(submission.evaluation)}`}>
      <span className="text-lg">{submission.evaluation}%</span>
    </div>
  </div>
</td>

                  </td>
                  <td className="px-4 py-2">
                    <button onClick={() => openModal(submission)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Evaluate
                    </button>
                    {/* Modal for evaluation */}
                    {modalIsOpen && (
                      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
                        <div className="bg-white p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
                          <span className="absolute top-2 right-2 cursor-pointer text-gray-500" onClick={closeModal}>&times;</span>
                          <h2 className="text-xl font-semibold mb-4">Evaluate Submission</h2>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={evaluation}
                            onChange={handleEvaluationChange}
                            className={`block w-full appearance-none rounded-full h-3 ${getColor()}`}
                          />
                          <Text className="text-center">Evaluation: {evaluation}</Text>
                          <Button onClick={submitEvaluation} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">Submit Evaluation</Button>
                          {/* Success message */}
                          {showSuccessMessage && (
                            <Box mt={4} bg="green.100" border="green.400" color="green.900" p={4} rounded="md">
                              Evaluation submitted successfully!
                            </Box>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default CompanySubmissionsn;
