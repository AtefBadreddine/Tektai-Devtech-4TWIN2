import axios from 'axios';

const API_URL = 'http://localhost:3000';

const submissionService = {
  uploadSubmission: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/submissions/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllSubmissions: async () => {
    try {
      const response = await axios.get(`${API_URL}/submissions/Allsubmition`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteSubmission: async (submissionId) => {
    try {
      await axios.delete(`${API_URL}/submissions/DeleteSubmition/${submissionId}`);
    } catch (error) {
      console.error('Error deleting submission:', error);
      throw error;
    }
  },
  async updateSubmission(id, files) {
    try {
      const formData = new FormData();
      formData.append('pdf', files.pdf);
      formData.append('notebook', files.notebook);

      const response = await axios.put(`${API_URL}/submissions/UpdateSubmition/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
};


export default submissionService;
