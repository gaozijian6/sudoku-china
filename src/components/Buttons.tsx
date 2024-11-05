import {memo} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
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
          <TouchableOpacity
            key={number}
            onPressIn={() => handleNumberSelect(number)}
            style={[
              styles.numberButton,
              remainingCounts[number - 1] === 0 && styles.numberButtonDisabled, // 禁用状态
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
                  styles.selectedNumberButtonDisabled, // 禁用状态
                selectionMode === 1 &&
                  selectedNumber === number &&
                  styles.selectedNumberText,
              ]}>
              {number}
            </Text>
            <Text
              style={[
                styles.remainingCount,
                !draftMode &&
                  remainingCounts[number - 1] === 0 &&
                  styles.remainingCountDisabled, // 禁用状态
                selectionMode === 1 &&
                  selectedNumber === number &&
                  styles.selectedNumberText,
              ]}>
              {remainingCounts[number - 1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.remainingCounts.length === nextProps.remainingCounts.length &&
      prevProps.selectedNumber === nextProps.selectedNumber &&
      prevProps.draftMode === nextProps.draftMode &&
      prevProps.selectionMode === nextProps.selectionMode
    ) {
      return true;
    }
    return false;
  },
);

export default Buttons;
