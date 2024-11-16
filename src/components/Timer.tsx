import React, {useEffect} from 'react';
import {Text} from 'react-native';
import styles from '../views/sudokuStyles';
import {useTimer} from '../tools/useTimer';
import {useSudokuStore} from '../store';

interface TimerProps {
  setTimeFunction: (time: string) => void;
  counts: number;
  playVictorySound: () => void;
  difficulty: string;
  timeOffset: number;
}

export default React.memo(function Timer({
  setTimeFunction,
  counts,
  playVictorySound,
  difficulty,
}: TimerProps) {
  const {pauseVisible} = useSudokuStore();
  const {time, setIsRunning} = useTimer(difficulty, pauseVisible);

  useEffect(() => {
    if (counts === 81) {
      setTimeout(() => {
        setIsRunning(false);
        setTimeFunction(time);
        playVictorySound();
      }, 100);
    }
  }, [counts, setIsRunning, setTimeFunction, time, playVictorySound]);

  return <Text style={[styles.gameInfoText, styles.rightText]}>{time}</Text>;
});
