import React, {useCallback, useState, useRef, useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, Animated} from 'react-native';
import Sudoku from './src/views/sudoku';
import ResultView from './src/components/ResultOverlay';
import Home from './src/views/Home';

function App() {
  const [isHome, setIsHome] = useState(true);
  const [difficulty, setDifficulty] = useState('');
  const [resultVisible, setResultVisible] = useState(false);
  const [pauseVisible, setPauseVisible] = useState(false);
  const [time, setTime] = useState('00:00');
  const [errorCount, setErrorCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const slideAnim = useRef(new Animated.Value(800)).current;

  const setSuccessResult = useCallback(
    (time: string, errorCount: number, hintCount: number) => {
      setResultVisible(true);
      setTime(time);
      setErrorCount(errorCount);
      setHintCount(hintCount);
    },
    [],
  );

  const tooglePause = useCallback(() => {
    setPauseVisible(!pauseVisible);
  }, [pauseVisible]);

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
        <Home
          setIsHome={setIsHome}
          setDifficulty={setDifficulty}
          openSudoku={openSudoku}
        />
        <Sudoku
          slideAnim={slideAnim}
          setSuccessResult={setSuccessResult}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          pauseVisible={pauseVisible}
          tooglePause={tooglePause}
          isHome={isHome}
          setIsHome={setIsHome}
          closeSudoku={closeSudoku}
        />
      </SafeAreaView>
      {resultVisible && (
        <ResultView
          time={time}
          errorCount={errorCount}
          hintCount={hintCount}
          onNext={() => {}}
        />
      )}
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
