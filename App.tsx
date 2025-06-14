import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Animated, AppState, Dimensions, Pressable, Image, View, Text } from 'react-native';
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
import DeviceInfo from 'react-native-device-info';
import { State, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { SudokuType } from './src/constans';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabButton from './src/components/CustomTabButton';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/views/SplashScreen';
import Orientation from 'react-native-orientation-locker';
import UpdateModal from './src/components/UpdateModal';
import { checkAppVersion } from './src/tools/versionCheck';
import { createWebSocketService } from './src/tools/websocketOnlineService';

const model = DeviceInfo.getModel();

const isIpad = model.includes('iPad'); // 检测是否为iPad设备
const gestureDistance = isIpad ? 30 : 15; // iPad设为30，iPhone设为15

// 带有isMovingRef的组件封装
const SudokuWithRef = (props: any) => <Sudoku {...props} isMovingRef={props.isMovingRef} />;
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
  const onlineCount = useSudokuStore(state => state.onlineCount);
  const isWebSocketConnected = useSudokuStore(state => state.isWebSocketConnected);

  // 格式化在线人数显示
  const formatOnlineCount = (count: number): string => {
    if (count < 1000) {
      return count.toString();
    } else {
      const thousands = Math.floor(count / 1000) * 1000;
      return `${thousands}+`;
    }
  };

  // 在线人数显示组件（复用）
  const OnlineCountDisplay = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
      {/* 只有连接成功时才显示在线人数 */}
      {isWebSocketConnected && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('./src/assets/icon/onlinePeople.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: isDark ? '#666' : '#fff',
              marginRight: 4,
            }}
          />
          <Text
            style={{
              color: isDark ? '#666' : '#fff',
              fontSize: 14,
              fontWeight: '500',
            }}
          >
            {formatOnlineCount(onlineCount)}
          </Text>
        </View>
      )}
    </View>
  );

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
          headerLeft: OnlineCountDisplay,
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
          headerLeft: OnlineCountDisplay,
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
          headerLeft: OnlineCountDisplay,
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
  const setIsPortrait = useSudokuStore(state => state.setIsPortrait);
  const setOnlineCount = useSudokuStore(state => state.setOnlineCount);
  const setIsWebSocketConnected = useSudokuStore(state => state.setIsWebSocketConnected);

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

  const [deviceId, setDeviceId] = useState<string>('');
  // 新增：WebSocket服务实例引用
  const [webSocketServiceRef, setWebSocketServiceRef] = useState<any>(null);

  // 修改这个useEffect - 移除showSplash依赖
  useEffect(() => {
    let previousNetworkState = false; // 新增：记录上一次网络状态

    const unsubscribe = NetInfo.addEventListener(state => {
      const currentNetworkState = state.isConnected || false;
      setIsConnected(currentNetworkState);

      // 新增：检测网络从断开变为连接状态
      if (!previousNetworkState && currentNetworkState) {
        console.log('网络已恢复，检查 WebSocket 连接状态...');
        
        // 延迟一秒后检查并尝试重连WebSocket，确保网络真正稳定
        setTimeout(() => {
          if (webSocketServiceRef) { // 移除showSplash检查
            const status = webSocketServiceRef.getConnectionStatus();
            if (!status.isConnected && !status.isConnecting) {
              console.log('WebSocket 未连接，尝试重新连接...');
              webSocketServiceRef.connect();
            } else {
              console.log('WebSocket 已连接或正在连接中');
            }
          }
        }, 1000);
      }

      previousNetworkState = currentNetworkState; // 新增：更新上一次网络状态
    });

    return () => unsubscribe();
  }, [webSocketServiceRef]); // 移除showSplash依赖

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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'inactive') {
        setIsInactive(true);
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

  // 添加一个状态来控制是否显示闪屏页面
  const [showSplash, setShowSplash] = useState(true);

  // 在组件挂载时立即获取当前方向
  useEffect(() => {
    Orientation.getOrientation(orientation => {
      setIsPortrait(orientation.includes('PORTRAIT'));
    });
    Orientation.addOrientationListener(orientation => {
      setIsPortrait(orientation.includes('PORTRAIT'));
    });
  }, []);

  // 添加版本检查相关的状态
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<{
    newVersion: string;
    appStoreUrl: string;
    releaseNotes?: string;
    releaseDate?: string;
    currentVersion?: string;
  } | null>(null);

  // 版本检查 useEffect
  useEffect(() => {
    const performVersionCheck = async () => {
      try {
        const versionInfo = await checkAppVersion();
        if (versionInfo && versionInfo.needsUpdate) {
          setUpdateInfo({
            newVersion: versionInfo.latestVersion,
            appStoreUrl: versionInfo.appStoreUrl,
            releaseNotes: versionInfo.releaseNotes,
            releaseDate: versionInfo.releaseDate,
            currentVersion: versionInfo.currentVersion,
          });
          setShowUpdateModal(true);
        }
      } catch (error) {
        console.log('版本检查失败:', error);
      }
    };

    if (!showSplash) {
      performVersionCheck();
    }
  }, [showSplash]);

  // 获取设备唯一标识
  const getDeviceId = useCallback(async () => {
    try {
      // 首先尝试从本地存储获取已保存的设备ID
      const savedDeviceId = await AsyncStorage.getItem('deviceId');
      if (savedDeviceId) {
        setDeviceId(savedDeviceId);
        return savedDeviceId;
      }

      // 如果没有保存的ID，则生成新的设备ID
      let uniqueId = '';
      
      try {
        // 在新版本的react-native-device-info中，推荐使用getUniqueIdSync
        uniqueId = DeviceInfo.getUniqueIdSync();
      } catch (error) {
        // 如果getUniqueIdSync不可用，尝试使用getUniqueId (异步版本)
        try {
          uniqueId = await DeviceInfo.getUniqueId();
        } catch (asyncError) {
          console.log('获取设备唯一ID失败，使用备用方案');
          // 备用方案：生成基于设备信息的唯一ID
          const model = DeviceInfo.getModel();
          const systemVersion = DeviceInfo.getSystemVersion();
          const buildNumber = DeviceInfo.getBuildNumber();
          const timestamp = Date.now().toString();
          
          // 创建一个基于设备信息的字符串，然后生成简单的hash
          const deviceInfo = `${model}_${systemVersion}_${buildNumber}_${timestamp}`;
          uniqueId = deviceInfo.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
        }
      }

      // 保存设备ID到本地存储
      await AsyncStorage.setItem('deviceId', uniqueId);
      setDeviceId(uniqueId);
      return uniqueId;
    } catch (error) {
      console.error('获取设备ID失败:', error);
      // 最后的备用方案：生成一个随机ID
      const fallbackId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      await AsyncStorage.setItem('deviceId', fallbackId);
      setDeviceId(fallbackId);
      return fallbackId;
    }
  }, []);

  // 修改这个useEffect - 移除showSplash依赖
  useEffect(() => {
    const initWebSocketService = async () => {
      // 获取设备唯一标识
      const userId = await getDeviceId();
      
      const webSocketService = createWebSocketService({
        serverUrl: 'ws://192.168.18.122:8080/ws',
        userId: userId, // 使用设备唯一标识作为用户ID
        reconnectInterval: 5000,
        maxReconnectAttempts: 1,
        // 添加在线人数更新回调
        onOnlineCountUpdate: (count: number) => {
          console.log('更新在线人数:', count);
          setOnlineCount(count);
        },
      });

      // 新增：保存WebSocket服务实例的引用
      setWebSocketServiceRef(webSocketService);

      // 重写连接事件处理
      const originalConnect = webSocketService.connect.bind(webSocketService);
      webSocketService.connect = function () {
        console.log('开始连接 WebSocket...');
        setIsWebSocketConnected(false);
        originalConnect();
      };

      // 监听连接状态变化
      const checkConnectionStatus = () => {
        const status = webSocketService.getConnectionStatus();
        if (status.isConnected) {
          setIsWebSocketConnected(true);
        } else {
          console.log('WebSocket 连接失败或断开');
          setIsWebSocketConnected(false);
          setOnlineCount(0);
        }
      };

      // 定期检查连接状态
      const statusInterval = setInterval(checkConnectionStatus, 5000);

      // 连接 WebSocket
      webSocketService.connect();

      // 返回清理函数
      return () => {
        clearInterval(statusInterval);
        webSocketService.cleanup();
        setWebSocketServiceRef(null); // 新增：清理服务引用
      };
    };

    // 移除showSplash条件，直接初始化
    let cleanup: (() => void) | undefined;

    initWebSocketService().then(cleanupFn => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [setOnlineCount, setIsWebSocketConnected, getDeviceId]); // 移除showSplash依赖

  // 如果显示闪屏页面，则渲染SplashScreen组件
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

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

          {/* 添加版本更新弹窗 */}
          {updateInfo && (
            <UpdateModal
              visible={showUpdateModal}
              onClose={() => setShowUpdateModal(false)}
              currentVersion={updateInfo.currentVersion}
              newVersion={updateInfo.newVersion}
              appStoreUrl={updateInfo.appStoreUrl}
              releaseNotes={updateInfo.releaseNotes}
              releaseDate={updateInfo.releaseDate}
            />
          )}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

export default App;
