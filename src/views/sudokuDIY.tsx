import React, { useState, useEffect, useCallback, useRef, memo, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Switch,
  Pressable,
  AppState,
  ScrollView,
  NativeModules,
  Alert,
} from 'react-native';
import {
  checkNumberInRowColumnAndBox,
  updateRelatedCellsDraft,
  getCandidates,
  deepCopyBoard,
  solve3,
  checkDraftIsValid,
} from '../tools';
import { useSudokuBoardDIY } from '../tools/useSudokuBoardDIY';
import {
  hiddenSingle,
  singleCandidate,
  blockElimination,
  nakedPair,
  hiddenPair,
  xWing,
  xWingVarient,
  xyWing,
  skyscraper,
  skyscraper2,
  nakedTriple1,
  nakedTriple2,
  swordfish,
  combinationChain,
  Loop,
  uniqueRectangle,
  BinaryUniversalGrave,
  xyzWing,
  jellyfish,
  trialAndError,
  findDifferenceDraftDIY,
  hiddenTriple,
  nakedQuadruple,
} from '../tools/solution';
import type { CandidateMap, CellData, Graph, Position } from '../tools';
import type { DifferenceMap, Result } from '../tools/solution';
import { handleHintContent } from '../tools/handleHintContent';
import Cell from '../components/SudokuCell';
import Buttons from '../components/Buttons';
import { playSound } from '../tools/Sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSudokuStore } from '../store';
import TarBarsSudokuDIY from '../components/tarBarsSudokuDIY';
import { SUDOKU_STATUS, SudokuType } from '../constans';
import { useTranslation } from 'react-i18next';
import handleHintMethod from '../tools/handleHintMethod';
import createStyles from './sudokuStyles';
import { useNavigation } from '@react-navigation/native';

const { ColorChain, CombinationChain } = NativeModules;

interface SudokuDIYProps {
  isMovingRef: React.MutableRefObject<boolean>;
}

const SudokuDIY: React.FC<SudokuDIYProps> = memo(({ isMovingRef }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    board,
    updateBoard,
    undo,
    currentStep,
    candidateMap,
    graph,
    remainingCounts,
    setRemainingCounts,
    standradBoard,
    history,
    resetSudokuBoard,
    saveSudokuData,
    loadSavedData2,
    remainingCountsSync,
    countsSync,
    setCounts,
    counts,
  } = useSudokuBoardDIY();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(1);
  const lastSelectedNumber = useRef<number | null>(null);
  const [draftMode, setDraftMode] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>({ row: 0, col: 0 });
  const lastSelectedCell = useRef<{
    row: number;
    col: number;
  } | null>(null);
  const [selectionMode, setSelectionMode] = useState<1 | 2>(1);
  const [errorCells, setErrorCells] = useState<{ row: number; col: number }[]>([]);
  const [hintDrawerVisible, setHintDrawerVisible] = useState<boolean>(false);

  const [hintContent, setHintContent] = useState<string>('');
  const [hintMethod, setHintMethod] = useState<string>('');
  const [result, setResult] = useState<Result | null>(null);
  const [prompts, setPrompts] = useState<number[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const [eraseEnabled, setEraseEnabled] = useState<boolean>(false);
  const answer = useMemo(() => {
    return solve3(board);
  }, [board]);

  const sudokuStatus = useMemo(() => {
    if (counts < 17) {
      return SUDOKU_STATUS.INCOMPLETE;
    }
    if (answer) {
      return SUDOKU_STATUS.SOLVED;
    } else {
      return SUDOKU_STATUS.ILLEGAL;
    }
  }, [answer, counts]);

  const isClickAutoNote = useRef<boolean>(false);
  const [differenceMap, setDifferenceMap] = useState<DifferenceMap>({});
  const hintCount = useRef<number>(0);
  const solveFunctions = useRef<
    ((board: CellData[][], candidateMap: CandidateMap, graph: Graph) => Result | null)[]
  >([
    singleCandidate,
    hiddenSingle,
    blockElimination,
    nakedPair,
    nakedTriple1,
    nakedTriple2,
    hiddenPair,
    hiddenTriple,
    xWing,
    xWingVarient,
    xyWing,
    xyzWing,
    skyscraper,
    skyscraper2,
    nakedQuadruple,
    combinationChain,
    swordfish,
    jellyfish,
    Loop,
    uniqueRectangle,
    BinaryUniversalGrave,
  ]);
  const setErrorCount = useSudokuStore(state => state.setErrorCount);
  const isSound = useSudokuStore(state => state.isSound);
  const isConnected = useSudokuStore(state => state.isConnected);
  const isHighlight = useSudokuStore(state => state.isHighlight);
  const sudokuType = useSudokuStore(state => state.sudokuType);
  const sudokuDataDIY1 = useSudokuStore(state => state.sudokuDataDIY1);
  const errorCount = useSudokuStore(state => state.errorCount);
  const setSudokuDataDIY1 = useSudokuStore(state => state.setSudokuDataDIY1);
  const localsudokuDataDIY1 = useSudokuStore(state => state.localsudokuDataDIY1);
  const setLocalsudokuDataDIY1 = useSudokuStore(state => state.setLocalsudokuDataDIY1);
  const scaleValue2 = useSudokuStore(state => state.scaleValue2);
  const setIsHint = useSudokuStore(state => state.setIsHint);
  const isDark = useSudokuStore(state => state.isDark);
  const setIsHome = useSudokuStore(state => state.setIsHome);
  const setIsDIY = useSudokuStore(state => state.setIsDIY);
  const setSudokuType = useSudokuStore(state => state.setSudokuType);

  const styles = createStyles(isDark);

  const [watchIconVisible, setWatchIconVisible] = useState<boolean>(false);
  const isFirstHint = useRef<boolean>(true);
  const isLocked = useMemo(() => {
    return board.some(row => row.some(cell => cell.isGiven));
  }, [board]);
  const resetSudoku = useCallback(() => {
    playSound('switch', isSound);
    setSelectedNumber(1);
    resetSudokuBoard(isLocked);
    lastSelectedNumber.current = null;
    setErrorCount(0);
    setDraftMode(false);
    setSelectedCell({ row: 0, col: 0 });
    lastSelectedCell.current = null;
    setSelectionMode(1);
    setErrorCells([]);
    setHintDrawerVisible(false);
    setIsHint(false);
    setHintContent('');
    setHintMethod(handleHintMethod('', t));
    setResult(null);
    setPrompts([]);
    setPositions([]);
    setEraseEnabled(false);
    isClickAutoNote.current = false;
    setDifferenceMap({});
    hintCount.current = 0;
  }, [isSound, resetSudokuBoard, setErrorCount, t, setIsHint, isLocked]);

  const saveDataDIY = useCallback(() => {
    if (sudokuType === SudokuType.DIY1) {
      const sudokuData = {
        lastSelectedNumber: lastSelectedNumber.current,
        errorCount,
        draftMode,
        selectedCell,
        lastSelectedCell: lastSelectedCell.current,
        selectionMode,
        errorCells,
        hintContent,
        hintMethod,
        result,
        prompts,
        positions,
        eraseEnabled,
        isClickAutoNote: isClickAutoNote.current,
        differenceMap,
        hintCount: hintCount.current,
        watchIconVisible,
        isFirstHint: isFirstHint.current,
        selectedNumber,
      };
      setLocalsudokuDataDIY1(sudokuData);
      AsyncStorage.setItem('localsudokuDataDIY1', JSON.stringify(sudokuData));
      saveSudokuData();
    } else if (sudokuType === SudokuType.DIY2) {
      if (!isConnected) {
        return;
      }
      const sudokuData = {
        lastSelectedNumber: lastSelectedNumber.current,
        errorCount,
        draftMode,
        selectedCell,
        lastSelectedCell: lastSelectedCell.current,
        selectionMode,
        errorCells,
        hintContent,
        hintMethod,
        result,
        prompts,
        positions,
        eraseEnabled,
        isClickAutoNote: isClickAutoNote.current,
        differenceMap,
        hintCount: hintCount.current,
        watchIconVisible,
        isFirstHint: isFirstHint.current,
        selectedNumber,
      };
      setSudokuDataDIY1(sudokuData);
      saveSudokuData();
    }
  }, [
    sudokuType,
    errorCount,
    draftMode,
    selectedCell,
    selectionMode,
    errorCells,
    hintContent,
    hintMethod,
    result,
    prompts,
    positions,
    eraseEnabled,
    differenceMap,
    watchIconVisible,
    selectedNumber,
    setLocalsudokuDataDIY1,
    saveSudokuData,
    isConnected,
    setSudokuDataDIY1,
  ]);

  const cleanBoard = useMemo(() => {
    return deepCopyBoard(board).map(row =>
      row.map(cell => ({
        ...cell,
        highlights: undefined,
        highlightCandidates: undefined,
        promptCandidates: undefined,
      }))
    );
  }, [board]);

  const colorChainResult = useRef<Result | null>(null);
  const combinationChainResult = useRef<Result | null>(null);
  useEffect(() => {
    ColorChain.solve(cleanBoard).then(result => {
      colorChainResult.current = result;
    });
    CombinationChain.solve(cleanBoard).then(result => {
      combinationChainResult.current = result;
    });
  }, [cleanBoard]);

  const loadSavedData = useCallback(async () => {
    let data;
    if (sudokuType === SudokuType.DIY1) {
      data = localsudokuDataDIY1;
    } else if (sudokuType === SudokuType.DIY2) {
      data = sudokuDataDIY1;
    }
    if (data) {
      lastSelectedNumber.current = data.lastSelectedNumber;
      setErrorCount(data.errorCount);
      setDraftMode(data.draftMode);
      setSelectedCell(data.selectedCell);
      lastSelectedCell.current = data.lastSelectedCell;
      setSelectionMode(data.selectionMode);
      setErrorCells(data.errorCells);
      setHintContent(data.hintContent);
      setHintMethod(handleHintMethod(data.hintMethod, t));
      setResult(data.result);
      setPrompts(data.prompts);
      setPositions(data.positions);
      setEraseEnabled(data.eraseEnabled);
      isClickAutoNote.current = data.isClickAutoNote;
      setDifferenceMap(data.differenceMap);
      hintCount.current = data.hintCount;
      setWatchIconVisible(data.watchIconVisible);
      isFirstHint.current = data.isFirstHint;
      setSelectedNumber(data.selectedNumber);
    }
  }, [localsudokuDataDIY1, setErrorCount, sudokuDataDIY1, sudokuType, t]);

  const handleErrorDraftAnimation = useCallback(
    (conflictCells: Position[]) => {
      setErrorCells(conflictCells);
      setTimeout(() => setErrorCells([]), 300);
      playSound('error', isSound);
    },
    [isSound]
  );

  const jumpToNextNumber = useCallback(
    (newCounts: number[]): void => {
      if (!selectedNumber || newCounts[selectedNumber - 1] !== 0) {
        return;
      }

      let nextNumber = selectedNumber;
      do {
        nextNumber = (nextNumber % 9) + 1;
      } while (newCounts[nextNumber - 1] === 0 && nextNumber !== selectedNumber);

      setSelectedNumber(nextNumber);
      lastSelectedNumber.current = nextNumber;
    },
    [selectedNumber]
  );

  const remainingCountsMinusOne = useCallback(
    (number: number) => {
      const newCounts = [...remainingCounts];
      newCounts[number - 1] -= 1;
      if (newCounts[selectedNumber! - 1] === 0) {
        jumpToNextNumber(newCounts);
      }
      remainingCountsSync.current = newCounts;
      setRemainingCounts(remainingCountsSync.current);
    },
    [jumpToNextNumber, remainingCounts, remainingCountsSync, selectedNumber, setRemainingCounts]
  );

  // 点击方格的回调函数
  const handleCellChange = useCallback(
    (row: number, col: number) => {
      if (selectionMode === 2) {
        setSelectedCell({ row, col });
        if (board[row][col].value) {
          setSelectedNumber(board[row][col].value);
        } else {
          setSelectedNumber(null);
        }
        return;
      }

      if (board[row][col].value) {
        return;
      }

      const newBoard = deepCopyBoard(board);
      const cell = newBoard[row][col];

      // 处理草稿模式
      if (draftMode && selectedNumber) {
        const conflictCells = checkNumberInRowColumnAndBox(newBoard, row, col, selectedNumber);
        if (conflictCells.length > 0) {
          handleErrorDraftAnimation(conflictCells);
          return;
        }

        const draftSet = new Set(cell.draft);
        if (draftSet.has(selectedNumber)) {
          draftSet.delete(selectedNumber);
        } else {
          draftSet.add(selectedNumber);
        }
        cell.draft = Array.from(draftSet).sort((a, b) => a - b);
        updateBoard(newBoard, `设置 (${row}, ${col}) 草稿为 ${cell.draft}`, false);
        playSound('switch', isSound);
      }
      // 处理非草稿模式
      else if (selectedNumber) {
        const conflictCells = checkNumberInRowColumnAndBox(newBoard, row, col, selectedNumber);

        // 验证填入的数字是否为有效候选数字
        if (!conflictCells.length) {
          cell.value = selectedNumber;
          cell.draft = [];

          // 更新相关单元格的草稿数字
          updateRelatedCellsDraft(newBoard, [{ row, col }], selectedNumber, getCandidates);

          playSound('switch', isSound);
          remainingCountsMinusOne(selectedNumber);
          updateBoard(newBoard, `设置 (${row}, ${col}) 为 ${selectedNumber}`, true);
        } else {
          handleErrorDraftAnimation(conflictCells);
          return;
        }
      }
    },
    [
      selectionMode,
      board,
      draftMode,
      selectedNumber,
      updateBoard,
      isSound,
      handleErrorDraftAnimation,
      remainingCountsMinusOne,
    ]
  );

  // 撤销
  const handleUndo = useCallback(() => {
    const lastAction = history.current[currentStep]?.action;
    if (lastAction === '复制官方草稿') {
      isClickAutoNote.current = false;
    }
    undo();
    playSound('switch', isSound);
  }, [history, currentStep, undo, isSound]);

  // 擦除
  const handleErase = useCallback(() => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      if (eraseEnabled) {
        playSound('erase', isSound);
        const newBoard = deepCopyBoard(board);
        const cell = newBoard[row][col];
        if (cell.value) {
          remainingCountsSync.current[cell.value - 1] += 1;
          setRemainingCounts(remainingCountsSync.current);
          countsSync.current--;
          setCounts(countsSync.current);
        }
        cell.value = null;
        cell.draft = [];
        updateBoard(newBoard, `擦除 (${row}, ${col})`, false);
        setEraseEnabled(false);
      }
    }
  }, [
    selectedCell,
    eraseEnabled,
    isSound,
    board,
    updateBoard,
    remainingCountsSync,
    setRemainingCounts,
    countsSync,
    setCounts,
  ]);

  // 选择数字
  const handleNumberSelect = useCallback(
    (number: number) => {
      if (selectionMode === 2) {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        const cell = board[row][col];

        if (cell.value) {
          return;
        }

        const newBoard = deepCopyBoard(board);
        const newCell = newBoard[row][col];
        const conflictCells = checkNumberInRowColumnAndBox(newBoard, row, col, number);
        if (conflictCells.length > 0) {
          handleErrorDraftAnimation(conflictCells);
          return;
        }
        // 模式2下草稿模式
        if (draftMode) {
          const draftSet = new Set(newCell.draft);
          if (draftSet.has(number)) {
            draftSet.delete(number);
          } else {
            draftSet.add(number);
          }
          newCell.draft = Array.from(draftSet).sort((a, b) => a - b);
          playSound('switch', isSound);

          updateBoard(newBoard, `设置 (${row}, ${col}) 草稿为 ${newCell.draft}`, false);
        } else {
          setSelectedNumber(number);
          playSound('switch', isSound);
          newCell.value = number;
          newCell.draft = [];
          updateRelatedCellsDraft(newBoard, [{ row, col }], number, getCandidates);
          setEraseEnabled(true);
          remainingCountsMinusOne(number);
          updateBoard(newBoard, `设置 (${row}, ${col}) 为 ${number}`, true);
        }
      } else {
        playSound('switch', isSound);
        setSelectedNumber(number);
        lastSelectedNumber.current = number;
      }
    },
    [
      selectionMode,
      selectedCell,
      board,
      draftMode,
      isSound,
      updateBoard,
      handleErrorDraftAnimation,
      remainingCountsMinusOne,
    ]
  );

  const handleDraftMode = useCallback(() => {
    setDraftMode(!draftMode);
    playSound('switch', isSound);
  }, [draftMode, isSound]);

  const handleShowCandidates = useCallback(() => {
    playSound('switch', isSound);
    if (counts < 17) {
      return;
    }
    isClickAutoNote.current = true;
    updateBoard(deepCopyBoard(standradBoard), '复制官方草稿', false);
  }, [standradBoard, updateBoard, isSound, counts]);

  const applyHintHighlight = useCallback(
    (board: CellData[][], result: Result, type: 'position' | 'prompt' | 'both') => {
      const { position, target, prompt, highlightPromts1, highlightPromts2, highlightPromts3 } =
        result;
      const newBoard = deepCopyBoard(board);
      if (type === 'position' || type === 'both') {
        position.forEach(({ row, col }: Position) => {
          newBoard[row][col].highlights = newBoard[row][col].highlights || [];
          newBoard[row][col].highlights.push('positionHighlight');
          newBoard[row][col].highlightCandidates = target;
        });
      }
      if (highlightPromts1 && highlightPromts2) {
        let highlightPromts = [];
        if (highlightPromts3) {
          highlightPromts = [...highlightPromts1, ...highlightPromts2, ...highlightPromts3];
        } else {
          highlightPromts = [...highlightPromts1, ...highlightPromts2];
        }
        if (highlightPromts.length > 0) {
          highlightPromts.forEach(
            ({ row, col, value }: { row: number; col: number; value: number | null }) => {
              newBoard[row][col].highlights = newBoard[row][col].highlights || [];
              newBoard[row][col].highlights.push('promptHighlight');
            }
          );
          highlightPromts1.forEach(({ row, col, value }: Position) => {
            newBoard[row][col].promptCandidates1 = [value];
          });
          highlightPromts2.forEach(({ row, col, value }: Position) => {
            newBoard[row][col].promptCandidates2 = [value];
          });
          if (highlightPromts3) {
            highlightPromts3.forEach(({ row, col, value }: Position) => {
              newBoard[row][col].promptCandidates3 = [value];
            });
          }
          return newBoard;
        }
      }
      if (type === 'prompt' || type === 'both') {
        prompt.forEach(({ row, col }: Position) => {
          newBoard[row][col].highlights = newBoard[row][col].highlights || [];
          newBoard[row][col].highlights.push('promptHighlight');
          newBoard[row][col].highlightCandidates = target;
        });
      }

      return newBoard;
    },
    []
  );

  const removeHintHighlight = useCallback((board: CellData[][]) => {
    const updatedBoard = deepCopyBoard(board);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        delete updatedBoard[row][col].highlights;
        delete updatedBoard[row][col].highlightCandidates;
        delete updatedBoard[row][col].promptCandidates;
        delete updatedBoard[row][col].promptCandidates1;
        delete updatedBoard[row][col].promptCandidates2;
        delete updatedBoard[row][col].promptCandidates3;
      }
    }
    return updatedBoard;
  }, []);

  const handleHint = useCallback(
    async (board: CellData[][]) => {
      if (
        countsSync.current < 17 ||
        sudokuStatus === SUDOKU_STATUS.ILLEGAL ||
        sudokuStatus === SUDOKU_STATUS.INCOMPLETE
      ) {
        playSound('switch', isSound);
        return;
      }
      if (!isClickAutoNote.current) {
        const currentBoard = deepCopyBoard(standradBoard);
        handleShowCandidates();
        handleHint(currentBoard);
        return;
      } else if (!checkDraftIsValid(board, answer)) {
        const differenceMap = findDifferenceDraftDIY(board, standradBoard, answer);
        setDifferenceMap(differenceMap);
        setHintMethod(handleHintMethod('', t));
        setHintDrawerVisible(true);
        setIsHint(true);
        setHintContent(t('errorDraft'));
        return;
      }
      let result: Result | null = null;
      for (const solveFunction of solveFunctions.current) {
        result = solveFunction(board, candidateMap.current, graph.current, answer);
        if (result) {
          hintCount.current++;
          setResult(result);
          setSelectedNumber(null);
          setHintMethod(handleHintMethod(result.method, t));
          setHintContent(
            handleHintContent(
              result,
              board,
              prompts,
              setPrompts,
              setSelectedNumber,
              setPositions,
              applyHintHighlight,
              updateBoard,
              t
            )
          );
          setHintDrawerVisible(true);
          setIsHint(true);
          lastSelectedCell.current = selectedCell;
          // setSelectedCell(null);
          return;
        }
      }
      if (combinationChainResult.current) {
        hintCount.current++;
        setResult(combinationChainResult.current);
        setSelectedNumber(null);
        setHintMethod(handleHintMethod(combinationChainResult.current.method, t));
        setHintContent(
          handleHintContent(
            combinationChainResult.current,
            board,
            prompts,
            setPrompts,
            setSelectedNumber,
            setPositions,
            applyHintHighlight,
            updateBoard,
            t
          )
        );
        setHintDrawerVisible(true);
        setIsHint(true);
        lastSelectedCell.current = selectedCell;
        setSelectedCell(null);
        return;
      } else if (colorChainResult.current) {
        hintCount.current++;
        setResult(colorChainResult.current);
        setSelectedNumber(null);
        setHintMethod(handleHintMethod(colorChainResult.current.method, t));
        setHintContent(
          handleHintContent(
            colorChainResult.current,
            board,
            prompts,
            setPrompts,
            setSelectedNumber,
            setPositions,
            applyHintHighlight,
            updateBoard,
            t
          )
        );
        setHintDrawerVisible(true);
        setIsHint(true);
        lastSelectedCell.current = selectedCell;
        setSelectedCell(null);
        return;
      } else {
        result = trialAndError(board, candidateMap.current, graph.current, answer);
        if (result) {
          hintCount.current++;
          setResult(result);
          setSelectedNumber(null);
          setHintMethod(handleHintMethod(result.method, t));

          setHintContent(
            handleHintContent(
              result,
              board,
              prompts,
              setPrompts,
              setSelectedNumber,
              setPositions,
              applyHintHighlight,
              updateBoard,
              t
            )
          );

          setHintDrawerVisible(true);
          setIsHint(true);
          lastSelectedCell.current = selectedCell;
          setSelectedCell(null);
          return;
        }
      }
    },
    [
      countsSync,
      sudokuStatus,
      answer,
      isSound,
      standradBoard,
      handleShowCandidates,
      t,
      setIsHint,
      candidateMap,
      graph,
      prompts,
      applyHintHighlight,
      updateBoard,
      selectedCell,
    ]
  );

  const handleApplyHint = useCallback(() => {
    if (Object.keys(differenceMap).length > 0) {
      const newBoard = deepCopyBoard(board);
      for (const key of Object.keys(differenceMap)) {
        const [row, col] = key.split(',');
        newBoard[row][col].draft.push(...differenceMap[key].sort((a, b) => a - b));
      }
      setDifferenceMap({});
      handleHint(newBoard);
      isClickAutoNote.current = true;
      playSound('switch', isSound);
      return;
    } else if (result) {
      const { position, isFill, method } = result;
      // 创建 target 数组的本地副本
      let targetValues = [...result.target];

      const newBoard = deepCopyBoard(board);

      position.forEach(({ row, col }) => {
        if (isFill) {
          newBoard[row][col].value = targetValues[0];
          newBoard[row][col].draft = [];

          // 更新受影响的单元格
          const affectedCells = updateRelatedCellsDraft(
            newBoard,
            [{ row, col }],
            targetValues[0],
            getCandidates
          );

          // 将受影响的单元格合并到 position 中
          position.push(...affectedCells);
        } else {
          newBoard[row][col].draft =
            newBoard[row][col].draft?.filter(num => !targetValues.includes(num)) ?? [];
        }
      });

      if (isFill) {
        playSound('switch', isSound);
        remainingCountsMinusOne(targetValues[0]);
      } else {
        playSound('erase', isSound);
      }

      // 移除提示高亮
      const updatedBoard = removeHintHighlight(newBoard);
      updateBoard(updatedBoard, '应用提示完成', isFill);

      setHintDrawerVisible(false);
      setIsHint(false);
      lastSelectedCell.current = selectedCell;
      setResult(null); // 重置 result
    }
  }, [
    differenceMap,
    result,
    handleHint,
    isSound,
    board,
    removeHintHighlight,
    updateBoard,
    selectedCell,
    remainingCountsMinusOne,
    setIsHint,
  ]);

  useEffect(() => {
    if (isConnected) {
      setHintDrawerVisible(false);
      setIsHint(false);
    }
  }, [isConnected]);

  const handleCancelHint = useCallback(() => {
    setDifferenceMap({});
    const updatedBoard = removeHintHighlight(board);
    updateBoard(updatedBoard, '取消提示', false);
    setHintDrawerVisible(false);
    setIsHint(false);
    setSelectedCell(lastSelectedCell.current);
  }, [board, removeHintHighlight, updateBoard, setIsHint]);

  // 切换模式回调函数
  const handleSelectionModeChange = useCallback(() => {
    playSound('switch', isSound);
    if (selectionMode === 1) {
      setSelectionMode(2);
      setSelectedNumber(null);
    } else {
      setSelectionMode(1);
      if (lastSelectedNumber.current) {
        setSelectedNumber(lastSelectedNumber.current);
      }
      setEraseEnabled(false);
    }
  }, [isSound, selectionMode]);

  useEffect(() => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    if (selectionMode === 1) return;
    if (board[row][col].isGiven || (board[row][col].draft.length === 0 && !board[row][col].value)) {
      setEraseEnabled(false);
    } else {
      setEraseEnabled(true);
    }
  }, [board, selectedCell, selectionMode]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // 添加导航监听器处理手势返回
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // 阻止默认行为
      e.preventDefault();
      if (sudokuType === SudokuType.DIY2 && !isConnected) {
        Alert.alert('⚠️', t('noNetwork'), [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('confirm'),
            style: 'default',
            onPress: () => {
              saveDataDIY();
              setIsHome(true);
              setIsDIY(false);
              if (sudokuType === SudokuType.DIY2) {
                setSudokuType(SudokuType.MY_BOARDS);
              } else if (sudokuType === SudokuType.DIY1) {
                setSudokuType(SudokuType.HOME);
              }
              navigation.dispatch(e.data.action);
            },
          },
        ]);
        return;
      }
      saveDataDIY();
      setIsHome(true);
      setIsDIY(false);
      if (sudokuType === SudokuType.DIY2) {
        setSudokuType(SudokuType.MY_BOARDS);
      } else if (sudokuType === SudokuType.DIY1) {
        setSudokuType(SudokuType.HOME);
      }
      // 恢复导航
      navigation.dispatch(e.data.action);
    });

    return unsubscribe;
  }, [navigation, sudokuType, saveDataDIY, setIsHome, setIsDIY, setSudokuType, isConnected, t]);

  const getAnswer = useCallback(
    (board: CellData[][]) => {
      if (
        counts < 17 ||
        sudokuStatus === SUDOKU_STATUS.ILLEGAL ||
        sudokuStatus === SUDOKU_STATUS.INCOMPLETE
      ) {
        playSound('switch', isSound);
        return;
      }
      playSound('switch', isSound);
      if (answer) {
        updateBoard(answer, '答案', false);
      } else {
      }
    },
    [isSound, updateBoard, counts, sudokuStatus, answer]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'inactive') {
        saveDataDIY();
      }
    });
    return () => subscription.remove();
  }, [sudokuType, saveDataDIY]);

  useEffect(() => {
    if (sudokuType === SudokuType.DIY1 || sudokuType === SudokuType.DIY2) {
      loadSavedData();
      loadSavedData2();
    }
  }, [sudokuType]);

  useEffect(() => {
    console.log('open');
    return () => {
      console.log('close');
    };
  }, []);

  const handleLock = useCallback(() => {
    console.log(counts);
    
    playSound('switch', isSound);
    if (sudokuStatus === SUDOKU_STATUS.ILLEGAL || sudokuStatus === SUDOKU_STATUS.INCOMPLETE) {
      return;
    }
    const newBoard = deepCopyBoard(board);
    newBoard.forEach(row => {
      row.forEach(cell => {
        if (cell.value) {
          cell.isGiven = true;
        }
      });
    });
    console.log('newBoard', newBoard);
    updateBoard(newBoard, '锁定', false);
  }, [sudokuStatus, isSound, board, updateBoard]);

  const handleUnlock = useCallback(() => {
    playSound('switch', isSound);
    const newBoard = deepCopyBoard(board);
    newBoard.forEach(row => {
      row.forEach(cell => {
        cell.isGiven = false;
      });
    });
    console.log('newBoard', newBoard);
    updateBoard(newBoard, '解锁', false);
  }, [isSound, board, updateBoard]);

  return (
    <View style={styles.container}>
      <TarBarsSudokuDIY
        onBack={handleBack}
        saveDataDIY={saveDataDIY}
        resetSudoku={resetSudoku}
        handleLock={handleLock}
        handleUnlock={handleUnlock}
        isLocked={isLocked}
      />
      <View style={styles.gameInfoDIY}>
        {sudokuStatus === SUDOKU_STATUS.SOLVED ? (
          <View style={styles.gameInfoTextDIY}>
            <Image source={require('../assets/icon/legal.png')} style={styles.gameInfoIcon} />
            <Text style={styles.gameInfoText}>{t('legal')}</Text>
          </View>
        ) : sudokuStatus === SUDOKU_STATUS.ILLEGAL ? (
          <View style={styles.gameInfoTextDIY}>
            <Image source={require('../assets/icon/illegal.png')} style={styles.gameInfoIcon} />
            <Text style={styles.gameInfoText}>{t('illegal')}</Text>
          </View>
        ) : (
          <View style={styles.gameInfoTextDIY}>
            <Image source={require('../assets/icon/illegal.png')} style={styles.gameInfoIcon} />
            <Text style={styles.gameInfoText}>{t('incomplete')}</Text>
          </View>
        )}
      </View>
      <View style={styles.sudokuGrid}>
        {board?.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              handleCellChange={handleCellChange}
              selectedNumber={selectedNumber}
              selectionMode={selectionMode}
              selectedCell={selectedCell}
              errorCells={errorCells}
              board={board}
              prompts={prompts}
              positions={positions}
              resultBoard={standradBoard}
              differenceMap={differenceMap}
              isHighlight={isHighlight}
              scaleValue={scaleValue2}
              isMovingRef={isMovingRef}
              isDark={isDark}
            />
          ))
        )}
      </View>
      <View style={styles.selectMode}></View>
      <View style={styles.controlButtons}>
        <Pressable
          style={[styles.buttonContainerDIY]}
          onPressIn={() => {
            if (scaleValue2 === 1.0) {
              handleUndo();
            }
          }}
          onPress={() => {
            if (scaleValue2 !== 1.0 && !isMovingRef.current) {
              handleUndo();
            }
          }}
          disabled={currentStep === 0}
        >
          <Image
            source={
              currentStep === 0
                ? isDark
                  ? require('../assets/icon/undo_active.png')
                  : require('../assets/icon/undo.png')
                : isDark
                ? require('../assets/icon/undo.png')
                : require('../assets/icon/undo_active.png')
            }
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>{t('undo')}</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonContainerDIY]}
          onPressIn={() => {
            if (scaleValue2 === 1.0) {
              handleErase();
            }
          }}
          onPress={() => {
            if (scaleValue2 !== 1.0 && !isMovingRef.current) {
              handleErase();
            }
          }}
        >
          <Image
            source={
              eraseEnabled
                ? isDark
                  ? require('../assets/icon/erase.png')
                  : require('../assets/icon/erase_active.png')
                : isDark
                ? require('../assets/icon/erase_active.png')
                : require('../assets/icon/erase.png')
            }
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>{t('erase')}</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonContainerDIY]}
          onPressIn={() => {
            if (scaleValue2 === 1.0) {
              handleDraftMode();
            }
          }}
          onPress={() => {
            if (scaleValue2 !== 1.0 && !isMovingRef.current) {
              handleDraftMode();
            }
          }}
        >
          <Image
            source={require('../assets/icon/draft.png')}
            style={[styles.buttonIcon, { tintColor: draftMode ? '#1890ff' : undefined }]}
          />
          <Text style={styles.buttonText}>{t('notes')}</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonContainerDIY]}
          onPressIn={() => {
            if (scaleValue2 === 1.0) {
              handleShowCandidates();
            }
          }}
          onPress={() => {
            if (scaleValue2 !== 1.0 && !isMovingRef.current) {
              handleShowCandidates();
            }
          }}
        >
          <Image source={require('../assets/icon/auto.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{t('autoNote')}</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonContainerDIY]}
          onPressIn={() => {
            if (scaleValue2 === 1.0) {
              handleHint(board);
            }
          }}
          onPress={() => {
            if (scaleValue2 !== 1.0 && !isMovingRef.current) {
              handleHint(board);
            }
          }}
        >
          <Image source={require('../assets/icon/prompt.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{t('hint')}</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonContainerDIY]}
          onPressIn={() => {
            if (scaleValue2 === 1.0) {
              getAnswer(board);
            }
          }}
          onPress={() => {
            if (scaleValue2 !== 1.0 && !isMovingRef.current) {
              getAnswer(board);
            }
          }}
        >
          <Image source={require('../assets/icon/answer.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{t('answer')}</Text>
        </Pressable>
      </View>
      <Buttons
        handleNumberSelect={handleNumberSelect}
        remainingCounts={remainingCounts}
        selectionMode={selectionMode}
        selectedNumber={selectedNumber}
        draftMode={draftMode}
        scaleValue={scaleValue2}
        isMovingRef={isMovingRef}
        isDark={isDark}
      />
      <View style={styles.selectionModeContainer}>
        <Text style={styles.selectionModeText}>{t('selectMode')}</Text>
        <Switch
          value={selectionMode === 2}
          onValueChange={handleSelectionModeChange}
          trackColor={{ false: '#f0f0f0', true: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)' }}
          thumbColor={selectionMode === 2 ? (isDark ? '#888' : '#fff') : isDark ? '#888' : '#fff'}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={hintDrawerVisible}>
        <View style={styles.modalContainer}>
          <View
            style={[styles.drawerContent]}
            onStartShouldSetResponder={() => true}
            onTouchEnd={e => {
              e.stopPropagation();
            }}
          >
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>{hintMethod}</Text>
            </View>
            <ScrollView
              style={styles.drawerTextContainer}
              contentContainerStyle={styles.drawerTextContentContainer}
              showsVerticalScrollIndicator={true}
              scrollEnabled={true}
              nestedScrollEnabled={true} // 移除或设置为 false
              bounces={true}
              scrollEventThrottle={16} // 添加滚动事件节流
              onStartShouldSetResponder={() => true} // 添加响应器
              onMoveShouldSetResponder={() => true} // 添加响应器
            >
              <Pressable>
                <Text style={styles.drawerText}>{hintContent}</Text>
              </Pressable>
            </ScrollView>
            <View style={styles.drawerButtons}>
              <Pressable
                onPressIn={handleCancelHint}
                style={[styles.drawerButton, styles.drawerButtonCancel]}
              >
                <Text style={styles.drawerButtonTextCancel}>{t('cancel')}</Text>
              </Pressable>
              <Pressable
                onPressIn={handleApplyHint}
                style={[styles.drawerButton, styles.drawerButtonApply]}
              >
                <Text style={styles.drawerButtonTextApply}>{t('apply')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default SudokuDIY;
