import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your backend API base URL

const TeamsService = {
  createTeam: async (teamData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/teams`, teamData);
      return response.data;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  },

  getAllTeams: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teams`);
      return response.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  getTeamById: async (teamId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teams/${teamId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching team:", error);
      throw error;
    }
  },

  updateTeam: async (teamId, updatedTeamData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/teams/${teamId}`,
        updatedTeamData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    }
  },

  deleteTeam: async (teamId) => {
    try {
      await axios.delete(`${API_BASE_URL}/teams/${teamId}`);
    } catch (error) {
      console.error("Error deleting team:", error);
      throw error;
    }
  },
  addMember: async (teamId, memberId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teams/${teamId}/members/${memberId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  removeMember: async (teamId, memberId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/teams/${teamId}/members/${memberId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  updateTeamName: async (teamId, newName) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/teams/${teamId}/update-name`,
        { name: newName }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating team name:", error);
      throw error;
    }
  },

  changeTeamLeader: async (teamId, newLeaderId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/teams/${teamId}/change-leader`,
        { newLeaderId: newLeaderId }
      );
      return response.data;
    } catch (error) {
      console.error("Error changing team leader:", error);
      throw error;
    }
  },
  sendInvitation: async (teamId, memberId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teams/invitations/${teamId}/send`,
        { memberId: memberId }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending invitation:", error);
      throw error;
    }
  },

  acceptInvitation: async (invitationId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/teams/invitations/${invitationId}/accept`
      );
      return response.data;
    } catch (error) {
      console.error("Error accepting invitation:", error);
      throw error;
    }
  },

  removeInvitation: async (invitationId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/teams/invitations/${invitationId}/remove`
      );
      return response.data;
    } catch (error) {
      console.error("Error removing invitation:", error);
      throw error;
    }
  },
};

export default TeamsService;
