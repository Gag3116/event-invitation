import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001' // 基础路径指向你的后端服务器
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
