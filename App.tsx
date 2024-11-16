import React, {useCallback, useState, useRef, useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, Animated} from 'react-native';
import Sudoku from './src/views/sudoku';
import ResultView from './src/components/ResultOverlay';
import Home from './src/views/Home';
import Login from './src/views/Login';
import Setting from './src/views/setting';
import {initSounds} from './src/tools/Sound';
import {useSudokuStore} from './src/store';

function App() {
  const {resultVisible, pauseVisible} = useSudokuStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const slideAnim = useRef(new Animated.Value(800)).current;
  const [settingSlideAnim] = useState(new Animated.Value(800));

  const openSudoku = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim]);

  const closeSudoku = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 800,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim]);

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
          <Home openSudoku={openSudoku} openSetting={openSetting} />
          <Sudoku
            slideAnim={slideAnim}
            closeSudoku={closeSudoku}
            openSetting={openSetting}
          />
          <Setting slideAnim={settingSlideAnim} closeSetting={closeSetting} />
          </>
        )}
      </SafeAreaView>
      {resultVisible && <ResultView onNext={() => {}} />}
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
