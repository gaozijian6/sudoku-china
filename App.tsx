import Sudoku from './src/views/sudoku';
import {StatusBar, SafeAreaView,Animated,StyleSheet, View, Pressable} from 'react-native';
import TarBars from './src/components/tarBars';
import React, {useRef, useState} from 'react';

function App() {
  const [isHome, setIsHome] = useState(false);
  const isMoving = useRef(false);
  const animatedColor = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // 创建5次循环动画
    Animated.sequence([
      // 变红
      Animated.timing(animatedColor, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: false,
      }),
      // 变回白色
      Animated.timing(animatedColor, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start();
  };

  const backgroundColor = animatedColor.interpolate({
    inputRange: [0, 0.1, 100],
    outputRange: ['#ffffff', '#00ff00', '#ff0000'],
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgb(91,139,241)" />
      <TarBars isHome={isHome} />
      <Sudoku />
      {/* <Pressable onPress={handlePress}>
        <Animated.View style={[styles.container, { backgroundColor }]} />
      </Pressable> */}
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
});
