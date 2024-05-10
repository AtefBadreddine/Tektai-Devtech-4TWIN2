

import React, { useState } from 'react';
import axios from 'axios';

const UploadimageChallengeForm = ({ challengeId }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!challengeId) {
      setError('Challenge ID is required.');
      return;
    }

    if (!file) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${API_URL}/challenges/uploadimage/${challengeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('image uploaded successfully:', response.data);
      // Provide feedback to the user, e.g., display a success message
    } catch (error) {
      console.error('Failed to upload file:', error);
      setError('Failed to upload file. Please try again later.');
      // Provide feedback to the user, e.g., display an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>

     <label htmlFor="image" className="block mb-2 font-bold">Upload Image</label>
     <input type="file" onChange={handleFileChange}  id="image" className="w-full p-2 border border-gray-300 rounded"/>
     <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>


      {error && <div style={{ color: 'red' }}>{error}</div>}


    </form>
  );
};

export default UploadimageChallengeForm;
