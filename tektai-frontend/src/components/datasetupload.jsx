

import React, { useState } from 'react';
import axios from 'axios';

const UploadfileForm = ({ challengeId }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmitfile = async (e) => {
    e.preventDefault();

    if (!challengeId) {
      setError('Challenge ID is required.');
      return;
    }

    if (!file) {
      setError('Please select an file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('dataset', file);

    try {
      const response = await axios.post(`${API_URL}/challenges/uploadfile/${challengeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('file uploaded successfully:', response.data);
      // Provide feedback to the user, e.g., display a success message
    } catch (error) {
      console.error('Failed to upload file:', error);
      setError('Failed to upload file. Please try again later.');
      // Provide feedback to the user, e.g., display an error message
    }
  };

  return (
    <form onSubmit={handleSubmitfile}>
     
     <div className="mb-4">
                    <label htmlFor="dataset" className="block mb-2 font-bold">Upload Dataset <span className="text-red-600">*</span></label>
                    <input type="file" onChange={handleFileChange} id="dataset" className="w-full p-2 border border-gray-300 rounded"/>
                </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}


    </form>
  );
};

export default UploadfileForm;
