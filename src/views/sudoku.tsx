import React, { useState, useEffect, useCallback, useRef, memo, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Switch,
  Pressable,
  Animated,
  AppState,
  ScrollView,
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
  hiddenTriple1,
  nakedTriple1,
  nakedTriple2,
  hiddenTriple2,
  nakedQuadruple,
  swordfish,
  trialAndError,
  findDifferenceDraft,
  wxyzWing,
  remotePair,
  combinationChain,
  Loop,
} from '../tools/solution';
import { useTranslation } from 'react-i18next';
import type { CandidateMap, CellData, Graph, Position } from '../tools';
import type { DifferenceMap, Result } from '../tools/solution';
import styles from './sudokuStyles';
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
import rewardedVideo from '../tools/RewardedVideo';
import { RewardedAdEventType, BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import DeviceInfo from 'react-native-device-info';

const model = DeviceInfo.getModel();

interface SudokuProps {
  slideAnim: Animated.Value;
  closeSudoku: () => void;
  openSetting: () => void;
}

const Sudoku: React.FC<SudokuProps> = memo(
  ({ slideAnim, closeSudoku, openSetting }) => {
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
      standradBoard,
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
    const [errorCells, setErrorCells] = useState<{ row: number; col: number }[]>(
      [],
    );
    const [hintDrawerVisible, setHintDrawerVisible] = useState<boolean>(false);
    const isIphoneSE = useMemo(() => {
      return model.includes('SE');
    }, []);

    const [hintContent, setHintContent] = useState<string>('');
    const [hintMethod, setHintMethod] = useState<string>('');
    const [result, setResult] = useState<Result | null>(null);
    const [prompts, setPrompts] = useState<number[]>([]);
    const [positions, setPositions] = useState<number[]>([]);
    const [eraseEnabled, setEraseEnabled] = useState<boolean>(false);
    const [watchIconVisible, setWatchIconVisible] = useState<boolean>(false);

    // 记录是否在提示过程中
    const isHinting = useRef<boolean>(false);

    const isClickAutoNote = useRef<boolean>(false);
    const [differenceMap, setDifferenceMap] = useState<DifferenceMap>({});
    const hintCount = useRef<number>(0);
    const startTime = useRef<number>(0);
    const solveFunctions = useRef<
      ((
        board: CellData[][],
        candidateMap: CandidateMap,
        graph: Graph,
      ) => Result | null)[]
    >([
      singleCandidate,
      hiddenSingle,
      blockElimination,
      nakedPair,
      nakedTriple1,
      nakedTriple2,
      hiddenPair,
      hiddenTriple1,
      hiddenTriple2,
      xWing,
      xWingVarient,
      xyWing,
      nakedQuadruple,
      skyscraper,
      skyscraper2,
      remotePair,
      combinationChain,
      swordfish,
      wxyzWing,
      Loop,
      trialAndError,
    ]);
    const {
      difficulty,
      setResultVisible,
      errorCount,
      setErrorCount,
      setHintCount,
      isSound,
      setIsHasContinue,
      setDifficulty,
      isLevel,
      resultVisible,
      setInitializeBoard2,
      isContinue,
      isSudoku,
      isConnected,
      isVip,
      isHighlight,
    } = useSudokuStore();
    useEffect(() => {
      if (isSudoku) {
        rewardedVideo.setHintDrawerVisible(() => {
          setHintDrawerVisible(true);
        });
      }
    }, [isSudoku]);
    useEffect(() => {
      if (hintDrawerVisible) {
        handleHint(board);
      }
    }, [hintDrawerVisible]);
    const isFirstHint = useRef<boolean>(true);

    useEffect(() => {
      setInitializeBoard2(initializeBoard2);
    }, [initializeBoard2, setInitializeBoard2]);

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
      rewardedVideo.chance = true;
      setWatchIconVisible(false);
    }, [resetSudokuBoard, setErrorCount, t]);

    const saveData = useCallback(async () => {
      await saveSudokuData();

      const sudokuData = {
        lastSelectedNumber: lastSelectedNumber.current,
        errorCount,
        draftMode,
        lastErrorTime: lastErrorTime.current,
        selectedCell: selectedCell,
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
        chance: rewardedVideo.chance,
        resultVisible: false,
      };

      await AsyncStorage.setItem('sudokuData1', JSON.stringify(sudokuData));
    }, [differenceMap, draftMode, eraseEnabled, errorCells, errorCount, hintContent, hintMethod, positions, prompts, result, saveSudokuData, selectedCell, selectionMode, difficulty, watchIconVisible, isFirstHint, isHinting]);

    useEffect(() => {
      if (!isVip) {
        rewardedVideo.load();
      }
    }, []);

    useEffect(() => {
      rewardedVideo.rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        setWatchIconVisible(false);
      });
    }, []);

    const setSuccessResult = useCallback(
      (errorCount: number, hintCount: number) => {
        setResultVisible(true);
        setErrorCount(errorCount);
        setHintCount(hintCount);
        setIsHasContinue(true);
        AsyncStorage.setItem('isHasContinue', 'false');
      },
      [
        setResultVisible,
        setErrorCount,
        setHintCount,
        setIsHasContinue,
      ],
    );

    useEffect(() => {
      if (counts == 81) {
        setTimeout(() => {
          playVictorySound();
          setSuccessResult(errorCount, hintCount.current);
        }, 200);
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
        rewardedVideo.chance = data.chance;
        if (!rewardedVideo.isReady()) {
          setWatchIconVisible(false);
        }
      }
    }, [loadSavedData2, setErrorCount, t, setDifficulty, setWatchIconVisible]);

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
      [answerBoard, isSound, remainingCounts],
    );

    const playVictorySound = useCallback(() => {
      setTimeout(() => {
        playSound('success3', isSound);
      }, 300);
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
          setTimeout(() => setErrorCells([]), errorCooldownPeriod.current);
        }
      },
      [errorCount, isSound, setErrorCount],
    );

    const handleErrorDraftAnimation = useCallback(
      (conflictCells: Position[]) => {
        setErrorCells(conflictCells);
        setTimeout(() => setErrorCells([]), 300);
        playSound('error', isSound);
      },
      [isSound],
    );

    const jumpToNextNumber = useCallback(
      (newCounts: number[]): void => {
        if (!selectedNumber || newCounts[selectedNumber - 1] !== 0) {
          return;
        }

        let nextNumber = selectedNumber;
        do {
          nextNumber = (nextNumber % 9) + 1;
        } while (
          newCounts[nextNumber - 1] === 0 &&
          nextNumber !== selectedNumber
        );

        setSelectedNumber(nextNumber);
        lastSelectedNumber.current = nextNumber;
      },
      [selectedNumber],
    );

    const remainingCountsMinusOne = useCallback(
      (number: number) => {
        const newCounts = [...remainingCounts];
        newCounts[number - 1] -= 1;
        if (newCounts[selectedNumber! - 1] === 0) {
          jumpToNextNumber(newCounts);
        }
        setRemainingCounts(newCounts);
      },
      [jumpToNextNumber, remainingCounts, selectedNumber, setRemainingCounts],
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
          const conflictCells = checkNumberInRowColumnAndBox(
            newBoard,
            row,
            col,
            selectedNumber,
          );
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
          updateBoard(
            newBoard,
            `设置 (${row}, ${col}) 草稿为 ${cell.draft}`,
            false,
          );
          playSound('switch', isSound);
        }
        // 处理非草稿模式
        else if (selectedNumber) {
          // 验证填入的数字是否为有效候选数字
          if (answerBoard.current[row][col].value == selectedNumber) {
            cell.value = selectedNumber;
            cell.draft = [];

            // 更新相关单元格的草稿数字
            updateRelatedCellsDraft(
              newBoard,
              [{ row, col }],
              selectedNumber,
              getCandidates,
            );

            playSuccessSound(newBoard, row, col);
            updateBoard(
              newBoard,
              `设置 (${row}, ${col}) 为 ${selectedNumber}`,
              true,
            );
            remainingCountsMinusOne(selectedNumber);
          } else {
            handleError(row, col);
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
        answerBoard,
        playSuccessSound,
        remainingCountsMinusOne,
        handleError,
      ],
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
        if (
          eraseEnabled &&
          board[row][col].value !== answerBoard.current[row][col].value
        ) {
          playSound('erase', isSound);
          const newBoard = deepCopyBoard(board);
          const cell = newBoard[row][col];
          cell.value = null;
          cell.draft = [];
          updateBoard(newBoard, `擦除 (${row}, ${col})`, false);
          setEraseEnabled(false);
        }
      }
    }, [selectedCell, eraseEnabled, board, answerBoard, updateBoard, isSound]);

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
            const conflictCells = checkNumberInRowColumnAndBox(
              newBoard,
              row,
              col,
              number,
            );

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

            updateBoard(
              newBoard,
              `设置 (${row}, ${col}) 草稿为 ${newCell.draft}`,
              false,
            );
          } else {
            if (answerBoard.current[row][col].value == number) {
              playSuccessSound(newBoard, row, col);
              newCell.value = number;
              newCell.draft = [];
              updateRelatedCellsDraft(
                newBoard,
                [{ row, col }],
                number,
                getCandidates,
              );
              updateBoard(newBoard, `设置 (${row}, ${col}) 为 ${number}`, true);
              setEraseEnabled(false);
              remainingCountsMinusOne(number);
            } else {
              handleError(row, col);
              const currentTime = Date.now();
              if (
                lastErrorTime.current === null ||
                currentTime - lastErrorTime.current >
                errorCooldownPeriod.current
              ) {
                setErrorCount(errorCount + 1);
                lastErrorTime.current = currentTime;
              }
              return;
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
      ],
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
      if (isSameBoard(board, standradBoard)) {
        return;
      }

      isClickAutoNote.current = true;
      updateBoard(deepCopyBoard(standradBoard), '复制官方草稿', false);
    }, [isInitialized, board, standradBoard, updateBoard, isSound]);

    const applyHintHighlight = useCallback(
      (
        board: CellData[][],
        result: Result,
        type: 'position' | 'prompt' | 'both',
      ) => {
        const { position, target, prompt } = result;
        const newBoard = deepCopyBoard(board);
        if (type === 'position' || type === 'both') {
          position.forEach(({ row, col }: Position) => {
            newBoard[row][col].highlights = newBoard[row][col].highlights || [];
            newBoard[row][col].highlights.push('positionHighlight');
            newBoard[row][col].highlightCandidates = target;
          });
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
      [],
    );

    const removeHintHighlight = useCallback((board: CellData[][]) => {
      const updatedBoard = deepCopyBoard(board);
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          delete updatedBoard[row][col].highlights;
          delete updatedBoard[row][col].highlightCandidates;
        }
      }
      return updatedBoard;
    }, []);

    useEffect(() => {
      if (isSudoku && !rewardedVideo.isReady() && !rewardedVideo.getIsVip()) {
        setWatchIconVisible(false);
        rewardedVideo.chance = true;
        rewardedVideo.load();
      }
    }, [isSudoku]);

    const handleHint = useCallback(
      async (board: CellData[][]) => {
        if (!isClickAutoNote.current) {
          const currentBoard = deepCopyBoard(standradBoard);
          handleShowCandidates();
          handleHint(currentBoard);
          return;
        } else if (!checkDraftIsValid(board, answerBoard.current)) {
          const differenceMap = findDifferenceDraft(board, standradBoard);
          setDifferenceMap(differenceMap);
          setHintMethod(handleHintMethod('', t));
          setHintDrawerVisible(true);
          setHintContent(t('errorDraft'));
          return;
        }
        let result: Result | null = null;
        for (const solveFunction of solveFunctions.current) {
          result = solveFunction(board, candidateMap, graph, answerBoard.current);
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
                t,
              ),
            );
            setHintDrawerVisible(true);
            lastSelectedCell.current = selectedCell;
            setSelectedCell(null);
            break;
          }
        }
      },
      [
        answerBoard,
        standradBoard,
        handleShowCandidates,
        t,
        candidateMap,
        graph,
        prompts,
        applyHintHighlight,
        updateBoard,
        selectedCell,
      ],
    );

    // 提示和观看广告
    const handleHintAndRewardedVideo = useCallback(
      (board: CellData[][]) => {
        if (rewardedVideo.getIsVip()) {
          handleHint(board);
          return;
        }
        // if (!isConnected && !rewardedVideo.getIsVip()) {
        //   setHintDrawerVisible(true);
        //   setHintMethod('')
        //   setHintContent(t('pleaseConnectNetwork'));
        //   return;
        // }
        if (rewardedVideo.chance) {
          handleHint(board);
          rewardedVideo.chance = false;
          rewardedVideo.load();
          if (isFirstHint.current) {
            isFirstHint.current = false;
          }
        } else if (rewardedVideo.isReady() && watchIconVisible) {
          rewardedVideo.show();
        } else {
          rewardedVideo.load();
          handleHint(board);
        }
        if (rewardedVideo.isReady()) {
          setWatchIconVisible(true);
        }
      },
      [handleHint, isConnected, t],
    );

    const handleApplyHint = useCallback(() => {
      // if (!isConnected && !rewardedVideo.getIsVip()) {
      //   setHintDrawerVisible(false);
      //   return;
      // }
      if (Object.keys(differenceMap).length > 0) {
        setDifferenceMap({});
        const newBoard = deepCopyBoard(standradBoard);
        handleHint(newBoard);
        isClickAutoNote.current = true;
        playSound('switch', isSound);
        return;
      } else if (result) {
        const { position, target, isFill } = result;
        const newBoard = deepCopyBoard(board);

        position.forEach(({ row, col }) => {
          if (isFill) {
            newBoard[row][col].value = target[0];
            newBoard[row][col].draft = [];

            // 更新受影响的单元格
            const affectedCells = updateRelatedCellsDraft(
              newBoard,
              [{ row, col }],
              target[0],
              getCandidates,
            );

            // 将受影响的单元格合并到 position 中
            position.push(...affectedCells);
          } else {
            newBoard[row][col].draft =
              newBoard[row][col].draft?.filter(num => !target.includes(num)) ??
              [];
          }
        });

        if (isFill) {
          playSuccessSound(newBoard, position[0].row, position[0].col);
          remainingCountsMinusOne(target[0]);
        } else {
          playSound('erase', isSound);
        }

        // 移除提示高亮
        const updatedBoard = removeHintHighlight(newBoard);

        updateBoard(updatedBoard, '应用提示完成', isFill);

        setHintDrawerVisible(false);
        lastSelectedCell.current = selectedCell;
        setResult(null); // 重置 result
      }
    }, [board, differenceMap, handleHint, isSound, playSuccessSound, remainingCountsMinusOne, removeHintHighlight, result, selectedCell, standradBoard, updateBoard]);

    // useEffect(() => {
    //   if (isConnected) {
    //     setHintDrawerVisible(false);
    //   }
    // }, [isConnected]);

    const handleCancelHint = useCallback(() => {
      setDifferenceMap({});
      const updatedBoard = removeHintHighlight(board);
      updateBoard(updatedBoard, '取消提示', false);
      setHintDrawerVisible(false);
      setSelectedCell(lastSelectedCell.current);
    }, [board, removeHintHighlight, updateBoard]);

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
      if (board[row][col].value || board[row][col].draft.length === 0) {
        setEraseEnabled(false);
      } else {
        setEraseEnabled(true);
      }
    }, [board, selectedCell, selectionMode]);

    const handleBack = useCallback(() => {
      closeSudoku();
    }, [closeSudoku]);

    useEffect(() => {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if ((nextAppState === 'inactive') && (isSudoku || isContinue)) {
          saveData();
        }
      });
      return () => subscription.remove();
    }, [isSudoku, isContinue, saveData]);

    useEffect(() => {
      if (isContinue) {
        if (isHinting.current) {
          setHintDrawerVisible(true);
          return;
        }
      }
      if (isLevel) {
        setTimeout(() => {
          resetSudoku();
        }, 200);
      } else {
        loadSavedData();
      }
    }, [isLevel, isContinue]);

    useEffect(() => {
      if (hintDrawerVisible) {
        isHinting.current = true;
      } else {
        isHinting.current = false;
      }
    }, [hintDrawerVisible]);

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: slideAnim,
              },
            ],
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 5,
          },
        ]}>
        <TarBarsSudoku
          onBack={handleBack}
          openSetting={openSetting}
          saveData={saveData}
        />
        <View style={styles.gameInfo}>
          <View style={[styles.gameInfoItem, styles.gameInfoItem1]}>
            <View style={styles.gameInfoError}>
              <Image
                source={require('../assets/icon/error.png')}
                style={styles.errorIcon}
              />
              <Text style={styles.gameInfoTextError}>{errorCount}</Text>
            </View>
          </View>
          <View style={styles.gameInfoItem}>
            <Text style={styles.gameInfoText}>
              {t(`difficulty.${difficulty}`)}
            </Text>
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
                isHighlight={isHighlight}
              />
            )),
          )}
        </View>
        <View style={styles.selectMode}>
        </View>
        <View style={styles.controlButtons}>
          <Pressable
            style={[styles.buttonContainer]}
            onPressIn={handleUndo}
            disabled={currentStep === 0}>
            <Image
              source={
                currentStep === 0
                  ? require('../assets/icon/undo.png')
                  : require('../assets/icon/undo_active.png')
              }
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>{t('undo')}</Text>
          </Pressable>

          <Pressable style={[styles.buttonContainer]} onPressIn={handleErase}>
            <Image
              source={
                eraseEnabled
                  ? require('../assets/icon/erase_active.png')
                  : require('../assets/icon/erase.png')
              }
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>{t('erase')}</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer]}
            onPressIn={handleDraftMode}>
            <Image
              source={require('../assets/icon/draft.png')}
              style={[
                styles.buttonIcon,
                { tintColor: draftMode ? '#1890ff' : undefined },
              ]}
            />
            <Text style={styles.buttonText}>{t('notes')}</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer]}
            onPressIn={handleShowCandidates}>
            <Image
              source={require('../assets/icon/auto.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>{t('autoNote')}</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer]}
            onPressIn={() => handleHintAndRewardedVideo(board)}>
            <WatchIcon top={5} right={15} visible={watchIconVisible && !isVip} />
            <Image
              source={require('../assets/icon/prompt.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>{t('hint')}</Text>
          </Pressable>
        </View>
        <Buttons
          handleNumberSelect={handleNumberSelect}
          remainingCounts={remainingCounts}
          selectionMode={selectionMode}
          selectedNumber={selectedNumber}
          draftMode={draftMode}
        />
        <View style={styles.selectionModeContainer}>
          <Text style={styles.selectionModeText}>{t('selectMode')}</Text>
          <Switch
            value={selectionMode === 2}
            onValueChange={handleSelectionModeChange}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={selectionMode === 2 ? '#1890ff' : '#f4f3f4'}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={hintDrawerVisible}>
          <View pointerEvents="box-none" style={styles.modalContainer}>
            <View
              style={[styles.drawerContent]}
              onStartShouldSetResponder={() => true}
              onTouchEnd={e => {
                e.stopPropagation();
              }}>
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
                  style={[styles.drawerButton, styles.drawerButtonCancel]}>
                  <Text style={styles.drawerButtonTextCancel}>
                    {t('cancel')}
                  </Text>
                </Pressable>
                <Pressable
                  onPressIn={handleApplyHint}
                  style={[styles.drawerButton, styles.drawerButtonApply]}>
                  <Text style={styles.drawerButtonTextApply}>{t('apply')}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <ResultView
          onBack={closeSudoku}
          resetSudoku={resetSudoku}
          visible={resultVisible}
        />
      </Animated.View>
    );
  },
);

export default Sudoku;
