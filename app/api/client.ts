import axios from 'axios';

const apiClient = axios.create({
  /*
   * CLIENT: Use relative path (proxied by next.config.js)
   * SERVER: Use direct env var (because proxy doesn't work on server-side calls without full URL)
   */
  baseURL: typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
