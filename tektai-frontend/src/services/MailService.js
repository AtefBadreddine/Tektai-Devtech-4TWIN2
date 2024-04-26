import axios from 'axios';

const API_URL = 'http://localhost:3000';

const mailService = {
    confirmMail: async (token) => {
        try {
            const response = await axios.post(`${API_URL}/mails/confirm-mail`, { token : token});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};


export default mailService;
