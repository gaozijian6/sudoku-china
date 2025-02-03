import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
} from 'react-native';
import Sudoku from './src/views/sudoku';
import SudokuDIY from './src/views/sudokuDIY';
import Home from './src/views/Home';
import Setting from './src/views/setting';
import { initSounds, playSound } from './src/tools/Sound';
import { useSudokuStore } from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './src/i18n';
import NetInfo from '@react-native-community/netinfo';
import TarBars from './src/components/tarBars';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import rewardedVideo from './src/tools/RewardedVideo';

const slideAnim = Dimensions.get('window').width;

function App() {
  const { setIsHasContinue, setIsConnected, setIsVip, isSound } =
    useSudokuStore();
  const slideAnim1 = useRef(new Animated.Value(slideAnim)).current;
  const slideAnim2 = useRef(new Animated.Value(slideAnim)).current;
  const [settingSlideAnim] = useState(new Animated.Value(slideAnim));

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsConnected(state.isConnected ?? false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    // AsyncStorage.clear();
    const checkVip = async () => {
      const isVip = await AsyncStorage.getItem('isVip');
      if(isVip){
        setIsVip(true);
        rewardedVideo.setIsVip(true);
      }
    };
    checkVip();
  }, []);

  const openSudoku = useCallback(() => {
    Animated.spring(slideAnim1, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim1]);

  const closeSudoku = useCallback(() => {
    Animated.spring(slideAnim1, {
      toValue: slideAnim,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim1]);

  const openSudokuDIY = useCallback(() => {
    Animated.spring(slideAnim2, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim2]);

  const closeSudokuDIY = useCallback(() => {
    Animated.spring(slideAnim2, {
      toValue: slideAnim,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim2]);

  const openSetting = useCallback(() => {
    playSound('switch', isSound);
    Animated.spring(settingSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [settingSlideAnim,isSound]);

  const closeSetting = useCallback(() => {
    playSound('switch', isSound);
    Animated.spring(settingSlideAnim, {
      toValue: slideAnim,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [settingSlideAnim,isSound]);

  useEffect(() => {
    initSounds();
    const checkContinue = async () => {
      try {
        const value = await AsyncStorage.getItem('isHasContinue');
        setIsHasContinue(value === 'true');
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
    };
    checkContinue();
  }, []);

  return (
    <SafeAreaProvider>
      <TarBars />
      <Home
        openSudoku={openSudoku}
        openSudokuDIY={openSudokuDIY}
        openSetting={openSetting}
      />
      <Sudoku
        slideAnim={slideAnim1}
        closeSudoku={closeSudoku}
        openSetting={openSetting}
      />
      <SudokuDIY
        slideAnim={slideAnim2}
        closeSudokuDIY={closeSudokuDIY}
        openSetting={openSetting}
      />
      <Setting slideAnim={settingSlideAnim} closeSetting={closeSetting} />
    </SafeAreaProvider>
  );
}

export default App;
