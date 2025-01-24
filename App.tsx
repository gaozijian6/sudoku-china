import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  Animated,
} from 'react-native';
import Sudoku from './src/views/sudoku';
import SudokuDIY from './src/views/sudokuDIY';
import Home from './src/views/Home';
import Setting from './src/views/setting';
import { initSounds } from './src/tools/Sound';
import { useSudokuStore } from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PauseOverlay from './src/components/PauseOverlay';
import './src/i18n';
import NetInfo from '@react-native-community/netinfo';
import TarBars from './src/components/tarBars';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';

function App() {
  const { pauseVisible, setIsHasContinue, setIsConnected } =
    useSudokuStore();
  const slideAnim1 = useRef(new Animated.Value(800)).current;
  const slideAnim2 = useRef(new Animated.Value(800)).current;
  const [settingSlideAnim] = useState(new Animated.Value(800));

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await Orientation.lockToPortrait();
      } catch (error) {
        console.warn('Orientation lock failed:', error);
      }
    };
    init();

    return () => {
      try {
        Orientation.unlockAllOrientations();
      } catch (error) {
        console.warn('Orientation unlock failed:', error);
      }
    };
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
      toValue: 800,
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
      toValue: 800,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim2]);

  const openSetting = useCallback(() => {
    Animated.spring(settingSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [settingSlideAnim]);

  const closeSetting = useCallback(() => {
    Animated.spring(settingSlideAnim, {
      toValue: 800,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [settingSlideAnim]);

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
      {pauseVisible && <PauseOverlay />}
    </SafeAreaProvider>
  );
}

export default App;
