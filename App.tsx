import Sudoku from './src/views/sudoku';
import {
  StatusBar,
  SafeAreaView,
  Animated,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import TarBars from './src/components/tarBars';
import React, {useCallback, useRef, useState} from 'react';
import ResultView from './src/components/ResultView';
function App() {
  const [isHome, setIsHome] = useState(false);
  const isMoving = useRef(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [time, setTime] = useState('00:00');
  const [errorCount, setErrorCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);

  const setSuccessResult = useCallback(
    (time: string, errorCount: number, hintCount: number) => {
      setResultVisible(true);
      setTime(time);
      setErrorCount(errorCount);
      setHintCount(hintCount);
    },
    [],
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={
            resultVisible
              ? styles.background1.backgroundColor
              : styles.background2.backgroundColor
          }
        />
        <TarBars isHome={isHome} />
        <Sudoku setSuccessResult={setSuccessResult} />
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

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background1: {
    backgroundColor: 'rgba(91,139,241,0)',
  },
  background2: {
    backgroundColor: 'rgba(91,139,241,1)',
  },
});
