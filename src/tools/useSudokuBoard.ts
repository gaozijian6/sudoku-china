import { useState, useRef, useCallback } from 'react';
import {
  CellData,
  BoardHistory,
  CandidateMap,
  Candidate,
  CandidateStats,
  copyOfficialDraft,
  deepCopyBoard,
} from './index';
import initialBoard from '../views/initialBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialCandidateMap: CandidateMap = {};

for (let num = 1; num <= 9; num++) {
  initialCandidateMap[num] = {
    row: new Map(),
    col: new Map(),
    box: new Map(),
    all: [],
  };
}

const deepCopyCandidateMap = (candidateMap: CandidateMap): CandidateMap => {
  return JSON.parse(JSON.stringify(candidateMap));
};

// 创建一个新的 hook 来管理棋盘状态和历史
export const useSudokuBoard = () => {
  const [board, setBoard] = useState<CellData[][]>(initialBoard);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const answerBoard = useRef<CellData[][]>(initialBoard);
  const history = useRef<BoardHistory[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [remainingCounts, setRemainingCounts] = useState<number[]>(Array(9).fill(9));
  const candidateMap = useRef<CandidateMap>(deepCopyCandidateMap(initialCandidateMap));
  const [counts, setCounts] = useState<number>(0);
  const [standradBoard, setStandradBoard] = useState<CellData[][]>(initialBoard);
  const standradBoardRef = useRef<CellData[][]>(initialBoard);
  const countsSync = useRef<number>(0);
  const remainingCountsSync = useRef<number[]>(Array(9).fill(9));
  const resetSudokuBoard = useCallback(() => {
    setBoard(initialBoard);
    answerBoard.current = initialBoard;
    history.current = [];
    setCurrentStep(0);
    setRemainingCounts(Array(9).fill(9));
    remainingCountsSync.current = Array(9).fill(9);
    candidateMap.current = deepCopyCandidateMap(initialCandidateMap);
    setCounts(0);
    countsSync.current = 0;
    setStandradBoard(initialBoard);
    standradBoardRef.current = initialBoard;
    setIsInitialized(false);
  }, [candidateMap]);

  const updateCandidateMap = useCallback((newBoard: CellData[][]) => {
    const newCandidateMap: CandidateMap = {};
    for (let num = 1; num <= 9; num++) {
      newCandidateMap[num] = {
        row: new Map(),
        col: new Map(),
        box: new Map(),
        all: [],
      };
    }

    newBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.value === null) {
          const boxIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
          const candidate: Candidate = {
            row: rowIndex,
            col: colIndex,
            candidates: cell.draft,
          };

          cell.draft.forEach(num => {
            const updateStats = (map: Map<number, CandidateStats>, index: number) => {
              const stats = map.get(index) ?? { count: 0, positions: [] };
              stats.count++;
              stats.positions.push(candidate);
              map.set(index, stats);
            };

            updateStats(newCandidateMap[num].row, rowIndex);
            updateStats(newCandidateMap[num].col, colIndex);
            updateStats(newCandidateMap[num].box, boxIndex);
            newCandidateMap[num].all.push(candidate);
          });
        }
      });
    });


    standradBoardRef.current = copyOfficialDraft(deepCopyBoard(newBoard));
    setStandradBoard(standradBoardRef.current);
    candidateMap.current = newCandidateMap;
  }, []);

  const loadSavedData2 = useCallback(async () => {
    const sudokuData = await AsyncStorage.getItem('sudokuData2');
    if (sudokuData) {
      const data = JSON.parse(sudokuData);
      setBoard(data.board);
      answerBoard.current = data.answerBoard;
      history.current = data.history;
      setCurrentStep(data.currentStep);
      setRemainingCounts(data.remainingCounts);
      remainingCountsSync.current = data.remainingCounts;
      setCounts(data.counts);
      countsSync.current = data.counts;
      setStandradBoard(data.standradBoard);
      standradBoardRef.current = data.standradBoard;
      setIsInitialized(true);
      updateCandidateMap(data.board);
    }
  }, [updateCandidateMap]);

  // 添加清空历史记录的函数
  const clearHistory = useCallback((board: CellData[][]) => {
    // 保存当前棋盘状态作为唯一的历史记录
    const newHistory = [
      {
        board,
        action: '清空历史记录',
      },
    ];
    history.current = newHistory;
    setCurrentStep(0);
  }, []);

  const updateRemainingCounts = useCallback((board: CellData[][]) => {
    const counts = Array(9).fill(9);
    board.forEach(row => {
      row.forEach(cell => {
        if (cell.value) {
          counts[cell.value - 1]--;
        }
      });
    });

    setRemainingCounts(counts);
    remainingCountsSync.current = counts;
  }, []);

  const getCounts = useCallback((puzzle: string): number => {
    let count = 0;
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i] !== '0') {
        count++;
      }
    }
    return count;
  }, []);

  const getCounts2 = useCallback((board: CellData[][]): number => {
    let count = 0;
    board.forEach(row => {
      row.forEach(cell => {
        if (cell.value) {
          count++;
        }
      });
    });
    return count;
  }, []);

  const getCleanBoard = useCallback((board: CellData[][]): CellData[][] => {
    const newBoard = deepCopyBoard(board);
    newBoard.forEach(row =>
      row.forEach(cell => {
        cell.highlightError = undefined;
        cell.highlights = undefined;
        cell.highlightCandidates = undefined;
        cell.promptCandidates = undefined;
        cell.promptCandidates1 = undefined;
        cell.promptCandidates2 = undefined;
        cell.promptCandidates3 = undefined;
      })
    );
    return newBoard;
  }, []);

  const saveSudokuData = useCallback(async () => {
    const sudokuData = {
      board: getCleanBoard(board),
      answerBoard: answerBoard.current,
      history: history.current,
      currentStep,
      remainingCounts,
      counts: counts === 81 ? 0 : counts,
      standradBoard,
    };
    await AsyncStorage.setItem('sudokuData2', JSON.stringify(sudokuData));
  }, [board, counts, currentStep, remainingCounts, standradBoard, getCleanBoard]);

  const updateBoard = useCallback(
    (newBoard: CellData[][], action: string, isFill: boolean) => {
      if (!action.startsWith('取消') && !action.startsWith('提示')) {
        const newHistory = history.current.slice(0);
        newHistory.push({
          board: newBoard,
          action,
          counts: countsSync.current,
          remainingCounts: [...remainingCountsSync.current], // 确保存入当前的 remainingCounts
        });

        history.current = newHistory;
        setCurrentStep(newHistory.length - 1);
      }

      countsSync.current = getCounts2(newBoard);
      setCounts(countsSync.current);
      setBoard(newBoard);
      updateCandidateMap(newBoard);
      updateRemainingCounts(newBoard);
    },
    [updateCandidateMap, updateRemainingCounts, getCounts2]
  );

  const undo = useCallback(() => {
    if (currentStep > 0) {
      const previousHistory = history.current[currentStep - 1];
      const previousBoard = previousHistory.board;
      remainingCountsSync.current = previousHistory.remainingCounts;
      setRemainingCounts(remainingCountsSync.current);
      countsSync.current = previousHistory.counts;
      setCounts(countsSync.current);
      const newHistory = history.current.slice(0, currentStep);
      history.current = newHistory;
      setCurrentStep(currentStep - 1);
      setBoard(previousBoard);
      updateCandidateMap(previousBoard);
    }
  }, [updateCandidateMap, currentStep]);

  const convertStringToBoard = useCallback((str: string): CellData[][] => {
    const board: CellData[][] = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = parseInt(str[i * 9 + j]);
        board[i][j] = {
          value: value === 0 ? null : value,
          isGiven: value !== 0,
          draft: [],
        };
      }
    }
    return board;
  }, []);

  const initializeBoard2 = useCallback(
    (puzzle: string, answer: string) => {
      const newBoard = convertStringToBoard(puzzle);
      setBoard(newBoard);
      updateRemainingCounts(newBoard);
      updateCandidateMap(newBoard);
      answerBoard.current = convertStringToBoard(answer);
      setCounts(getCounts(puzzle));
      countsSync.current = getCounts(puzzle);
      setIsInitialized(true);
      const newHistory = history.current.slice(0);
      newHistory.push({
        board: newBoard,
        action: '生成新棋盘',
        counts: countsSync.current,
        remainingCounts: [...remainingCountsSync.current], // 确保存入当前的 remainingCounts
      });
      history.current = newHistory;
    },
    [convertStringToBoard, getCounts, updateCandidateMap, updateRemainingCounts]
  );

  return {
    board,
    updateBoard,
    undo,
    history,
    currentStep,
    candidateMap,
    answerBoard,
    clearHistory,
    remainingCounts,
    updateRemainingCounts,
    setRemainingCounts,
    copyOfficialDraft,
    setBoard,
    standradBoard,
    standradBoardRef,
    counts,
    resetSudokuBoard,
    setCounts,
    isInitialized,
    saveSudokuData,
    loadSavedData2,
    initializeBoard2,
    countsSync,
    remainingCountsSync,
  };
};
