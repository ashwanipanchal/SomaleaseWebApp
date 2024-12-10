// api/axiosInstance.js
import axios from 'axios';
const BASE_URL = 'https://somalease.com/admin/api/';
const axiosInstanceLaravel = axios.create({
  baseURL: BASE_URL, // Set base URL from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstanceLaravel.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error,"error")
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstanceLaravel.interceptors.response.use(
  (response) => {
    return response
  } ,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized error, maybe redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceLaravel;
