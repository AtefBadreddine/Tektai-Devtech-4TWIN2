import axios from "axios";

const url = "http://localhost:3000";

const UserService = {
  getJWT: async (username, pwd, rememberMe = false) => {
    try {
      const response = await axios.post(`${url}/auth/login`, {
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
      const response = await axios.post(`${url}/auth/signup`, userData);

      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      return { error: "failed to signup" };
    }
  },
  getProfile: async (userId, access_token) => {
    try {
      const response = await axios.get(`${url}/users/profile/${userId}`, {
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
      const response = await axios.get(`${url}/users/connectedUser`, {
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
        `${url}/users/get/${encodeURIComponent(email)}`,
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
      const response = await axios.get(`${url}/users/getall`, {
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
      const response = await axios.delete(`${url}/users/${userId}`, {
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
        `${url}/users/${userId}`,
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
      const response = await axios.post(`${url}/auth/forget-password`, email);

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
        `${url}/users/block/${userId}`,
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
      const response = await axios.get(`${url}/users/${id}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      return { error: "failed to get user by ID" };
    }
  },
  getUserTeams: async (userId) => {
    try {
      const response = await axios.get(`${url}/teams/user/joined`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user teams:", error);
      throw error;
    }
  },
};

export default UserService;
