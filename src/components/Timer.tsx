import React, {useCallback, useEffect, useRef} from 'react';
import {Text, AppState} from 'react-native';
import styles from '../views/sudokuStyles';
import {useSudokuStore} from '../store';

interface TimerProps {
  setTimeFunction: (time: string) => void;
  counts: number;
  playVictorySound: () => void;
}

export default React.memo(function Timer({
  setTimeFunction,
  counts,
  playVictorySound,
}: TimerProps) {
  const {
    pauseVisible,
    time,
    isContinue,
    isSudoku,
    start,
    stop,
  } = useSudokuStore();

  useEffect(() => {
    if (pauseVisible) {
      stop();
    } else {
      start();
    }
  }, [pauseVisible]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        stop();
      } else {
        start();
      }
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (counts === 81) {
      setTimeout(() => {
        setTimeFunction(time);
        playVictorySound();
        stop();
      }, 100);
    }
  }, [counts]);

  useEffect(() => {
    if (isSudoku) {
      start();
    }
  }, [isSudoku]);

  useEffect(() => {
    if (isContinue) {
      start();
    }
  }, [isContinue]);

  return <Text style={[styles.gameInfoText, styles.rightText]}>{time}</Text>;
});
