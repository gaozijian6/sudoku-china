import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useSudokuStore} from '../store';

export const useTimer = (difficulty: string, pauseVisible: boolean) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState('00:00');
  const [isRunning, setIsRunning] = useState(false);
  const [pauseTime, setPauseTime] = useState<number | null>(null);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const timeOffset = useRef(0);
  const {isHome, isContinue} = useSudokuStore();

  useEffect(() => {
    if (difficulty) {
      // 使用当前时间减去偏移量作为起始时间
      setStartTime(Date.now() - timeOffset.current);
      setIsRunning(true);
    }
  }, [difficulty, timeOffset]);

  useEffect(() => {
    if (isHome) {
      AsyncStorage.setItem('timeOffset', timeOffset.current.toString());
    }
  }, [isHome]);

  const getTimeOffset = useCallback(async () => {
    const offset = await AsyncStorage.getItem('timeOffset');
    timeOffset.current = parseInt(offset || '0');
  }, []);

  useEffect(() => {
    if (isContinue) {
      getTimeOffset();
    }
  }, [isContinue]);

  useEffect(() => {
    if (pauseVisible) {
      setPauseTime(Date.now());
      setIsRunning(false);
    } else if (pauseTime) {
      setTotalPausedTime(prev => prev + (Date.now() - pauseTime));
      setPauseTime(null);
      setIsRunning(true);
    }
  }, [pauseVisible]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && startTime) {
      timer = setInterval(() => {
        timeOffset.current = Date.now() - startTime;
        const elapsedSeconds = Math.floor(
          (Date.now() - startTime - totalPausedTime) / 1000,
        );
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`;
        setTime(timeString);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, startTime, totalPausedTime]);

  return {time, setIsRunning, setTime};
};
