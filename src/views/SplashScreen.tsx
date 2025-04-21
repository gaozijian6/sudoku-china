import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useSudokuStore } from '../store';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const isDark = useSudokuStore(state => state.isDark);
  
  // 创建动画值，分别控制缩放和透明度
  const scaleAnim = useRef(new Animated.Value(0.2)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 先执行透明度动画
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 200, // 前200毫秒完成透明度变化
      useNativeDriver: true,
    }).start();

    // 同时执行缩放动画
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 600, 
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // 两秒后执行回调，显示主页面
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [scaleAnim, opacityAnim, onFinish]);

  // 主背景色
  const backgroundColor = isDark 
    ? { backgroundColor: 'rgb(27, 30, 40)' } 
    : { backgroundColor: '#f5f8ff' };

  // 圆形装饰的颜色
  const circleColor = isDark 
    ? 'rgba(50, 70, 120, 0.2)' 
    : 'rgba(100, 150, 255, 0.15)';

  return (
    <View style={[styles.container, backgroundColor]}>
      {/* 随机位置的装饰圆形 */}
      <View 
        style={[
          styles.decorCircle, 
          { 
            backgroundColor: circleColor,
            width: 280,
            height: 280,
            left: width * 0.7,
            top: height * 0.1,
            opacity: 0.4,
          }
        ]} 
      />
      
      <View 
        style={[
          styles.decorCircle, 
          { 
            backgroundColor: circleColor,
            width: 200,
            height: 200,
            left: width * -0.2,
            top: height * 0.6,
            opacity: 0.5,
          }
        ]} 
      />
      
      <View 
        style={[
          styles.decorCircle, 
          { 
            backgroundColor: circleColor,
            width: 350,
            height: 350,
            left: width * 0.4,
            top: height * 0.7,
            opacity: 0.3,
          }
        ]} 
      />
      
      <View 
        style={[
          styles.decorCircle, 
          { 
            backgroundColor: circleColor,
            width: 150,
            height: 150,
            left: width * 0.1,
            top: height * 0.2,
            opacity: 0.3,
          }
        ]} 
      />
      
      {/* 应用图标动画 */}
      <Animated.View 
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <Image 
          source={require('../assets/icon/AppIcon.png')} 
          style={styles.logo} 
          resizeMode="contain"
          borderRadius={24}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 150,
    height: 150,
    zIndex: 10,
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 1000, // 非常大的值确保它是圆形
  }
});

export default SplashScreen; 