import React, {useEffect} from 'react';
import {Text} from 'react-native';
import styles from '../views/sudokuStyles';
import {useTimer} from '../tools';

interface TimerProps {
  setTimeFunction: (time: string) => void;
  counts: number;
}

export default React.memo(
  function Timer({setTimeFunction, counts}: TimerProps) {
    const time = useTimer();

    useEffect(() => {
      if (counts === 81) {
        setTimeFunction(time);
      }
    }, [counts]);

    return <Text style={[styles.gameInfoText, styles.rightText]}>{time}</Text>;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.counts === nextProps.counts &&
      prevProps.setTimeFunction === nextProps.setTimeFunction
    );
  },
);
