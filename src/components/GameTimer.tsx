import React, { memo, useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

interface GameTimerProps {
  initialTime: number;
  onTimeChange?: (time: number) => void;
  style?: any;
  isRunning?: boolean;
}

const GameTimer: React.FC<GameTimerProps> = memo(({ 
  initialTime, 
  onTimeChange, 
  style,
  isRunning = true 
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(initialTime);
  const timerRef = useRef<number | null>(null);
  const timeRef = useRef<number>(initialTime);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (timerRef.current) {
      BackgroundTimer.clearInterval(timerRef.current);
    }

    timerRef.current = BackgroundTimer.setInterval(() => {
      timeRef.current += 1;
      setElapsedTime(timeRef.current);
      // 只更新内部引用，不频繁调用父组件回调
      onTimeChange?.(timeRef.current);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      BackgroundTimer.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    timeRef.current = initialTime;
    setElapsedTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [isRunning]);

  return <Text style={style}>{formatTime(elapsedTime)}</Text>;
});

export default GameTimer; 