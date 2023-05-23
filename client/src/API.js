import axios from 'axios';

const API = axios.create({
  baseURL: 'http://ec2-43-202-31-64.ap-northeast-2.compute.amazonaws.com:8080',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
