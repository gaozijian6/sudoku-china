import React, {useCallback, useState, useRef, useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, Animated} from 'react-native';
import Sudoku from './src/views/sudoku';
import ResultView from './src/components/ResultOverlay';
import Home from './src/views/Home';
import Login from './src/views/Login';
import Setting from './src/views/setting';
import {initSounds} from './src/tools/Sound';
import {useSudokuStore} from './src/store';
import { getDocs, query, limit, startAt } from 'firebase/firestore';
import { db } from './src/firebase/config';
import { collection } from 'firebase/firestore';

interface SudokuBank {
  id: string;
  puzzle: string;
  answer: string;
}

function App() {
  const {resultVisible, pauseVisible, setEasyBank} = useSudokuStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const slideAnim = useRef(new Animated.Value(800)).current;
  const [settingSlideAnim] = useState(new Animated.Value(800));

  const getEasyBank = useCallback(async () => {
    const easyBank = collection(db, 'easyBank');
    const random = Math.floor(Math.random() * 2);
    console.log('随机数:', random);
    
    console.log('开始查询...');
    const q = query(easyBank, limit(1), startAt(random));
    console.log('查询对象创建成功');
    
    const snapshot = await getDocs(q);
    console.log('查询结果:', snapshot?.empty ? '无数据' : '有数据', '文档数量:', snapshot?.docs?.length);
    
    if (snapshot?.docs?.length > 0) {
        const doc = snapshot.docs[0];
        console.log('文档数据:', JSON.stringify(doc.data(), null, 2));
        setEasyBank([{
            id: doc.id,
            ...doc.data()
        }] as SudokuBank[]);
    } else {
        console.log('未找到数据');
    }
  }, [setEasyBank]);

  const openSudoku = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim]);

  const closeSudoku = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 800,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [slideAnim]);

  const openSetting = useCallback(() => {
    Animated.spring(settingSlideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [settingSlideAnim]);

  const closeSetting = useCallback(() => {
    Animated.spring(settingSlideAnim, {
      toValue: 800,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
      velocity: 0.5,
    }).start();
  }, [settingSlideAnim]);

  useEffect(() => {
    initSounds();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={
            resultVisible || pauseVisible
              ? styles.background1.backgroundColor
              : styles.background2.backgroundColor
          }
        />
        {isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} />
        ) : (
        <>
          <Home openSudoku={openSudoku} openSetting={openSetting} getEasyBank={getEasyBank} />
          <Sudoku
            slideAnim={slideAnim}
            closeSudoku={closeSudoku}
            openSetting={openSetting}
          />
          <Setting slideAnim={settingSlideAnim} closeSetting={closeSetting} />
          </>
        )}
      </SafeAreaView>
      {resultVisible && <ResultView onNext={() => {}} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background1: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  background2: {
    backgroundColor: 'rgb(91,139,241)',
  },
});

export default App;
