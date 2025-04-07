import { create } from 'zustand';
import { CellData, BoardHistoryDIY } from '../tools';
import { SudokuType, DIFFICULTY } from '../constans';
import initialBoard from '../views/initialBoard';
import entryBoard from '../mock/1entry';
import easyBoard from '../mock/2easy';
import mediumBoard from '../mock/3medium';
import hardBoard from '../mock/4hard';
import extremeBoard from '../mock/5extreme';

export interface Board {
  id?: string;
  data?: {
    name?: string;
    puzzle?: string;
    sudokuDataDIY2?: {
      board: CellData[][];
      history: BoardHistoryDIY[];
      currentStep: number;
      remainingCounts: number[];
      standradBoard: CellData[][];
      countsSync: number;
      counts: number;
    };
    sudokuDataDIY1?: {
      lastSelectedNumber: number;
      errorCount: number;
      draftMode: boolean;
      lastErrorTime: number;
      selectedCell: number;
      lastSelectedCell: number;
      selectionMode: number;
      errorCells: number[];
      hintContent: string;
      hintMethod: string;
      result: string;
      prompts: number[];
      positions: number[];
      eraseEnabled: boolean;
      isClickAutoNote: boolean;
      differenceMap: any;
      hintCount: number;
      watchIconVisible: boolean;
      isFirstHint: boolean;
      selectedNumber: number;
    };
  };
}

interface BoardPuzzle {
  puzzle: string;
  answer: string;
  date: string;
}

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
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  isHighlight: boolean;
  setIsHighlight: (value: boolean) => void;
  isSetting: boolean;
  setIsSetting: (value: boolean) => void;
  isBackground: boolean;
  setIsBackground: (value: boolean) => void;
  isInactive: boolean;
  setIsInactive: (value: boolean) => void;
  myBoards: Board[];
  setMyBoards: (value: Board[]) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  sudokuType: SudokuType;
  setSudokuType: (value: SudokuType) => void;
  sudokuDataDIY1: any;
  setSudokuDataDIY1: (value: any) => void;
  sudokuDataDIY2: any;
  setSudokuDataDIY2: (value: any) => void;
  localsudokuDataDIY1: any;
  setLocalsudokuDataDIY1: (value: any) => void;
  localsudokuDataDIY2: any;
  setLocalsudokuDataDIY2: (value: any) => void;
  currentIndex: number;
  setCurrentIndex: (value: number) => void;
  currentName: string;
  setCurrentName: (value: string) => void;
  initSudokuDataDIY1: any;
  initSudokuDataDIY2: any;
  isEnlarge: boolean;
  setIsEnlarge: (value: boolean) => void;
  scaleValue1: number;
  setScaleValue1: (value: number) => void;
  scaleValue2: number;
  setScaleValue2: (value: number) => void;
  isHint: boolean;
  setIsHint: (value: boolean) => void;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isReason: boolean;
  setIsReason: (value: boolean) => void;
  triggerSaveData: () => void;
  updateUserStatisticPassOnline: () => void;
  userStatisticPass: {
    [DIFFICULTY.ENTRY]: string;
    [DIFFICULTY.EASY]: string;
    [DIFFICULTY.MEDIUM]: string;
    [DIFFICULTY.HARD]: string;
    [DIFFICULTY.EXTREME]: string;
  };
  setUserStatisticPass: (value: {
    [DIFFICULTY.ENTRY]: string;
    [DIFFICULTY.EASY]: string;
    [DIFFICULTY.MEDIUM]: string;
    [DIFFICULTY.HARD]: string;
    [DIFFICULTY.EXTREME]: string;
  }) => void;
  entryBoardPass: BoardPuzzle[];
  setEntryBoardPass: (value: BoardPuzzle[]) => void;
  entryBoardUnPass: BoardPuzzle[];
  setEntryBoardUnPass: (value: BoardPuzzle[]) => void;
  easyBoardPass: BoardPuzzle[];
  setEasyBoardPass: (value: BoardPuzzle[]) => void;
  easyBoardUnPass: BoardPuzzle[];
  setEasyBoardUnPass: (value: BoardPuzzle[]) => void;
  mediumBoardPass: BoardPuzzle[];
  setMediumBoardPass: (value: BoardPuzzle[]) => void;
  mediumBoardUnPass: BoardPuzzle[];
  setMediumBoardUnPass: (value: BoardPuzzle[]) => void;
  hardBoardPass: BoardPuzzle[];
  setHardBoardPass: (value: BoardPuzzle[]) => void;
  hardBoardUnPass: BoardPuzzle[];
  setHardBoardUnPass: (value: BoardPuzzle[]) => void;
  extremeBoardPass: BoardPuzzle[];
  setExtremeBoardPass: (value: BoardPuzzle[]) => void;
  extremeBoardUnPass: BoardPuzzle[];
  setExtremeBoardUnPass: (value: BoardPuzzle[]) => void;
  currentPuzzleIndex: number;
  setCurrentPuzzleIndex: (value: number) => void;
}

export const useSudokuStore = create<SudokuState>(set => ({
  isContinue: false,
  setIsContinue: value => set({ isContinue: value }),
  difficulty: '',
  setDifficulty: value => set({ difficulty: value }),
  isHome: true,
  setIsHome: value => set({ isHome: value }),
  resultVisible: false,
  setResultVisible: value => set({ resultVisible: value }),
  errorCount: 0,
  setErrorCount: value => set({ errorCount: value }),
  hintCount: 0,
  setHintCount: value => set({ hintCount: value }),
  isSound: true,
  setIsSound: value => set({ isSound: value }),
  isDIY: false,
  setIsDIY: value => set({ isDIY: value }),
  isSudoku: false,
  setIsSudoku: value => set({ isSudoku: value }),
  isHasContinue: false,
  setIsHasContinue: value => set({ isHasContinue: value }),
  isLevel: false,
  setIsLevel: value => set({ isLevel: value }),
  isConnected: false,
  setIsConnected: value => set({ isConnected: value }),
  isHighlight: true,
  setIsHighlight: value => set({ isHighlight: value }),
  isSetting: false,
  setIsSetting: value => set({ isSetting: value }),
  isBackground: false,
  setIsBackground: value => set({ isBackground: value }),
  isInactive: false,
  setIsInactive: value => set({ isInactive: value }),
  myBoards: [],
  setMyBoards: value => set({ myBoards: value }),
  currentPage: 1,
  setCurrentPage: value => set({ currentPage: value }),
  sudokuType: SudokuType.HOME,
  setSudokuType: value => set({ sudokuType: value }),
  sudokuDataDIY1: {},
  setSudokuDataDIY1: value => set({ sudokuDataDIY1: value }),
  sudokuDataDIY2: {},
  setSudokuDataDIY2: value => set({ sudokuDataDIY2: value }),
  currentIndex: 0,
  setCurrentIndex: value => set({ currentIndex: value }),
  currentName: '',
  setCurrentName: value => set({ currentName: value }),
  localsudokuDataDIY1: {},
  setLocalsudokuDataDIY1: value => set({ localsudokuDataDIY1: value }),
  localsudokuDataDIY2: {},
  setLocalsudokuDataDIY2: value => set({ localsudokuDataDIY2: value }),
  initSudokuDataDIY1: {
    selectedNumber: 1,
    lastSelectedNumber: null,
    errorCount: 0,
    draftMode: false,
    selectedCell: { row: 0, col: 0 },
    lastSelectedCell: null,
    selectionMode: 1,
    errorCells: [],
    hintDrawerVisible: false,
    hintContent: '',
    hintMethod: '',
    result: null,
    prompts: [],
    positions: [],
    eraseEnabled: false,
    isClickAutoNote: false,
    differenceMap: {},
    hintCount: 0,
    watchIconVisible: false,
  },
  initSudokuDataDIY2: {
    board: initialBoard,
    history: [
      {
        board: initialBoard,
        action: '生成新棋盘',
        counts: 0,
        remainingCounts: Array(9).fill(9),
      },
    ],
    currentStep: 0,
    remainingCounts: Array(9).fill(9),
    standradBoard: Array(9)
      .fill(null)
      .map(() =>
        Array(9)
          .fill(null)
          .map(() => ({
            value: null,
            draft: Array.from({ length: 9 }, (_, i) => i + 1),
            isGiven: false,
          }))
      ),
    countsSync: 0,
    counts: 0,
  },
  isEnlarge: false,
  setIsEnlarge: value => set({ isEnlarge: value }),
  scaleValue1: 1.0,
  setScaleValue1: value => set({ scaleValue1: value }),
  scaleValue2: 1.0,
  setScaleValue2: value => set({ scaleValue2: value }),
  isHint: false,
  setIsHint: value => set({ isHint: value }),
  isDark: false,
  setIsDark: value => set({ isDark: value }),
  isReason: false,
  setIsReason: value => set({ isReason: value }),
  triggerSaveData: () => {},
  updateUserStatisticPassOnline: () => {
    const state = useSudokuStore.getState();
    const entryBoardPass = [];
    const entryBoardUnPass = [];
    const easyBoardPass = [];
    const easyBoardUnPass = [];
    const mediumBoardPass = [];
    const mediumBoardUnPass = [];
    const hardBoardPass = [];
    const hardBoardUnPass = [];
    const extremeBoardPass = [];
    const extremeBoardUnPass = [];
    
    for (const difficulty of Object.keys(state.userStatisticPass)) {
      const str = state.userStatisticPass[difficulty as keyof typeof state.userStatisticPass];
      for (let i = 0; i < entryBoard.length; i++) {
        if (str[i] === '1') {
          switch (difficulty) {
            case DIFFICULTY.ENTRY:
              entryBoardPass.push(entryBoard[i]);
              break;
            case DIFFICULTY.EASY:
              easyBoardPass.push(easyBoard[i]);
              break;
            case DIFFICULTY.MEDIUM:
              mediumBoardPass.push(mediumBoard[i]);
              break;
            case DIFFICULTY.HARD:
              hardBoardPass.push(hardBoard[i]);
              break;
            case DIFFICULTY.EXTREME:
              extremeBoardPass.push(extremeBoard[i]);
              break;
          }
        } else {
          switch (difficulty) {
            case DIFFICULTY.ENTRY:
              entryBoardUnPass.push(entryBoard[i]);
              break;
            case DIFFICULTY.EASY:
              easyBoardUnPass.push(easyBoard[i]);
              break;
            case DIFFICULTY.MEDIUM:
              mediumBoardUnPass.push(mediumBoard[i]);
              break;
            case DIFFICULTY.HARD:
              hardBoardUnPass.push(hardBoard[i]);
              break;
            case DIFFICULTY.EXTREME:
              extremeBoardUnPass.push(extremeBoard[i]);
              break;
          }
        }
      }
    }
    
    set({
      entryBoardPass,
      entryBoardUnPass,
      easyBoardPass,
      easyBoardUnPass,
      mediumBoardPass,
      mediumBoardUnPass,
      hardBoardPass,
      hardBoardUnPass,
      extremeBoardPass,
      extremeBoardUnPass,
    });
  },
  userStatisticPass: {
    [DIFFICULTY.ENTRY]: '',
    [DIFFICULTY.EASY]: '',
    [DIFFICULTY.MEDIUM]: '',
    [DIFFICULTY.HARD]: '',
    [DIFFICULTY.EXTREME]: '',
  },
  setUserStatisticPass: value => set({ userStatisticPass: value }),
  entryBoardPass: [],
  setEntryBoardPass: value => set({ entryBoardPass: value }),
  entryBoardUnPass: [],
  setEntryBoardUnPass: value => set({ entryBoardUnPass: value }),
  easyBoardPass: [],
  setEasyBoardPass: value => set({ easyBoardPass: value }),
  easyBoardUnPass: [],
  setEasyBoardUnPass: value => set({ easyBoardUnPass: value }),
  mediumBoardPass: [],
  setMediumBoardPass: value => set({ mediumBoardPass: value }),
  mediumBoardUnPass: [],
  setMediumBoardUnPass: value => set({ mediumBoardUnPass: value }),
  hardBoardPass: [],
  setHardBoardPass: value => set({ hardBoardPass: value }),
  hardBoardUnPass: [],
  setHardBoardUnPass: value => set({ hardBoardUnPass: value }),
  extremeBoardPass: [],
  setExtremeBoardPass: value => set({ extremeBoardPass: value }),
  extremeBoardUnPass: [],
  setExtremeBoardUnPass: value => set({ extremeBoardUnPass: value }),
  currentPuzzleIndex: 0,
  setCurrentPuzzleIndex: value => set({ currentPuzzleIndex: value }),
}));
