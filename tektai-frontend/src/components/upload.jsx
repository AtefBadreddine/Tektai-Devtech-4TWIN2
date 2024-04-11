import React from 'react';

class FileUploadComponent extends React.Component {
    handleFileUpload = async (e, username) => {
        try {
            const uploadedFile = e.target.files[0]; // Assuming single file upload
            const fileExtension = uploadedFile.name.split('.').pop();
            const newFileName = `${username}.${fileExtension}`;

            const formData = new FormData();
            formData.append('file', uploadedFile);
            formData.append('filename', newFileName);

            // Make a POST request to your backend server to handle the file upload
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('File uploaded successfully!');
            } else {
                console.error('Error uploading file:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    render() {
        return (
            <div>
                <input type="file" onChange={(e) => this.handleFileUpload(e, 'example_username')} />
            </div>
        );
    }
}

export default FileUploadComponent;
