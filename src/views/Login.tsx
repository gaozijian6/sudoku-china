import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { signInWithGoogle } from '../utils/auth';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('登录成功:', user);
      // 登录成功后的处理,比如:
      // navigation.navigate('Home');
    } catch (err) {
      console.log('登录失败:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎登录</Text>
      
      <Pressable 
        style={styles.googleButton}
        onPress={handleGoogleLogin}
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