import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5001'
});

// 请求拦截器，自动附加 JWT Token
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default instance;
