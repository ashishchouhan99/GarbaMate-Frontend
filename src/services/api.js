import axios from 'axios';

const normalizeApiBaseUrl = (serverUrl) => {
  const baseUrl = serverUrl.trim().replace(/\/+$/, '');
  if (!baseUrl) return '/api';
  return /\/api$/i.test(baseUrl) ? baseUrl : `${baseUrl}/api`;
};

const api = axios.create({ baseURL: normalizeApiBaseUrl(__SERVER_URL__ || '') });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('garbamate_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;

export const register = (details) => api.post('/auth/register', details);
export const login = (credentials) => api.post('/auth/login', credentials);
export const verifyOtp = (email, otp) => api.post('/auth/verify-otp', { email, otp });
export const resendOtp = (email) => api.post('/auth/resend-otp', { email });
