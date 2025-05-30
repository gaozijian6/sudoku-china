import axios from 'axios';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://192.168.18.122:3000', // API基础URL
  timeout: 1000, // 请求超时时间：30秒
  headers: {
    'Content-Type': 'application/json',
  },
});

export function uploadSudoku(data) {
  return instance.post('/upload', data);
}

