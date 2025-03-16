import React, { memo, useCallback, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Level from './Level';
import { playSound } from '../tools/Sound';
import { useSudokuStore } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { generateBoard } from '../tools';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page, SudokuType } from '../constans';

interface HomeProps {
  openSudoku: () => void;
  openSudokuDIY: () => void;
  openSetting: () => void;
}

const Home: React.FC<HomeProps> = memo(
  ({ openSudoku, openSudokuDIY, openSetting }) => {
    const {
      setIsContinue,
      setDifficulty,
      setIsHome,
      isSound,
      setIsDIY,
      isHome,
      setIsSudoku,
      isHasContinue,
      setIsHasContinue,
      setIsLevel,
      initializeBoard2,
      currentPage,
      setSudokuType,
    } = useSudokuStore();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    const [showLevel, setShowLevel] = useState(false);

    const handleLevelSelect = useCallback(
      (level: string) => {
        generateBoard(level, initializeBoard2);
        openSudoku();
        setDifficulty(level);
        setIsHome(false);
        setShowLevel(false);
        setIsHasContinue(true);
        setIsSudoku(true);
        AsyncStorage.setItem('isHasContinue', 'true');
      },
      [initializeBoard2, openSudoku, setDifficulty, setIsHome, setIsHasContinue, setIsSudoku]
    );

    const handleStart = useCallback(() => {
      playSound('switch', isSound);
      setShowLevel(true);
      setIsLevel(true);
    }, [isSound, setIsLevel]);

    const handleContinue = useCallback(() => {
      playSound('switch', isSound);
      setIsContinue(true);
      openSudoku();
      setIsHome(false);
    }, [isSound, setIsContinue, openSudoku, setIsHome]);

    const handleCustom = useCallback(() => {
      setSudokuType(SudokuType.DIY1);
      setIsDIY(true);
      openSudokuDIY();
      playSound('switch', isSound);
    }, [isSound, openSudokuDIY, setIsDIY, setSudokuType]);

    return (
      <View
        style={[styles.container, { top: insets.top, zIndex: currentPage === Page.HOME ? 6 : 1 }]}
      >
        <View style={styles.title1}>
          <Text style={styles.sudoku}>趣数独</Text>
          <Pressable
            style={styles.settingIconContainer}
            onPressIn={openSetting}
            hitSlop={{ right: 20 }}
          >
            <Image source={require('../assets/icon/setting.png')} style={styles.settingIcon} />
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.startButton} disabled={!isHome} onPressIn={handleStart}>
            <Text style={styles.startButtonText}>{t('start')}</Text>
            <Text style={styles.arrowIcon}>❯</Text>
          </Pressable>
          {isHasContinue && (
            <Pressable style={styles.continueButton} disabled={!isHome} onPressIn={handleContinue}>
              <Text style={styles.continueButtonText}>{t('continue')}</Text>
              <Text style={styles.arrowIcon}>❯</Text>
            </Pressable>
          )}
          <Pressable style={styles.customButton} disabled={!isHome} onPressIn={handleCustom}>
            <Text style={styles.customButtonText}>{t('difficulty.custom')}</Text>
            <Text style={styles.arrowIcon}>❯</Text>
          </Pressable>
        </View>
        {showLevel && (
          <Level
            onClose={() => {
              setShowLevel(false);
              setIsLevel(false);
            }}
            visible={showLevel}
            onLevelSelect={handleLevelSelect}
          />
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.openSudoku === nextProps.openSudoku &&
      prevProps.openSudokuDIY === nextProps.openSudokuDIY &&
      prevProps.openSetting === nextProps.openSetting
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(246,247,251)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  tarbar: {
    backgroundColor: 'rgb(91,139,241)',
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 15,
  },
  logo: {
    position: 'absolute',
    right: 15,
    top: 12,
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 100,
  },
  buttonContainer: {
    width: '80%' as const,
    gap: 20,
    alignItems: 'center' as const,
    position: 'relative' as const,
    top: -50,
  },
  startButton: {
    backgroundColor: '#6495ED',
    borderRadius: 25,
    padding: 15,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '60%' as const,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '60%' as const,
  },
  continueButtonText: {
    color: '#666666',
    fontSize: 18,
    marginRight: 10,
  },
  customButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '60%',
  },
  customButtonText: {
    color: '#666666',
    fontSize: 18,
    marginRight: 10,
  },
  arrowIcon: {
    position: 'relative' as const,
    top: 1,
    fontSize: 18,
    color: '#666666',
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title1: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgb(91,139,241)',
    flexDirection: 'row',
    height: 40,
    width: '100%',
    paddingHorizontal: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sudoku: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  settingIconContainer: {
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  settingIcon: {
    width: 26,
    height: 26,
  },
});

export default Home;
