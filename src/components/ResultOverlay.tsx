import React, {useEffect, useCallback} from 'react';
import {View, Text, Pressable, StyleSheet, Animated} from 'react-native';
import {useSudokuStore} from '../store';

interface ResultProps {
  onBack: () => void;
  generateBoard: (difficulty: string) => void;
  resetSudoku: () => void;
}

const ResultView: React.FC<ResultProps> = ({
  onBack,
  generateBoard,
  resetSudoku,
}) => {
  const scaleAnim = new Animated.Value(0);
  const {
    time,
    errorCount,
    hintCount,
    setResultVisible,
    setIsHasContinue,
    setIsSudoku,
    setIsHome,
    setDifficulty,
    setIsLevel,
    difficulty,
    setIsContinue,
    setTime,
    setTimeOffset,
    start,
  } = useSudokuStore();
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, []);

  const handleBack = useCallback(() => {
    setResultVisible(false);
    onBack();
    setIsHasContinue(false);
    setIsSudoku(false);
    setIsHome(true);
    setDifficulty('');
    setIsLevel(false);
  }, [
    onBack,
    setResultVisible,
    setIsHasContinue,
    setIsSudoku,
    setIsHome,
    setDifficulty,
    setIsLevel,
  ]);

  const handleNext = useCallback(() => {
    setResultVisible(false);
    resetSudoku();
    generateBoard(difficulty);
    setIsHasContinue(true);
    setIsSudoku(true);
    setIsContinue(false);
    setTime('00:00');
    setTimeOffset(0);
    start(0);
  }, [
    setResultVisible,
    generateBoard,
    difficulty,
    resetSudoku,
    setIsHasContinue,
    setIsSudoku,
    setIsContinue,
    setTime,
    setTimeOffset,
    start,
  ]);

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          },
        ]}>
        <Text style={styles.title}>恭喜过关</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.leftText}>用时：</Text>
            <Text style={styles.rightText}>{time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>错误次数：</Text>
            <Text style={styles.rightText}>{errorCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>提示次数：</Text>
            <Text style={styles.rightText}>{hintCount}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPressIn={handleBack}>
            <Text style={styles.buttonText}>返回</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.nextButton]}
            onPressIn={handleNext}>
            <Text style={styles.buttonText}>下一关</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  content: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 12,
  },
  leftText: {
    fontSize: 16,
    color: '#666',
    width: 100, // 固定左侧文字宽度
    textAlign: 'right',
    paddingRight: 8,
  },
  rightText: {
    fontSize: 16,
    color: '#666',
    width: 100, // 固定右侧文字宽度
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#1890ff',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    marginLeft: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ResultView;
