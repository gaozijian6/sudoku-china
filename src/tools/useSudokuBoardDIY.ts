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
  isValid,
} from './index';
import initialBoard from '../views/initialBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 创建一个新的 hook 来管理棋盘状态和历史
export const useSudokuBoardDIY = () => {
  const [board, setBoard] = useState<CellData[][]>([
    [
        {
            "value": 8,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        }
    ],
    [
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 3,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 6,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        }
    ],
    [
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 7,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 9,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 2,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        }
    ],
    [
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 5,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 7,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        }
    ],
    [
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 4,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 5,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 7,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        }
    ],
    [
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 1,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 3,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        }
    ],
    [
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 1,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 6,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 8,
            "isGiven": false,
            "draft": []
        }
    ],
    [
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 8,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 5,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 1,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        }
    ],
    [
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 9,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": 4,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        },
        {
            "value": null,
            "isGiven": false,
            "draft": []
        }
    ]
]);
  const counts = useRef<number>(0);
  const history = useRef<BoardHistoryDIY[]>([
    {board: initialBoard, action: '生成新棋盘', counts: counts.current},
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
    const newHistory: BoardHistoryDIY[] = [
      {
        board,
        action: '清空历史记录',
        counts: counts.current,
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
      history.current = [
        {board: initialBoard, action: '生成新棋盘', counts: counts.current},
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

    setGraph(createGraph(newBoard, newCandidateMap));
    setCandidateMap(newCandidateMap);
    setStandradBoard(copyOfficialDraft(newBoard));
  }, []);

  const loadSavedData2 = useCallback(async () => {
    const sudokuData = await AsyncStorage.getItem('sudokuDataDIY2');
    if (sudokuData) {
      const data = JSON.parse(sudokuData);
      setBoard(data.board);
      history.current = data.history;
      setCurrentStep(data.currentStep);
      setRemainingCounts(data.remainingCounts);
      setStandradBoard(data.standradBoard);
      updateAuxiliaryData(data.board);
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
    setRemainingCounts(counts);
  }, []);

  const saveSudokuData = useCallback(() => {
    const sudokuData = {
      board,
      history: history.current,
      currentStep,
      remainingCounts,
      standradBoard,
    };
    AsyncStorage.setItem('sudokuDataDIY2', JSON.stringify(sudokuData));
  }, [board, currentStep, remainingCounts, standradBoard]);

  const updateBoard = useCallback(
    (newBoard: CellData[][], action: string, isFill: boolean) => {
      if (isFill) {
        counts.current++;
      }
      if(action==='答案'){
        counts.current=81;
      }

      if (!action.startsWith('取消') && !action.startsWith('提示')) {
        const newHistory: BoardHistoryDIY[] = history.current.slice(0);
        newHistory.push({
          board: newBoard,
          action,
          counts: counts.current,
          remainingCounts: [...remainingCounts],
        });

        history.current = newHistory;
        setCurrentStep(newHistory.length - 1);
      }

      setBoard(newBoard);
      setTimeout(() => {
        updateAuxiliaryData(newBoard);
      }, 0);
    },
    [remainingCounts, updateAuxiliaryData],
  );

  const undo = useCallback(() => {
    if (currentStep > 0) {
      const historyDIY = history.current[currentStep - 1];
      const previousBoard = historyDIY.board;
      const remainingCounts = historyDIY.remainingCounts;
      counts.current = historyDIY.counts;
      history.current.pop();
      setRemainingCounts(remainingCounts);
      setBoard(previousBoard);
      setCurrentStep(currentStep - 1);
      setTimeout(() => {
        updateAuxiliaryData(previousBoard);
      }, 0);
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
  };
};
