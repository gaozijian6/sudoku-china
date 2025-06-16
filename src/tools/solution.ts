import type { CandidateMap, CellData, Position } from './index';

export interface Result {
  // 是否填入数字,true:在position[0]位置填入target数字,false:删除position里所有的值为target的候选数字
  isFill: boolean;
  // 要填入的位置或删除候选数字的位置
  position: Position[];
  // prompt记录根据哪些方格推导出要删除哪些方格候选数字
  prompt: Position[];
  method: string;
  target: number[];
  rows?: number[];
  cols?: number[];
  row?: number;
  col?: number;
  box?: number;
  isWeakLink?: boolean;
  chainStructure?: string;
  label?: string;
  highlightPromts1?: {
    row: number;
    col: number;
    value: number | null;
  }[];
  highlightPromts2?: {
    row: number;
    col: number;
    value: number | null;
  }[];
  highlightPromts3?: {
    row: number;
    col: number;
    value: number | null;
  }[];
  highlightDeletes?: {
    row: number;
    col: number;
    value: number[] | null;
  }[];
}

export interface DifferenceMap {
  [key: string]: number[];
}

export interface FalseCells {
  row: number;
  col: number;
}

// 检查两个格子是否在同一宫或行或列
export const areCellsInSameUnit = (cell1: Position, cell2: Position) => {
  // 检查是否在同一行
  const sameRow = cell1.row === cell2.row;

  // 检查是否在同一列
  const sameColumn = cell1.col === cell2.col;

  // 检查是否在同一宫
  const sameBox =
    Math.floor(cell1.row / 3) === Math.floor(cell2.row / 3) &&
    Math.floor(cell1.col / 3) === Math.floor(cell2.col / 3);

  return sameRow || sameColumn || sameBox;
};

export const findDifferenceDraft = (
  beforeBoard: CellData[][],
  afterBoard: CellData[][],
  answerBoard: CellData[][]
): DifferenceMap => {
  const differenceMap: DifferenceMap = {};
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const beforeDraft = beforeBoard[row]?.[col]?.draft || [];
      const afterDraft = afterBoard[row]?.[col]?.draft || [];
      const newCandidates: number[] = [];
      if (!beforeDraft.includes(answerBoard[row][col].value!)) {
        newCandidates.push(...afterDraft.filter(num => !beforeDraft.includes(num)));
      }
      if (newCandidates.length > 0) {
        differenceMap[`${row},${col}`] = newCandidates;
      }
    }
  }
  return differenceMap;
};

export const findDifferenceDraftAll = (
  beforeBoard: CellData[][],
  afterBoard: CellData[][],
  answerBoard: CellData[][]
): DifferenceMap => {
  const differenceMap: DifferenceMap = {};
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const beforeDraft = beforeBoard[row]?.[col]?.draft || [];
      const afterDraft = afterBoard[row]?.[col]?.draft || [];
      const newCandidates: number[] = [];
      if (JSON.stringify(beforeDraft) !== JSON.stringify(afterDraft)) {
        newCandidates.push(...afterDraft.filter(num => !beforeDraft.includes(num)));
      }
      if (newCandidates.length > 0) {
        differenceMap[`${row},${col}`] = newCandidates;
      }
    }
  }
  return differenceMap;
};

export const findDifferenceCells = (
  beforeBoard: CellData[][],
  afterBoard: CellData[][],
  answerBoard: CellData[][]
): FalseCells[] => {
  const falseCells: FalseCells[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (
        beforeBoard[row][col].value &&
        answerBoard[row][col].value !== afterBoard[row][col].value
      ) {
        falseCells.push({ row, col });
      }
    }
  }
  return falseCells;
};

export const isUnitStrongLink = (
  board: CellData[][],
  position1: Position,
  position2: Position,
  num: number,
  candidateMap: CandidateMap
): boolean => {
  if (position1.row === position2.row && position1.col === position2.col) {
    return false;
  }
  if (!board[position1.row][position1.col].draft.includes(num)) {
    return false;
  }
  if (!board[position2.row][position2.col].draft.includes(num)) {
    return false;
  }
  let flag1 = false;
  let flag2 = false;
  let flag3 = false;
  if (position1.row === position2.row) {
    flag1 = candidateMap[num].row.get(position1.row)?.count === 2;
  }
  if (position1.col === position2.col) {
    flag2 = candidateMap[num].col.get(position1.col)?.count === 2;
  }
  if (
    Math.floor(position1.row / 3) === Math.floor(position2.row / 3) &&
    Math.floor(position1.col / 3) === Math.floor(position2.col / 3)
  ) {
    flag3 =
      candidateMap[num].box.get(Math.floor(position1.row / 3) * 3 + Math.floor(position1.col / 3))
        ?.count === 2;
  }
  return flag1 || flag2 || flag3;
};
