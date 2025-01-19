import React, { useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { useSudokuStore } from '../store';
import { useTranslation } from 'react-i18next';
import { generateBoard } from '../tools';

interface ResultProps {
  onBack: () => void;
  resetSudoku: () => void;
  visible: boolean;
}

const ResultView: React.FC<ResultProps> = ({ onBack, resetSudoku, visible }) => {
  const { t } = useTranslation();
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const {
    time,
    errorCount,
    hintCount,
    setResultVisible,
    setIsHasContinue,
    setIsSudoku,
    setIsHome,
    setIsLevel,
    difficulty,
    setIsContinue,
    setTime,
    setTimeOffset,
    start,
    initializeBoard2,
  } = useSudokuStore();
  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0);
      setTimeout(() => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }).start();
      }, 0);
    }
  }, [visible]);

  const handleBack = useCallback(() => {
    setResultVisible(false);
    onBack();
    setIsHasContinue(false);
    setIsSudoku(false);
    setIsHome(true);
    setIsLevel(false);
  }, [
    onBack,
    setResultVisible,
    setIsHasContinue,
    setIsSudoku,
    setIsHome,
    setIsLevel,
  ]);

  const handleNext = useCallback(() => {
    setResultVisible(false);
    resetSudoku();
    generateBoard(difficulty, initializeBoard2);
    setIsHasContinue(true);
    setIsSudoku(true);
    setIsContinue(false);
    setTime('00:00');
    setTimeOffset(0);
    start(0);
  }, [
    setResultVisible,
    resetSudoku,
    difficulty,
    initializeBoard2,
    setIsHasContinue,
    setIsSudoku,
    setIsContinue,
    setTime,
    setTimeOffset,
    start,
  ]);

  return (
    visible && (
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
          <Text style={styles.title}>{t('congratulations')}</Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <Text style={styles.leftText}>{t('duration')}:</Text>
              <Text style={styles.rightText}>{time}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>{t('mistakes')}:</Text>
              <Text style={styles.rightText}>{errorCount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>{t('hintCount')}:</Text>
              <Text style={styles.rightText}>{hintCount}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPressIn={handleBack}>
              <Text style={styles.buttonText}>{t('back')}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.nextButton]}
              onPressIn={handleNext}>
              <Text style={styles.buttonText}>{t('next')}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    )
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
