import axios from 'axios';

const url = "http://localhost:3000";

const UserService = {
    getJWT: async (username, pwd) => {
        try {
            const response = await axios.post(`${url}/auth/login`, {
                username: username,
                password: pwd
            });

            return response.data;

        } catch (error) {
            console.error('Error during login:', error);
            return { error: 'failed to log in' };
        }
    },
    signup : async (userData) => {
        try {
            console.log(userData)
            const response = await axios.post(`${url}/auth/signup`, userData);

            return response.data;


        } catch (error) {
            console.error('Error getting user:', error);
            return { error: 'failed to signup' };
        }
    },

    getUser: async (access_token, email) => {
        try {
            const response = await axios.get(`${url}/users/get/${encodeURIComponent(email)}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });

            return response.data;

        } catch (error) {
            console.error('Error getting user:', error);
            return { error: 'failed to get user details' };
        }
    },

    getAll: async (token) => {
        try {
            const response = await axios.get(`${url}/users/getall`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;

        } catch (error) {
            console.error('Error getting all users:', error);
            return { error: 'failed to get all users' };
        }
    },
    deleteUser: async (userId) => {
        let token = localStorage.getItem('token')
        try {
            const response = await axios.delete(`${url}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;

        } catch (error) {
            console.error('Error delete:', error);
            return { error: 'failed' };
        }
    },
    updateUser : async (userId, userDataToUpdate) => {
        let token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${url}/users/${userId}`, userDataToUpdate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;

        } catch (error) {
            console.error('Error updating user:', error);
            return { error: 'failed' };
        }

    },
    resetPwd: async (email) => {
        try {
            const response = await axios.post(`${url}/auth/forget-password`, email);

            return response.data;

        } catch (error) {
            console.error('Error:', error);
            return { error: 'failed' };
        }
    }
};

export default UserService;
