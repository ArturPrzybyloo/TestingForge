import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Use Render backend URL for production, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'arturprzybyloo.github.io' ? 
    'https://testingforge.onrender.com/api' : 
    'http://localhost:3002/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests if available
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token'); // Or get from context/store
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// You can also add an interceptor for responses to handle global errors like 401 Unauthorized
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: RetryAxiosRequestConfig | undefined = error.config;
    
    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.error('Unauthorized access - 401. Logging out or redirecting.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Example: Redirect to login page, ensure you have access to router history or useNavigate here
      // This is a common place to dispatch a logout action in a state management system
      // For simplicity, we might rely on ProtectedRoute components to handle redirection based on auth state.
      // window.location.href = '/login'; // Avoid direct manipulation if using React Router extensively
      
      // Reject with a custom error or the original error to stop further processing in the calling code
      return Promise.reject(error.response?.data || error.message);
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api; 