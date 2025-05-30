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
      setElapsedTime(prev => {
        const newTime = prev + 1;
        onTimeChange?.(newTime);
        return newTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      BackgroundTimer.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
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