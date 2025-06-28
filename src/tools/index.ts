import { DIFFICULTY } from '../constans';
import easyBoard from '../mock/2easy';
import entryBoard from '../mock/1entry';
import extremeBoard from '../mock/5extreme';
import hardBoard from '../mock/4hard';
import mediumBoard from '../mock/3medium';
import { isUnitStrongLink } from './solution';
import { SudokuSolver } from './DLX';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iCloudStorage from 'react-native-icloudstore';
import LZString from 'lz-string';
import sizeof from 'object-sizeof';

export interface Position {
  row: number;
  col: number;
}

export interface Candidate extends Position {
  candidates: number[];
}

export interface CellData {
  value: number | null;
  isGiven: boolean;
  draft: number[]; // 添加草稿数字数组
  highlightError?: string;
  highlights?: string[];
  highlightCandidates?: number[];
  promptCandidates?: number[];
  promptCandidates1?: number[];
  promptCandidates2?: number[];
  promptCandidates3?: number[];
}

export const calculateProgress = (userStatisticPass: any, difficultyLevel: DIFFICULTY) => {
  const progressData = userStatisticPass[difficultyLevel as keyof typeof userStatisticPass];
  if (!progressData) return { percentage: 0, completed: 0, total: 0 };

  const completedCount = (progressData.match(/1/g) || []).length;
  const totalCount = easyBoard.length;

  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return {
    percentage,
    completed: completedCount,
    total: totalCount,
  };
};

export type ProgressDifficulty =
  | DIFFICULTY.ENTRY
  | DIFFICULTY.EASY
  | DIFFICULTY.MEDIUM
  | DIFFICULTY.HARD
  | DIFFICULTY.EXTREME;

export const calculateTotalProgress = (userStatisticPass: any) => {
  const difficultyLevels = [
    { key: DIFFICULTY.ENTRY },
    { key: DIFFICULTY.EASY },
    { key: DIFFICULTY.MEDIUM },
    { key: DIFFICULTY.HARD },
    { key: DIFFICULTY.EXTREME },
  ] as const;

  let totalCompleted = 0;
  let totalCount = 0;

  difficultyLevels.forEach(level => {
    const progress = calculateProgress(userStatisticPass, level.key as ProgressDifficulty);
    totalCompleted += progress.completed;
    totalCount += progress.total;
  });

  const percentage = totalCount > 0 ? (totalCompleted / totalCount) * 100 : 0;

  return {
    percentage,
    completed: totalCompleted,
    total: totalCount,
  };
};

export const isValid = (board: CellData[][], row: number, col: number, num: number): boolean => {
  // 检查行
  for (let x = 0; x < 9; x++) {
    if (board[row][x].value === num) return false;
  }

  // 检查列
  for (let x = 0; x < 9; x++) {
    if (board[x][col].value === num) return false;
  }

  // 检查3x3方格
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol].value === num) return false;
    }
  }

  return true;
};

export const solve3 = (board: CellData[][]) => {
  const getCounts = (board: CellData[][]) => {
    let counts = 0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].value !== null) {
          counts++;
        }
      }
    }
    return counts;
  };

  let counts = getCounts(board);
  if (counts < 17) return null;

  let boardString = '';
  for (const row of board) {
    for (const cell of row) {
      boardString += cell.value ? cell.value : '0';
    }
  }

  const solver = new SudokuSolver();
  const result = solver.solve(boardString);

  if (result === undefined) {
    return null;
  }
  const solvedBoard: CellData[][] = [];
  for (let i = 0; i < 9; i++) {
    const row: CellData[] = [];
    for (let j = 0; j < 9; j++) {
      const value = parseInt(result.charAt(i * 9 + j), 10);
      row.push({
        value: value === 0 ? null : value,
        isGiven: false,
        draft: [],
      });
    }
    solvedBoard.push(row);
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      solvedBoard[i][j].isGiven = board[i][j].isGiven;
    }
  }

  return solvedBoard;
};

export const isRowFull = (board: CellData[][], row: number) => {
  return board[row].every(cell => cell.value !== null);
};

export const isColumnFull = (board: CellData[][], col: number) => {
  return board.every(row => row[col].value !== null);
};
export const isBoxFull = (board: CellData[][], box: number) => {
  const startRow = Math.floor(box / 3) * 3;
  const startCol = (box % 3) * 3;
  return Array.from({ length: 3 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => board[startRow + i][startCol + j])
  ).every(row => row.every(cell => cell.value !== null));
};

export const getCellClassName = (
  board: CellData[][],
  rowIndex: number,
  colIndex: number,
  selectedNumber: number | null
) => {
  const cell = board[rowIndex][colIndex];
  const baseClass = `sudokuCell ${cell.value === null ? 'emptySudokuCell' : ''} ${
    cell.isGiven ? 'givenNumber' : ''
  }`;

  if (selectedNumber !== null) {
    if (cell.value === selectedNumber) {
      return `${baseClass} selectedNumber`;
    } else if (cell.value === null && cell.draft.includes(selectedNumber)) {
      return `${baseClass} candidateNumber`;
    }
  }

  return baseClass;
};

export const checkDraftIsValid = (board: CellData[][], answerBoard: CellData[][]) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = board[row]?.[col];
      const answerCell = answerBoard[row]?.[col];

      if (cell?.value === null && answerCell?.value !== null) {
        if (!cell.draft?.includes(answerCell.value)) {
          return false;
        }
      }
    }
  }
  return true;
};

export const isSameBoard = (board1: CellData[][], board2: CellData[][]): boolean => {
  return board1.every((row, rowIndex) =>
    row.every(
      (cell, colIndex) =>
        cell.value === board2[rowIndex][colIndex].value &&
        JSON.stringify(cell.draft) === JSON.stringify(board2[rowIndex][colIndex].draft)
    )
  );
};

export const checkNumberInRowColumnAndBox = (
  board: CellData[][],
  row: number,
  col: number,
  num: number
): { row: number; col: number }[] => {
  const conflictCells: { row: number; col: number }[] = [];

  // 检查行
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === num) {
      conflictCells.push({ row, col: i });
    }
  }

  // 检查列
  for (let i = 0; i < 9; i++) {
    if (board[i][col].value === num) {
      conflictCells.push({ row: i, col });
    }
  }

  // 检查3x3方格
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j].value === num) {
        conflictCells.push({ row: boxRow + i, col: boxCol + j });
      }
    }
  }

  return conflictCells;
};

// 添加新的函数来更新相关单元格的草稿数字
export const updateRelatedCellsDraft = (
  board: CellData[][],
  position: { row: number; col: number }[],
  value: number,
  getCandidates: (board: CellData[][], row: number, col: number) => number[],
  isUndo: boolean = false
) => {
  const affectedCells: { row: number; col: number }[] = [];

  // 收集受影响的单元格
  position.forEach(({ row, col }) => {
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i].value === null) {
        affectedCells.push({ row, col: i });
      }
      if (i !== row && board[i][col].value === null) {
        affectedCells.push({ row: i, col });
      }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if ((i !== row || j !== col) && board[i][j].value === null) {
          affectedCells.push({ row: i, col: j });
        }
      }
    }
  });

  // 去重受影响的单元格
  const uniqueAffectedCells = Array.from(
    new Set(affectedCells.map(cell => `${cell.row},${cell.col}`))
  ).map(str => {
    const [row, col] = str.split(',');
    return { row: Number(row), col: Number(col) };
  });

  // 更新受影响的单元格
  uniqueAffectedCells.forEach(({ row, col }) => {
    const cell = board[row][col];
    const candidates = getCandidates(board, row, col);
    updateCellDraft(cell, value, candidates, isUndo);
  });

  return uniqueAffectedCells;
};

export const updateCellDraft = (
  cell: CellData,
  value: number,
  candidates: number[],
  isUndo: boolean
) => {
  if (isUndo) {
    // 如果是撤销操作，添加候选数字
    if (candidates.includes(value) && !cell.draft.includes(value)) {
      cell.draft.push(value);
      cell.draft.sort((a, b) => a - b);
    }
  } else {
    // 如果是填入数字操作，移除候选数字
    cell.draft = cell.draft.filter(num => num !== value);
  }
};

export const getCandidates = (board: CellData[][], row: number, col: number): number[] => {
  if (board[row][col].value !== null) return [];
  const candidates: number[] = [];
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      candidates.push(num);
    }
  }
  return candidates;
};

// 深拷贝棋盘状态
export const deepCopyBoard = (board: CellData[][]): CellData[][] => {
  return board.map(row =>
    row.map(cell => ({
      ...cell,
      draft: [...cell.draft],
    }))
  );
};

// 复制官方草稿
export const copyOfficialDraft = (board: CellData[][]): CellData[][] => {
  return board.map((row, rowIndex) =>
    row.map((cell, colIndex) => ({
      ...cell,
      draft: getCandidates(board, rowIndex, colIndex),
    }))
  );
};

// 记录操作历史的接口
export interface BoardHistory {
  board: CellData[][];
  action: string;
  counts: number;
  remainingCounts: number[];
}

export interface BoardHistoryDIY {
  board: CellData[][];
  action: string;
  counts: number;
  remainingCounts: number[];
}

export interface CandidateStats {
  count: number;
  positions: Candidate[];
}

// 修改 CandidateMap 接口
export interface CandidateMap {
  [key: number]: {
    row: Map<number, CandidateStats>;
    col: Map<number, CandidateStats>;
    box: Map<number, CandidateStats>;
    all: Candidate[];
  };
}
export const getByteLength = (str: string): number => {
  return Number((new Blob([str]).size / 1024).toFixed(2));
};

export const generateBoard = (
  difficulty: string,
  initializeBoard2: (puzzle: string, answer: string) => void,
  entryBoardUnPass: any[],
  easyBoardUnPass: any[],
  mediumBoardUnPass: any[],
  hardBoardUnPass: any[],
  extremeBoardUnPass: any[],
  index?: number
): { puzzleId: string; currentIndex: number } => {
  let random: number;
  let puzzleId: string;
  let currentIndex: number;
  if (index !== undefined) {
    currentIndex = index;
    switch (difficulty) {
      case DIFFICULTY.ENTRY:
        puzzleId = entryBoard[index].date;
        initializeBoard2(entryBoard[index].puzzle, entryBoard[index].solution);
        break;
      case DIFFICULTY.EASY:
        puzzleId = easyBoard[index].date;
        initializeBoard2(easyBoard[index].puzzle, easyBoard[index].solution);
        break;
      case DIFFICULTY.MEDIUM:
        puzzleId = mediumBoard[index].date;
        initializeBoard2(mediumBoard[index].puzzle, mediumBoard[index].solution);
        break;
      case DIFFICULTY.HARD:
        puzzleId = hardBoard[index].date;
        initializeBoard2(hardBoard[index].puzzle, hardBoard[index].solution);
        break;
      case DIFFICULTY.EXTREME:
        puzzleId = extremeBoard[index].date;
        initializeBoard2(extremeBoard[index].puzzle, extremeBoard[index].solution);
        break;
    }
  } else {
    switch (difficulty) {
      case DIFFICULTY.ENTRY:
        if (entryBoardUnPass.length === 0) {
          random = Math.floor(Math.random() * entryBoard.length);
          puzzleId = entryBoard[random].date;
          currentIndex = entryBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(entryBoard[random].puzzle, entryBoard[random].solution);
        } else {
          random = Math.floor(Math.random() * entryBoardUnPass.length);
          puzzleId = entryBoardUnPass[random].date;
          currentIndex = entryBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(entryBoardUnPass[random].puzzle, entryBoardUnPass[random].solution);
        }
        break;
      case DIFFICULTY.EASY:
        if (easyBoardUnPass.length === 0) {
          random = Math.floor(Math.random() * easyBoard.length);
          puzzleId = easyBoard[random].date;
          currentIndex = easyBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(easyBoard[random].puzzle, easyBoard[random].solution);
        } else {
          random = Math.floor(Math.random() * easyBoardUnPass.length);
          puzzleId = easyBoardUnPass[random].date;
          currentIndex = easyBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(easyBoardUnPass[random].puzzle, easyBoardUnPass[random].solution);
        }
        break;
      case DIFFICULTY.MEDIUM:
        if (mediumBoardUnPass.length === 0) {
          random = Math.floor(Math.random() * mediumBoard.length);
          puzzleId = mediumBoard[random].date;
          currentIndex = mediumBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(mediumBoard[random].puzzle, mediumBoard[random].solution);
        } else {
          random = Math.floor(Math.random() * mediumBoardUnPass.length);
          puzzleId = mediumBoardUnPass[random].date;
          currentIndex = mediumBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(mediumBoardUnPass[random].puzzle, mediumBoardUnPass[random].solution);
        }
        break;
      case DIFFICULTY.HARD:
        if (hardBoardUnPass.length === 0) {
          random = Math.floor(Math.random() * hardBoard.length);
          puzzleId = hardBoard[random].date;
          currentIndex = hardBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(hardBoard[random].puzzle, hardBoard[random].solution);
        } else {
          random = Math.floor(Math.random() * hardBoardUnPass.length);
          puzzleId = hardBoardUnPass[random].date;
          currentIndex = hardBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(hardBoardUnPass[random].puzzle, hardBoardUnPass[random].solution);
        }
        break;
      case DIFFICULTY.EXTREME:
        if (extremeBoardUnPass.length === 0) {
          random = Math.floor(Math.random() * extremeBoard.length);
          puzzleId = extremeBoard[random].date;
          currentIndex = extremeBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(extremeBoard[random].puzzle, extremeBoard[random].solution);
        } else {
          random = Math.floor(Math.random() * extremeBoardUnPass.length);
          puzzleId = extremeBoardUnPass[random].date;
          currentIndex = extremeBoard.findIndex(item => item.date === puzzleId);
          initializeBoard2(extremeBoardUnPass[random].puzzle, extremeBoardUnPass[random].solution);
        }
        break;
    }
  }

  return { puzzleId, currentIndex };
};

interface UserStatisticPass {
  [DIFFICULTY.ENTRY]: string;
  [DIFFICULTY.EASY]: string;
  [DIFFICULTY.MEDIUM]: string;
  [DIFFICULTY.HARD]: string;
  [DIFFICULTY.EXTREME]: string;
}

export const getUpdateUserStatisticPass = (
  userStatisticPass_iCloud: UserStatisticPass,
  userStatisticPass_AsyncStorage: UserStatisticPass
): UserStatisticPass => {
  const newUserStatisticPass: UserStatisticPass = {
    [DIFFICULTY.ENTRY]: '',
    [DIFFICULTY.EASY]: '',
    [DIFFICULTY.MEDIUM]: '',
    [DIFFICULTY.HARD]: '',
    [DIFFICULTY.EXTREME]: '',
  };

  for (const difficulty of Object.keys(userStatisticPass_iCloud)) {
    const str1 = userStatisticPass_iCloud[difficulty];
    const str2 = userStatisticPass_AsyncStorage[difficulty];
    const arr = new Array(10000).fill(0);
    for (let i = 0; i < easyBoard.length; i++) {
      if (str1[i] === '1' || str2[i] === '1') {
        arr[i] = 1;
      }
    }
    newUserStatisticPass[difficulty] = arr.join('');
  }
  return newUserStatisticPass;
};

export const saveUserStatisticPass = async (userStatisticPass: UserStatisticPass) => {
  await iCloudStorage.setItem(
    'userStatisticPass',
    LZString.compressToUTF16(JSON.stringify(userStatisticPass))
  );
  await AsyncStorage.setItem(
    'userStatisticPass',
    LZString.compressToUTF16(JSON.stringify(userStatisticPass))
  );
};

export const saveUserStatisticTime = async (userStatisticTime: any) => {
  await iCloudStorage.setItem(
    'userStatisticTime',
    LZString.compressToUTF16(JSON.stringify(userStatisticTime))
  );
  await AsyncStorage.setItem(
    'userStatisticTime',
    LZString.compressToUTF16(JSON.stringify(userStatisticTime))
  );
};

export const getUpdateUserStatisticTime = (timeData1: any, timeData2: any) => {
  const result = {
    [DIFFICULTY.ENTRY]: [...timeData1[DIFFICULTY.ENTRY]],
    [DIFFICULTY.EASY]: [...timeData1[DIFFICULTY.EASY]],
    [DIFFICULTY.MEDIUM]: [...timeData1[DIFFICULTY.MEDIUM]],
    [DIFFICULTY.HARD]: [...timeData1[DIFFICULTY.HARD]],
    [DIFFICULTY.EXTREME]: [...timeData1[DIFFICULTY.EXTREME]],
  };

  for (const difficulty of Object.keys(result)) {
    for (let i = 0; i < timeData1[difficulty].length; i++) {
      if (timeData1[difficulty][i] > 0 && timeData2[difficulty][i] > 0) {
        // 取两边中较小的时间（更快的解题时间）
        result[difficulty][i] = Math.min(timeData1[difficulty][i], timeData2[difficulty][i]);
      } else if (timeData2[difficulty][i] > 0) {
        // 如果只有timeData2有时间记录，则使用timeData2的记录
        result[difficulty][i] = timeData2[difficulty][i];
      }
      // 如果只有timeData1有时间记录，或两者都没有，则保持result[difficulty][i]不变
    }
  }

  return result;
};

export const getObjectSize = (obj: any): string => {
  return (sizeof(obj) / 1024).toFixed(2) + 'KB'; // 转换为KB
};

export const isSudokuDataDIY1Compressed = (str: any): boolean => {
  return typeof str === 'string' && !str.includes('differenceMap');
};

export const isSudokuDataDIY2Compressed = (str: any): boolean => {
  return typeof str === 'string' && !str.includes('board');
};

export const getRelatedPositions = (row: number, col: number): Position[] => {
  const positions: Position[] = [];
  const positionSet = new Set<string>();

  // 获取同行的所有坐标
  for (let c = 0; c < 9; c++) {
    if (c !== col) {
      const key = `${row}-${c}`;
      if (!positionSet.has(key)) {
        positions.push({ row, col: c });
        positionSet.add(key);
      }
    }
  }

  // 获取同列的所有坐标
  for (let r = 0; r < 9; r++) {
    if (r !== row) {
      const key = `${r}-${col}`;
      if (!positionSet.has(key)) {
        positions.push({ row: r, col });
        positionSet.add(key);
      }
    }
  }

  // 获取同宫的所有坐标
  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;

  for (let r = boxStartRow; r < boxStartRow + 3; r++) {
    for (let c = boxStartCol; c < boxStartCol + 3; c++) {
      if (r !== row || c !== col) {
        const key = `${r}-${c}`;
        if (!positionSet.has(key)) {
          positions.push({ row: r, col: c });
          positionSet.add(key);
        }
      }
    }
  }

  return positions;
};
