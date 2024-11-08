import React, {memo, useRef, useEffect, useCallback} from 'react';
import type {CellData} from '../tools';
import {Text, TextStyle, Pressable, Animated} from 'react-native';
import styles from '../views/sudokuStyles';
import {getCellClassName} from '../tools';
import type {DifferenceMap} from '../tools/solution';

const Cell = memo(
  ({
    cell,
    rowIndex,
    colIndex,
    handleCellChange,
    selectedNumber,
    selectionMode,
    selectedCell,
    errorCells,
    board,
    prompts,
    positions,
    resultBoard,
    differenceMap,
  }: {
    cell: CellData;
    rowIndex: number;
    colIndex: number;
    handleCellChange: (row: number, col: number) => void;
    selectedNumber: number | null;
    selectionMode: 1 | 2;
    selectedCell: {row: number; col: number} | null;
    errorCells: {row: number; col: number}[];
    board: CellData[][];
    prompts: number[];
    positions: number[];
    resultBoard: CellData[][];
    differenceMap: DifferenceMap;
  }) => {
    const bfs = useCallback((board: CellData[][], row: number, col: number) => {
      const queue = [{row, col}];
      const visited = new Set();
      const directions = [
        [-1, 0], // 上
        [1, 0],  // 下 
        [0, -1], // 左
        [0, 1]   // 右
      ];
      
      while(queue.length > 0) {
        const {row: curRow, col: curCol} = queue.shift()!;
        const key = `${curRow},${curCol}`;
        
        if(visited.has(key)) continue;
        visited.add(key);
        
        for(const [dx, dy] of directions) {
          const newRow = curRow + dx;
          const newCol = curCol + dy;
          
          if(newRow >= 0 && newRow < 9 && newCol >= 0 && newCol < 9) {
            queue.push({row: newRow, col: newCol});
          }
        }
      }
      return Array.from(visited).map((pos) => {
        const [r, c] = (pos as string).split(',').map(Number);
        return {row: r, col: c};
      });
    }, []);
    return (
      <Pressable
        key={`${rowIndex}-${colIndex}`}
        onPressIn={() => {
          handleCellChange(rowIndex, colIndex);
          bfs(board, rowIndex, colIndex);
        }}
        style={[
          styles.sudokuCell,
          cell.value === null && styles.draftGrid,
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
        <Animated.View style={styles.candidatesGrid}>
          {cell.value !== null ? (
            <Text
              style={
                [
                  styles.cellValue,
                  cell.isGiven ? styles.givenNumber : styles.userNumber,
                  selectedNumber && cell.value === selectedNumber
                    ? styles.selectedNumberText
                    : null,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    width: '100%',
                    height: '100%',
                    lineHeight: 40, // 根据实际cell高度调整
                  }
                ].filter(Boolean) as TextStyle[]
              }>
              {cell.value}
            </Text>
          ) : (
            resultBoard[rowIndex][colIndex].draft?.map((num: number) => (
              <Text
                key={num}
                style={
                  [
                    styles.draftCell,
                    styles.draftCellText,
                    {
                      left: `${((num - 1) % 3) * 33.33 + 2}%`,
                      top: `${Math.floor((num - 1) / 3) * 33.33 + 2}%`,
                    },
                    {opacity: cell.draft.includes(num) ? 1 : 0},
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
                    differenceMap[`${rowIndex},${colIndex}`]?.includes(num) &&
                      styles.candidateHighlightHint,
                    differenceMap[`${rowIndex},${colIndex}`]?.includes(num) &&
                      styles.candidateHighlightHintText,
                  ].filter(Boolean) as TextStyle[]
                }>
                {num}
              </Text>
            ))
          )}
        </Animated.View>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.cell.value !== null) {
      return (
        prevProps.cell.value === nextProps.cell.value &&
        prevProps.selectedNumber === nextProps.selectedNumber &&
        prevProps.errorCells.length === nextProps.errorCells.length
      );
    }

    return (
      prevProps.cell.value === nextProps.cell.value &&
      prevProps.cell.draft.length === nextProps.cell.draft.length &&
      prevProps.cell.highlights?.length === nextProps.cell.highlights?.length &&
      prevProps.cell.highlightCandidates?.length ===
        nextProps.cell.highlightCandidates?.length &&
      prevProps.selectedNumber === nextProps.selectedNumber &&
      prevProps.selectionMode === nextProps.selectionMode &&
      prevProps.rowIndex === nextProps.rowIndex &&
      prevProps.colIndex === nextProps.colIndex &&
      prevProps.selectedCell?.row === nextProps.selectedCell?.row &&
      prevProps.selectedCell?.col === nextProps.selectedCell?.col &&
      prevProps.errorCells.length === nextProps.errorCells.length &&
      prevProps.prompts.length === nextProps.prompts.length &&
      prevProps.positions.length === nextProps.positions.length &&
      prevProps.handleCellChange === nextProps.handleCellChange &&
      prevProps.differenceMap === nextProps.differenceMap
    );
  },
);

export default Cell;
