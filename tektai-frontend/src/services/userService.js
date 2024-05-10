import axios from "axios";

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';


const UserService = {
  getJWT: async (username, pwd, rememberMe = false) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: username,
        password: pwd,
        rememberMe: rememberMe,
      });

      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      return { error: "failed to log in" };
    }
  },
  signup: async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post(`${API_URL}/auth/signup`, userData);

      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      return { error: "failed to signup" };
    }
  },
  getProfile: async (userId, access_token) => {
    try {
      const response = await axios.get(`${API_URL}/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      return { error: "failed to get user details" };
    }
  },
  getConnectedUser: async (access_token) => {
    try {
      const response = await axios.get(`${API_URL}/users/connectedUser`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      return { error: "failed to get user details" };
    }
  },
  getUser: async (access_token, email) => {
    try {
      const response = await axios.get(
        `${API_URL}/users/get/${encodeURIComponent(email)}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      return { error: "failed to get user details" };
    }
  },

  getAll: async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/users/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting all users:", error);
      return { error: "failed to get all users" };
    }
  },
  deleteUser: async (userId) => {
    let token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error delete:", error);
      return { error: "failed" };
    }
  },
  updateUser: async (userId, userDataToUpdate) => {
    let token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_URL}/users/${userId}`,
        userDataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      return { error: "failed" };
    }
  },
  resetPwd: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forget-password`, email);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return { error: "failed" };
    }
  },
  banUser: async (userId) => {
    let token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.put(
        `${API_URL}/users/block/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error blocking user:", error);
      return { error: "failed" };
    }
  },
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      return { error: "failed to get user by ID" };
    }
  },
  getUserTeams: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/teams/user/joined`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user teams:", error);
      throw error;
    }
  },
};

export default UserService;
