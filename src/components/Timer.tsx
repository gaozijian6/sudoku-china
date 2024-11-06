import React from 'react';
import {Text} from 'react-native';
import styles from '../views/sudokuStyles';
import {useTimer} from '../tools';

export default function Timer() {
  const time = useTimer();

  return <Text style={[styles.gameInfoText, styles.rightText]}>{time}</Text>;
}
