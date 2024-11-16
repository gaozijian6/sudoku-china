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
  time: string;
  setTime: (value: string) => void;
  errorCount: number;
  setErrorCount: (value: number) => void;
  hintCount: number;
  setHintCount: (value: number) => void;
  pauseVisible: boolean;
  setPauseVisible: (value: boolean) => void;
  isSound: boolean;
  setIsSound: (value: boolean) => void;
}

export const useSudokuStore = create<SudokuState>((set) => ({
  isContinue: false,
  setIsContinue: (value) => set({isContinue: value}),
  difficulty: '',
  setDifficulty: (value) => set({difficulty: value}),
  isHome: true,
  setIsHome: (value) => set({isHome: value}),
  resultVisible: false,
  setResultVisible: (value) => set({resultVisible: value}),
  time: '00:00',
  setTime: (value) => set({time: value}),
  errorCount: 0,
  setErrorCount: (value) => set({errorCount: value}),
  hintCount: 0,
  setHintCount: (value) => set({hintCount: value}),
  pauseVisible: false,
  setPauseVisible: (value) => set({pauseVisible: value}),
  isSound: true,
  setIsSound: (value) => set({isSound: value}),
}));
