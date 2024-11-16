import React, {useState, useEffect, useCallback, useRef, memo} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Switch,
  Pressable,
  Animated,
} from 'react-native';
import {
  checkNumberInRowColumnAndBox,
  updateRelatedCellsDraft,
  getCandidates,
  useSudokuBoard,
  deepCopyBoard,
  checkDraftIsValid,
  copyOfficialDraft,
  isRowFull,
  isColumnFull,
  isBoxFull,
  isSameBoard,
} from '../tools';
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
  hiddenTriple1,
  nakedTriple1,
  nakedTriple2,
  hiddenTriple2,
  nakedQuadruple,
  swordfish,
  trialAndError,
  findDifferenceDraft,
} from '../tools/solution';
import type {CandidateMap, CellData, Graph, Position} from '../tools';
import type {DifferenceMap, Result} from '../tools/solution';
import {DIFFICULTY} from '../constans';
import styles from './sudokuStyles';
import {handleHintContent} from '../tools/handleHintContent';
import Cell from '../components/SudokuCell';
import Buttons from '../components/Buttons';
import Timer from '../components/Timer';
import {playSound} from '../tools/Sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  mockBoard1,
  mockStandardBoard1,
  mockAnswerBoard1,
  mockRemainingCounts1,
  mockCounts1,
} from './easy';
import middleBoard from './middle';
import {
  mockBoard3,
  mockStandardBoard3,
  mockAnswerBoard3,
  mockRemainingCounts3,
  mockCounts3,
} from './hard';
import extremeBoard from './extreme';
import PauseOverlay from '../components/PauseOverlay';
import TarBarsSudoku from '../components/tarBarsSudoku';

interface SudokuProps {
  slideAnim: Animated.Value;
  setSuccessResult: (
    time: string,
    errorCount: number,
    hintCount: number,
  ) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  pauseVisible: boolean;
  tooglePause: () => void;
  isHome: boolean;
  setIsHome: (value: boolean) => void;
  closeSudoku: () => void;
  isSound: boolean;
  openSetting: () => void;
}

const Sudoku: React.FC<SudokuProps> = memo(
  ({
    slideAnim,
    setSuccessResult,
    difficulty,
    setDifficulty,
    pauseVisible,
    tooglePause,
    isHome,
    setIsHome,
    closeSudoku,
    isSound,
    openSetting,
  }) => {
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
      setStandradBoard,
      resetSudokuBoard,
      initializeBoard,
      isInitialized,
      saveSudokuData
    } = useSudokuBoard();
    const [selectedNumber, setSelectedNumber] = useState<number | null>(1);
    const lastSelectedNumber = useRef<number | null>(null);
    const [errorCount, setErrorCount] = useState<number>(0);
    const [draftMode, setDraftMode] = useState<boolean>(false);
    const lastErrorTime = useRef<number | null>(null);
    const errorCooldownPeriod = useRef<number>(300);
    const [selectedCell, setSelectedCell] = useState<{
      row: number;
      col: number;
    } | null>({row: 0, col: 0});
    const lastSelectedCell = useRef<{
      row: number;
      col: number;
    } | null>(null);
    const [selectionMode, setSelectionMode] = useState<1 | 2>(1);
    const [errorCells, setErrorCells] = useState<{row: number; col: number}[]>(
      [],
    );
    const [hintDrawerVisible, setHintDrawerVisible] = useState<boolean>(false);
    const [hintContent, setHintContent] = useState<string>('');
    const [hintMethod, setHintMethod] = useState<string>('');
    const [result, setResult] = useState<Result | null>(null);
    const [prompts, setPrompts] = useState<number[]>([]);
    const [positions, setPositions] = useState<number[]>([]);
    const [eraseEnabled, setEraseEnabled] = useState<boolean>(false);

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
      swordfish,
      trialAndError,
    ]);
    const resetSudoku = useCallback(() => {
      setSelectedNumber(1);
      lastSelectedNumber.current = null;
      setErrorCount(0);
      setDraftMode(false);
      lastErrorTime.current = null;
      setSelectedCell({row: 0, col: 0});
      lastSelectedCell.current = null;
      setSelectionMode(1);
      setErrorCells([]);
      setHintDrawerVisible(false);
      setHintContent('');
      setHintMethod('');
      setResult(null);
      setPrompts([]);
      setPositions([]);
      setEraseEnabled(false);
      isClickAutoNote.current = false;
      setDifferenceMap({});
      hintCount.current = 0;
      time.current = '00:00';
      startTime.current = 0;
      resetSudokuBoard();
    }, [resetSudokuBoard]);

    const saveData = useCallback(() => {
      const sudokuData = {
        board,
        lastSelectedNumber: lastSelectedNumber.current,
        errorCount,
        draftMode,
        lastErrorTime: lastErrorTime.current,
        selectedCell: selectedCell,
        lastSelectedCell: lastSelectedCell.current,
        selectionMode,
        errorCells,
        hintDrawerVisible, 
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
      };
      AsyncStorage.setItem('sudokuData1', JSON.stringify(sudokuData));
      saveSudokuData();
    }, []);

    useEffect(() => {
      if (!isHome) {
        resetSudoku();
      }
    }, [isHome]);

    useEffect(() => {
      generateBoard(difficulty);
    }, [difficulty]);

    const generateBoard = useCallback(
      (difficulty: string) => {
        switch (difficulty) {
          case DIFFICULTY.EASY:
            initializeBoard(
              mockBoard1,
              mockStandardBoard1,
              mockAnswerBoard1,
              mockRemainingCounts1,
              mockCounts1,
            );
            break;
          case DIFFICULTY.MEDIUM:
            // newBoard = deepCopyBoard(middleBoard);
            break;
          case DIFFICULTY.HARD:
            initializeBoard(
              mockBoard3,
              mockStandardBoard3,
              mockAnswerBoard3,
              mockRemainingCounts3,
              mockCounts3,
            );
            break;
          case DIFFICULTY.EXTREME:
            // newBoard = deepCopyBoard(extremeBoard);
            break;
        }
      },
      [initializeBoard],
    );

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

    const handleError = useCallback((row: number, col: number) => {
      playSound('error', isSound);
      const currentTime = Date.now();
      if (
        lastErrorTime.current === null ||
        currentTime - lastErrorTime.current > errorCooldownPeriod.current
      ) {
        setErrorCount(prevCount => prevCount + 1);
        setErrorCells([{row, col}]);
        lastErrorTime.current = currentTime;
        setTimeout(() => setErrorCells([]), errorCooldownPeriod.current);
      }
    }, []);

    const handleErrorDraftAnimation = useCallback(
      (conflictCells: Position[]) => {
        setErrorCells(conflictCells);
        setTimeout(() => setErrorCells([]), 300);
        playSound('error', isSound);
      },
      [isSound],
    );

    const remainingCountsMinusOne = (number: number) => {
      const newCounts = [...remainingCounts];
      newCounts[number - 1] -= 1;
      if (newCounts[selectedNumber! - 1] === 0) {
        jumpToNextNumber(newCounts);
      }
      setRemainingCounts(newCounts);
    };

    // 点击方格的回调函数
    const handleCellChange = useCallback(
      (row: number, col: number) => {
        if (selectionMode === 2) {
          setSelectedCell({row, col});
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
              [{row, col}],
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
        const {row, col} = selectedCell;
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
          const {row, col} = selectedCell;
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
                [{row, col}],
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
                setErrorCount(prevCount => prevCount + 1);
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
      ],
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

        handleNumberSelect(nextNumber);
      },
      [handleNumberSelect, selectedNumber],
    );

    const handleDraftMode = useCallback(() => {
      setDraftMode(!draftMode);
      playSound('switch', isSound);
    }, [draftMode, isSound]);

    const handleDraftModeChange = useCallback(
      (value: boolean) => {
        setDraftMode(value);
        playSound('switch', isSound);
      },
      [isSound],
    );

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
        const {position, target, prompt} = result;
        const newBoard = deepCopyBoard(board);
        if (type === 'position' || type === 'both') {
          position.forEach(({row, col}: Position) => {
            newBoard[row][col].highlights = newBoard[row][col].highlights || [];
            newBoard[row][col].highlights.push('positionHighlight');
            newBoard[row][col].highlightCandidates = target;
          });
        }
        if (type === 'prompt' || type === 'both') {
          prompt.forEach(({row, col}: Position) => {
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
          setHintMethod('');
          setHintContent('笔记有错误，请先修正');
          return;
        }
        let result: Result | null = null;
        for (const solveFunction of solveFunctions.current) {
          result = solveFunction(board, candidateMap, graph);
          if (result) {
            hintCount.current++;
            setResult(result);
            setSelectedNumber(null);
            setHintMethod(result.method);
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
        candidateMap,
        graph,
        prompts,
        applyHintHighlight,
        updateBoard,
        selectedCell,
      ],
    );

    const handleApplyHint = useCallback(() => {
      if (Object.keys(differenceMap).length > 0) {
        setDifferenceMap({});
        const newBoard = deepCopyBoard(standradBoard);
        handleHint(newBoard);
        isClickAutoNote.current = true;
        playSound('switch', isSound);
        return;
      } else if (result) {
        const {position, target, isFill} = result;
        const newBoard = deepCopyBoard(board);

        position.forEach(({row, col}) => {
          if (isFill) {
            newBoard[row][col].value = target[0];
            newBoard[row][col].draft = [];

            // 更新受影响的单元格
            const affectedCells = updateRelatedCellsDraft(
              newBoard,
              [{row, col}],
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

        // 使用 updateBoard 函数更新棋盘
        updateBoard(newBoard, `应用提示：${result.method}`, false);
        if (isFill) {
          playSuccessSound(newBoard, position[0].row, position[0].col);
          setStandradBoard(copyOfficialDraft(deepCopyBoard(newBoard)));
          remainingCountsMinusOne(target[0]);
        } else {
          playSound('erase', isSound);
        }

        // 移除提示高亮
        const updatedBoard = removeHintHighlight(newBoard);
        updateBoard(updatedBoard, '提示应用完成', isFill);

        setHintDrawerVisible(false);
        lastSelectedCell.current = selectedCell;
        setResult(null); // 重置 result
      }
    }, [
      board,
      differenceMap,
      handleHint,
      isSound,
      playSuccessSound,
      remainingCountsMinusOne,
      removeHintHighlight,
      result,
      selectedCell,
      setStandradBoard,
      standradBoard,
      updateBoard,
    ]);

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
      const {row, col} = selectedCell;
      if (selectionMode === 1) return;
      if (board[row][col].value || board[row][col].draft.length === 0) {
        setEraseEnabled(false);
      } else {
        setEraseEnabled(true);
      }
    }, [board, selectedCell, selectionMode]);

    const setTimeFunction = useCallback(
      (time1: string) => {
        time.current = time1;
        setSuccessResult(time.current, errorCount, hintCount.current);
      },
      [errorCount, setSuccessResult],
    );

    const handleBack = useCallback(() => {
      closeSudoku();
    }, [closeSudoku]);

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
          tooglePause={tooglePause}
          setDifficulty={setDifficulty}
          setIsHome={setIsHome}
          openSetting={openSetting}
          saveData={saveData}
        />
        <View style={styles.gameInfo}>
          <View style={styles.gameInfoError}>
            <Image
              source={require('../assets/icon/error.png')}
              style={styles.errorIcon}
            />
            <Text style={styles.gameInfoTextError}>{errorCount}</Text>
          </View>
          <Text style={[styles.gameInfoText, styles.middleText]}>
            {difficulty}
          </Text>
          {/* <Timer
            setTimeFunction={setTimeFunction}
            counts={counts}
            playVictorySound={playVictorySound}
            difficulty={difficulty}
            pauseVisible={pauseVisible}
          /> */}
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
            <Text style={styles.buttonText}>撤销</Text>
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
            <Text style={styles.buttonText}>擦除</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer]}
            onPressIn={handleDraftMode}>
            <Switch
              value={draftMode}
              thumbColor={draftMode ? '#1890ff' : '#f4f3f4'}
              style={[
                styles.draftModeSwitchStyle,
                styles.draftModeSwitch,
                {right: -25},
              ]}
              onValueChange={handleDraftModeChange}
            />
            <Image
              source={require('../assets/icon/draft.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>笔记</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer]}
            onPressIn={handleShowCandidates}>
            <Image
              source={require('../assets/icon/auto.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>自动笔记</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer]}
            onPressIn={() => handleHint(board)}>
            <Image
              source={require('../assets/icon/prompt.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>提示</Text>
          </Pressable>
        </View>
        <Buttons
          handleNumberSelect={handleNumberSelect}
          remainingCounts={remainingCounts}
          selectionMode={selectionMode}
          selectedNumber={selectedNumber}
          draftMode={draftMode}
        />
        <Switch
          value={selectionMode === 2}
          onValueChange={handleSelectionModeChange}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={selectionMode === 2 ? '#1890ff' : '#f4f3f4'}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={hintDrawerVisible}>
          <View
            style={styles.drawerContent}
            // 添加这个属性来阻止点击事件冒泡
            onStartShouldSetResponder={() => true}
            onTouchEnd={e => {
              e.stopPropagation();
            }}>
            <>
              <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>{hintMethod}</Text>
                <Pressable
                  onPressIn={handleCancelHint}
                  style={styles.closeIconButton}>
                  <Image
                    source={require('../assets/icon/close.png')}
                    style={styles.closeIcon}
                  />
                </Pressable>
              </View>
              <Text style={styles.drawerText}>{hintContent}</Text>
              <View style={styles.drawerButtons}>
                <Pressable
                  onPressIn={handleApplyHint}
                  style={[styles.drawerButton, styles.drawerButtonApply]}>
                  <Text style={styles.drawerButtonTextApply}>应用</Text>
                </Pressable>
                <Pressable
                  onPressIn={handleCancelHint}
                  style={[styles.drawerButton, styles.drawerButtonCancel]}>
                  <Text style={styles.drawerButtonTextCancel}>取消</Text>
                </Pressable>
              </View>
            </>
          </View>
        </Modal>
        <PauseOverlay tooglePause={tooglePause} visible={pauseVisible} />
      </Animated.View>
    );
  },
);

export default Sudoku;
