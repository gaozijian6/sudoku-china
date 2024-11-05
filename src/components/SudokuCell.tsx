import type {CellData} from '../tools';
import {memo} from 'react';
import {TouchableOpacity, Text, View, TextStyle} from 'react-native';
import styles from '../views/sudokuStyles';
import {getCellClassName} from '../tools';
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
  }) => {
    return (
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
          <View
            style={[
              styles.draftGrid,
            ]}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
              num =>
                cell.draft.includes(num) && (
                  <Text
                    key={num}
                    style={
                      [
                        styles.draftCell,
                        styles.draftCellText,
                        {
                          width: '33.33%', 
                          height: '33.33%', 
                          textAlign: 'center',
                          position: 'absolute',
                          left: `${((num - 1) % 3) * 33.33}%`,
                          top: `${Math.floor((num - 1) / 3) * 33.33 + 3}%`
                        },
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
                )
            )}
          </View>
        ) : null}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    if (
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
      prevProps.handleCellChange === nextProps.handleCellChange
    ) {
      return true;
    }
    return false;
  },
);

export default Cell;
