import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Animated, AppState, Dimensions } from 'react-native';
import Sudoku from './src/views/sudoku';
import SudokuDIY from './src/views/sudokuDIY';
import Home from './src/views/Home';
import Setting from './src/views/setting';
import { initSounds } from './src/tools/Sound';
import { useSudokuStore } from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './src/i18n';
import TarBars from './src/components/tarBars';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabs from './src/components/BottomTabs';
import MyBoards from './src/views/MyBoards';
import { State, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { SudokuType } from './src/constans';
import NetInfo from '@react-native-community/netinfo';

const slideAnim = Dimensions.get('window').width;

function App() {
  const {
    setIsHasContinue,
    setIsSound,
    setIsHighlight,
    setIsSetting,
    setIsBackground,
    setIsInactive,
    setLocalsudokuDataDIY1,
    setLocalsudokuDataDIY2,
    initSudokuDataDIY1,
    initSudokuDataDIY2,
    isSudoku,
    isContinue,
    scaleValue1,
    scaleValue2,
    sudokuType,
    setIsConnected
  } = useSudokuStore();
  const slideAnim1 = useRef(new Animated.Value(slideAnim)).current;
  const slideAnim2 = useRef(new Animated.Value(slideAnim)).current;
  const isMovingRef = useRef(false);
  const [settingSlideAnim] = useState(new Animated.Value(slideAnim));
  const scale = useRef(new Animated.Value(1)).current;
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: new Animated.Value(0),
          translationY: new Animated.Value(0),
        },
      },
    ],
    {
      useNativeDriver: true,
      listener: (event: any) => {
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
      },
    }
  );

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

  const openSudoku = useCallback(() => {
    Animated.spring(slideAnim1, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim1]);

  const closeSudoku = useCallback(() => {
    Animated.spring(slideAnim1, {
      toValue: slideAnim,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim1]);

  const openSudokuDIY = useCallback(() => {
    Animated.spring(slideAnim2, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim2]);

  const closeSudokuDIY = useCallback(() => {
    Animated.spring(slideAnim2, {
      toValue: slideAnim,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim2]);

  const openSetting = useCallback(() => {
    setIsSetting(true);
    Animated.spring(settingSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [setIsSetting, settingSlideAnim]);

  const closeSetting = useCallback(() => {
    setIsSetting(false);
    Animated.spring(settingSlideAnim, {
      toValue: slideAnim,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [setIsSetting, settingSlideAnim]);

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
  }, []);

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Animated.View style={{ flex: 1 }}>
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
              <TarBars />
              <Home
                openSudoku={openSudoku}
                openSudokuDIY={openSudokuDIY}
                openSetting={openSetting}
              />
              <MyBoards openSudokuDIY={openSudokuDIY} openSetting={openSetting} />
              <Sudoku
                slideAnim={slideAnim1}
                closeSudoku={closeSudoku}
                openSetting={openSetting}
                isMovingRef={isMovingRef}
              />
              <SudokuDIY
                slideAnim={slideAnim2}
                closeSudokuDIY={closeSudokuDIY}
                openSetting={openSetting}
                isMovingRef={isMovingRef}
              />
              <Setting slideAnim={settingSlideAnim} closeSetting={closeSetting} />
              <BottomTabs />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
