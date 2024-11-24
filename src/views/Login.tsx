import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { signInWithGoogle } from '../utils/auth';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    console.log(user);
    if(user) {
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎登录</Text>
      
      <Pressable 
        style={styles.googleButton}
        onPressIn={handleGoogleLogin}
      >
        <Text style={styles.buttonText}>使用Google账号登录</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 30
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});

export default Login;