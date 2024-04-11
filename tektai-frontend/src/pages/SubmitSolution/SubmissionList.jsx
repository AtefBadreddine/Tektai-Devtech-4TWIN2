import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/submissions/Allsubmition');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDownload = (filePath) => {
    console.log('Downloading file from:', filePath);
    window.open(filePath, '_blank');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>List of Submissions</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Team</th>
            <th>Challenge</th>
            <th>Download PDF</th>
            <th>Download Notebook</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td>{submission.team.name}</td>
              <td>{submission.challenge ? submission.challenge.title : 'No challenge assigned'}</td>
              <td>
                {/* Bouton de téléchargement pour le fichier PDF */}
                <button onClick={() => handleDownload(`http://localhost:3000/${submission.pdf}`)}>Download PDF</button>
              </td>
              <td>
                {/* Bouton de téléchargement pour le notebook */}
                <button onClick={() => handleDownload(`http://localhost:3000/${submission.notebook}`)}>Download Notebook</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionList;
