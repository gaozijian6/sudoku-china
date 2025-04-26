import React, { memo } from 'react';
import type { CellData } from '../tools';
import { Text, TextStyle, Pressable } from 'react-native';
import { getCellClassName } from '../tools';
import type { DifferenceMap, FalseCells } from '../tools/solution';
import createStyles from '../views/sudokuStyles';

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
    falseCells,
    isHighlight,
    scaleValue,
    isMovingRef,
    isDark,
  }: {
    cell: CellData;
    rowIndex: number;
    colIndex: number;
    handleCellChange: (row: number, col: number) => void;
    selectedNumber: number | null;
    selectionMode: 1 | 2;
    selectedCell: { row: number; col: number } | null;
    errorCells: { row: number; col: number }[];
    board: CellData[][];
    prompts: number[];
    positions: number[];
    resultBoard: CellData[][];
    differenceMap: DifferenceMap;
    falseCells?: FalseCells[];
    isHighlight: boolean;
    scaleValue: number;
    isMovingRef: React.MutableRefObject<boolean>;
    isDark: boolean;
  }) => {
    const styles = createStyles(isDark);
    return (
      <Pressable
        key={`${rowIndex}-${colIndex}`}
        onPressIn={() => {
          if (scaleValue === 1.0) {
            handleCellChange(rowIndex, colIndex);
          }
        }}
        onPress={() => {
          if (scaleValue !== 1.0 && !isMovingRef.current) {
            handleCellChange(rowIndex, colIndex);
          }
        }}
        style={[
          styles.sudokuCell,
          cell.value === null && styles.draftGrid,
          // 先应用边框样式
          // 右边框：每3列添加粗边框
          (colIndex + 1) % 3 === 0 && (colIndex + 1) % 9 !== 0 && styles.sudokuCellRightBorder,
          // 左边框：第4列和第7列添加粗边框
          colIndex % 3 === 0 && styles.sudokuCellLeftBorder,
          // 底边框：第3行和第6行添加粗边框
          (rowIndex + 1) % 3 === 0 && rowIndex !== 8 && styles.sudokuCellBottomBorder,
          // 上边框：第4行和第7行添加粗边框
          rowIndex % 3 === 0 && styles.sudokuCellTopBorder,
          // 后应用高亮和选中样式，确保它们能覆盖边框样式
          cell.draft.length > 0 &&
            cell.draft.includes(selectedNumber ?? 0) &&
            isHighlight &&
            styles.candidateNumber,
          selectedNumber && cell.value === selectedNumber && styles.selectedNumber,
          getCellClassName(board, rowIndex, colIndex, selectedNumber),
          selectionMode === 2 &&
            selectedCell?.row === rowIndex &&
            selectedCell?.col === colIndex &&
            styles.selectedCell,
          errorCells?.some(errorCell => errorCell.row === rowIndex && errorCell.col === colIndex) &&
            styles.errorCell,
          falseCells?.some(falseCell => falseCell.row === rowIndex && falseCell.col === colIndex) &&
            styles.errorCell,
          ...(cell.highlights?.map(highlight => styles[highlight as keyof typeof styles]) || []),
        ]}
      >
        {cell.value !== null ? (
          <Text
            style={
              [
                styles.cellValue,
                cell.isGiven ? styles.givenNumber : styles.userNumber,
                selectedNumber && cell.value === selectedNumber ? styles.selectedNumberText : null,
              ].filter(Boolean) as TextStyle[]
            }
          >
            {cell.value}
          </Text>
        ) : (
          resultBoard[rowIndex][colIndex].draft?.map((num: number) => (
            <Text
              key={num}
              style={
                [
                  styles.draftCellText,
                  {
                    left: `${((num - 1) % 3) * 33.33 + 2}%`,
                    top: `${Math.floor((num - 1) / 3) * 33.33 + 2}%`,
                  },
                  { opacity: cell.draft.includes(num) ? 1 : 0 },
                  prompts?.includes(num) &&
                    !cell.promptCandidates2 &&
                    !cell.promptCandidates1 &&
                    !cell.promptCandidates3 &&
                    board[rowIndex][colIndex].highlights?.includes('promptHighlight') &&
                    board[rowIndex][colIndex].draft.includes(num) &&
                    styles.candidateHighlightHint,
                  cell.promptCandidates1?.includes(num) && styles.candidateHighlightHint,
                  cell.promptCandidates2?.includes(num) && styles.candidateHighlightHint2,
                  cell.promptCandidates3?.includes(num) && styles.candidateHighlightHint3,
                  positions?.includes(num) &&
                    cell?.highlightCandidates?.length &&
                    board[rowIndex][colIndex].highlights?.includes('positionHighlight') &&
                    board[rowIndex][colIndex].draft.includes(num) &&
                    styles.candidateHighlightDelete,
                  positions?.includes(num) &&
                    cell?.highlightCandidates?.length &&
                    board[rowIndex][colIndex].highlights?.includes('positionHighlight') &&
                    styles.candidateHighlightDeleteText,
                  prompts?.includes(num) &&
                    !cell.promptCandidates2 &&
                    !cell.promptCandidates1 &&
                    !cell.promptCandidates3 &&
                    board[rowIndex][colIndex].highlights?.includes('promptHighlight') &&
                    board[rowIndex][colIndex].draft.includes(num) &&
                    styles.candidateHighlightHintText,
                  cell.promptCandidates1?.includes(num) && styles.candidateHighlightHintText,
                  cell.promptCandidates2?.includes(num) && styles.candidateHighlightHintText,
                  cell.promptCandidates3?.includes(num) && styles.candidateHighlightHintText,
                  differenceMap?.[`${rowIndex},${colIndex}`]?.includes(num) &&
                    styles.candidateHighlightHint,
                  differenceMap?.[`${rowIndex},${colIndex}`]?.includes(num) &&
                    styles.candidateHighlightHintText,
                  styles.draftCell,
                ].filter(Boolean) as TextStyle[]
              }
            >
              {num}
            </Text>
          ))
        )}
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.cell.value !== null &&
      prevProps.isDark === nextProps.isDark &&
      prevProps.cell.isGiven === nextProps.cell.isGiven
    ) {
      return (
        prevProps.cell.value === nextProps.cell.value &&
        prevProps.selectedNumber === nextProps.selectedNumber &&
        prevProps.errorCells?.length === nextProps.errorCells?.length &&
        prevProps.selectedCell?.row === nextProps.selectedCell?.row &&
        prevProps.selectedCell?.col === nextProps.selectedCell?.col &&
        prevProps.falseCells?.length === nextProps.falseCells?.length
      );
    }

    return (
      JSON.stringify(prevProps.cell) === JSON.stringify(nextProps.cell) &&
      prevProps.cell.highlights?.length === nextProps.cell.highlights?.length &&
      prevProps.cell.highlightCandidates?.length === nextProps.cell.highlightCandidates?.length &&
      prevProps.selectedNumber === nextProps.selectedNumber &&
      prevProps.selectionMode === nextProps.selectionMode &&
      prevProps.rowIndex === nextProps.rowIndex &&
      prevProps.colIndex === nextProps.colIndex &&
      prevProps.selectedCell?.row === nextProps.selectedCell?.row &&
      prevProps.selectedCell?.col === nextProps.selectedCell?.col &&
      prevProps.errorCells?.length === nextProps.errorCells?.length &&
      prevProps.prompts?.length === nextProps.prompts?.length &&
      prevProps.positions?.length === nextProps.positions?.length &&
      prevProps.handleCellChange === nextProps.handleCellChange &&
      prevProps.isHighlight === nextProps.isHighlight &&
      JSON.stringify(prevProps.differenceMap) === JSON.stringify(nextProps.differenceMap) &&
      JSON.stringify(prevProps.resultBoard[prevProps.rowIndex][prevProps.colIndex]) ===
        JSON.stringify(nextProps.resultBoard[nextProps.rowIndex][nextProps.colIndex]) &&
      prevProps.isMovingRef === nextProps.isMovingRef &&
      prevProps.scaleValue === nextProps.scaleValue &&
      prevProps.isDark === nextProps.isDark &&
      prevProps.cell.isGiven === nextProps.cell.isGiven
    );
  }
);

export default Cell;
