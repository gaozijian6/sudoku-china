import { useState, useRef, useCallback } from 'react';
import {
  CellData,
  CandidateMap,
  Candidate,
  CandidateStats,
  Graph,
  createGraph,
  copyOfficialDraft,
  BoardHistoryDIY,
  deepCopyBoard,
} from './index';
import initialBoard from '../views/initialBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mockBoard from '../views/mock';
import mockStandradBoard from '../views/standradBoard';
import { useSudokuStore } from '../store';
import { SudokuType } from '../constans';
import { NativeModules } from 'react-native';

const { CloudKitManager } = NativeModules;

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
export const useSudokuBoardDIY = () => {
  const [board, setBoard] = useState<CellData[][]>(initialBoard);
  // const [board, setBoard] = useState<CellData[][]>(mockBoard);
  const [counts, setCounts] = useState<number>(0);
  const countsSync = useRef<number>(0);
  const history = useRef<BoardHistoryDIY[]>([
    {
      board: initialBoard,
      action: '生成新棋盘',
      counts: countsSync.current,
      remainingCounts: Array(9).fill(9),
    },
  ]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [remainingCounts, setRemainingCounts] = useState<number[]>(Array(9).fill(9));
  const remainingCountsSync = useRef<number[]>(Array(9).fill(9));
  const candidateMap = useRef<CandidateMap>(deepCopyCandidateMap(initialCandidateMap));
  const graph = useRef<Graph>(createGraph(initialBoard, candidateMap.current));
  const [standradBoard, setStandradBoard] = useState<CellData[][]>(() => {
    return Array(9)
      .fill(null)
      .map(() =>
        Array(9)
          .fill(null)
          .map(() => ({
            value: null,
            draft: Array.from({ length: 9 }, (_, i) => i + 1),
            isGiven: false,
          }))
      );
  });
  // const [standradBoard, setStandradBoard] = useState<CellData[][]>(mockBoard);
  const [isValidBoard, setIsValidBoard] = useState<boolean>(false);
  const {
    sudokuType,
    myBoards,
    currentIndex,
    setMyBoards,
    localsudokuDataDIY2,
    setLocalsudokuDataDIY2,
    setSudokuDataDIY2,
    sudokuDataDIY2,
  } = useSudokuStore();

  const updateAuxiliaryData = useCallback((newBoard: CellData[][]) => {
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

    setStandradBoard(copyOfficialDraft(newBoard));
    candidateMap.current = newCandidateMap;
    graph.current = createGraph(newBoard, newCandidateMap);
  }, []);

  const loadSavedData2 = useCallback(async () => {
    let data;
    switch (sudokuType) {
      case SudokuType.DIY1:
        data = localsudokuDataDIY2;
        break;
      case SudokuType.DIY2:
        data = sudokuDataDIY2;
        break;
    }
    if (data) {
      setBoard(data.board);
      history.current = data.history;
      setCurrentStep(data.currentStep);
      remainingCountsSync.current = data.remainingCounts;
      setRemainingCounts(remainingCountsSync.current);
      setStandradBoard(data.standradBoard);
      updateAuxiliaryData(data.board);
      countsSync.current = data.countsSync;
      setCounts(countsSync.current);
    }
  }, [sudokuType, localsudokuDataDIY2, sudokuDataDIY2, updateAuxiliaryData]);

  const updateRemainingCounts = useCallback((board: CellData[][]) => {
    const counts = Array(9).fill(9);
    board.forEach(row => {
      row.forEach(cell => {
        if (cell.value) {
          counts[cell.value - 1]--;
        }
      });
    });
    remainingCountsSync.current = counts;
    setRemainingCounts(remainingCountsSync.current);
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

  const saveSudokuData = useCallback(() => {
    if (sudokuType === SudokuType.DIY1) {
      const sudokuData = {
        board: getCleanBoard(board),
        history: history.current,
        currentStep,
        remainingCounts,
        standradBoard,
        countsSync: countsSync.current,
        counts,
      };
      setLocalsudokuDataDIY2(sudokuData);
      AsyncStorage.setItem('localsudokuDataDIY2', JSON.stringify(sudokuData));
    } else if (sudokuType === SudokuType.DIY2) {
      const sudokuData = {
        board: getCleanBoard(board),
        history: history.current,
        currentStep,
        remainingCounts,
        standradBoard,
        countsSync: countsSync.current,
        counts,
      };
      setSudokuDataDIY2(sudokuData);
      let puzzle = '';
      board?.forEach(row => {
        row.forEach(cell => {
          puzzle += cell.value ? cell.value : '0';
        });
      });
      const newMyBoards = [...myBoards];
      newMyBoards[currentIndex].data = {
        name: myBoards[currentIndex].data?.name,
        puzzle,
        sudokuDataDIY2: useSudokuStore.getState().sudokuDataDIY2,
        sudokuDataDIY1: useSudokuStore.getState().sudokuDataDIY1,
      };
      setMyBoards(newMyBoards);
      CloudKitManager.updateData(
        myBoards[currentIndex].id,
        JSON.stringify({
          name: myBoards[currentIndex].data?.name,
          puzzle,
          sudokuDataDIY2: useSudokuStore.getState().sudokuDataDIY2,
          sudokuDataDIY1: useSudokuStore.getState().sudokuDataDIY1,
        })
      );
    }
  }, [
    sudokuType,
    board,
    currentStep,
    remainingCounts,
    standradBoard,
    counts,
    setLocalsudokuDataDIY2,
    setSudokuDataDIY2,
    myBoards,
    currentIndex,
    setMyBoards,
    getCleanBoard,
  ]);

  const updateBoard = useCallback(
    (newBoard: CellData[][], action: string, isFill: boolean) => {
      if (isFill) {
        countsSync.current++;
        setCounts(countsSync.current);
      }
      if (action === '答案') {
        countsSync.current = 81;
        setCounts(countsSync.current);
        // 计算新的 remainingCounts
        const newRemainingCounts = Array(9).fill(0);
        remainingCountsSync.current = newRemainingCounts;
        setRemainingCounts(remainingCountsSync.current);
      }

      if (!action.startsWith('取消') && !action.startsWith('提示')) {
        const newHistory: BoardHistoryDIY[] = history.current.slice(0);
        newHistory.push({
          board: newBoard,
          action,
          counts: countsSync.current,
          remainingCounts: [...remainingCountsSync.current], // 确保存入当前的 remainingCounts
        });
        if (newHistory.length > 100) {
          newHistory.shift();
        }

        history.current = newHistory;
        setCurrentStep(newHistory.length - 1);
      }

      setBoard(newBoard);
      updateAuxiliaryData(newBoard);
      if (sudokuType === SudokuType.DIY1) {
        setLocalsudokuDataDIY2({
          board: newBoard,
          history: history.current,
          currentStep: history.current.length - 1,
          remainingCounts: [...remainingCountsSync.current],
          standradBoard: copyOfficialDraft(newBoard),
          countsSync: countsSync.current,
          counts: countsSync.current,
        });
      }
    },
    [updateAuxiliaryData, sudokuType, setLocalsudokuDataDIY2]
  );

  const resetSudokuBoard = useCallback(() => {
    setBoard(initialBoard);
    remainingCountsSync.current = Array(9).fill(9);
    setRemainingCounts(remainingCountsSync.current);
    setCurrentStep(0);
    countsSync.current = 0;
    setCounts(0);
    candidateMap.current = deepCopyCandidateMap(initialCandidateMap);
    graph.current = createGraph(initialBoard, candidateMap.current);
    updateBoard(initialBoard, '生成新棋盘', false);
  }, [updateBoard]);

  const undo = useCallback(() => {
    if (currentStep > 0) {
      const historyDIY = history.current[currentStep - 1];
      const previousBoard = historyDIY.board;
      // 确保从历史记录中恢复 remainingCounts
      remainingCountsSync.current = historyDIY.remainingCounts?.length
        ? historyDIY.remainingCounts
        : Array(9).fill(9);
      setRemainingCounts(remainingCountsSync.current);
      countsSync.current = historyDIY.counts;
      setCounts(countsSync.current);
      history.current.pop();
      setBoard(previousBoard);
      setCurrentStep(currentStep - 1);
      updateAuxiliaryData(previousBoard);
    }
  }, [updateAuxiliaryData, currentStep]);

  return {
    board,
    updateBoard,
    undo,
    history,
    currentStep,
    candidateMap,
    graph,
    remainingCounts,
    updateRemainingCounts,
    setRemainingCounts,
    copyOfficialDraft,
    setBoard,
    standradBoard,
    setStandradBoard,
    resetSudokuBoard,
    saveSudokuData,
    loadSavedData2,
    isValidBoard,
    setIsValidBoard,
    remainingCountsSync,
    countsSync,
    setCounts,
    counts,
  };
};
