import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSudokuStore } from '../store';
import createStyles from './sudokuStyles';
import { DIFFICULTY } from '../constans';
import easyBoard from '../mock/2easy';
import { useTranslation } from 'react-i18next';

type ProgressDifficulty =
  | DIFFICULTY.ENTRY
  | DIFFICULTY.EASY
  | DIFFICULTY.MEDIUM
  | DIFFICULTY.HARD
  | DIFFICULTY.EXTREME;

const Statistics = () => {
  const isDark = useSudokuStore(state => state.isDark);
  const styles = createStyles(isDark, false);
  const userStatisticPass = useSudokuStore(state => state.userStatisticPass);
  const { t } = useTranslation();
  
  // 计算每个难度的完成情况
  const calculateProgress = (difficultyLevel: ProgressDifficulty) => {
    const progressData = userStatisticPass[difficultyLevel];
    if (!progressData) return { percentage: 0, completed: 0, total: 0 };

    const completedCount = (progressData.match(/1/g) || []).length;
    const totalCount = easyBoard.length;
    console.log('totalCount', totalCount);
    
    const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return {
      percentage,
      completed: completedCount,
      total: totalCount,
    };
  };

  const difficultyLevels = [
    { key: DIFFICULTY.ENTRY, label: t('entry'), emoji: '🌱' },
    { key: DIFFICULTY.EASY, label: t('easy'), emoji: '🍀' },
    { key: DIFFICULTY.MEDIUM, label: t('medium'), emoji: '🌟' },
    { key: DIFFICULTY.HARD, label: t('hard'), emoji: '🔥' },
    { key: DIFFICULTY.EXTREME, label: t('extreme'), emoji: '💥' },
  ] as const;

  return (
    <View style={[{ flex: 1 }, { backgroundColor: isDark ? 'rgb(22, 23, 25)' : 'white' }]}>
      <View style={localStyles.contentContainer}>
        {difficultyLevels.map(level => {
          const progress = calculateProgress(level.key as ProgressDifficulty);
          return (
            <View key={level.key} style={[
              localStyles.levelContainer,
              { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }
            ]}>
              <View style={localStyles.levelHeader}>
                <Text style={localStyles.emoji}>{level.emoji}</Text>
                <Text style={[styles.text, localStyles.difficultyLabel]}>{level.label}</Text>
              </View>

              <View style={localStyles.progressInfo}>
                <Text style={[styles.text, localStyles.percentText]}>
                  {`${progress.percentage.toFixed(2)}%`}
                </Text>
                <Text style={[styles.text, localStyles.countText]}>
                  {`${progress.completed}/${progress.total}`}
                </Text>
              </View>

              <View style={[
                localStyles.progressBarBg,
                { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
              ]}>
                <View 
                  style={[
                    localStyles.progressBarFill, 
                    { 
                      width: `${progress.percentage}%`,
                      backgroundColor: getProgressColor(level.key, isDark)
                    }
                  ]} 
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// 根据难度级别返回不同的进度条颜色
const getProgressColor = (difficulty: DIFFICULTY, isDark: boolean) => {
  switch(difficulty) {
    case DIFFICULTY.ENTRY:
      return isDark ? '#5cad8a' : '#4cd964';
    case DIFFICULTY.EASY:
      return isDark ? '#5d87d7' : '#4287f5';
    case DIFFICULTY.MEDIUM:
      return isDark ? '#d9b44a' : '#fdcb6e';
    case DIFFICULTY.HARD:
      return isDark ? '#d77e3c' : '#ff9f43';
    case DIFFICULTY.EXTREME:
      return isDark ? '#d75a4a' : '#ff6b6b';
    default:
      return isDark ? '#5d87d7' : '#4287f5';
  }
};

const localStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  levelContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 16,
    marginRight: 4,
  },
  difficultyLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 8,
  },
  countText: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default Statistics;
