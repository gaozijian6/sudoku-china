import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { Animated, AppState, Dimensions, View, Pressable, Image, Platform } from 'react-native';
import Sudoku from './src/views/sudoku';
import SudokuDIY from './src/views/sudokuDIY';
import Home from './src/views/Home';
import Setting from './src/views/setting';
import LocalGames from './src/views/LocalGames';
import Statistics from './src/views/Statistics';
import { initSounds } from './src/tools/Sound';
import { useSudokuStore } from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './src/i18n';
import NetInfo from '@react-native-community/netinfo';
import MyBoards from './src/views/MyBoards';
import createStyles from './src/views/sudokuStyles';
import DeviceInfo from 'react-native-device-info';
import { State, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { DIFFICULTY, SudokuType } from './src/constans';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabButton from './src/components/CustomTabButton';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import iCloudStorage from 'react-native-icloudstore';
import LZString from 'lz-string';
import { getUpdateUserStatisticPass, saveUserStatisticPass } from './src/tools';

const model = DeviceInfo.getModel();

const isIpad = model.includes('iPad'); // 检测是否为iPad设备
const gestureDistance = isIpad ? 30 : 15; // iPad设为30，iPhone设为15

// 带有isMovingRef的组件封装
const SudokuWithRef = (props: any) => (
  <Sudoku
    {...props}
    isMovingRef={props.isMovingRef}
  />
);
const SudokuDIYWithRef = (props: any) => <SudokuDIY {...props} isMovingRef={props.isMovingRef} />;

// 根导航器
const RootStack = createStackNavigator();

// 创建底部标签导航器
const Tab = createBottomTabNavigator();

// 定义TabButton组件的Props类型
type TabButtonProps = {
  accessibilityState?: {
    selected?: boolean;
  };
  [key: string]: any;
};

// 定义TabButton组件
const HomeTabIcon = (props: TabButtonProps) => {
  const { t } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);

  return (
    <CustomTabButton
      {...props}
      label={t('Home')}
      icon={
        <Image
          source={require('./src/assets/icon/home.png')}
          style={{
            width: 24,
            height: 24,
            tintColor: props.accessibilityState?.selected
              ? isDark
                ? 'rgb(47, 82, 158)'
                : 'rgb(91,139,241)'
              : isDark
              ? '#888'
              : '#666',
          }}
        />
      }
    />
  );
};

const MyBoardsTabIcon = (props: TabButtonProps) => {
  const { t } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);

  return (
    <CustomTabButton
      {...props}
      label={t('myBoards')}
      icon={
        <Image
          source={require('./src/assets/icon/sudoku.png')}
          style={{
            width: 24,
            height: 24,
            tintColor: props.accessibilityState?.selected
              ? isDark
                ? 'rgb(47, 82, 158)'
                : 'rgb(91,139,241)'
              : isDark
              ? '#888'
              : '#666',
          }}
        />
      }
    />
  );
};

const StatisticsTabIcon = (props: TabButtonProps) => {
  const { t } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);

  return (
    <CustomTabButton
      {...props}
      label={t('statistics')}
      icon={
        <Image
          source={require('./src/assets/icon/statistics.png')}
          style={{
            width: 24,
            height: 24,
            tintColor: props.accessibilityState?.selected
              ? isDark
                ? 'rgb(47, 82, 158)'
                : 'rgb(91,139,241)'
              : isDark
              ? '#888'
              : '#666',
          }}
        />
      }
    />
  );
};

const LocalGamesTabIcon = (props: TabButtonProps) => {
  const { t } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);

  return (
    <CustomTabButton
      {...props}
      label={t('localGames')}
      icon={
        <Image
          source={require('./src/assets/icon/localPuzzle.png')}
          style={{
            width: 24,
            height: 24,
            tintColor: props.accessibilityState?.selected
              ? isDark
                ? 'rgb(47, 82, 158)'
                : 'rgb(91,139,241)'
              : isDark
              ? '#888'
              : '#666',
          }}
        />
      }
    />
  );
};

function MainTabs() {
  const { t } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
          backgroundColor: isDark ? 'rgb(23, 23, 24)' : '#fff',
          borderTopColor: isDark ? 'rgb(40, 40, 42)' : '#eee',
        },
        headerStyle: {
          backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
        },
        headerTintColor: isDark ? '#666' : '#fff',
      }}
      detachInactiveScreens={false}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: t('Home'),
          tabBarButton: HomeTabIcon,
          headerRight: () => (
            <Pressable
              style={{ marginRight: 15 }}
              hitSlop={{ right: 10, top: 10, bottom: 10, left: 10 }}
              onPress={() => {
                navigation.navigate('Setting');
              }}
            >
              <Image
                source={require('./src/assets/icon/setting.png')}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: isDark ? '#666' : '#fff',
                }}
              />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name={t('localGames')}
        component={LocalGames}
        options={({ navigation }) => ({
          lazy: false,
          tabBarButton: LocalGamesTabIcon,
          headerRight: () => (
            <Pressable
              style={{ marginRight: 15 }}
              hitSlop={{ right: 10, top: 10, bottom: 10, left: 10 }}
              onPress={() => {
                navigation.navigate('Setting');
              }}
            >
              <Image
                source={require('./src/assets/icon/setting.png')}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: isDark ? '#666' : '#fff',
                }}
              />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name={t('statistics')}
        component={Statistics}
        options={({ navigation }) => ({
          lazy: false,
          tabBarButton: StatisticsTabIcon,
          headerRight: () => (
            <Pressable
              style={{ marginRight: 15 }}
              hitSlop={{ right: 10, top: 10, bottom: 10, left: 10 }}
              onPress={() => {
                navigation.navigate('Setting');
              }}
            >
              <Image
                source={require('./src/assets/icon/setting.png')}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: isDark ? '#666' : '#fff',
                }}
              />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name={t('myBoards')}
        component={MyBoards}
        options={() => ({
          lazy: false,
          headerShown: false,
          tabBarButton: MyBoardsTabIcon,
        })}
      />
    </Tab.Navigator>
  );
}

function App() {
  const { t } = useTranslation();
  const setIsHasContinue = useSudokuStore(state => state.setIsHasContinue);
  const setIsConnected = useSudokuStore(state => state.setIsConnected);
  const setIsIllegal = useSudokuStore(state => state.setIsIllegal);
  const setIsSound = useSudokuStore(state => state.setIsSound);
  const setIsHighlight = useSudokuStore(state => state.setIsHighlight);
  const setIsBackground = useSudokuStore(state => state.setIsBackground);
  const setIsInactive = useSudokuStore(state => state.setIsInactive);
  const setLocalsudokuDataDIY1 = useSudokuStore(state => state.setLocalsudokuDataDIY1);
  const setLocalsudokuDataDIY2 = useSudokuStore(state => state.setLocalsudokuDataDIY2);
  const initSudokuDataDIY1 = useSudokuStore(state => state.initSudokuDataDIY1);
  const initSudokuDataDIY2 = useSudokuStore(state => state.initSudokuDataDIY2);
  const isSudoku = useSudokuStore(state => state.isSudoku);
  const isContinue = useSudokuStore(state => state.isContinue);
  const scaleValue1 = useSudokuStore(state => state.scaleValue1);
  const scaleValue2 = useSudokuStore(state => state.scaleValue2);
  const sudokuType = useSudokuStore(state => state.sudokuType);
  const isDark = useSudokuStore(state => state.isDark);
  const setIsDark = useSudokuStore(state => state.setIsDark);
  const setIsReason = useSudokuStore(state => state.setIsReason);
  const setUserStatisticPass = useSudokuStore(state => state.setUserStatisticPass);
  const updateUserStatisticPassOnline = useSudokuStore(state => state.updateUserStatisticPassOnline);

  const isMovingRef = useRef(false);
  const scale = useRef(new Animated.Value(1)).current;
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPanGestureEvent = event => {
    isMovingRef.current = true;
    const newTranslateX = lastTranslateX.current + event.nativeEvent.translationX;
    const newTranslateY = lastTranslateY.current + event.nativeEvent.translationY;

    const currentScale = isSudoku || isContinue ? scaleValue1 : scaleValue2;

    const maxTranslateX = (screenWidth * (1 - 1 / currentScale)) / 2;
    const maxTranslateY = (screenHeight * (1 - 1 / currentScale)) / 2;

    const limitedX = Math.max(-maxTranslateX, Math.min(maxTranslateX, newTranslateX));
    const limitedY = Math.max(-maxTranslateY, Math.min(maxTranslateY, newTranslateY));

    translateX.setValue(limitedX);
    translateY.setValue(limitedY);
  };

  const onPanHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.BEGAN) {
    } else if (event.nativeEvent.oldState === State.ACTIVE) {
      isMovingRef.current = false;
      const newTranslateX = lastTranslateX.current + event.nativeEvent.translationX;
      const newTranslateY = lastTranslateY.current + event.nativeEvent.translationY;

      const currentScale = isSudoku || isContinue ? scaleValue1 : scaleValue2;

      const maxTranslateX = (screenWidth * (1 - 1 / currentScale)) / 2;
      const maxTranslateY = (screenHeight * (1 - 1 / currentScale)) / 2;

      lastTranslateX.current = Math.max(-maxTranslateX, Math.min(maxTranslateX, newTranslateX));
      lastTranslateY.current = Math.max(-maxTranslateY, Math.min(maxTranslateY, newTranslateY));

      translateX.setValue(lastTranslateX.current);
      translateY.setValue(lastTranslateY.current);
    }
  };

  const panRef = useRef(null);

  useEffect(() => {
    let baseValue = 1;
    let pinchValue = 1;

    baseScale.addListener(({ value }) => {
      baseValue = value;
      scale.setValue(baseValue * pinchValue);
    });

    pinchScale.addListener(({ value }) => {
      pinchValue = value;
      scale.setValue(baseValue * pinchValue);
    });

    return () => {
      baseScale.removeAllListeners();
      pinchScale.removeAllListeners();
    };
  }, [baseScale, pinchScale, scale]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected || false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    initSounds();
    const checkContinue = async () => {
      try {
        const value = await AsyncStorage.getItem('isHasContinue');
        setIsHasContinue(value === 'true');
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
    };
    checkContinue();
  }, []);

  const isIllegalArray = useRef<boolean[]>([false, false]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'inactive') {
        setIsInactive(true);
        AsyncStorage.setItem('lastLogOutTime', JSON.stringify(new Date().getTime()));
        AsyncStorage.setItem('isIllegal', JSON.stringify(isIllegalArray.current));
      } else if (nextAppState === 'background') {
        setIsBackground(true);
      } else if (nextAppState === 'active') {
        setIsBackground(false);
        setIsInactive(false);
      }
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // AsyncStorage.clear();
    const checkLastLogOutTime = async () => {
      const lastLogOutTime = parseInt((await AsyncStorage.getItem('lastLogOutTime')) || '0');
      const isIllegalArr = JSON.parse((await AsyncStorage.getItem('isIllegal')) || '[false,false]');

      if (lastLogOutTime) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastLogOutTime;
        if (timeDiff < 1000 * 15) {
          isIllegalArr.push(true);
          isIllegalArr.shift();
          if (isIllegalArr.length === 2 && isIllegalArr[0] && isIllegalArr[1]) {
            setIsIllegal(true);
            setTimeout(() => {
              setIsIllegal(false);
            }, 1000 * 60);
          }
        } else {
          isIllegalArr.push(false);
          isIllegalArr.shift();
          setIsIllegal(false);
        }
        isIllegalArray.current = isIllegalArr;
      }
    };
    checkLastLogOutTime();
  }, []);

  useEffect(() => {
    const checkSound = async () => {
      const isSound = await AsyncStorage.getItem('isSound');
      if (isSound == null) {
        setIsSound(true);
      } else {
        setIsSound(isSound === 'true');
      }
    };
    checkSound();
    const checkHighlight = async () => {
      const isHighlight = await AsyncStorage.getItem('isHighlight');
      if (isHighlight == null) {
        setIsHighlight(true);
      } else {
        setIsHighlight(isHighlight === 'true');
      }
    };
    checkHighlight();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('localsudokuDataDIY1').then(data => {
      setLocalsudokuDataDIY1(data ? JSON.parse(data) : initSudokuDataDIY1);
    });
    AsyncStorage.getItem('localsudokuDataDIY2').then(data => {
      setLocalsudokuDataDIY2(data ? JSON.parse(data) : initSudokuDataDIY2);
    });
  }, [setLocalsudokuDataDIY1, setLocalsudokuDataDIY2, initSudokuDataDIY1, initSudokuDataDIY2]);

  useEffect(() => {
    if (isSudoku || isContinue) {
      scale.setValue(scaleValue1);
      if (scaleValue1 === 1.0) {
        translateX.setValue(0);
        translateY.setValue(0);
        lastTranslateX.current = 0;
        lastTranslateY.current = 0;
      }
    } else if (sudokuType === SudokuType.DIY1) {
      scale.setValue(scaleValue2);
      if (scaleValue2 === 1.0) {
        translateX.setValue(0);
        translateY.setValue(0);
        lastTranslateX.current = 0;
        lastTranslateY.current = 0;
      }
    } else {
      scale.setValue(1);
      translateX.setValue(0);
      translateY.setValue(0);
      lastTranslateX.current = 0;
      lastTranslateY.current = 0;
    }
  }, [scaleValue1, scaleValue2, isSudoku, isContinue, scale, translateX, translateY, sudokuType]);

  useEffect(() => {
    AsyncStorage.getItem('isDark').then(value => {
      if (value) {
        setIsDark(value === 'true');
      }
    });
    AsyncStorage.getItem('isReason').then(value => {
      if (value) {
        setIsReason(value === 'true');
      }
    });
  }, []);

  useEffect(() => {
    // AsyncStorage.clear();
    // iCloudStorage.clear();
    const fetchUserStatisticPassData = async () => {
      const userStatisticPass_iCloud = await iCloudStorage.getItem('userStatisticPass');
      const userStatisticPass_AsyncStorage = await AsyncStorage.getItem('userStatisticPass');

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
      saveUserStatisticPass(useSudokuStore.getState().userStatisticPass);
      updateUserStatisticPassOnline();
    };
    fetchUserStatisticPassData();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanHandlerStateChange}
        enabled={scaleValue1 > 1 || scaleValue2 > 1}
        ref={panRef}
      >
        <Animated.View
          style={{
            flex: 1,
            transform: [{ scale }, { translateX }, { translateY }],
          }}
        >
          <NavigationContainer>
            <RootStack.Navigator
              detachInactiveScreens={false}
              screenOptions={{
                headerStyle: {
                  backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
                },
                headerTintColor: isDark ? '#888' : '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <RootStack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Setting"
                component={Setting}
                options={{
                  headerBackTitle: '',
                  title: t('setting'),
                  headerBackImage: () => (
                    <Image
                      source={require('./src/assets/icon/back.png')}
                      style={{
                        width: 22,
                        height: 22,
                        marginLeft: 15,
                        tintColor: isDark ? '#666' : '#fff',
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
                  },
                  headerTintColor: isDark ? '#888' : '#fff',
                  headerStyleInterpolator: ({ current, layouts }) => {
                    return {
                      leftButtonStyle: { opacity: current.progress },
                      rightButtonStyle: { opacity: current.progress },
                      titleStyle: {
                        opacity: current.progress,
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                      backgroundStyle: {
                        opacity: current.progress,
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                    };
                  },
                  cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                    };
                  },
                }}
              />
              <RootStack.Screen
                name="Sudoku"
                component={SudokuWithRef}
                initialParams={{ isMovingRef }}
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
                  },
                  headerTintColor: isDark ? '#888' : '#fff',
                  gestureResponseDistance: gestureDistance,
                  cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                    };
                  },
                }}
              />
              <RootStack.Screen
                name="SudokuDIY"
                component={SudokuDIYWithRef}
                initialParams={{ isMovingRef }}
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
                  },
                  headerTintColor: isDark ? '#888' : '#fff',
                  gestureResponseDistance: gestureDistance,
                  cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                    };
                  },
                }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

export default App;
