import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ListRenderItem,
} from 'react-native';
import { useSudokuStore } from '../store';
import { useTranslation } from 'react-i18next';
import createStyles from './sudokuStyles';
import entryBoard from '../mock/1entry';
import easyBoard from '../mock/2easy';
import mediumBoard from '../mock/3medium';
import hardBoard from '../mock/4hard';
import extremeBoard from '../mock/5extreme';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const model = DeviceInfo.getModel();
const isIpad = model.includes('iPad');
const itemMargin = 5;

// 定义游戏项目类型
interface GameItem {
  puzzle: string;
  solution: string;
  date: string;
}

// 定义标签项目类型
interface TabItem {
  id: number;
  title: string;
  data: GameItem[];
  difficulty: string;
}

const LocalGames = () => {
  const { t } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);
  const setDifficulty = useSudokuStore(state => state.setDifficulty);
  const setIsHome = useSudokuStore(state => state.setIsHome);
  const setIsHasContinue = useSudokuStore(state => state.setIsHasContinue);
  const setIsSudoku = useSudokuStore(state => state.setIsSudoku);
  const userStatisticPass = useSudokuStore(state => state.userStatisticPass);
  const userStatisticTime = useSudokuStore(state => state.userStatisticTime);
  const isPortrait = useSudokuStore(state => state.isPortrait);
  const styles = createStyles(isDark, false, isPortrait);
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState(0);

  // 添加屏幕尺寸状态
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  // 监听屏幕尺寸变化
  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  // 动态计算列数：iPad根据方向调整，手机保持6列
  const numColumns = useMemo(() => {
    if (isIpad) {
      // iPad：横屏15列，竖屏10列
      const isLandscape = screenData.width > screenData.height;
      return isLandscape ? 14 : 10;
    }
    // 手机保持6列
    return 6;
  }, [screenData.width, screenData.height]);

  // 动态计算方格大小
  const ITEM_SIZE = useMemo(() => {
    return (screenData.width - 20 - itemMargin * 2 * numColumns) / numColumns;
  }, [screenData.width, numColumns]);

  // 将 localStyles 移到组件内部，使用 useMemo 优化性能
  const localStyles = useMemo(() => StyleSheet.create({
    tabsContainer: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    tabItem: {
      paddingHorizontal: 20,
      marginHorizontal: 5,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 2,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      paddingVertical: 10,
      lineHeight: 12,
    },
    listContainer: {
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 30,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: '100%',
    },
    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    puzzleItem: {
      width: ITEM_SIZE,
      height: ITEM_SIZE,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 1,
      margin: itemMargin,
    },
    puzzleContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    puzzleNumber: {
      fontSize: isIpad ? 24 : 16,
      fontWeight: 'bold',
    },
    timeText: {
      fontSize: isIpad ? 16 : 10,
      marginTop: 2,
    }
  }), [ITEM_SIZE]);

  // 难度标签数据
  const difficultyTabs = useMemo<TabItem[]>(
    () => [
      { id: 0, title: t('entry'), data: entryBoard, difficulty: 'entry' },
      { id: 1, title: t('easy'), data: easyBoard, difficulty: 'easy' },
      { id: 2, title: t('medium'), data: mediumBoard, difficulty: 'medium' },
      { id: 3, title: t('hard'), data: hardBoard, difficulty: 'hard' },
      { id: 4, title: t('extreme'), data: extremeBoard, difficulty: 'extreme' },
    ],
    [t]
  );

  // 显示当前选中难度的数据
  const currentBoardData = difficultyTabs[activeTab].data;

  // 点击标签切换难度
  const handleTabPress = useCallback((tabIndex: number) => {
    setActiveTab(tabIndex);
  }, []);

  // 格式化时间函数
  const formatTime = useCallback((seconds: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // 渲染顶部导航标签
  const renderTabs = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={localStyles.tabsContainer}
      >
        {difficultyTabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              localStyles.tabItem,
              activeTab === index && localStyles.activeTab,
              {
                backgroundColor: isDark
                  ? activeTab === index
                    ? 'rgb(39, 60, 95)'
                    : 'rgb(40, 40, 42)'
                  : activeTab === index
                  ? 'rgb(91,139,241)'
                  : '#f0f0f0',
              },
            ]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                localStyles.tabText,
                {
                  color:
                    activeTab === index ? (isDark ? '#888' : '#fff') : isDark ? '#888' : '#666',
                },
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const playGame = useCallback(
    (index: number) => {
      navigation.navigate('Sudoku', {
        difficulty_route: difficultyTabs[activeTab].difficulty,
        index_route: index,
      });
      setDifficulty(difficultyTabs[activeTab].difficulty);
      setIsHome(false);
      setIsHasContinue(true);
      setIsSudoku(true);
      AsyncStorage.setItem('isHasContinue', 'true');
    },
    [navigation, difficultyTabs, activeTab, setDifficulty, setIsHome, setIsHasContinue, setIsSudoku]
  );

  // 渲染单个题目方块
  const renderItem: ListRenderItem<GameItem> = useCallback(
    ({ item: _item, index }) => {
      const currentDifficulty = difficultyTabs[activeTab].difficulty;
      // 检查当前难度对应字符串中的索引位置是否为1
      const isPassed =
        userStatisticPass[currentDifficulty as keyof typeof userStatisticPass]?.[index] === '1';
      
      // 获取此题的解题时间
      const solveTime = userStatisticTime[currentDifficulty as keyof typeof userStatisticTime]?.[index] || 0;
      const formattedTime = solveTime > 0 ? formatTime(solveTime) : '';

      return (
        <TouchableOpacity
          style={[
            localStyles.puzzleItem,
            {
              backgroundColor: isPassed
                ? isDark
                  ? 'rgb(39, 60, 95)'
                  : 'rgb(91,139,241)'
                : isDark
                ? 'rgb(40, 40, 42)'
                : '#fff',
            },
          ]}
          onPress={() => playGame(index)}
        >
          <View style={localStyles.puzzleContent}>
            <Text
              style={[
                styles.text,
                localStyles.puzzleNumber,
                { color: isPassed ? (isDark ? '#888' : '#fff') : isDark ? '#888' : '#333' },
              ]}
            >
              {index + 1}
            </Text>
            
            {isPassed && solveTime > 0 && (
              <Text
                style={[
                  styles.text,
                  localStyles.timeText,
                  { color: isPassed ? (isDark ? '#666' : 'rgba(255,255,255,0.8)') : isDark ? '#666' : '#777' },
                ]}
              >
                {formattedTime}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      );
    },
    [isDark, styles.text, playGame, activeTab, difficultyTabs, userStatisticPass, userStatisticTime, formatTime]
  );

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {renderTabs()}
      <FlatList
        key={`flatlist-${numColumns}`}
        data={currentBoardData}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `puzzle-${difficultyTabs[activeTab].title}-${item.date}-${index}`
        }
        numColumns={numColumns}
        contentContainerStyle={localStyles.listContainer}
        columnWrapperStyle={localStyles.columnWrapper}
        windowSize={3}
        maxToRenderPerBatch={5}
      />
    </View>
  );
};

export default LocalGames;
