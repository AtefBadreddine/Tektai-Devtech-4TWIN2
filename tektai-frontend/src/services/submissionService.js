import axios from 'axios';

const API_URL = 'http://localhost:3000';

const submissionService = {
  uploadSubmission: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/submissions/upload2`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default submissionService;
