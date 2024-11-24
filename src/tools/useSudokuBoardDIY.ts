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
  checkSolutionStatus,
} from './index';
import initialBoard from '../views/initialBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SOLUTION_STATUS} from '../constans';

// 创建一个新的 hook 来管理棋盘状态和历史
export const useSudokuBoardDIY = () => {
  const [board, setBoard] = useState<CellData[][]>(initialBoard);
  const answerBoard = useRef<CellData[][]>(initialBoard);
  const history = useRef<BoardHistory[]>([
    {board: initialBoard, action: '生成新棋盘'},
  ]);
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
  const [isValidBoard, setIsValidBoard] = useState<boolean>(false);

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

  const resetSudokuBoard = useCallback(() => {
    setBoard(initialBoard);
    setRemainingCounts(Array(9).fill(9));
    setCurrentStep(0);
    setTimeout(() => {
      clearHistory(initialBoard);
      answerBoard.current = initialBoard;
      history.current = [{board: initialBoard, action: '生成新棋盘'}];
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

    setCandidateMap(newCandidateMap);
    setStandradBoard(copyOfficialDraft(newBoard));
  }, []);

  const loadSavedData2 = useCallback(async () => {
    const sudokuData = await AsyncStorage.getItem('sudokuDataDIY2');
    if (sudokuData) {
      const data = JSON.parse(sudokuData);
      setBoard(data.board);
      answerBoard.current = data.answerBoard;
      history.current = data.history;
      setCurrentStep(data.currentStep);
      setRemainingCounts(data.remainingCounts);
      setStandradBoard(data.standradBoard);
      updateCandidateMap(data.board);
    }
  }, [updateCandidateMap]);

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
      standradBoard,
    };
    AsyncStorage.setItem('sudokuDataDIY2', JSON.stringify(sudokuData));
  }, [board, currentStep, remainingCounts, standradBoard]);

  const updateBoard = useCallback(
    (newBoard: CellData[][], action: string, isFill: boolean) => {
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
        if (checkSolutionStatus(newBoard) === SOLUTION_STATUS.UNIQUE_SOLUTION) {
          setIsValidBoard(true);
        }
      }

      setBoard(newBoard);
      setTimeout(() => {
        updateCandidateMap(newBoard);
      }, 0);
    },
    [updateCandidateMap],
  );

  const undo = useCallback(() => {
    if (currentStep > 0) {
      const previousBoard = history.current[currentStep - 1].board;
      const newHistory = history.current.slice(0, currentStep);
      history.current = newHistory;
      setCurrentStep(currentStep - 1);
      setBoard(previousBoard);
      updateCandidateMap(previousBoard);
      if (
        checkSolutionStatus(previousBoard) !== SOLUTION_STATUS.UNIQUE_SOLUTION
      ) {
        setIsValidBoard(false);
      }
    }
  }, [updateCandidateMap, currentStep]);

  return {
    board,
    updateBoard,
    undo,
    history,
    currentStep,
    candidateMap,
    answerBoard,
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
  };
};
