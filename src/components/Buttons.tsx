import React, { memo } from 'react';
import { Text, View, Pressable } from 'react-native';
import createStyles from '../views/sudokuStyles';
import { useSudokuStore } from '../store';

const Buttons = memo(
  ({
    handleNumberSelect,
    remainingCounts,
    selectionMode,
    selectedNumber,
    draftMode,
    scaleValue,
    isMovingRef,
    isDark,
    isPortrait,
  }: {
    handleNumberSelect: (number: number) => void;
    remainingCounts: number[];
    selectionMode: 1 | 2;
    selectedNumber: number | null;
    draftMode: boolean;
    scaleValue: number;
    isMovingRef: React.MutableRefObject<boolean>;
    isDark: boolean;
    isPortrait: boolean;
  }) => {
    const selectedCellDrafts = useSudokuStore(state => state.selectedCellDrafts);
    const styles = createStyles(isDark, draftMode, isPortrait);
    return (
      <View style={styles.numberButtons}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <Pressable
            key={number}
            onPressIn={() => {
              if (scaleValue === 1.0) {
                handleNumberSelect(number);
              }
            }}
            onPress={() => {
              if (scaleValue !== 1.0 && !isMovingRef.current) {
                handleNumberSelect(number);
              }
            }}
            style={[
              styles.numberButton,
              remainingCounts?.[number - 1] === 0 && styles.numberButtonDisabled,
              selectionMode === 1 &&
                selectedNumber === number && {
                  // backgroundColor: '#1890ff',
                  backgroundColor: isDark ? 'rgb(40, 61, 129)' : '#1890ff',
                },
              selectionMode === 2 && selectedCellDrafts.includes(number) && {
                borderWidth: 2,
                borderColor: isDark ? 'rgb(57, 87, 184)' : '#1890ff',
                backgroundColor: isDark ? 'rgba(89, 121, 223, 0.3)' : 'rgba(24, 144, 255, 0.2)',
              },
            ]}
            disabled={!draftMode && remainingCounts?.[number - 1] === 0}
          >
            <Text
              style={[
                styles.selectedNumberButton,
                !draftMode &&
                  remainingCounts?.[number - 1] === 0 &&
                  styles.selectedNumberButtonDisabled,
                selectionMode === 1 && selectedNumber === number && styles.selectedNumberText,
                selectionMode === 2 && selectedCellDrafts.includes(number) && {
                  color: isDark ? 'rgb(57, 87, 184)' : 'rgb(78,106,176)',
                },
              ]}
            >
              {number}
            </Text>
            {draftMode ? (
              <Text style={styles.remainingCount}>✏️</Text>
            ) : (
              <Text
                style={[
                  styles.remainingCount,
                  remainingCounts?.[number - 1] === 0 && styles.remainingCountDisabled,
                  selectionMode === 1 && selectedNumber === number && styles.selectedNumberText,
                 
                ]}
              >
                {remainingCounts?.[number - 1]}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    );
  }
);

export default Buttons;
