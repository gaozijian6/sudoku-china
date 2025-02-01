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
  copyOfficialDraft,
  solve3,
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
  hiddenTriple1,
  nakedTriple1,
  nakedTriple2,
  hiddenTriple2,
  nakedQuadruple,
  swordfish,
  wxyzWing,
  remotePair,
  combinationChain,
  trialAndErrorDIY,
} from '../tools/solution';
import type { CandidateMap, CellData, Graph, Position } from '../tools';
import type { DifferenceMap, Result } from '../tools/solution';
import styles from './sudokuStyles';
import { handleHintContent } from '../tools/handleHintContent';
import Cell from '../components/SudokuCell';
import Buttons from '../components/Buttons';
import { playSound } from '../tools/Sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSudokuStore } from '../store';
import TarBarsSudokuDIY from '../components/tarBarsSudokuDIY';
import { SUDOKU_STATUS } from '../constans';
import { useTranslation } from 'react-i18next';
import handleHintMethod from '../tools/handleHintMethod';
import rewardedVideo from '../tools/RewardedVideo';
import WatchIcon from '../components/WatchIcon';
import { BannerAd, BannerAdSize, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import DeviceInfo from 'react-native-device-info';

const model = DeviceInfo.getModel();

interface SudokuDIYProps {
  slideAnim: Animated.Value;
  closeSudokuDIY: () => void;
  openSetting: () => void;
}

const SudokuDIY: React.FC<SudokuDIYProps> = memo(
  ({ slideAnim, closeSudokuDIY, openSetting }) => {
    const { t } = useTranslation();
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
    const lastErrorTime = useRef<number | null>(null);
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
    const [sudokuStatus, setSudokuStatus] = useState<
      keyof typeof SUDOKU_STATUS
    >(SUDOKU_STATUS.VOID);

    const isClickAutoNote = useRef<boolean>(false);
    const [differenceMap, setDifferenceMap] = useState<DifferenceMap>({});
    const hintCount = useRef<number>(0);
    const time = useRef<string>('00:00');
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
      trialAndErrorDIY,
    ]);
    const { errorCount, setErrorCount, isSound, isDIY, isConnected, isVip } =
      useSudokuStore();
    useEffect(() => {
      if (isDIY) {
        rewardedVideo.setHintDrawerVisible(() => {
          setHintDrawerVisible(true);
        });
      }
    }, [isDIY]);
    useEffect(() => {
      if (hintDrawerVisible) {
        handleHint(board);
      }
    }, [hintDrawerVisible]);
    const [watchIconVisible, setWatchIconVisible] = useState<boolean>(false);
    const isFirstHint = useRef<boolean>(true);
    const resetSudoku = useCallback(() => {
      playSound('switch', isSound);
      setSelectedNumber(1);
      resetSudokuBoard();
      setTimeout(() => {
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
        time.current = '00:00';
        startTime.current = 0;
      }, 0);
    }, [isSound, resetSudokuBoard, setErrorCount, t]);

    const saveDataDIY = useCallback(() => {
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
        time: time.current,
        startTime: startTime.current,
        watchIconVisible,
        isFirstHint: isFirstHint.current,
      };

      AsyncStorage.setItem('sudokuDataDIY1', JSON.stringify(sudokuData));
      saveSudokuData();
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
      watchIconVisible,
      isFirstHint,
    ]);

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

    const loadSavedData = useCallback(async () => {
      const sudokuData = await AsyncStorage.getItem('sudokuDataDIY1');
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
        time.current = data.time;
        startTime.current = data.startTime;
        setWatchIconVisible(data.watchIconVisible);
        isFirstHint.current = data.isFirstHint;
        if (!rewardedVideo.isReady()) {
          setWatchIconVisible(false);
        }
      }
    }, [setErrorCount, t]);

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
        remainingCountsSync.current = newCounts;
        setRemainingCounts(remainingCountsSync.current);
      },
      [
        jumpToNextNumber,
        remainingCounts,
        remainingCountsSync,
        selectedNumber,
        setRemainingCounts,
      ],
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
          const conflictCells = checkNumberInRowColumnAndBox(
            newBoard,
            row,
            col,
            selectedNumber,
          );

          // 验证填入的数字是否为有效候选数字
          if (!conflictCells.length) {
            cell.value = selectedNumber;
            cell.draft = [];

            // 更新相关单元格的草稿数字
            updateRelatedCellsDraft(
              newBoard,
              [{ row, col }],
              selectedNumber,
              getCandidates,
            );

            playSound('switch', isSound);
            updateBoard(
              newBoard,
              `设置 (${row}, ${col}) 为 ${selectedNumber}`,
              true,
            );
            remainingCountsMinusOne(selectedNumber);
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
      ],
    );

    // 撤销
    const handleUndo = useCallback(() => {
      setSudokuStatus(SUDOKU_STATUS.VOID);
      const lastAction = history.current[currentStep]?.action;
      if (lastAction === '复制官方草稿') {
        isClickAutoNote.current = false;
      }
      undo();
      playSound('switch', isSound);
    }, [history, currentStep, undo, isSound, setSudokuStatus]);

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

            updateBoard(
              newBoard,
              `设置 (${row}, ${col}) 草稿为 ${newCell.draft}`,
              false,
            );
          } else {
            playSound('switch', isSound);
            newCell.value = number;
            newCell.draft = [];
            updateRelatedCellsDraft(
              newBoard,
              [{ row, col }],
              number,
              getCandidates,
            );
            updateBoard(newBoard, `设置 (${row}, ${col}) 为 ${number}`, true);
            setEraseEnabled(true);
            setTimeout(() => {
              remainingCountsMinusOne(number);
            }, 0);
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
      ],
    );

    const handleDraftMode = useCallback(() => {
      setDraftMode(!draftMode);
      playSound('switch', isSound);
    }, [draftMode, isSound]);

    const handleShowCandidates = useCallback(() => {
      playSound('switch', isSound);
      if (counts < 17) {
        setSudokuStatus(SUDOKU_STATUS.INCOMPLETE);
        return;
      }
      isClickAutoNote.current = true;
      updateBoard(deepCopyBoard(standradBoard), '复制官方草稿', false);
    }, [standradBoard, updateBoard, isSound, counts]);

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
      if (isDIY && !rewardedVideo.isReady()) {
        setWatchIconVisible(false);
        rewardedVideo.chance = true;
        rewardedVideo.load();
      }
    }, [isDIY]);

    const handleHint = useCallback(
      async (board: CellData[][]) => {
        if (countsSync.current < 17) {
          setSudokuStatus(SUDOKU_STATUS.INCOMPLETE);
          return;
        }
        if (!isClickAutoNote.current) {
          const currentBoard = deepCopyBoard(standradBoard);
          handleShowCandidates();
          handleHint(currentBoard);
          return;
        }
        let result: Result | null = null;
        for (const solveFunction of solveFunctions.current) {
          result = solveFunction(board, candidateMap, graph);
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
        countsSync,
        standradBoard,
        handleShowCandidates,
        candidateMap,
        graph,
        t,
        prompts,
        applyHintHighlight,
        updateBoard,
        selectedCell,
      ],
    );

    // 提示和观看广告
    const handleHintAndRewardedVideo = useCallback(
      (board: CellData[][]) => {
        if (counts < 17) {
          playSound('switch', isSound);
          setSudokuStatus(SUDOKU_STATUS.INCOMPLETE);
          return;
        }
        if (!isConnected && !rewardedVideo.getIsVip()) {
          setHintDrawerVisible(true);
          setHintMethod('')
          setHintContent(t('pleaseConnectNetwork'));
          return;
        }
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
      [handleHint, isConnected, t, counts],
    );

    const handleApplyHint = useCallback(() => {
      if (!isConnected && !rewardedVideo.getIsVip()) {
        setHintDrawerVisible(false);
        return;
      }
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
          playSound('switch', isSound);
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
    }, [
      board,
      differenceMap,
      handleHint,
      isSound,
      remainingCountsMinusOne,
      removeHintHighlight,
      result,
      selectedCell,
      standradBoard,
      updateBoard,
      isConnected,
    ]);

    useEffect(() => {
      if (isConnected) {
        setHintDrawerVisible(false);
      }
    }, [isConnected]);

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
      if (selectionMode === 1) {
        setEraseEnabled(false);
        return;
      } else {
        if (board[row][col].value || board[row][col].draft.length) {
          setEraseEnabled(true);
        } else {
          setEraseEnabled(false);
        }
      }
    }, [board, selectedCell, selectionMode]);

    const handleBack = useCallback(() => {
      closeSudokuDIY();
    }, [closeSudokuDIY]);

    const getAnswer = useCallback(
      async (board: CellData[][]) => {
        if (counts < 17) {
          playSound('switch', isSound);
          setSudokuStatus(SUDOKU_STATUS.INCOMPLETE);
          return;
        }
        if (!isConnected) {
          setHintDrawerVisible(true);
          setHintMethod('');
          setHintContent(t('pleaseConnectNetwork'));
          return;
        }
        playSound('switch', isSound);
        setSudokuStatus(SUDOKU_STATUS.SOLVING);
        const standardBoard = copyOfficialDraft(board);
        const result = await solve3(standardBoard);
        if (result) {
          setSudokuStatus(SUDOKU_STATUS.SOLVED);
          updateBoard(result, '答案', false);
        } else {
          setSudokuStatus(SUDOKU_STATUS.ILLEGAL);
        }
      },
      [isConnected, isSound, t, updateBoard, counts],
    );

    useEffect(() => {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === 'background' && isDIY) {
          saveDataDIY();
        }
      });
      return () => subscription.remove();
    }, [isDIY, saveDataDIY]);

    useEffect(() => {
      loadSavedData();
      loadSavedData2();
    }, []);

    useEffect(() => {
      setSudokuStatus(SUDOKU_STATUS.VOID);
    }, []);

    useEffect(() => {
      if (counts != 81) {
        setSudokuStatus(SUDOKU_STATUS.VOID);
      }
    }, [counts]);

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
        <TarBarsSudokuDIY
          onBack={handleBack}
          openSetting={openSetting}
          saveDataDIY={saveDataDIY}
          resetSudoku={resetSudoku}
        />
        <View style={styles.gameInfoDIY}>
          {sudokuStatus !== SUDOKU_STATUS.VOID &&
            (sudokuStatus === SUDOKU_STATUS.SOLVED ? (
              <View style={styles.gameInfoTextDIY}>
                <Image
                  source={require('../assets/icon/legal.png')}
                  style={styles.gameInfoIcon}
                />
                <Text style={styles.gameInfoText}>{t('legal')}</Text>
              </View>
            ) : sudokuStatus === SUDOKU_STATUS.SOLVING ? (
              <View style={styles.gameInfoTextDIY}>
                <Image
                  source={require('../assets/icon/waiting.png')}
                  style={styles.gameInfoIcon}
                />
                <Text style={styles.gameInfoText}>{t('solving')}</Text>
              </View>
            ) : sudokuStatus === SUDOKU_STATUS.ILLEGAL ? (
              <View style={styles.gameInfoTextDIY}>
                <Image
                  source={require('../assets/icon/illegal.png')}
                  style={styles.gameInfoIcon}
                />
                <Text style={styles.gameInfoText}>{t('illegal')}</Text>
              </View>
            ) : (
              <View style={styles.gameInfoTextDIY}>
                <Image
                  source={require('../assets/icon/illegal.png')}
                  style={styles.gameInfoIcon}
                />
                <Text style={styles.gameInfoText}>{t('incomplete')}</Text>
              </View>
            ))}
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
              />
            )),
          )}
        </View>
        <View style={styles.selectMode}></View>
        <View style={styles.controlButtons}>
          <Pressable
            style={[styles.buttonContainerDIY]}
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

          <Pressable style={[styles.buttonContainerDIY]} onPressIn={handleErase}>
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
            style={[styles.buttonContainerDIY]}
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
            style={[styles.buttonContainerDIY]}
            onPressIn={handleShowCandidates}>
            <Image
              source={require('../assets/icon/auto.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>{t('autoNote')}</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainerDIY]}
            onPressIn={() => handleHintAndRewardedVideo(board)}>
            <WatchIcon top={0} right={10} visible={watchIconVisible} />
            <Image
              source={require('../assets/icon/prompt.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>{t('hint')}</Text>
          </Pressable>
          <Pressable
            style={[styles.buttonContainerDIY]}
            onPressIn={() => getAnswer(board)}>
            <Image
              source={require('../assets/icon/answer.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>{t('answer')}</Text>
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
        {!isIphoneSE && isDIY && (
          <View style={styles.bannerContainer}>
            <BannerAd
              // unitId={TestIds.BANNER}
              unitId={'ca-app-pub-2981436674907454/7094926382'}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={hintDrawerVisible}>
          <View style={styles.modalContainer}>
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
      </Animated.View>
    );
  },
);

export default SudokuDIY;
