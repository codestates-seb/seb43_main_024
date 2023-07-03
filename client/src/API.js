import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API = axios.create({
  baseURL: 'https://server.tiltile.co.kr',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      const decodedToken = jwt_decode(token);
      const memberId = decodedToken.memberId;
      localStorage.setItem('memberId', memberId);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
