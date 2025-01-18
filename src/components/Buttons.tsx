import React, {memo} from 'react';
import {Text, View, Pressable, Image} from 'react-native';
import styles from '../views/sudokuStyles';

const Buttons = memo(
  ({
    handleNumberSelect,
    remainingCounts,
    selectionMode,
    selectedNumber,
    draftMode,
  }: {
    handleNumberSelect: (number: number) => void;
    remainingCounts: number[];
    selectionMode: 1 | 2;
    selectedNumber: number | null;
    draftMode: boolean;
  }) => {
    return (
      <View style={styles.numberButtons}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <Pressable
            key={number}
            onPressIn={() => handleNumberSelect(number)}
            style={[
              styles.numberButton,
              remainingCounts[number - 1] === 0 && styles.numberButtonDisabled,
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
                  styles.selectedNumberButtonDisabled,
                selectionMode === 1 &&
                  selectedNumber === number &&
                  styles.selectedNumberText,
              ]}>
              {number}
            </Text>
            {draftMode ? (
              <Text style={styles.remainingCount}>
                ✏️
              </Text>
            ) : (
              <Text
                style={[
                  styles.remainingCount,
                  remainingCounts[number - 1] === 0 &&
                    styles.remainingCountDisabled,
                  selectionMode === 1 &&
                    selectedNumber === number &&
                    styles.selectedNumberText,
                ]}>
                {remainingCounts[number - 1]}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.remainingCounts.length === nextProps.remainingCounts.length &&
      prevProps.selectedNumber === nextProps.selectedNumber &&
      prevProps.draftMode === nextProps.draftMode &&
      prevProps.selectionMode === nextProps.selectionMode &&
      prevProps.handleNumberSelect === nextProps.handleNumberSelect
    ) {
      return true;
    }
    return false;
  },
);

export default Buttons;
