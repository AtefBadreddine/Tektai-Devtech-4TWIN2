// import React, { useState } from 'react';
// import axios from 'axios';



// const ImageUpload = ({ userId }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];
//     setSelectedFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };
//   const handleUpload = async () => {
//     try {
//       if (!selectedFile || !userId) return;
//       const formData = new FormData();
//       formData.append('image', selectedFile);
//       await axios.put(`http://localhost:3000/users/${userId}`, formData);
//       console.log('Image uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };


//   return (
// <div>
//       <input type="file" onChange={handleFileChange} />
//       {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100px' }} />}
//       <button type="button" onClick={handleUpload}>Upload Image</button>
// </div>
//   );
// };

// export default ImageUpload;

import React, { useState } from 'react';
import axios from 'axios';

const UploadImageForm = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('User ID is required.');
      return;
    }

    if (!file) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.put(`http://localhost:3000/users/upload/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
      window.location.href = '/profile';

      // Provide feedback to the user, e.g., display a success message
    } catch (error) {
      console.error('Failed to upload image:', error);
      setError('Failed to upload image. Please try again later.');
      // Provide feedback to the user, e.g., display an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
      {error && <div style={{ color: 'red' }}>{error}</div>} */}


      
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input type="file" onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"/>
<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

      <div className="flex justify-end gap-4.5">
                  <button
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    type="submit"
                    >
                   Upload Image
                  </button>
                  
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}


    </form>
  );
};

export default UploadImageForm;
