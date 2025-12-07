import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://quickcutbe-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
