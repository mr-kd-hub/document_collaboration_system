import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/';

//create axios instance with Authorization header
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//add the Authorization token to every request if available
axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token');

  const token = Cookies.get("token");
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance