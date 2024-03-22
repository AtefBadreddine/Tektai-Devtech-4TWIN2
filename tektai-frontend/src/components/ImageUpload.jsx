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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('User ID is required.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.put(`http://localhost:3000/users/upload/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UploadImageForm;
