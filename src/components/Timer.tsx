import React, {useEffect} from 'react';
import {Text, AppState} from 'react-native';
import styles from '../views/sudokuStyles';
import {useSudokuStore} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const {pauseVisible, time, start, stop, timeOffset} = useSudokuStore();

  useEffect(() => {
    if (pauseVisible) {
      stop();
    } else {
      start(timeOffset);
    }
  }, [pauseVisible]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        stop();
      } else {
        AsyncStorage.getItem('timeOffset').then(timeOffset => {
          start(parseInt(timeOffset || '0'));
        });
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

  return <Text style={[styles.gameInfoText, styles.rightText]}>{time}</Text>;
});
