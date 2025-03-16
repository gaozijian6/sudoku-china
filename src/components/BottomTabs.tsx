import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useSudokuStore } from '../store';
import { Page, SudokuType } from '../constans';
import i18n from '../i18n';

const { t } = i18n;

function BottomTabs() {
  const { currentPage, setCurrentPage, setSudokuType } = useSudokuStore();

  const onPressHome = useCallback(() => {
    setCurrentPage(Page.HOME);
    setSudokuType(SudokuType.HOME);
  }, [setCurrentPage, setSudokuType]);

  const onPressMyBoards = useCallback(() => {
    setCurrentPage(Page.MY_BOARDS);
    setSudokuType(SudokuType.MY_BOARDS);
  }, [setCurrentPage, setSudokuType]);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tabItem, currentPage === Page.HOME && styles.activeTab]}
        onPress={onPressHome}
      >
        <Image
          source={require('../assets/icon/home.png')}
          style={[styles.tabIcon, currentPage === Page.HOME && styles.activeIcon]}
        />
        <Text style={[styles.tabText, currentPage === Page.HOME && styles.activeText]}>
          {t('Home')}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.tabItem, currentPage === Page.MY_BOARDS && styles.activeTab]}
        onPress={onPressMyBoards}
      >
        <Image
          source={require('../assets/icon/sudoku.png')}
          style={[styles.tabIcon, currentPage === Page.MY_BOARDS && styles.activeIcon]}
        />
        <Text style={[styles.tabText, currentPage === Page.MY_BOARDS && styles.activeText]}>
          {t('myBoards')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#666',
  },
  activeIcon: {
    tintColor: 'rgb(91,139,241)',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
  },
  activeText: {
    color: 'rgb(91,139,241)',
  },
});

export default BottomTabs;
