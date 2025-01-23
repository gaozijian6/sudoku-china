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
  isSudoku: boolean;
  setIsSudoku: (value: boolean) => void;
  isHasContinue: boolean;
  setIsHasContinue: (value: boolean) => void;
  isLevel: boolean;
  setIsLevel: (value: boolean) => void;
  initializeBoard2: (puzzle: string, answer: string) => void;
  setInitializeBoard2: (fn: (puzzle: string, answer: string) => void) => void;
  loadData: () => void;
  setLoadData: (fn: () => void) => void;
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  isVip: boolean;
  setIsVip: (value: boolean) => void;
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
  isSudoku: false,
  setIsSudoku: value => set({isSudoku: value}),
  isHasContinue: false,
  setIsHasContinue: value => set({isHasContinue: value}),
  isLevel: false,
  setIsLevel: value => set({isLevel: value}),
  initializeBoard2: () => {},
  setInitializeBoard2: (fn) => set({ initializeBoard2: fn }),
  loadData: () => {},
  setLoadData: (fn) => set({ loadData: fn }),
  isConnected: false,
  setIsConnected: value => set({isConnected: value}),
  isVip: false,
  setIsVip: value => set({isVip: value}),
}));
