// localisationService.js

import axios from 'axios';


const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

const fetchLocalisations = async () => {
  const response = await axios.get(`${API_URL}/localisations/getlocalisation`);
  return response.data;
};

const createLocalisation = async (localisationData) => {
  const response = await axios.post(`${API_URL}/localisations/addlocalisation`, localisationData);
  return response.data;
};

const updateLocalisation = async (localisationId, updateData) => {
  const response = await axios.put(`${API_URL}/localisations/updatelocalisation/${localisationId}`, updateData);
  return response.data;
};

const deleteLocalisation = async (localisationId) => {
  const response = await axios.delete(`${API_URL}/localisations/deletelocalisation/${localisationId}`);
  return response.data;
};

export { fetchLocalisations, createLocalisation, updateLocalisation, deleteLocalisation };
