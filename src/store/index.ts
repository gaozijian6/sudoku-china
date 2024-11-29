import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

interface SudokuState {
  isContinue: boolean;
  setIsContinue: (value: boolean) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  isHome: boolean;
  setIsHome: (value: boolean) => void;
  resultVisible: boolean;
  setResultVisible: (value: boolean) => void;
  errorCount: number;
  setErrorCount: (value: number) => void;
  hintCount: number;
  setHintCount: (value: number) => void;
  pauseVisible: boolean;
  setPauseVisible: (value: boolean) => void;
  isSound: boolean;
  setIsSound: (value: boolean) => void;
  isDIY: boolean;
  setIsDIY: (value: boolean) => void;
  time: string;
  setTime: (value: string) => void;
  isSudoku: boolean;
  setIsSudoku: (value: boolean) => void;
  timeOffset: number;
  setTimeOffset: (value: number) => void;
  timer: NodeJS.Timeout | undefined;
  setTimer: (value: NodeJS.Timeout | undefined) => void;
  startTime: number;
  setStartTime: (value: number) => void;
  start: () => void;
  stop: () => void;
}

export const useSudokuStore = create<SudokuState>(set => ({
  isContinue: false,
  setIsContinue: value => set({isContinue: value}),
  difficulty: '',
  setDifficulty: value => set({difficulty: value}),
  isHome: true,
  setIsHome: value => set({isHome: value}),
  resultVisible: false,
  setResultVisible: value => set({resultVisible: value}),
  errorCount: 0,
  setErrorCount: value => set({errorCount: value}),
  hintCount: 0,
  setHintCount: value => set({hintCount: value}),
  pauseVisible: false,
  setPauseVisible: value => set({pauseVisible: value}),
  isSound: true,
  setIsSound: value => set({isSound: value}),
  isDIY: false,
  setIsDIY: value => set({isDIY: value}),
  time: '00:00',
  setTime: value => set({time: value}),
  isSudoku: false,
  setIsSudoku: value => set({isSudoku: value}),
  timeOffset: 0,
  setTimeOffset: value => set({timeOffset: value}),
  timer: undefined,
  setTimer: value => set({timer: value}),
  startTime: 0,
  setStartTime: value => set({startTime: value}),

  start: () =>
    set(state => {
      if (state.timer) {
        clearInterval(state.timer);
      }
      const newStartTime = Date.now();
      const newTimer = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor(
          (currentTime - newStartTime + state.timeOffset) / 1000,
        );
        set({
          time: `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60)
            .toString()
            .padStart(2, '0')}`,
        });
      }, 1000);

      return {
        startTime: newStartTime,
        timer: newTimer,
      };
    }),

  stop: () =>
    set(state => {
      if (state.timer) {
        clearInterval(state.timer);
        const newTimeOffset = state.timeOffset + Date.now() - state.startTime;
        AsyncStorage.setItem('timeOffset', newTimeOffset.toString());
        AsyncStorage.setItem('time', state.time);
        return {
          timer: undefined,
          timeOffset: newTimeOffset,
        };
      }
      return {};
    }),
}));
