import axios from "axios";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface GoogleUser {
    googleId: string;
    email: string;
    name: string;
    avatar: string;
  }
  
  // 配置Google登录
  GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID' // 替换为你的Web Client ID
  });
  
  // Google登录
  export const signInWithGoogle = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    const googleUser: GoogleUser = {
      googleId: userInfo.user.id,
      email: userInfo.user.email,
      name: userInfo.user.name,
      avatar: userInfo.user.photo
    };
    
    return handleGoogleLogin(googleUser);
  };
  
  // Google退出
  export const signOut = async () => {
    await GoogleSignin.signOut();
    localStorage.removeItem('token');
  };
  
  export const handleGoogleLogin = async (googleUser: GoogleUser) => {
    const res = await axios.post('/api/auth/google', googleUser);
    const { token, user } = res.data;
    
    // 存储token
    localStorage.setItem('token', token);
    
    return user;
  };
  
  // axios请求拦截器
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // axios响应拦截器
  axios.interceptors.response.use(
    response => response,
    err => {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        // 重定向到登录页
        window.location.href = '/login';
      }
      return Promise.reject(err);
    }
  );