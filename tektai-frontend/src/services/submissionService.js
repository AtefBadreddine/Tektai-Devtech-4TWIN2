import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

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


   getCompanySubmissionsForChallenges: async () => {
    try {
      const response = await axios.get(`${API_URL}/submissions/companysubmissions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Vous devrez peut-être ajuster cela en fonction de la façon dont vous gérez le token JWT dans votre application React
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  
};


export default submissionService;
