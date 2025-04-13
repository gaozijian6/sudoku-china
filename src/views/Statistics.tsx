import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  NativeModules,
  Animated,
  Alert,
} from 'react-native';
import { useSudokuStore } from '../store';
import createStyles from './sudokuStyles';
import { DIFFICULTY, LeaderboardType } from '../constans';
import { useTranslation } from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';
import { calculateProgress } from '../tools';

const { LeaderboardManager } = NativeModules;

type ProgressDifficulty =
  | DIFFICULTY.ENTRY
  | DIFFICULTY.EASY
  | DIFFICULTY.MEDIUM
  | DIFFICULTY.HARD
  | DIFFICULTY.EXTREME;

// 难度级别与排行榜类型的映射
const difficultyToLeaderboardType: Record<ProgressDifficulty, LeaderboardType> = {
  [DIFFICULTY.ENTRY]: LeaderboardType.ENTRY_PASS_COUNTS,
  [DIFFICULTY.EASY]: LeaderboardType.EASY_PASS_COUNTS,
  [DIFFICULTY.MEDIUM]: LeaderboardType.MEDIUM_PASS_COUNTS,
  [DIFFICULTY.HARD]: LeaderboardType.HARD_PASS_COUNTS,
  [DIFFICULTY.EXTREME]: LeaderboardType.EXTREME_PASS_COUNTS,
};

// 创建单例动画值，在组件外部定义以保持在组件重新渲染时不变
const globalRankIconsScale = {
  [DIFFICULTY.ENTRY]: new Animated.Value(1),
  [DIFFICULTY.EASY]: new Animated.Value(1),
  [DIFFICULTY.MEDIUM]: new Animated.Value(1),
  [DIFFICULTY.HARD]: new Animated.Value(1),
  [DIFFICULTY.EXTREME]: new Animated.Value(1),
  total: new Animated.Value(1),
};

// 记录动画是否已经初始化
let animationsInitialized = false;

const Statistics = () => {
  const isDark = useSudokuStore(state => state.isDark);
  const styles = createStyles(isDark, false);
  const userStatisticPass = useSudokuStore(state => state.userStatisticPass);
  const isLoginGameCenter = useSudokuStore(state => state.isLoginGameCenter);
  const { t } = useTranslation();
  const [showTip, setShowTip] = useState(false);

  // 设置动画循环
  useEffect(() => {
    // 如果动画已经初始化，则不需要再次初始化
    if (animationsInitialized) {
      return;
    }

    const animationTimers: (NodeJS.Timeout | number)[] = [];

    // 创建一个动画函数，接受一个动画值和延迟时间
    const createAnimation = (animValue: Animated.Value, delay: number) => {
      const timerRef = setTimeout(() => {
        const animate = () => {
          const animationSequence = Animated.sequence([
            // 放大
            Animated.timing(animValue, {
              toValue: 1.3,
              duration: 700,
              useNativeDriver: true,
            }),
            // 恢复原状
            Animated.timing(animValue, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]);

          const timer = setTimeout(() => {
            animate();
          }, 5000);

          animationSequence.start();
          return timer;
        };

        const animationTimer = animate();
        animationTimers.push(animationTimer);
      }, delay);

      animationTimers.push(timerRef);
    };

    // 为每个图标设置动画，使用不同的延迟时间，形成瀑布效果
    createAnimation(globalRankIconsScale[DIFFICULTY.ENTRY], 0);
    createAnimation(globalRankIconsScale[DIFFICULTY.EASY], 300);
    createAnimation(globalRankIconsScale[DIFFICULTY.MEDIUM], 600);
    createAnimation(globalRankIconsScale[DIFFICULTY.HARD], 900);
    createAnimation(globalRankIconsScale[DIFFICULTY.EXTREME], 1200);
    createAnimation(globalRankIconsScale.total, 1500);

    // 标记动画已初始化
    animationsInitialized = true;

    // 组件卸载时清除所有计时器，但不重置动画值
    return () => {
      animationTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // 计算所有难度的总体完成情况
  const calculateTotalProgress = () => {
    let totalCompleted = 0;
    let totalCount = 0;

    difficultyLevels.forEach(level => {
      const progress = calculateProgress(userStatisticPass, level.key as ProgressDifficulty);
      totalCompleted += progress.completed;
      totalCount += progress.total;
    });

    const percentage = totalCount > 0 ? (totalCompleted / totalCount) * 100 : 0;

    return {
      percentage,
      completed: totalCompleted,
      total: totalCount,
    };
  };

  // 显示排行榜 - 修复版本
  const showLeaderboard = async (difficultyLevel: ProgressDifficulty) => {
    if (!isLoginGameCenter) {
      Alert.alert(t('tips'), t('pleaseLoginGameCenter'), [{ text: t('ok'), style: 'default' }]);
      return;
    }
    try {
      const leaderboardType = difficultyToLeaderboardType[difficultyLevel];
      console.log('显示难度级别排行榜:', difficultyLevel, '对应类型:', leaderboardType);

      // 确保类型存在
      if (!leaderboardType) {
        console.error('排行榜类型未找到:', difficultyLevel);
        return;
      }

      const result = await LeaderboardManager.showLeaderboard(leaderboardType);
      console.log('排行榜显示成功:', result);
    } catch (error) {
      console.error('排行榜显示失败:', error);
    }
  };

  // 显示总排行榜
  const showTotalLeaderboard = async () => {
    if (!isLoginGameCenter) {
      Alert.alert(t('tips'), t('pleaseLoginGameCenter'), [{ text: t('ok'), style: 'default' }]);
      return;
    }
    try {
      console.log('显示总排行榜');
      const result = await LeaderboardManager.showLeaderboard(LeaderboardType.TOTAL_PASS_COUNTS);
      console.log('总排行榜显示成功:', result);
    } catch (error) {
      console.error('总排行榜显示失败:', error);
    }
  };

  const difficultyLevels = [
    { key: DIFFICULTY.ENTRY, label: t('entry'), emoji: '🌱' },
    { key: DIFFICULTY.EASY, label: t('easy'), emoji: '🍀' },
    { key: DIFFICULTY.MEDIUM, label: t('medium'), emoji: '🌟' },
    { key: DIFFICULTY.HARD, label: t('hard'), emoji: '🔥' },
    { key: DIFFICULTY.EXTREME, label: t('extreme'), emoji: '💥' },
  ] as const;

  // 计算总统计数据
  const totalProgress = calculateTotalProgress();

  return (
    <View style={[{ flex: 1 }, { backgroundColor: isDark ? 'rgb(22, 23, 25)' : 'white' }]}>
      <View style={localStyles.contentContainer}>
        {difficultyLevels.map(level => {
          const progress = calculateProgress(userStatisticPass, level.key as ProgressDifficulty);
          const difficultyKey = level.key as ProgressDifficulty;

          return (
            <View
              key={level.key}
              style={[
                localStyles.levelContainer,
                { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' },
              ]}
            >
              <View style={localStyles.levelHeader}>
                <Text style={localStyles.emoji}>{level.emoji}</Text>
                <Text style={[styles.text, localStyles.difficultyLabel]}>{level.label}</Text>
                <TouchableOpacity
                  style={localStyles.rankButton}
                  onPress={() => showLeaderboard(difficultyKey)}
                >
                  <Animated.Image
                    source={require('../assets/icon/rank.png')}
                    style={[
                      localStyles.rankIcon,
                      {
                        transform: [{ scale: globalRankIconsScale[difficultyKey] }],
                      },
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={localStyles.progressInfo}>
                <Text style={[styles.text, localStyles.percentText]}>
                  {`${progress.percentage.toFixed(2)}%`}
                </Text>
                <Text style={[styles.text, localStyles.countText]}>
                  {`${progress.completed}/${progress.total}`}
                </Text>
              </View>

              <View
                style={[
                  localStyles.progressBarBg,
                  { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                ]}
              >
                <View
                  style={[
                    localStyles.progressBarFill,
                    {
                      width: `${progress.percentage}%`,
                      backgroundColor: getProgressColor(difficultyKey, isDark),
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}

        {/* 总体完成情况 */}
        <View
          style={[
            localStyles.levelContainer,
            localStyles.totalContainer,
            { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.05)' },
          ]}
        >
          <View style={localStyles.levelHeader}>
            <Text style={localStyles.emoji}>🏆</Text>
            <Text style={[styles.text, localStyles.difficultyLabel]}>{t('total')}</Text>
            <TouchableOpacity style={localStyles.rankButton} onPress={showTotalLeaderboard}>
              <Animated.Image
                source={require('../assets/icon/rank.png')}
                style={[
                  localStyles.rankIcon,
                  {
                    transform: [{ scale: globalRankIconsScale.total }],
                  },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={localStyles.progressInfo}>
            <Text style={[styles.text, localStyles.percentText]}>
              {`${totalProgress.percentage.toFixed(2)}%`}
            </Text>
            <Text style={[styles.text, localStyles.countText]}>
              {`${totalProgress.completed}/${totalProgress.total}`}
            </Text>
          </View>

          <View
            style={[
              localStyles.progressBarBg,
              { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
            ]}
          >
            <View
              style={[
                localStyles.progressBarFill,
                {
                  width: `${totalProgress.percentage}%`,
                  backgroundColor: isDark ? '#b388ff' : '#7c4dff',
                },
              ]}
            />
          </View>
        </View>

        <View style={localStyles.footerContainer}>
          <Tooltip
            isVisible={showTip}
            content={
              <Text style={[styles.text, localStyles.tipText]}>
                {t('dataSyncDescription') + t('dataSyncDescription2')}
              </Text>
            }
            placement="top"
            onClose={() => setShowTip(false)}
            contentStyle={{ backgroundColor: isDark ? 'rgb(42, 43, 45)' : 'white' }}
          >
            <TouchableOpacity
              style={localStyles.infoButton}
              onPressIn={() => setShowTip(true)}
              onPressOut={() => setShowTip(false)}
            >
              <Image
                source={require('../assets/icon/help.png')}
                style={localStyles.infoIcon}
                resizeMode="contain"
              />
              <Text style={[styles.text, localStyles.infoText]}>{t('dataSync')}</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>
      </View>
    </View>
  );
};

// 根据难度级别返回不同的进度条颜色
const getProgressColor = (difficulty: DIFFICULTY, isDark: boolean) => {
  switch (difficulty) {
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
    justifyContent: 'space-between',
  },
  levelContainer: {
    width: '100%',
    alignItems: 'center',
    // marginBottom: 8,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 10,
  },
  totalContainer: {
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    width: '100%',
    position: 'relative',
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
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 10,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.8,
  },
  rankButton: {
    position: 'absolute',
    right: 10,
    padding: 4,
  },
  rankIcon: {
    width: 25,
    height: 25,
  },
});

export default Statistics;
