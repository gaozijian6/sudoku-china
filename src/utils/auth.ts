import { GoogleSignin } from '@react-native-google-signin/google-signin';

  // 配置Google登录
  GoogleSignin.configure({
    webClientId: '899975076561-nt0dk6sevo79m12227kefgrrlv0f34cn.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
  
  // Google登录
  export const signInWithGoogle = async () => {
    await GoogleSignin.hasPlayServices();
    
    const userInfo = await GoogleSignin.signIn().catch(err => {
      console.log('登录错误:', err);
      return null; 
    });
      
    if(!userInfo) return null;

    return userInfo;
  };
  
