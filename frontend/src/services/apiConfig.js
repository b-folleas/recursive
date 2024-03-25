import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export default apiService;
