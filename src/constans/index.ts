export const SOLUTION_METHODS = {
  CHECK_CANDIDATE: 'Candidate Checking',
  SINGLE_CANDIDATE: 'Single Candidate',
  HIDDEN_SINGLE_ROW: 'Hidden Single(ROW)',
  HIDDEN_SINGLE_COLUMN: 'Hidden Single(COLUMN)',
  HIDDEN_SINGLE_BOX: 'Hidden Single(BOX)',
  BLOCK_ELIMINATION_ROW: 'Block Elimination(ROW)',
  BLOCK_ELIMINATION_COLUMN: 'Block Elimination(COLUMN)',
  BLOCK_ELIMINATION_BOX_ROW: 'Block Elimination(BOX-ROW)',
  BLOCK_ELIMINATION_BOX_COLUMN: 'Block Elimination(BOX-COLUMN)',
  NAKED_PAIR_ROW: 'Naked Pair(ROW)',
  NAKED_PAIR_COLUMN: 'Naked Pair(COLUMN)',
  NAKED_PAIR_BOX: 'Naked Pair(BOX)',
  NAKED_TRIPLE_ROW1: 'Naked Triple(ROW1)',
  NAKED_TRIPLE_COLUMN1: 'Naked Triple(COLUMN1)',
  NAKED_TRIPLE_BOX1: 'Naked Triple(BOX1)',
  NAKED_TRIPLE_ROW2: 'Naked Triple(ROW2)',
  NAKED_TRIPLE_COLUMN2: 'Naked Triple(COLUMN2)',
  NAKED_TRIPLE_BOX2: 'Naked Triple(BOX2)',
  HIDDEN_PAIR_ROW: 'Hidden Pair(ROW)',
  HIDDEN_PAIR_COLUMN: 'Hidden Pair(COLUMN)',
  HIDDEN_PAIR_BOX: 'Hidden Pair(BOX)',
  HIDDEN_TRIPLE_ROW: 'Hidden Triple(ROW)',
  HIDDEN_TRIPLE_COLUMN: 'Hidden Triple(COLUMN)',
  HIDDEN_TRIPLE_BOX: 'Hidden Triple(BOX)',
  NAKED_QUADRUPLE_ROW: 'Naked Quadruple(ROW)',
  NAKED_QUADRUPLE_COLUMN: 'Naked Quadruple(COLUMN)',
  NAKED_QUADRUPLE_BOX: 'Naked Quadruple(BOX)',
  X_WING_ROW: 'X-Wing(ROW)',
  X_WING_COLUMN: 'X-Wing(COLUMN)',
  X_WING_VARIENT_ROW: 'Finned X-Wing(ROW)',
  X_WING_VARIENT_COLUMN: 'Finned X-Wing(COLUMN)',
  XY_WING: 'XY-Wing',
  XYZ_WING: 'XYZ-Wing',
  SKYSCRAPER: 'Skyscraper',
  SKYSCRAPER2: 'Skyscraper2',
  COMBINATION_CHAIN: 'Chain of Combinations',
  SWORDFISH_ROW: 'Swordfish(ROW)',
  SWORDFISH_COLUMN: 'Swordfish(COLUMN)',
  SWORDFISH_WITH_FIN_ROW: 'Finned Swordfish(ROW)',
  SWORDFISH_WITH_FIN_COLUMN: 'Finned Swordfish(COLUMN)',
  WXYZ_WING: 'WXYZ-Wing',
  TRIAL_AND_ERROR: 'Trial and Error',
  LOOP: 'Loop',
  UNIQUE_RECTANGLE: 'Unique Rectangle',
  BINARY_UNIVERSAL_GRAVE: 'Binary Universal Grave',
  DOUBLE_COLOR_CHAIN: 'Double Color Chain',
  JELLYFISH_ROW: 'Jellyfish(ROW)',
  JELLYFISH_COLUMN: 'Jellyfish(COLUMN)',
  TRIPLE_COLOR_CHAIN: 'Triple Color Chain',
  TWO_STRONG_LINKS: 'Two Strong Links',
  THREE_STRONG_LINKS: 'Three Strong Links',
  X_CHAIN: 'X-Chain',
};

export const STRONG_LINK_TYPE = {
  // 偶关联
  EVEN: 2,
  // 奇关联
  ODD: 1,
  // 无关联
  NONE: 0,
};

export enum DIFFICULTY {
  ENTRY = 'entry',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXTREME = 'extreme',
  DIY = 'diy',
};

export enum SUDOKU_STATUS {
  SOLVED = 'SOLVED',
  ILLEGAL = 'ILLEGAL',
  INCOMPLETE = 'INCOMPLETE',
}

export enum Page {
  HOME = 1,
  MY_BOARDS = 2,
}

export enum SudokuType {
  HOME = 1,
  MY_BOARDS = 2,
  DIY1 = 3,
  DIY2 = 4,
  NEW = 5,
  CONTINUE = 6,
}

export enum LeaderboardType {
  ENTRY_PASS_COUNTS = 'entryPassCounts2',
  EASY_PASS_COUNTS = 'easyPassCounts2',
  MEDIUM_PASS_COUNTS = 'mediumPassCounts2',
  HARD_PASS_COUNTS = 'hardPassCounts2',
  EXTREME_PASS_COUNTS = 'extremePassCounts2',
  TOTAL_PASS_COUNTS = 'totalPassCounts2',
}

export const LEADERBOARD_IDS = {
  [LeaderboardType.ENTRY_PASS_COUNTS]: 'grp.entryPassCounts2',
  [LeaderboardType.EASY_PASS_COUNTS]: 'grp.easyPassCounts2',
  [LeaderboardType.MEDIUM_PASS_COUNTS]: 'grp.mediumPassCounts2',
  [LeaderboardType.HARD_PASS_COUNTS]: 'grp.hardPassCounts2',
  [LeaderboardType.EXTREME_PASS_COUNTS]: 'grp.extremePassCounts2',
  [LeaderboardType.TOTAL_PASS_COUNTS]: 'grp.totalPassCounts2',
}
