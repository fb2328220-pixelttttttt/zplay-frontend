import axios from 'axios';

const BASE_URL = 'https://zplay-backend-2w91.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
