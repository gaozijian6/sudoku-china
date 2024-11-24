import {useState, useRef, useCallback} from 'react';
import {
  CellData,
  BoardHistory,
  CandidateMap,
  Candidate,
  CandidateStats,
  Graph,
  createGraph,
  copyOfficialDraft,
  deepCopyBoard,
} from './index';
import initialBoard from '../views/initialBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 创建一个新的 hook 来管理棋盘状态和历史
export const useSudokuBoard = () => {
  const [board, setBoard] = useState<CellData[][]>(initialBoard);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const answerBoard = useRef<CellData[][]>(initialBoard);
  const history = useRef<BoardHistory[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [remainingCounts, setRemainingCounts] = useState<number[]>(
    Array(9).fill(9),
  );
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
  const [counts, setCounts] = useState<number>(0);
  const [standradBoard, setStandradBoard] = useState<CellData[][]>(initialBoard);
  const resetSudokuBoard = useCallback(() => {
    setBoard(initialBoard);
    answerBoard.current = initialBoard;
    history.current = [];
    setCurrentStep(0);
    setRemainingCounts(Array(9).fill(9));
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
    setCounts(0);
    setStandradBoard(initialBoard);
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

    setGraph(createGraph(newBoard, newCandidateMap));
    
    setStandradBoard(
      copyOfficialDraft(deepCopyBoard(newBoard)),
    );
    setCandidateMap(newCandidateMap);
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
      setCounts(data.counts);
      setStandradBoard(data.standradBoard);
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
  }, []);

  const saveSudokuData = useCallback(() => {
    const sudokuData = {
      board,
      answerBoard: answerBoard.current,
      history: history.current,
      currentStep,
      remainingCounts,
      counts,
      standradBoard,
    };
    AsyncStorage.setItem('sudokuData2', JSON.stringify(sudokuData));
  }, [board, counts, currentStep, remainingCounts, standradBoard]);

  const updateBoard = useCallback(
    (newBoard: CellData[][], action: string, isFill: boolean) => {
      if (
        history.current.length > 0 &&
        history.current[currentStep]?.action === action
      ) {
        return;
      }
      if (!action.startsWith('取消') && !action.startsWith('提示')) {
        const newHistory = history.current.slice(0);
        newHistory.push({
          board: newBoard,
          action,
        });

        history.current = newHistory;
        setCurrentStep(newHistory.length - 1);
      }
      if (isFill) {
        clearHistory(newBoard);
        setCounts(counts + 1);
      }

      setBoard(newBoard);
      updateCandidateMap(newBoard);
    },
    [clearHistory, counts, currentStep, updateCandidateMap],
  );

  const undo = useCallback(() => {
    if (currentStep > 0) {
      const previousBoard = history.current[currentStep - 1].board;
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

  const getCounts = useCallback((puzzle: string, answer: string): number => {
    let count = 0;
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i] === '0' && answer[i] !== '0') {
        count++;
      }
    }
    return count;
  }, []);

  const initializeBoard2 = useCallback(
    (puzzle: string, answer: string) => {
      const newBoard = convertStringToBoard(puzzle);
      setBoard(newBoard);
      setTimeout(() => {
        answerBoard.current = convertStringToBoard(answer);
        updateCandidateMap(newBoard);
        setCounts(getCounts(puzzle, answer));
        updateRemainingCounts(newBoard);
        setIsInitialized(true);
      }, 600);
    },
    [
      convertStringToBoard,
      getCounts,
      updateCandidateMap,
      updateRemainingCounts,
    ],
  );

  return {
    board,
    updateBoard,
    undo,
    history,
    currentStep,
    candidateMap,
    graph,
    answerBoard,
    clearHistory,
    remainingCounts,
    updateRemainingCounts,
    setRemainingCounts,
    copyOfficialDraft,
    setBoard,
    standradBoard,
    counts,
    resetSudokuBoard,
    setCounts,
    isInitialized,
    saveSudokuData,
    loadSavedData2,
    initializeBoard2,
  };
};
