import {create} from 'zustand';
import type {CellData, Graph, CandidateMap} from '../tools';
import initialBoard from '../views/initialBoard';

interface SudokuState {
  board: CellData[][];
  answerBoard: CellData[][];
  history: {board: CellData[][]; action: string}[];
  currentStep: number;
  remainingCounts: number[];
  candidateMap: CandidateMap;
  graph: Graph;
  counts: number;
  standradBoard: CellData[][];
  isInitialized: boolean;
  
  // 设置方法
  setBoard: (board: CellData[][]) => void;
  setAnswerBoard: (board: CellData[][]) => void;
  setHistory: (history: {board: CellData[][]; action: string}[]) => void;
  setCurrentStep: (step: number) => void;
  setRemainingCounts: (counts: number[]) => void;
  setCandidateMap: (map: CandidateMap) => void;
  setGraph: (graph: Graph) => void;
  setCounts: (count: number) => void;
  setStandradBoard: (board: CellData[][]) => void;
  setIsInitialized: (value: boolean) => void;
}

export const useSudokuStore = create<SudokuState>((set) => ({
  board: initialBoard,
  answerBoard: initialBoard,
  history: [],
  currentStep: 0,
  remainingCounts: Array(9).fill(9),
  candidateMap: {},
  graph: {},
  counts: 0,
  standradBoard: initialBoard,
  isInitialized: false,

  setBoard: (board) => set({board}),
  setAnswerBoard: (board) => set({answerBoard: board}),
  setHistory: (history) => set({history}),
  setCurrentStep: (step) => set({currentStep: step}),
  setRemainingCounts: (counts) => set({remainingCounts: counts}),
  setCandidateMap: (map) => set({candidateMap: map}),
  setGraph: (graph) => set({graph}),
  setCounts: (count) => set({counts: count}),
  setStandradBoard: (board) => set({standradBoard: board}),
  setIsInitialized: (value) => set({isInitialized: value}),
}));