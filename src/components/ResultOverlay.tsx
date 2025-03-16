import React, { useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { useSudokuStore } from '../store';
import { useTranslation } from 'react-i18next';
import { generateBoard } from '../tools';
import DeviceInfo from 'react-native-device-info';

const model = DeviceInfo.getModel();

interface ResultProps {
  onBack: () => void;
  resetSudoku: () => void;
  visible: boolean;
}

function ResultView({ onBack, resetSudoku, visible }: ResultProps) {
  const { t } = useTranslation();
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const {
    errorCount,
    hintCount,
    setResultVisible,
    setIsHasContinue,
    setIsSudoku,
    setIsHome,
    setIsLevel,
    difficulty,
    setIsContinue,
    initializeBoard2,
    isContinue,
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
    setIsContinue(false);
  }, [
    onBack,
    setResultVisible,
    setIsHasContinue,
    setIsSudoku,
    setIsHome,
    setIsLevel,
    setIsContinue,
  ]);

  const handleNext = useCallback(() => {
    setResultVisible(false);
    resetSudoku();
    generateBoard(difficulty, initializeBoard2);
    setIsHasContinue(true);
    setIsSudoku(true);
    setIsContinue(false);
  }, [
    setResultVisible,
    resetSudoku,
    difficulty,
    initializeBoard2,
    setIsHasContinue,
    setIsSudoku,
    setIsContinue,
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
          ]}
        >
          <Text style={styles.title}>{t('congratulations')}</Text>
          <View style={styles.content}>
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
            {!isContinue && (
              <Pressable style={[styles.button]} onPressIn={handleNext}>
                <Text style={styles.buttonText}>{t('next')}</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>
      </View>
    )
  );
}

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
    alignItems: 'center',
    width: model.includes('iPad') ? '60%' : 320,
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
    width: '80%',
    marginBottom: 12,
    justifyContent: 'flex-start',
  },
  leftText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginRight: 8,
  },
  rightText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#1890ff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ResultView;
