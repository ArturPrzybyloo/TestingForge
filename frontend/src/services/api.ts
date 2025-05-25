import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- MOCK BACKEND START ---
// Dummy users DB (in-memory)
const mockUsers = [
  {
    _id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'test123',
    isAdmin: true,
  },
];

// Helper to create a fake JWT (base64, not secure, just for demo)
function createFakeJWT(user: any) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24h
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    exp,
  };
  function b64(obj: any) {
    return btoa(JSON.stringify(obj));
  }
  return `${b64(header)}.${b64(payload)}.signature`;
}

// Intercept POST requests to /auth/login and /auth/register
api.interceptors.request.use(async (config) => {
  if (config.url?.endsWith('/auth/login') && config.method === 'post') {
    const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    const { email, password } = data;
    console.log('[MOCK LOGIN] email:', email, 'password:', password);
    console.log('[MOCK LOGIN] current users:', mockUsers);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      console.log('[MOCK LOGIN] Invalid credentials');
      return Promise.reject({ response: { status: 401, data: { message: 'Invalid credentials' } } });
    }
    const token = createFakeJWT(user);
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));
    return {
      ...config,
      adapter: async () => ({
        data: { token },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      }),
    };
  }
  if (config.url?.endsWith('/auth/register') && config.method === 'post') {
    const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    const { username, email, password } = data;
    console.log('[MOCK REGISTER] username:', username, 'email:', email, 'password:', password);
    console.log('[MOCK REGISTER] current users before:', mockUsers);
    if (mockUsers.find(u => u.email === email)) {
      console.log('[MOCK REGISTER] User already exists');
      return Promise.reject({ response: { status: 400, data: { message: 'User already exists' } } });
    }
    const newUser = {
      _id: (mockUsers.length + 1).toString(),
      username,
      email,
      password,
      isAdmin: false,
    };
    mockUsers.push(newUser);
    console.log('[MOCK REGISTER] current users after:', mockUsers);
    const token = createFakeJWT(newUser);
    await new Promise(res => setTimeout(res, 500));
    return {
      ...config,
      adapter: async () => ({
        data: { token },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      }),
    };
  }
  return config;
});
// --- MOCK BACKEND END ---

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