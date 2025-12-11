import axios from 'axios';

const apiClient = axios.create({
  /* 
   * LOCAL: http://localhost:8080/api/v1 
   * PROD: https://quickcutbe-production.up.railway.app/api/v1
   */
  baseURL:  'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
