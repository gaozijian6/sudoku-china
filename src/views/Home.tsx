import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, NativeModules } from 'react-native';
import Level from './Level';
import { playSound } from '../tools/Sound';
import { useSudokuStore } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Page, SudokuType, DIFFICULTY, LeaderboardType } from '../constans';
import { useNavigation } from '@react-navigation/native';
import { calculateProgress, getUpdateUserStatisticPass, saveUserStatisticPass, getUpdateUserStatisticTime, saveUserStatisticTime } from '../tools';
import iCloudStorage from 'react-native-icloudstore';
import LZString from 'lz-string';

const { LeaderboardManager } = NativeModules;

const Home: React.FC = memo(() => {
  const setIsContinue = useSudokuStore(state => state.setIsContinue);
  const setDifficulty = useSudokuStore(state => state.setDifficulty);
  const setIsHome = useSudokuStore(state => state.setIsHome);
  const isSound = useSudokuStore(state => state.isSound);
  const setIsDIY = useSudokuStore(state => state.setIsDIY);
  const isHome = useSudokuStore(state => state.isHome);
  const setIsSudoku = useSudokuStore(state => state.setIsSudoku);
  const isHasContinue = useSudokuStore(state => state.isHasContinue);
  const setIsHasContinue = useSudokuStore(state => state.setIsHasContinue);
  const setIsLevel = useSudokuStore(state => state.setIsLevel);
  const currentPage = useSudokuStore(state => state.currentPage);
  const setSudokuType = useSudokuStore(state => state.setSudokuType);
  const isDark = useSudokuStore(state => state.isDark);
  const userStatisticPass = useSudokuStore(state => state.userStatisticPass);
  const setIsLoginGameCenter = useSudokuStore(state => state.setIsLoginGameCenter);
  const setUserStatisticPass = useSudokuStore(state => state.setUserStatisticPass);
  const updateUserStatisticPassOnline = useSudokuStore(state => state.updateUserStatisticPassOnline);
  const setUserStatisticTime = useSudokuStore(state => state.setUserStatisticTime);
  const styles = createStyles(isDark);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [showLevel, setShowLevel] = useState(false);

  // 计算所有难度的总体完成情况
  const calculateTotalProgress = useCallback((userStatisticPass: any) => {
    const difficultyLevels = [
      DIFFICULTY.ENTRY,
      DIFFICULTY.EASY,
      DIFFICULTY.MEDIUM,
      DIFFICULTY.HARD,
      DIFFICULTY.EXTREME,
    ];

    let totalCompleted = 0;
    let totalCount = 0;

    difficultyLevels.forEach(level => {
      const progress = calculateProgress(userStatisticPass, level);
      totalCompleted += progress.completed;
      totalCount += progress.total;
    });

    const percentage = totalCount > 0 ? (totalCompleted / totalCount) * 100 : 0;

    return {
      percentage,
      completed: totalCompleted,
      total: totalCount,
    };
  }, []);

  useEffect(() => {
    const initializeGameCenter = async (userStatisticPass: any) => {

      try {
        const result = await LeaderboardManager.initialize();
        setIsLoginGameCenter(true);

        // 提交所有类型的分数
        const submitAllScores = async () => {
          try {
            // 获取各难度的完成数量
            const entryCounts = calculateProgress(userStatisticPass, DIFFICULTY.ENTRY).completed;
            const easyCounts = calculateProgress(userStatisticPass, DIFFICULTY.EASY).completed;
            const mediumCounts = calculateProgress(userStatisticPass, DIFFICULTY.MEDIUM).completed;
            const hardCounts = calculateProgress(userStatisticPass, DIFFICULTY.HARD).completed;
            const extremeCounts = calculateProgress(
              userStatisticPass,
              DIFFICULTY.EXTREME
            ).completed;
            const totalCounts = calculateTotalProgress(userStatisticPass).completed;

            // 提交各难度分数
            await LeaderboardManager.submitScore(entryCounts, LeaderboardType.ENTRY_PASS_COUNTS);

            await LeaderboardManager.submitScore(easyCounts, LeaderboardType.EASY_PASS_COUNTS);

            await LeaderboardManager.submitScore(mediumCounts, LeaderboardType.MEDIUM_PASS_COUNTS);

            await LeaderboardManager.submitScore(hardCounts, LeaderboardType.HARD_PASS_COUNTS);

            await LeaderboardManager.submitScore(
              extremeCounts,
              LeaderboardType.EXTREME_PASS_COUNTS
            );

            await LeaderboardManager.submitScore(totalCounts, LeaderboardType.TOTAL_PASS_COUNTS);
          } catch (error) {
            console.error('提交分数失败:', error);
          }
        };

        // GameCenter初始化成功后提交分数
        await submitAllScores();
      } catch (error) {
        setIsLoginGameCenter(false);
        console.error('GameCenter 初始化失败:', error);
      }
    };
    const fetchUserStatisticPassData = async () => {
      const userStatisticPass_iCloud = await iCloudStorage.getItem('userStatisticPass');
      const userStatisticPass_AsyncStorage = await AsyncStorage.getItem('userStatisticPass');
      // 获取求解时间数据
      const userStatisticTime_iCloud = await iCloudStorage.getItem('userStatisticTime');
      const userStatisticTime_AsyncStorage = await AsyncStorage.getItem('userStatisticTime');

      // 处理用户通关数据
      if (!!userStatisticPass_iCloud && !!userStatisticPass_AsyncStorage) {
        const decompressed_iCloud = LZString.decompressFromUTF16(userStatisticPass_iCloud);
        const decompressed_AsyncStorage = LZString.decompressFromUTF16(
          userStatisticPass_AsyncStorage
        );
        const newUserStatisticPass = getUpdateUserStatisticPass(
          JSON.parse(decompressed_iCloud),
          JSON.parse(decompressed_AsyncStorage)
        );
        setUserStatisticPass(newUserStatisticPass);
      } else if (!!userStatisticPass_iCloud) {
        const decompressed_iCloud = LZString.decompressFromUTF16(userStatisticPass_iCloud);
        setUserStatisticPass(JSON.parse(decompressed_iCloud));
      } else if (!!userStatisticPass_AsyncStorage) {
        const decompressed_AsyncStorage = LZString.decompressFromUTF16(
          userStatisticPass_AsyncStorage
        );
        setUserStatisticPass(JSON.parse(decompressed_AsyncStorage));
      } else {
        const userStatisticPass_Mock = {
          [DIFFICULTY.ENTRY]: '0'.repeat(10000),
          [DIFFICULTY.EASY]: '0'.repeat(10000),
          [DIFFICULTY.MEDIUM]: '0'.repeat(10000),
          [DIFFICULTY.HARD]: '0'.repeat(10000),
          [DIFFICULTY.EXTREME]: '0'.repeat(10000),
        };
        setUserStatisticPass(userStatisticPass_Mock);
      }
      
      // 处理求解时间数据
      let userStatisticTime;
      if (!!userStatisticTime_iCloud && !!userStatisticTime_AsyncStorage) {
        const decompressed_iCloud = LZString.decompressFromUTF16(userStatisticTime_iCloud);
        const decompressed_AsyncStorage = LZString.decompressFromUTF16(
          userStatisticTime_AsyncStorage
        );
        // 采用更优的时间记录（较小值）
        const iCloudData = JSON.parse(decompressed_iCloud);
        const asyncData = JSON.parse(decompressed_AsyncStorage);
        userStatisticTime = getUpdateUserStatisticTime(iCloudData, asyncData);
      } else if (!!userStatisticTime_iCloud) {
        const decompressed_iCloud = LZString.decompressFromUTF16(userStatisticTime_iCloud);
        userStatisticTime = JSON.parse(decompressed_iCloud);
      } else if (!!userStatisticTime_AsyncStorage) {
        const decompressed_AsyncStorage = LZString.decompressFromUTF16(
          userStatisticTime_AsyncStorage
        );
        userStatisticTime = JSON.parse(decompressed_AsyncStorage);
      } else {
        // 初始化为五个空数组，每个容量为10000的数组，默认时间为0
        userStatisticTime = {
          [DIFFICULTY.ENTRY]: Array(10000).fill(0),
          [DIFFICULTY.EASY]: Array(10000).fill(0),
          [DIFFICULTY.MEDIUM]: Array(10000).fill(0),
          [DIFFICULTY.HARD]: Array(10000).fill(0),
          [DIFFICULTY.EXTREME]: Array(10000).fill(0),
        };
      }
      setUserStatisticTime(userStatisticTime);
      
      saveUserStatisticPass(useSudokuStore.getState().userStatisticPass);
      saveUserStatisticTime(useSudokuStore.getState().userStatisticTime);
      updateUserStatisticPassOnline();
      initializeGameCenter(useSudokuStore.getState().userStatisticPass);
    };

    fetchUserStatisticPassData();
  }, []);

  const handleLevelSelect = useCallback(
    async (level: string) => {
      setShowLevel(false);
      navigation.navigate('Sudoku', {
        difficulty_route: level,
      });
      setDifficulty(level);
      setIsHome(false);
      setIsHasContinue(true);
      setIsSudoku(true);
      AsyncStorage.setItem('isHasContinue', 'true');
    },
    [setDifficulty, setIsHome, setIsHasContinue, setIsSudoku, navigation]
  );

  const handleStart = useCallback(() => {
    playSound('switch', isSound);
    setShowLevel(true);
    setIsLevel(true);
  }, [isSound, setIsLevel]);

  const handleContinue = useCallback(() => {
    navigation.navigate('Sudoku');
    playSound('switch', isSound);
    setIsContinue(true);
    setIsHome(false);
  }, [isSound, setIsContinue, setIsHome, navigation]);

  const handleCustom = useCallback(() => {
    navigation.navigate('SudokuDIY');
    setSudokuType(SudokuType.DIY1);
    setIsDIY(true);
    playSound('switch', isSound);
  }, [isSound, setIsDIY, setSudokuType, navigation]);

  return (
    <View style={[styles.container, { zIndex: currentPage === Page.HOME ? 6 : 1 }]}>
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
});

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? 'rgb(22,23,25)' : 'rgb(246,247,251)',
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
      top: -20,
    },
    startButton: {
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : '#6495ED',
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
      color: isDark ? '#666' : '#fff',
      fontSize: 18,
      marginRight: 10,
    },
    continueButton: {
      backgroundColor: isDark ? 'rgb( 32, 31, 33)' : '#FFFFFF',
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
      backgroundColor: isDark ? 'rgb( 32, 31, 33)' : '#FFFFFF',
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
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
      flexDirection: 'row',
      height: 40,
      width: '100%',
      paddingHorizontal: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sudoku: {
      color: isDark ? '#666666' : '#fff',
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
      tintColor: isDark ? '#666' : '#fff',
    },
    leaderboardButton: {
      backgroundColor: isDark ? 'rgb( 32, 31, 33)' : '#FFFFFF',
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
    leaderboardButtonText: {
      color: '#666666',
      fontSize: 18,
      marginRight: 10,
    },
  });

export default Home;
