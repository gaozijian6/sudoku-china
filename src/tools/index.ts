import { DIFFICULTY } from '../constans';
import easyBoard from '../mock/2easy';
import entryBoard from '../mock/1entry';
import extremeBoard from '../mock/5extreme';
import hardBoard from '../mock/4hard';
import mediumBoard from '../mock/3medium';
import { isUnitStrongLink } from './solution';
import { SudokuSolver } from './DLX';

export interface Position {
  row: number;
  col: number;
}

export interface Candidate extends Position {
  candidates: number[];
}

export interface GraphNode extends Candidate {
  next: GraphNode[];
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

export interface Graph {
  [key: number]: GraphNode[];
}

// 添加一个用于测量对象大小的函数
export const getObjectSize = (obj: any): number => {
  const str = JSON.stringify(obj);
  return new Blob([str]).size;
};

// 创建图结构
export const createGraph = (board: CellData[][], candidateMap: CandidateMap): Graph => {
  const graph: Graph = {};

  for (let num = 1; num <= 9; num++) {
    const candidates = candidateMap[num]?.all ?? [];
    const subGraphs: GraphNode[][] = [];
    const visited: Map<string, Set<string>> = new Map();

    for (let i = 0; i < candidates.length; i++) {
      const startKey = `${candidates[i].row},${candidates[i].col}`;
      if (!visited.has(startKey)) {
        const subGraph: GraphNode[] = [];
        const queue: GraphNode[] = [
          {
            row: candidates[i].row,
            col: candidates[i].col,
            candidates: candidates[i].candidates,
            next: [],
          },
        ];
        visited.set(startKey, new Set());

        while (queue.length > 0) {
          const current = queue.shift()!;

          subGraph.push(current);

          for (let j = 0; j < candidates.length; j++) {
            const position1 = { row: current.row, col: current.col };
            const position2 = {
              row: candidates[j].row,
              col: candidates[j].col,
            };
            const key1 = `${position1.row},${position1.col}`;
            const key2 = `${position2.row},${position2.col}`;

            if (isUnitStrongLink(board, position1, position2, num, candidateMap)) {
              let newNode = subGraph.find(
                node => node.row === position2.row && node.col === position2.col
              );

              if (!newNode) {
                newNode = {
                  row: position2.row,
                  col: position2.col,
                  candidates: candidates[j].candidates,
                  next: [],
                };
                subGraph.push(newNode);
              }

              if (
                !current.next.some(node => node.row === newNode?.row && node.col === newNode?.col)
              ) {
                current.next.push(newNode);
              }

              if (
                !newNode.next.some(node => node.row === current.row && node.col === current.col)
              ) {
                newNode.next.push(current);
              }

              if (!visited.has(key2) || !visited.get(key2)?.has(key1)) {
                queue.push(newNode);

                if (!visited.has(key2)) {
                  visited.set(key2, new Set());
                }
                visited.get(key2)?.add(key1);
              }

              if (!visited.has(key1) || !visited.get(key1)?.has(key2)) {
                if (!visited.has(key1)) {
                  visited.set(key1, new Set());
                }
                visited.get(key1)?.add(key2);
              }
            }
          }
        }

        if (subGraph.length) {
          const visitedNodes = new Set<string>();
          const queue = [subGraph[0]];
          let nodeCount = 0;

          while (queue.length > 0 && nodeCount < 3) {
            const currentNode = queue.shift();
            const nodeKey = `${currentNode?.row}-${currentNode?.col}`;

            if (!visitedNodes.has(nodeKey)) {
              visitedNodes.add(nodeKey);
              nodeCount++;

              currentNode?.next.forEach(nextNode => {
                queue.push(nextNode);
              });
            }
          }

          if (nodeCount >= 2) {
            subGraphs.push(subGraph);
          }
        }
      }
    }

    if (subGraphs.length > 0) {
      graph[num] = subGraphs.map(subGraph => subGraph[0]);
    }
  }

  return graph;
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
  const baseClass = `sudokuCell ${
    cell.value === null ? 'emptySudokuCell' : ''
  } ${cell.isGiven ? 'givenNumber' : ''}`;

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
  initializeBoard2: (puzzle: string, answer: string) => void
) => {
  let random: number;
  switch (difficulty) {
    case DIFFICULTY.ENTRY:
      random = Math.floor(Math.random() * entryBoard.length);
      initializeBoard2(entryBoard[random].puzzle, entryBoard[random].solution);
      break;
    case DIFFICULTY.EASY:
      random = Math.floor(Math.random() * easyBoard.length);
      initializeBoard2(easyBoard[random].puzzle, easyBoard[random].solution);
      break;
    case DIFFICULTY.MEDIUM:
      random = Math.floor(Math.random() * mediumBoard.length);
      initializeBoard2(mediumBoard[random].puzzle, mediumBoard[random].solution);
      break;
    case DIFFICULTY.HARD:
      random = Math.floor(Math.random() * hardBoard.length);
      initializeBoard2(hardBoard[random].puzzle, hardBoard[random].solution);
      break;
    case DIFFICULTY.EXTREME:
      random = Math.floor(Math.random() * extremeBoard.length);
      // random = 21;
      initializeBoard2(extremeBoard[random].puzzle, extremeBoard[random].solution);
      // initializeBoard2(
      //   '274513968010296374963874152652137489030459627497628500789361245026745890040982706',
      //   '547296831392718456618534927734689512625147398189325764285463179971832465463951287',
      // );
      break;
  }
};
