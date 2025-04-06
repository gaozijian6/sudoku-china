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
} from 'react-native';
import {
  checkNumberInRowColumnAndBox,
  updateRelatedCellsDraft,
  getCandidates,
  deepCopyBoard,
  checkDraftIsValid,
  isRowFull,
  isColumnFull,
  isBoxFull,
  isSameBoard,
  generateBoard,
  saveUserStatisticPass,
} from '../tools';
import { useSudokuBoard } from '../tools/useSudokuBoard';
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
  trialAndError,
  findDifferenceDraft,
  combinationChain,
  Loop,
  uniqueRectangle,
  BinaryUniversalGrave,
  xyzWing,
  jellyfish,
  hiddenTriple,
  findDifferenceCells,
  findDifferenceDraftAll,
} from '../tools/solution';
import { useTranslation } from 'react-i18next';
import type { CandidateMap, CellData, Graph, Position } from '../tools';
import type { DifferenceMap, Result, FalseCells } from '../tools/solution';
import { handleHintContent } from '../tools/handleHintContent';
import Cell from '../components/SudokuCell';
import Buttons from '../components/Buttons';
import { playSound } from '../tools/Sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSudokuStore } from '../store';
import TarBarsSudoku from '../components/tarBarsSudoku';
import ResultView from '../components/ResultOverlay';
import handleHintMethod from '../tools/handleHintMethod';
import WatchIcon from '../components/WatchIcon';
import { RewardedAdEventType } from 'react-native-google-mobile-ads';
import createStyles from './sudokuStyles';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useNavigation, useRoute } from '@react-navigation/native';
import entryBoard from '../mock/1entry';
import easyBoard from '../mock/2easy';
import mediumBoard from '../mock/3medium';
import hardBoard from '../mock/4hard';
import extremeBoard from '../mock/5extreme';
import { DIFFICULTY } from '../constans';

const { ColorChain } = NativeModules;

interface SudokuProps {
  isMovingRef: React.MutableRefObject<boolean>;
}

const Sudoku: React.FC<SudokuProps> = memo(({ isMovingRef }) => {
  const { t } = useTranslation();
  const {
    board,
    updateBoard,
    undo,
    currentStep,
    candidateMap,
    graph,
    answerBoard,
    remainingCounts,
    setRemainingCounts,
    remainingCountsSync,
    standradBoard,
    standradBoardRef,
    history,
    resetSudokuBoard,
    isInitialized,
    saveSudokuData,
    loadSavedData2,
    counts,
    initializeBoard2,
  } = useSudokuBoard();

  const [selectedNumber, setSelectedNumber] = useState<number | null>(1);
  const lastSelectedNumber = useRef<number | null>(null);
  const [draftMode, setDraftMode] = useState<boolean>(false);
  const lastErrorTime = useRef<number | null>(null);
  const errorCooldownPeriod = useRef<number>(300);
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
  const [watchIconVisible, setWatchIconVisible] = useState<boolean>(false);
  const [isPlayingFinish, setIsPlayingFinish] = useState<boolean>(false);

  // 记录是否在提示过程中
  const isHinting = useRef<boolean>(false);

  const isClickAutoNote = useRef<boolean>(false);
  const [differenceMap, setDifferenceMap] = useState<DifferenceMap>({});
  const isDifferenceMap = useRef<boolean>(false);
  const isDifferenceMapAll = useRef<boolean>(false);
  const [falseCells, setFalseCells] = useState<FalseCells[]>([]);
  const isFalseCellsBefore = useRef<boolean>(false);
  const isFalseDraft = useMemo(() => {
    return Object.keys(differenceMap).length > 0 || falseCells.length > 0;
  }, [differenceMap, falseCells]);
  const hintCount = useRef<number>(0);
  const startTime = useRef<number>(0);
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
    combinationChain,
    swordfish,
    jellyfish,
    Loop,
    uniqueRectangle,
    BinaryUniversalGrave,
  ]);
  const difficulty = useSudokuStore(state => state.difficulty);
  const setResultVisible = useSudokuStore(state => state.setResultVisible);
  const errorCount = useSudokuStore(state => state.errorCount);
  const setErrorCount = useSudokuStore(state => state.setErrorCount);
  const setHintCount = useSudokuStore(state => state.setHintCount);
  const isSound = useSudokuStore(state => state.isSound);
  const setIsHasContinue = useSudokuStore(state => state.setIsHasContinue);
  const setDifficulty = useSudokuStore(state => state.setDifficulty);
  const resultVisible = useSudokuStore(state => state.resultVisible);
  const isContinue = useSudokuStore(state => state.isContinue);
  const isSudoku = useSudokuStore(state => state.isSudoku);
  const isConnected = useSudokuStore(state => state.isConnected);
  const isVip = useSudokuStore(state => state.isVip);
  const isIllegal = useSudokuStore(state => state.isIllegal);
  const setIsIllegal = useSudokuStore(state => state.setIsIllegal);
  const isHighlight = useSudokuStore(state => state.isHighlight);
  const setIsHint = useSudokuStore(state => state.setIsHint);
  const scaleValue1 = useSudokuStore(state => state.scaleValue1);
  const isDark = useSudokuStore(state => state.isDark);
  const isReason = useSudokuStore(state => state.isReason);
  const setIsContinue = useSudokuStore(state => state.setIsContinue);
  const setIsSudoku = useSudokuStore(state => state.setIsSudoku);
  const setIsHome = useSudokuStore(state => state.setIsHome);
  const setIsLevel = useSudokuStore(state => state.setIsLevel);
  const entryBoardUnPass = useSudokuStore(state => state.entryBoardUnPass);
  const easyBoardUnPass = useSudokuStore(state => state.easyBoardUnPass);
  const mediumBoardUnPass = useSudokuStore(state => state.mediumBoardUnPass);
  const hardBoardUnPass = useSudokuStore(state => state.hardBoardUnPass);
  const extremeBoardUnPass = useSudokuStore(state => state.extremeBoardUnPass);
  const userStatisticPass = useSudokuStore(state => state.userStatisticPass);
  const setUserStatisticPass = useSudokuStore(state => state.setUserStatisticPass);
  const updateUserStatisticPassOnline = useSudokuStore(
    state => state.updateUserStatisticPassOnline
  );
  const puzzleId = useRef<string>('');
  const setCurrentPuzzleIndex = useSudokuStore(state => state.setCurrentPuzzleIndex);
  const currentPuzzleIndex = useSudokuStore(state => state.currentPuzzleIndex);

  const styles = createStyles(isDark, draftMode);

  const isFirstHint = useRef<boolean>(true);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { difficulty_route, index_route } = (route.params as any) || {};

  useEffect(() => {
    if (difficulty_route) {
      const { puzzleId: puzzleIdValue, currentIndex } = generateBoard(
        difficulty_route,
        initializeBoard2,
        entryBoardUnPass,
        easyBoardUnPass,
        mediumBoardUnPass,
        hardBoardUnPass,
        extremeBoardUnPass,
        index_route
      );
      puzzleId.current = puzzleIdValue;
      setDifficulty(difficulty_route);
      setCurrentPuzzleIndex(currentIndex);
    }
  }, [difficulty_route]);

  const resetSudoku = useCallback(() => {
    setSelectedNumber(1);
    lastSelectedNumber.current = null;
    setErrorCount(0);
    setDraftMode(false);
    lastErrorTime.current = null;
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
    startTime.current = 0;
    resetSudokuBoard();
    setWatchIconVisible(false);
    isFirstHint.current = true;
    setWatchIconVisible(false);
  }, [resetSudokuBoard, setErrorCount, t, setIsHint]);

  const saveData = useCallback(async () => {
    await saveSudokuData();

    const sudokuData = {
      lastSelectedNumber: lastSelectedNumber.current,
      errorCount,
      draftMode,
      lastErrorTime: lastErrorTime.current,
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
      startTime: startTime.current,
      difficulty,
      watchIconVisible,
      isFirstHint: isFirstHint.current,
      isHinting: isHinting.current,
      resultVisible: false,
      puzzleId: puzzleId.current,
      currentPuzzleIndex,
    };

    await AsyncStorage.setItem('sudokuData1', JSON.stringify(sudokuData));
  }, [
    differenceMap,
    draftMode,
    eraseEnabled,
    errorCells,
    errorCount,
    hintContent,
    hintMethod,
    positions,
    prompts,
    result,
    saveSudokuData,
    selectedCell,
    selectionMode,
    difficulty,
    watchIconVisible,
    isFirstHint,
    isHinting,
    currentPuzzleIndex,
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
  useEffect(() => {
    ColorChain.solve(cleanBoard).then(result => {
      colorChainResult.current = result;
    });
  }, [cleanBoard]);

  const setSuccessResult = useCallback(
    (errorCount: number, hintCount: number) => {
      setResultVisible(true);
      setErrorCount(errorCount);
      setHintCount(hintCount);
      setIsHasContinue(true);
      AsyncStorage.setItem('isHasContinue', 'false');
    },
    [setResultVisible, setErrorCount, setHintCount, setIsHasContinue]
  );

  useEffect(() => {
    if (counts == 81) {
      const arr = new Array(10000).fill(0);
      setTimeout(() => {
        for (let i = 0; i < userStatisticPass[difficulty].length; i++) {
          if (userStatisticPass[difficulty][i] === '1') {
            arr[i] = 1;
          }
        }
        let index;
        switch (difficulty) {
          case DIFFICULTY.ENTRY:
            index = entryBoard.findIndex(item => item.date === puzzleId.current);
            break;
          case DIFFICULTY.EASY:
            index = easyBoard.findIndex(item => item.date === puzzleId.current);
            break;
          case DIFFICULTY.MEDIUM:
            index = mediumBoard.findIndex(item => item.date === puzzleId.current);
            break;
          case DIFFICULTY.HARD:
            index = hardBoard.findIndex(item => item.date === puzzleId.current);
            break;
          case DIFFICULTY.EXTREME:
            index = extremeBoard.findIndex(item => item.date === puzzleId.current);
            break;
        }
        console.log('index', index);

        arr[index!] = 1;
        const newUserStatisticPass = {
          ...userStatisticPass,
          [difficulty]: arr.join(''),
        };
        setUserStatisticPass(newUserStatisticPass);
        saveUserStatisticPass(newUserStatisticPass);
        updateUserStatisticPassOnline();
        playVictorySound();
        setSuccessResult(errorCount, hintCount.current);
      }, 100);
    }
  }, [counts]);

  const loadSavedData = useCallback(async () => {
    loadSavedData2();
    const sudokuData = await AsyncStorage.getItem('sudokuData1');
    if (sudokuData) {
      const data = JSON.parse(sudokuData);
      lastSelectedNumber.current = data.lastSelectedNumber;
      setErrorCount(data.errorCount);
      setDraftMode(data.draftMode);
      lastErrorTime.current = data.lastErrorTime;
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
      startTime.current = data.startTime;
      setDifficulty(data.difficulty);
      setWatchIconVisible(data.watchIconVisible);
      isFirstHint.current = data.isFirstHint;
      isHinting.current = data.isHinting;
      puzzleId.current = data.puzzleId;
      setCurrentPuzzleIndex(data.currentPuzzleIndex);
    }
  }, [loadSavedData2, setErrorCount, t, setDifficulty, setWatchIconVisible, setCurrentPuzzleIndex]);

  useEffect(() => {
    if (isContinue) {
      loadSavedData();
    }
  }, [isContinue]);

  const playSuccessSound = useCallback(
    (board: CellData[][], row: number, col: number) => {
      if (
        isRowFull(board, row) ||
        isColumnFull(board, col) ||
        isBoxFull(board, Math.floor(row / 3) * 3 + Math.floor(col / 3)) ||
        remainingCounts[answerBoard.current[row][col].value! - 1] === 1
      ) {
        playSound('success2', isSound);
      } else {
        playSound('success', isSound);
      }
    },
    [answerBoard, isSound, remainingCounts]
  );

  const playVictorySound = useCallback(() => {
    const timer = setTimeout(() => {
      playSound('success3', isSound);
    }, 300);
    return () => clearTimeout(timer);
  }, [isSound]);

  const handleError = useCallback(
    (row: number, col: number) => {
      playSound('error', isSound);
      const currentTime = Date.now();
      if (
        lastErrorTime.current === null ||
        currentTime - lastErrorTime.current > errorCooldownPeriod.current
      ) {
        setErrorCount(errorCount + 1);
        setErrorCells([{ row, col }]);
        lastErrorTime.current = currentTime;
        const timer = setTimeout(() => setErrorCells([]), errorCooldownPeriod.current);
        return () => clearTimeout(timer);
      }
    },
    [errorCount, isSound, setErrorCount]
  );

  const handleErrorDraftAnimation = useCallback(
    (conflictCells: Position[]) => {
      setErrorCells(conflictCells);
      const timer = setTimeout(() => setErrorCells([]), 300);
      playSound('error', isSound);
      return () => clearTimeout(timer);
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
        if (!isReason) {
          // 验证填入的数字是否为有效候选数字
          if (answerBoard.current[row][col].value == selectedNumber) {
            cell.value = selectedNumber;
            cell.draft = [];

            // 更新相关单元格的草稿数字
            updateRelatedCellsDraft(newBoard, [{ row, col }], selectedNumber, getCandidates);

            playSuccessSound(newBoard, row, col);
            remainingCountsMinusOne(selectedNumber);
            updateBoard(newBoard, `设置 (${row}, ${col}) 为 ${selectedNumber}`, true);
          } else {
            handleError(row, col);
            return;
          }
        } else {
          const conflictCells = checkNumberInRowColumnAndBox(newBoard, row, col, selectedNumber);
          if (conflictCells.length > 0) {
            handleErrorDraftAnimation(conflictCells);
            return;
          }
          cell.value = selectedNumber;
          cell.draft = [];

          // 更新相关单元格的草稿数字
          updateRelatedCellsDraft(newBoard, [{ row, col }], selectedNumber, getCandidates);

          playSound('switch', isSound);
          remainingCountsMinusOne(selectedNumber);
          updateBoard(newBoard, `设置 (${row}, ${col}) 为 ${selectedNumber}`, true);
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
      answerBoard,
      playSuccessSound,
      remainingCountsMinusOne,
      handleError,
      isReason,
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
        cell.value = null;
        cell.draft = [];
        updateBoard(newBoard, `擦除 (${row}, ${col})`, false);
        setEraseEnabled(false);
      }
    }
  }, [selectedCell, eraseEnabled, board, updateBoard, isSound]);

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

        // 模式2下草稿模式
        if (draftMode) {
          const conflictCells = checkNumberInRowColumnAndBox(newBoard, row, col, number);

          if (conflictCells.length > 0) {
            handleErrorDraftAnimation(conflictCells);
            return;
          }

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
          if (!isReason) {
            if (answerBoard.current[row][col].value == number) {
              playSuccessSound(newBoard, row, col);
              newCell.value = number;
              newCell.draft = [];
              updateRelatedCellsDraft(newBoard, [{ row, col }], number, getCandidates);
              remainingCountsMinusOne(number);
              updateBoard(newBoard, `设置 (${row}, ${col}) 为 ${number}`, true);
              setEraseEnabled(false);
            } else {
              handleError(row, col);
              const currentTime = Date.now();
              if (
                lastErrorTime.current === null ||
                currentTime - lastErrorTime.current > errorCooldownPeriod.current
              ) {
                setErrorCount(errorCount + 1);
                lastErrorTime.current = currentTime;
              }
              return;
            }
          } else {
            const conflictCells = checkNumberInRowColumnAndBox(newBoard, row, col, number);
            if (conflictCells.length > 0) {
              handleErrorDraftAnimation(conflictCells);
              return;
            }
            playSound('switch', isSound);
            newCell.value = number;
            newCell.draft = [];
            updateRelatedCellsDraft(newBoard, [{ row, col }], number, getCandidates);
            remainingCountsMinusOne(number);
            updateBoard(newBoard, `设置 (${row}, ${col}) 为 ${number}`, true);
            setEraseEnabled(false);
          }
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
      answerBoard,
      playSuccessSound,
      remainingCountsMinusOne,
      handleError,
      setErrorCount,
      errorCount,
      isReason,
    ]
  );

  const handleDraftMode = useCallback(() => {
    setDraftMode(!draftMode);
    playSound('switch', isSound);
  }, [draftMode, isSound]);

  const handleShowCandidates = useCallback(() => {
    if (!isInitialized) {
      return;
    }

    playSound('switch', isSound);
    if (isSameBoard(board, standradBoardRef.current)) {
      return;
    }

    isClickAutoNote.current = true;
    updateBoard(deepCopyBoard(standradBoardRef.current), '复制官方草稿', false);
  }, [isInitialized, board, standradBoardRef, updateBoard, isSound]);

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
      if (!isClickAutoNote.current) {
        const currentBoard = deepCopyBoard(standradBoardRef.current);
        handleShowCandidates();
        handleHint(currentBoard);
        return;
      } else if (!checkDraftIsValid(board, answerBoard.current)) {
        const falseCells = findDifferenceCells(
          board,
          standradBoardRef.current,
          answerBoard.current
        );
        const differenceMapAll = findDifferenceDraftAll(
          board,
          standradBoardRef.current,
          answerBoard.current
        );
        const differenceMap = findDifferenceDraft(
          board,
          standradBoardRef.current,
          answerBoard.current
        );
        if (falseCells.length > 0) {
          isFalseCellsBefore.current = true;
          setFalseCells(falseCells);
          setHintMethod(handleHintMethod('', t));
          setHintDrawerVisible(true);
          setIsHint(true);
          setHintContent(t('errorDraft'));
          return;
        } else {
          if (isFalseCellsBefore.current) {
            setDifferenceMap(differenceMapAll);
            isDifferenceMapAll.current = true;
            setHintMethod(handleHintMethod('', t));
            setHintDrawerVisible(true);
            setIsHint(true);
            setHintContent(t('errorDraft'));
            return;
          } else {
            setDifferenceMap(differenceMap);
            isDifferenceMap.current = true;
            setHintMethod(handleHintMethod('', t));
            setHintDrawerVisible(true);
            setIsHint(true);
            setHintContent(t('errorDraft'));
            return;
          }
        }
      }
      let result: Result | null = null;
      for (const solveFunction of solveFunctions.current) {
        result = solveFunction(board, candidateMap.current, graph.current);
        if (result) {
          // console.log(result);
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
      if (colorChainResult.current) {
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
        result = trialAndError(board, candidateMap.current, graph.current, answerBoard.current);
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
      answerBoard,
      standradBoardRef,
      handleShowCandidates,
      t,
      candidateMap,
      graph,
      prompts,
      applyHintHighlight,
      updateBoard,
      selectedCell,
      setIsHint,
    ]
  );

  const handleApplyHint = useCallback(() => {
    if (!isConnected && !isVip) {
      setHintDrawerVisible(false);
      setIsHint(false);
      return;
    }
    if (isIllegal && isContinue && !isVip) {
      setHintDrawerVisible(false);
      setIsHint(false);
      return;
    }
    if (falseCells.length > 0) {
      setFalseCells([]);
      const newBoard = deepCopyBoard(board);
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (
            newBoard[row][col].value &&
            newBoard[row][col].value !== answerBoard.current[row][col].value
          ) {
            newBoard[row][col].value = null;
          }
        }
      }
      updateBoard(newBoard, '应用提示完成', false);
      handleHint(newBoard);
      isClickAutoNote.current = true;
      playSound('switch', isSound);
      return;
    } else if (Object.keys(differenceMap).length > 0) {
      if (isDifferenceMapAll.current) {
        setDifferenceMap({});
        const newBoard = deepCopyBoard(standradBoardRef.current);
        handleHint(newBoard);
        isClickAutoNote.current = true;
        playSound('switch', isSound);
        isFalseCellsBefore.current = false;
        isDifferenceMapAll.current = false;
        return;
      } else if (isDifferenceMap.current) {
        const newBoard = deepCopyBoard(board);
        for (const key of Object.keys(differenceMap)) {
          const [row, col] = key.split(',');
          newBoard[row][col].draft.push(...differenceMap[key].sort((a, b) => a - b));
        }
        setDifferenceMap({});
        handleHint(newBoard);
        isClickAutoNote.current = true;
        playSound('switch', isSound);
        isFalseCellsBefore.current = false;
        isDifferenceMap.current = false;
      }
    } else if (result) {
      const { position, isFill, method } = result;
      // Create a local copy of the target array instead of modifying the original
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
        playSuccessSound(newBoard, position[0].row, position[0].col);
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
    isConnected,
    isVip,
    isIllegal,
    isContinue,
    falseCells.length,
    differenceMap,
    result,
    setIsHint,
    board,
    handleHint,
    isSound,
    answerBoard,
    standradBoardRef,
    removeHintHighlight,
    updateBoard,
    selectedCell,
    playSuccessSound,
    remainingCountsMinusOne,
  ]);

  useEffect(() => {
    if (isConnected) {
      setHintDrawerVisible(false);
      setIsHint(false);
    }
  }, [isConnected]);

  const handleCancelHint = useCallback(() => {
    setDifferenceMap({});
    setFalseCells([]);
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
      // 手动保存数据并更新状态
      saveData();
      // 然后允许导航继续
      setTimeout(() => {
        setIsHome(true);
        setIsSudoku(false);
        setIsContinue(false);
        setIsLevel(false);
        // 恢复导航
        navigation.dispatch(e.data.action);
      }, 0);
    });

    return unsubscribe;
  }, [
    navigation,
    isSudoku,
    isContinue,
    saveData,
    setIsHome,
    setIsSudoku,
    setIsContinue,
    setIsLevel,
  ]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'inactive' && (isSudoku || isContinue)) {
        saveData();
      }
    });
    return () => subscription.remove();
  }, [isSudoku, isContinue, saveData]);

  useEffect(() => {
    if (isContinue) {
      if (isHinting.current) {
        setHintDrawerVisible(true);
        setIsHint(true);
        return;
      }
    }
  }, [isContinue, setIsHint]);

  useEffect(() => {
    if (hintDrawerVisible) {
      isHinting.current = true;
    } else {
      isHinting.current = false;
    }
  }, [hintDrawerVisible]);

  useEffect(() => {
    console.log('open');
    return () => {
      console.log('close');
    };
  }, []);

  return (
    <View style={[styles.container]}>
      <TarBarsSudoku onBack={handleBack} saveData={saveData} />
      <View style={styles.gameInfo}>
        <View style={[styles.gameInfoItem, styles.gameInfoItem1]}>
          <View style={styles.gameInfoError}>
            <Image source={require('../assets/icon/error.png')} style={styles.errorIcon} />
            <Text style={styles.gameInfoTextError}>{errorCount}</Text>
          </View>
        </View>
        <View style={styles.gameInfoItem}>
          <Text style={styles.gameInfoText}>{t(`difficulty.${difficulty}`)}</Text>
        </View>
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
              falseCells={falseCells}
              isHighlight={isHighlight}
              scaleValue={scaleValue1}
              isMovingRef={isMovingRef}
              isDark={isDark}
            />
          ))
        )}
      </View>
      <View style={styles.selectMode}></View>
      <View style={styles.controlButtons}>
        <Pressable
          style={[styles.buttonContainer]}
          onPressIn={() => {
            if (scaleValue1 === 1.0) {
              handleUndo();
            }
          }}
          onPress={() => {
            if (scaleValue1 !== 1.0 && !isMovingRef.current) {
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
          style={[styles.buttonContainer]}
          onPressIn={() => {
            if (scaleValue1 === 1.0) {
              handleErase();
            }
          }}
          onPress={() => {
            if (scaleValue1 !== 1.0 && !isMovingRef.current) {
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
            style={[styles.buttonIcon]}
          />
          <Text style={styles.buttonText}>{t('erase')}</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonContainer]}
          onPressIn={() => {
            if (scaleValue1 === 1.0) {
              handleDraftMode();
            }
          }}
          onPress={() => {
            if (scaleValue1 !== 1.0 && !isMovingRef.current) {
              handleDraftMode();
            }
          }}
        >
          <Image
            source={require('../assets/icon/draft.png')}
            style={[styles.buttonIcon, styles.buttonIconDraft]}
          />
          <Text style={styles.buttonText}>{t('notes')}</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonContainer]}
          onPressIn={() => {
            if (scaleValue1 === 1.0) {
              handleShowCandidates();
            }
          }}
          onPress={() => {
            if (scaleValue1 !== 1.0 && !isMovingRef.current) {
              handleShowCandidates();
            }
          }}
        >
          <Image source={require('../assets/icon/auto.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{t('autoNote')}</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonContainer]}
          onPressIn={() => {
            if (scaleValue1 === 1.0) {
              handleHint(board);
            }
          }}
          onPress={() => {
            if (scaleValue1 !== 1.0 && !isMovingRef.current) {
              handleHint(board);
            }
          }}
        >
          {!isVip && <WatchIcon top={5} right={15} visible={watchIconVisible} />}
          <Image source={require('../assets/icon/prompt.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{t('hint')}</Text>
        </Pressable>
      </View>
      <Buttons
        handleNumberSelect={handleNumberSelect}
        remainingCounts={remainingCounts}
        selectionMode={selectionMode}
        selectedNumber={selectedNumber}
        draftMode={draftMode}
        scaleValue={scaleValue1}
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
        <Tooltip
          isVisible={tooltipVisible}
          content={
            <Text style={styles.tooltipText}>{isReason ? t('reasonText') : t('strictText')}</Text>
          }
          placement="top"
          onClose={() => setTooltipVisible(false)}
        >
          <Pressable
            onPressIn={() => setTooltipVisible(true)}
            onPressOut={() => setTooltipVisible(false)}
            style={styles.tooltipPressable}
          >
            <Image
              source={
                isReason
                  ? require('../assets/icon/reason.png')
                  : require('../assets/icon/strict.png')
              }
              style={styles.hintIcon}
            />
          </Pressable>
        </Tooltip>
      </View>

      <Modal animationType="slide" transparent={true} visible={hintDrawerVisible}>
        <View pointerEvents="box-none" style={styles.modalContainer}>
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
              {!isFalseDraft && (
                <Pressable
                  onPressIn={handleCancelHint}
                  style={[styles.drawerButton, styles.drawerButtonCancel]}
                >
                  <Text style={styles.drawerButtonTextCancel}>{t('cancel')}</Text>
                </Pressable>
              )}
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
      <ResultView
        onBack={handleBack}
        resetSudoku={resetSudoku}
        visible={resultVisible}
        puzzleId={puzzleId}
        initializeBoard2={initializeBoard2}
      />
    </View>
  );
});

export default Sudoku;
