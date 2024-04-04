import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace this with your backend API base URL

const challengeService = {
  getAllChallenges: async () => {
    try {
      const response = await axios.get(`${baseURL}/challenges`);
      return response.data;
    } catch (error) {
      console.error('Error getting all challenges:', error);
      throw error;
    }
  },

  getChallengeById: async (id) => {
    try {
      const response = await axios.get(`${baseURL}/challenges/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting challenge with ID ${id}:`, error);
      throw error;
    }
  },

  createChallenge: async (challengeData) => {
    try {
      const response = await axios.post(`${baseURL}/challenges`, challengeData);
      return response.data;
    } catch (error) {
      console.error('Error creating challenge:', error);
      throw error;
    }
  },

  updateChallenge: async (id, challengeData) => {
    try {
      const response = await axios.put(`${baseURL}/challenges/setting/${id}`, challengeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating challenge with ID ${id}:`, error);
      throw error;
    }
  },

  deleteChallenge: async (id) => {
    try {
      await axios.delete(`${baseURL}/challenges/${id}`);
    } catch (error) {
      console.error(`Error deleting challenge with ID ${id}:`, error);
      throw error;
    }
  },

  searchChallengesByTitle: async (title) => {
    try {
      const response = await axios.get(`${baseURL}/challenges/search?title=${title}`);
      return response.data;
    } catch (error) {
      console.error('Error searching challenges by title:', error);
      throw error;
    }
  },

  filterChallenges: async (status, startDate, deadline) => {
    try {
      const response = await axios.get(`${baseURL}/challenges/filter?status=${status}&startDate=${startDate}&deadline=${deadline}`);
      return response.data;
    } catch (error) {
      console.error('Error filtering challenges:', error);
      throw error;
    }
  }
};

export default challengeService;
