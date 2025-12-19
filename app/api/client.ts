import axios from 'axios';

declare global {
  interface Window {
    __ENV__: {
      NEXT_PUBLIC_API_URL?: string;
    };
  }
}


const apiClient = axios.create({
  /*
   * CLIENT: Use relative path (proxied by next.config.js)
   * SERVER: Use direct env var (because proxy doesn't work on server-side calls without full URL)
   */
  // @ts-ignore
  baseURL: typeof window === 'undefined' 
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") // Server side (with fallback just in case)
    : (window.__ENV__?.NEXT_PUBLIC_API_URL || '/api/v1'), // Client side: Runtime injected value OR fallback path
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
