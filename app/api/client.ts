import axios from 'axios';

const apiClient = axios.create({
  /*
   * CLIENT: Use relative path (proxied by next.config.js)
   * SERVER: Use direct env var (because proxy doesn't work on server-side calls without full URL)
   */
  // @ts-ignore
  baseURL: typeof window === 'undefined' 
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") // Server side
    : '/api/v1', // Client side: Use proxy (which forwards to NEXT_PUBLIC_API_URL)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log the effective backend URL for debugging
if (typeof window !== 'undefined') {
  console.log('🚀 Connected Backend URL:', process.env.NEXT_PUBLIC_API_URL);
}





export default apiClient;
