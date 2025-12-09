import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://quickcutbe-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
