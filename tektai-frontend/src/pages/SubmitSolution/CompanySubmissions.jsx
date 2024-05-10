import React, { useState, useEffect } from 'react';
import submissionService from '../../services/submissionService';

const CompanySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [challenges, setChallenges] = useState([]);
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        console.log('Fetching challenges...');
        const challengesData = await submissionService.getCompanySubmissionsForChallenges();
        console.log('Challenges fetched successfully:', challengesData);
        setChallenges(challengesData);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchChallenges();
    }
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        console.log('Fetching submissions for challenge:', selectedChallenge);
        const submissionsData = await submissionService.getSubmissionsForChallenge(selectedChallenge);
        console.log('Submissions fetched successfully:', submissionsData);
        setSubmissions(submissionsData);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    if (selectedChallenge !== '') {
      fetchSubmissions();
    }
  }, [selectedChallenge]);

  const handleChallengeChange = (e) => {
    setSelectedChallenge(e.target.value);
  };

  return (
    <div>
      <h2>Company Submissions</h2>
      <div>
        <label htmlFor="challengeSelect">Select a Challenge:</label>
        <select id="challengeSelect" value={selectedChallenge} onChange={handleChallengeChange}>
          <option value="">Select a Challenge</option>
          {challenges.map((challenge) => (
            <option key={challenge.id} value={challenge.id}>
              {challenge.name}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Challenge</th>
            <th>PDF</th>
            <th>Notebook</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.team}</td>
              <td>{submission.challenge}</td>
              <td>{submission.pdf}</td>
              <td>{submission.notebook}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanySubmissions;
