import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const queryData = async (question) => {
  const response = await axios.post(`${BASE_URL}/query`, { question });
  return response.data;
};

export const getStatus = async () => {
  const response = await axios.get(`${BASE_URL}/status`);
  return response.data;
};
