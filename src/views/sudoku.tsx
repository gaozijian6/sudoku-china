import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Image,
  Modal,
  TextStyle,
  Switch,
} from 'react-native';
import {
  useTimer,
  solve,
  getCellClassName,
  checkNumberInRowColumnAndBox,
  updateRelatedCellsDraft,
  getCandidates,
  useSudokuBoard,
  deepCopyBoard,
  checkDraftIsValid,
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
  eureka,
  trialAndError,
} from '../tools/solution';
import type {CellData, Position} from '../tools';
import type {Result} from '../tools/solution';
import {DIFFICULTY} from '../constans';
import styles from './sudokuStyles';
import Sound from 'react-native-sound';
import {handleHintContent} from '../tools/handleHintContent';
import mockBoard from './mock';
const Sudoku: React.FC = () => {
  const initialBoard = Array(9)
    .fill(null)
    .map(() => Array(9).fill({value: null, isGiven: false, draft: []}));
  const {
    board,
    updateBoard,
    undo,
    currentStep,
    candidateMap,
    graph,
    answerBoard,
    clearHistory,
    remainingCounts,
    setRemainingCounts,
    copyOfficialDraft,
  } = useSudokuBoard(initialBoard);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(1);
  const [lastSelectedNumber, setLastSelectedNumber] = useState<number | null>(
    null,
  );
  const [errorCount, setErrorCount] = useState<number>(0);
  const [draftMode, setDraftMode] = useState<boolean>(false);

  const [lastErrorTime, setLastErrorTime] = useState<number | null>(null);
  const errorCooldownPeriod = 300; // 错误冷却时间，单位毫秒
  const time = useTimer();
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>({row: 0, col: 0});
  const [lastSelectedCell, setLastSelectedCell] = useState<{
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
  const [errorSounds, setErrorSounds] = useState<Sound[]>([]);
  const [successSounds, setSuccessSounds] = useState<Sound[]>([]);
  const [switchSounds, setSwitchSounds] = useState<Sound[]>([]);
  const [eraseSounds, setEraseSounds] = useState<Sound[]>([]);

  const generateBoard = useCallback(() => {
    const initialBoard = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null));

    let newBoard: CellData[][] = initialBoard.map(row =>
      row.map(value => ({
        value,
        isGiven: value !== null,
        draft: [],
      })),
    );

    newBoard = mockBoard;

    updateBoard(newBoard, '生成新棋盘');

    // 生成解决方案
    const solvedBoard = newBoard.map(row => row.map(cell => ({...cell})));
    solve(solvedBoard);
  }, [updateBoard]);

  useEffect(() => {
    generateBoard();
  }, []);

  // 播放音效的函数
  const playSound = useCallback((sounds: Sound[]) => {
    if (!sounds || sounds.length === 0) {
      console.log('音效还未加载完成');
      return;
    }

    const availableSound = sounds.find(sound => !sound.isPlaying());
    console.log('可用音效:', availableSound);

    if (availableSound) {
      availableSound.play(success => {
        if (!success) {
          console.log('播放音频失败');
        }
      });
    } else {
      console.log('没有可用的音效实例');
    }
  }, []);

  const handleError = useCallback(
    (row: number, col: number) => {
      playSound(errorSounds);
      const currentTime = Date.now();
      if (
        lastErrorTime === null ||
        currentTime - lastErrorTime > errorCooldownPeriod
      ) {
        setErrorCount(prevCount => prevCount + 1);
        setErrorCells([{row, col}]);
        setLastErrorTime(currentTime);
        setTimeout(() => setErrorCells([]), errorCooldownPeriod);
      }
    },
    [errorCooldownPeriod, lastErrorTime, playSound, errorSounds],
  );

  const handleErrorDraftAnimation = useCallback(
    (conflictCells: Position[]) => {
      setErrorCells(conflictCells);
      setTimeout(() => setErrorCells([]), 300);
      playSound(errorSounds);
    },
    [errorSounds, playSound],
  );

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
        updateBoard(newBoard, `设置 (${row}, ${col}) 草稿为 ${cell.draft}`);
        playSound(switchSounds);
      }
      // 处理非草稿模式
      else if (selectedNumber) {
        // 验证填入的数字是否为有效候选数字
        if (answerBoard[row][col].value == selectedNumber) {
          cell.value = selectedNumber;
          cell.draft = [];

          // 更新相关单元格的草稿数字
          const affectedCells = updateRelatedCellsDraft(
            newBoard,
            [{row, col}],
            selectedNumber,
            getCandidates,
          );

          playSound(successSounds);
          updateBoard(
            newBoard,
            `设置 (${row}, ${col}) 为 ${selectedNumber}`,
            affectedCells,
          );
          clearHistory();
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
      playSound,
      switchSounds,
      handleErrorDraftAnimation,
      answerBoard,
      successSounds,
      clearHistory,
      remainingCountsMinusOne,
      handleError,
    ],
  );

  const jumpToNextNumber = useCallback(
    (newCounts: number[]) => {
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

  // 撤销
  const handleUndo = useCallback(() => {
    undo();
    playSound(switchSounds);
  }, [undo, playSound, switchSounds]);

  // 擦除
  const handleErase = useCallback(() => {
    if (selectedCell) {
      const {row, col} = selectedCell;
      if (
        eraseEnabled &&
        board[row][col].value !== answerBoard[row][col].value
      ) {
        playSound(eraseSounds);
        const newBoard = deepCopyBoard(board);
        const cell = newBoard[row][col];
        cell.value = null;
        cell.draft = [];
        updateBoard(newBoard, `擦除 (${row}, ${col})`);
        setEraseEnabled(false);
      }
    }
  }, [
    selectedCell,
    eraseEnabled,
    board,
    answerBoard,
    playSound,
    eraseSounds,
    updateBoard,
  ]);

  // 选择数字
  const handleNumberSelect = useCallback(
    (number: number) => {
      if (!selectedCell) return;
      if (selectionMode === 2) {
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
          playSound(switchSounds);

          updateBoard(
            newBoard,
            `设置 (${row}, ${col}) 草稿为 ${newCell.draft}`,
          );
        } else {
          if (answerBoard[row][col].value == number) {
            playSound(successSounds);
            newCell.value = number;
            newCell.draft = [];
            const affectedCells = updateRelatedCellsDraft(
              newBoard,
              [{row, col}],
              number,
              getCandidates,
            );
            updateBoard(
              newBoard,
              `设置 (${row}, ${col}) 为 ${number}`,
              affectedCells,
            );
            clearHistory();
            setEraseEnabled(false);
            remainingCountsMinusOne(number);
          } else {
            handleError(row, col);
            const currentTime = Date.now();
            if (
              lastErrorTime === null ||
              currentTime - lastErrorTime > errorCooldownPeriod
            ) {
              setErrorCount(prevCount => prevCount + 1);
              setLastErrorTime(currentTime);
            }
            return;
          }
        }
      } else {
        setSelectedNumber(number);
        setLastSelectedNumber(number);
        playSound(switchSounds);
      }
    },
    [
      selectedCell,
      selectionMode,
      board,
      draftMode,
      playSound,
      switchSounds,
      updateBoard,
      handleErrorDraftAnimation,
      answerBoard,
      successSounds,
      clearHistory,
      remainingCountsMinusOne,
      handleError,
      lastErrorTime,
    ],
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
    [remainingCounts, selectedNumber, setRemainingCounts, jumpToNextNumber],
  );

  const handleDraftMode = useCallback(() => {
    setDraftMode(!draftMode);
    playSound(switchSounds);
  }, [draftMode, playSound, switchSounds]);

  const handleShowCandidates = useCallback(() => {
    playSound(switchSounds);
    const newBoard = deepCopyBoard(board);
    updateBoard(copyOfficialDraft(newBoard), '复制官方草稿');

    const startTime = performance.now();

    requestAnimationFrame(() => {
      const endTime = performance.now();
      console.log(`自动笔记功能总耗时: ${endTime - startTime}ms`);
    });
  }, [playSound, switchSounds, updateBoard, board, copyOfficialDraft]);

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

  const removeHintHighlight = useCallback(
    (board: CellData[][]) => {
      const updatedBoard = deepCopyBoard(board);
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          delete updatedBoard[row][col].highlights;
          delete updatedBoard[row][col].highlightCandidates;
        }
      }
      return updatedBoard;
    },
    [],
  );

  const handleHint = useCallback(() => {
    if (!checkDraftIsValid(board, answerBoard)) {
      handleShowCandidates();
      return;
    }
    const solveFunctions = [
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
      eureka,
      skyscraper,
      swordfish,
      trialAndError,
    ];
    let result = null;
    for (const solveFunction of solveFunctions) {
      result = solveFunction(board, candidateMap, graph);
      if (result) {
        setResult(result);
        setSelectedNumber(null);
        console.log(result);
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
        setLastSelectedCell(selectedCell);
        setSelectedCell(null);
        break;
      }
    }
  }, [answerBoard, applyHintHighlight, board, candidateMap, graph, handleShowCandidates, prompts, selectedCell, updateBoard]);

  const handleApplyHint = useCallback(() => {
    if (result) {
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
      updateBoard(newBoard, `应用提示：${result.method}`);
      if (isFill) {
        playSound(successSounds);
      } else {
        playSound(eraseSounds);
      }

      // 移除提示高亮
      const updatedBoard = removeHintHighlight(newBoard);
      updateBoard(updatedBoard, '提示应用完成');

      setHintDrawerVisible(false);
      setSelectedCell(lastSelectedCell);
      setResult(null); // 重置 result
      clearHistory();
      if (isFill) {
        remainingCountsMinusOne(target[0]);
      }
    }
  }, [board, clearHistory, eraseSounds, lastSelectedCell, playSound, remainingCountsMinusOne, removeHintHighlight, result, successSounds, updateBoard]);

  const handleCancelHint = useCallback(() => {
    const updatedBoard = removeHintHighlight(board);
    updateBoard(updatedBoard, '取消提示', []);
    setHintDrawerVisible(false);
    setSelectedCell(lastSelectedCell);
  }, [board, lastSelectedCell, removeHintHighlight, updateBoard]);

  // 切换模式回调函数
  const handleSelectionModeChange = useCallback(() => {
    playSound(switchSounds);
    if (selectionMode === 1) {
      setSelectionMode(2);
      setSelectedNumber(null);
    } else {
      setSelectionMode(1);
      if (lastSelectedNumber) {
        setSelectedNumber(lastSelectedNumber);
      }
      setEraseEnabled(false);
    }
  }, [lastSelectedNumber, playSound, selectionMode, switchSounds]);

  useEffect(() => {
    if (!selectedCell) return;
    const {row, col} = selectedCell;
    if (selectionMode === 1) return;
    if (board[row][col].value || board[row][col].draft.length === 0) {
      setEraseEnabled(false);
    } else {
      setEraseEnabled(true);
    }
  }, [selectedCell, selectionMode]);

  useEffect(() => {
    const initSounds = async () => {
      try {
        // 创建多个音效实例
        const errorInstances = await Promise.all(
          Array(3)
            .fill(0)
            .map(() => createSound(require('../assets/audio/error.wav'))),
        );
        const successInstances = await Promise.all(
          Array(3)
            .fill(0)
            .map(() => createSound(require('../assets/audio/success.wav'))),
        );
        const switchInstances = await Promise.all(
          Array(3)
            .fill(0)
            .map(() => createSound(require('../assets/audio/switch.wav'))),
        );
        const eraseInstances = await Promise.all(
          Array(3)
            .fill(0)
            .map(() => createSound(require('../assets/audio/erase.wav'))),
        );

        console.log('音效加载完成');
        setErrorSounds(errorInstances);
        setSuccessSounds(successInstances);
        setSwitchSounds(switchInstances);
        setEraseSounds(eraseInstances);
      } catch (error) {
        console.error('音效加载失败:', error);
      }
    };

    initSounds();

    return () => {
      // 清理音效实例
      [
        ...errorSounds,
        ...successSounds,
        ...switchSounds,
        ...eraseSounds,
      ].forEach(sound => {
        if (sound) {
          sound.release();
        }
      });
    };
  }, []);

  const createSound = useCallback((path: any): Promise<Sound> => {
    return new Promise((resolve, reject) => {
      const sound = new Sound(path, error => {
        if (error) {
          reject(error);
        } else {
          resolve(sound);
        }
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.gameInfo}>
        <Text style={[styles.gameInfoText, styles.leftText]}>
          错误次数：{errorCount}
        </Text>
        <Text style={[styles.gameInfoText, styles.middleText]}>
          {DIFFICULTY.MEDIUM}
        </Text>
        <Text style={[styles.gameInfoText, styles.rightText]}>{time}</Text>
      </View>
      <View style={styles.sudokuGrid}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <TouchableOpacity
              key={`${rowIndex}-${colIndex}`}
              onPressIn={() => handleCellChange(rowIndex, colIndex)}
              onLongPress={() => {
                handleCellChange(rowIndex, colIndex);
              }}
              style={[
                styles.sudokuCell,
                // 右边框：每3列添加粗边框
                (colIndex + 1) % 3 === 0 &&
                  (colIndex + 1) % 9 !== 0 &&
                  styles.sudokuCellRightBorder,
                // 左边框：第4列和第7列添加粗边框
                colIndex % 3 === 0 && styles.sudokuCellLeftBorder,
                // 底边框：第3行和第6行添加粗边框
                (rowIndex + 1) % 3 === 0 &&
                  rowIndex !== 8 &&
                  styles.sudokuCellBottomBorder,
                // 上边框：第4行和第7行添加粗边框
                rowIndex % 3 === 0 && styles.sudokuCellTopBorder,
                // 其他已有的样式
                cell.draft.length > 0 &&
                  cell.draft.includes(selectedNumber ?? 0) &&
                  styles.candidateNumber,
                selectedNumber &&
                  cell.value === selectedNumber &&
                  styles.selectedNumber,
                getCellClassName(board, rowIndex, colIndex, selectedNumber),
                selectionMode === 2 &&
                  selectedCell?.row === rowIndex &&
                  selectedCell?.col === colIndex &&
                  styles.selectedCell,
                errorCells.some(
                  errorCell =>
                    errorCell.row === rowIndex && errorCell.col === colIndex,
                ) && styles.errorCell,
                ...(cell.highlights?.map(
                  highlight => styles[highlight as keyof typeof styles],
                ) || []),
              ]}>
              {cell.value !== null ? (
                <Text
                  style={
                    [
                      styles.cellValue,
                      cell.isGiven ? styles.givenNumber : styles.userNumber,
                      selectedNumber && cell.value === selectedNumber
                        ? styles.selectedNumberText
                        : null,
                    ].filter(Boolean) as TextStyle[]
                  }>
                  {cell.value}
                </Text>
              ) : cell.draft.length > 0 ? (
                <View style={styles.draftGrid}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <View
                      key={num}
                      style={
                        [
                          styles.draftCell,
                          cell.draft.includes(num) && styles.draftCellActive,
                          prompts.includes(num) &&
                            cell?.highlightCandidates?.length &&
                            board[rowIndex][colIndex].highlights?.includes(
                              'promptHighlight',
                            ) &&
                            board[rowIndex][colIndex].draft.includes(num) &&
                            styles.candidateHighlightHint,
                          positions.includes(num) &&
                            cell?.highlightCandidates?.length &&
                            board[rowIndex][colIndex].highlights?.includes(
                              'positionHighlight',
                            ) &&
                            board[rowIndex][colIndex].draft.includes(num) &&
                            styles.candidateHighlightDelete,
                        ].filter(Boolean) as ViewStyle[]
                      }>
                      {cell.draft.includes(num) && (
                        <Text
                          style={
                            [
                              styles.draftCellText,
                              positions.includes(num) &&
                                cell?.highlightCandidates?.length &&
                                board[rowIndex][colIndex].highlights?.includes(
                                  'positionHighlight',
                                ) &&
                                styles.candidateHighlightDeleteText,
                              prompts.includes(num) &&
                                cell?.highlightCandidates?.length &&
                                board[rowIndex][colIndex].highlights?.includes(
                                  'promptHighlight',
                                ) &&
                                styles.candidateHighlightHintText,
                            ].filter(Boolean) as TextStyle[]
                          }>
                          {num}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ) : null}
            </TouchableOpacity>
          )),
        )}
      </View>
      <View style={styles.selectMode}></View>
      <View style={styles.controlButtons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.circleButton}
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
          </TouchableOpacity>
          <Text style={styles.buttonText}>撤销</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.circleButton} onPressIn={handleErase}>
            <Image
              source={
                eraseEnabled
                  ? require('../assets/icon/erase_active.png')
                  : require('../assets/icon/erase.png')
              }
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.buttonText}>擦除</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={{position: 'absolute', right: -20, top: -10, zIndex: 1}}>
            <Switch
              value={draftMode}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={draftMode ? '#1890ff' : '#f4f3f4'}
              style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
            />
          </View>
          <TouchableOpacity
            style={[styles.circleButton]}
            onPressIn={handleDraftMode}>
            <Image
              source={require('../assets/icon/draft.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.buttonText}>笔记</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.circleButton}
            onPressIn={handleShowCandidates}>
            <Image
              source={require('../assets/icon/auto.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.buttonText}>自动笔记</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.circleButton} onPressIn={handleHint}>
            <Image
              source={require('../assets/icon/prompt.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.buttonText}>提示</Text>
        </View>
      </View>
      <View style={styles.numberButtons}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <TouchableOpacity
            key={number}
            onPressIn={() => handleNumberSelect(number)}
            style={[
              styles.numberButton,
              remainingCounts[number - 1] === 0 && styles.numberButtonDisabled, // 禁用状态
              selectionMode === 1 &&
                selectedNumber === number && {
                  backgroundColor: '#1890ff',
                },
            ]}
            disabled={!draftMode && remainingCounts[number - 1] === 0}>
            <Text
              style={[
                styles.selectedNumberButton,
                !draftMode &&
                  remainingCounts[number - 1] === 0 &&
                  styles.selectedNumberButtonDisabled, // 禁用状态
                selectionMode === 1 &&
                  selectedNumber === number &&
                  styles.selectedNumberText,
              ]}>
              {number}
            </Text>
            <Text
              style={[
                styles.remainingCount,
                !draftMode &&
                  remainingCounts[number - 1] === 0 &&
                  styles.remainingCountDisabled, // 禁用状态
                selectionMode === 1 &&
                  selectedNumber === number &&
                  styles.selectedNumberText,
              ]}>
              {remainingCounts[number - 1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Switch
        value={selectionMode === 2}
        onValueChange={handleSelectionModeChange}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={selectionMode === 2 ? '#1890ff' : '#f4f3f4'}
      />
      {/* <TouchableOpacity style={styles.solveButton} onPressIn={solveSudoku}>
        求解数独
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={hintDrawerVisible}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1}>
          <View
            style={styles.drawerContent}
            // 添加这个属性来阻止点击事件冒泡
            onStartShouldSetResponder={() => true}
            onTouchEnd={e => {
              e.stopPropagation();
            }}>
            <View>
              <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>{hintMethod}</Text>
                <TouchableOpacity
                  onPressIn={handleCancelHint}
                  style={styles.closeIconButton}>
                  <Image
                    source={require('../assets/icon/close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.drawerText}>{hintContent}</Text>
              <View style={styles.drawerButtons}>
                <TouchableOpacity
                  onPressIn={handleApplyHint}
                  style={[styles.drawerButton, styles.drawerButtonApply]}>
                  <Text style={styles.drawerButtonTextApply}>应用</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={handleCancelHint}
                  style={[styles.drawerButton, styles.drawerButtonCancel]}>
                  <Text style={styles.drawerButtonTextCancel}>取消</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Sudoku;
