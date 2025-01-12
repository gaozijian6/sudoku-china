import React, {useCallback, useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Animated,
} from 'react-native';
import Sudoku from './src/views/sudoku';
import SudokuDIY from './src/views/sudokuDIY';
import Home from './src/views/Home';
import Login from './src/views/Login';
import Setting from './src/views/setting';
import {initSounds} from './src/tools/Sound';
import {useSudokuStore} from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PauseOverlay from './src/components/PauseOverlay';
import './src/i18n';
import NetInfo from '@react-native-community/netinfo';

function App() {
  const {resultVisible, pauseVisible, setIsHasContinue, setIsConnected} =
    useSudokuStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const slideAnim1 = useRef(new Animated.Value(800)).current;
  const slideAnim2 = useRef(new Animated.Value(800)).current;
  const [settingSlideAnim] = useState(new Animated.Value(800));

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
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
    AsyncStorage.getItem('isHasContinue').then(value => {
      setIsHasContinue(value === 'true');
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={
            resultVisible || pauseVisible
              ? styles.background1.backgroundColor
              : styles.background2.backgroundColor
          }
        />
        {isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <>
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
          </>
        )}
      </SafeAreaView>
      {pauseVisible && <PauseOverlay />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background1: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  background2: {
    backgroundColor: 'rgb(91,139,241)',
  },
});

export default App;
