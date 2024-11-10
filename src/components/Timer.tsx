import React, {useEffect} from 'react';
import {Text} from 'react-native';
import styles from '../views/sudokuStyles';
import {useTimer} from '../tools';

interface TimerProps {
  setTimeFunction: (time: string) => void;
  counts: number;
  playVictorySound: () => void;
  difficulty: string;
  pauseVisible: boolean;
}

export default React.memo(function Timer({
  setTimeFunction,
  counts,
  playVictorySound,
  difficulty,
  pauseVisible,
}: TimerProps) {
  const {time, setIsRunning, setTime} = useTimer(difficulty, pauseVisible);

  useEffect(() => {
    if (counts === 81) {
      setTimeout(() => {
        setIsRunning(false);
        setTimeFunction(time);
        playVictorySound();
      }, 100);
    }
  }, [counts, setIsRunning, setTimeFunction, time, playVictorySound]);

  useEffect(() => {
    if (difficulty) {
      setTime('00:00');
    }
  }, [difficulty]);

  return <Text style={[styles.gameInfoText, styles.rightText]}>{time}</Text>;
});
