import {useState, useRef, useCallback} from 'react';
import {
  CellData,
  CandidateMap,
  Candidate,
  CandidateStats,
  Graph,
  createGraph,
  copyOfficialDraft,
  BoardHistoryDIY,
} from './index';
import initialBoard from '../views/initialBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mockBoard from '../views/mock';
import mockStandradBoard from '../views/standradBoard';
import diy from './diy';

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
  const [remainingCounts, setRemainingCounts] = useState<number[]>(
    Array(9).fill(9),
  );
  const remainingCountsSync = useRef<number[]>(Array(9).fill(9));
  const [candidateMap, setCandidateMap] = useState<CandidateMap>(() => {
    const initialCandidateMap: CandidateMap = {};
    for (let num = 1; num <= 9; num++) {
      initialCandidateMap[num] = {
        row: new Map(),
        col: new Map(),
        box: new Map(),
        all: [],
      };
    }
    return initialCandidateMap;
  });
  const [graph, setGraph] = useState<Graph>(
    createGraph(initialBoard, candidateMap),
  );
  const [standradBoard, setStandradBoard] = useState<CellData[][]>(() => {
    return Array(9)
      .fill(null)
      .map(() =>
        Array(9)
          .fill(null)
          .map(() => ({
            value: null,
            draft: Array.from({length: 9}, (_, i) => i + 1),
            isGiven: false,
          })),
      );
  });
  // const [standradBoard, setStandradBoard] = useState<CellData[][]>(mockBoard);
  const [isValidBoard, setIsValidBoard] = useState<boolean>(false);

  // 添加清空历史记录的函数
  const clearHistory = useCallback(
    (board: CellData[][]) => {
      // 保存当前棋盘状态作为唯一的历史记录
      const newHistory: BoardHistoryDIY[] = [
        {
          board,
          action: '清空历史记录',
          counts: countsSync.current,
          remainingCounts: [...remainingCountsSync.current],
        },
      ];
      history.current = newHistory;
      setCurrentStep(0);
    },
    [remainingCountsSync],
  );

  const resetSudokuBoard = useCallback(() => {
    setBoard(initialBoard);
    remainingCountsSync.current = Array(9).fill(9);
    setRemainingCounts(remainingCountsSync.current);
    setCurrentStep(0);
    countsSync.current = 0;
    setTimeout(() => {
      clearHistory(initialBoard);
      history.current = [
        {
          board: initialBoard,
          action: '生成新棋盘',
          counts: countsSync.current,
          remainingCounts: [...remainingCountsSync.current],
        },
      ];
      setCandidateMap(() => {
        const initialCandidateMap: CandidateMap = {};
        for (let num = 1; num <= 9; num++) {
          initialCandidateMap[num] = {
            row: new Map(),
            col: new Map(),
            box: new Map(),
            all: [],
          };
        }
        return initialCandidateMap;
      });
      setGraph(createGraph(initialBoard, candidateMap));
      setStandradBoard(
        Array(9)
          .fill(null)
          .map(() =>
            Array(9)
              .fill(null)
              .map(() => ({
                value: null,
                draft: Array.from({length: 9}, (_, i) => i + 1),
                isGiven: false,
              })),
          ),
      );
    }, 0);
  }, [candidateMap, clearHistory]);

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
          const boxIndex =
            Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
          const candidate: Candidate = {
            row: rowIndex,
            col: colIndex,
            candidates: cell.draft,
          };

          cell.draft.forEach(num => {
            const updateStats = (
              map: Map<number, CandidateStats>,
              index: number,
            ) => {
              const stats = map.get(index) ?? {count: 0, positions: []};
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
    setTimeout(() => {
      setGraph(createGraph(newBoard, newCandidateMap));
      setCandidateMap(newCandidateMap);
    }, 0);
  }, []);

  const loadSavedData2 = useCallback(async () => {
    const sudokuData = await AsyncStorage.getItem('sudokuDataDIY2');
    if (sudokuData) {
      const data = JSON.parse(sudokuData);
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
  }, [updateAuxiliaryData]);

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

  const saveSudokuData = useCallback(() => {
    const sudokuData = {
      board,
      history: history.current,
      currentStep,
      remainingCounts,
      standradBoard,
      countsSync: countsSync.current,
    };
    AsyncStorage.setItem('sudokuDataDIY2', JSON.stringify(sudokuData));
  }, [board, currentStep, remainingCounts, standradBoard]);

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

        history.current = newHistory;
        setCurrentStep(newHistory.length - 1);
      }

      setBoard(newBoard);
      setTimeout(() => {
        updateAuxiliaryData(newBoard);
      }, 0);
    },
    [updateAuxiliaryData],
  );

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
