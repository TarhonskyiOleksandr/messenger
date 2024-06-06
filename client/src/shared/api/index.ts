import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.get('/user/refresh-token');
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
      }
    }

    return Promise.reject(error);
  }
);
