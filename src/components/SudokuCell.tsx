import React, {memo, useRef, useEffect, useCallback} from 'react';
import type {CellData} from '../tools';
import {Text, TextStyle, Pressable, Animated, Easing} from 'react-native';
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
    const animatedColor = useRef(new Animated.Value(1)).current;
    const backgroundColor = animatedColor.interpolate({
      inputRange: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      ],
      outputRange: [
        '#ffffff',
        'rgb(226,235,250)',
        'rgb(228,234,250)',
        'rgb(212,228,251)',
        'rgb(198,221,253)',
        'rgb(197,222,251)',
        'rgb(185,213,250)',
        'rgb(185,212,251)',
        'rgb(167,205,252)',
        'rgb(166,200,255)',
        'rgb(167,200,255)',
        'rgb(167,205,255)',
        'rgb(167,205,255)',
        'rgb(174,206,248)',
        'rgb(176,208,252)',
        'rgb(185,210,250)',
        'rgb(184,210,252)',
        'rgb(190,213,253)',
        'rgb(192,216,251)',
        'rgb(192,216,251)',
        'rgb(197,219,253)',
        'rgb(199,221,250)',
        'rgb(210,224,249)',
        'rgb(210,223,251)',
        'rgb(211,225,252)',
        'rgb(206,222,246)',
        'rgb(216,228,249)',
        'rgb(215,226,249)',
        'rgb(216,228,251)',
        'rgb(224,233,246)',
        'rgb(224,233,247)',
        'rgb(225,231,250)',
        'rgb(230,235,249)',
        'rgb(229,234,249)',
        'rgb(239,242,250)',
        '#ffffff',
      ],
    });

    const animation = useCallback(() => {
      if (cell.isAnimated) {
        Animated.sequence([
          Animated.delay(cell.animationDelay || 0),
          Animated.timing(animatedColor, {
            toValue: 36,
            duration: 600,
            useNativeDriver: false,
          }),
        ]).start();
      }
    }, [animatedColor, cell.isAnimated, cell.animationDelay]);

    useEffect(() => {
      animation();
    }, [board]);

    return (
      <Pressable
        key={`${rowIndex}-${colIndex}`}
        onPressIn={() => {
          handleCellChange(rowIndex, colIndex);
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
        <Animated.View style={[styles.candidatesGrid, {backgroundColor}]}>
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
                  },
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
        prevProps.errorCells.length === nextProps.errorCells.length &&
        prevProps.selectedCell?.row === nextProps.selectedCell?.row &&
        prevProps.selectedCell?.col === nextProps.selectedCell?.col
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
