import React, {FC, useCallback} from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {useSudokuStore} from '../store';

interface TarBarsSudokuProps {
  onBack: () => void;
  openSetting: () => void;
  saveData: () => void;
  resetSudoku: () => void;
}

const TarBarsSudoku: FC<TarBarsSudokuProps> = ({
  onBack,
  openSetting,
  saveData,
  resetSudoku,
}) => {
  const {
    setIsHome,
    setDifficulty,
    setPauseVisible,
    pauseVisible,
  } = useSudokuStore();
  const backToHome = useCallback(() => {
    saveData();
    resetSudoku();
    setDifficulty('');
    setIsHome(true);
    onBack();
  }, [saveData, resetSudoku, setDifficulty, setIsHome, onBack]);

  return (
    <View style={styles.container}>
      <>
        <Pressable style={[styles.leftSection]} onPressIn={backToHome}>
          <Image
            source={require('../assets/icon/back.png')}
            style={styles.backIcon}
          />
        </Pressable>
        <View style={styles.centerSection}>
          <Text style={styles.sudoku}>sudoku</Text>
        </View>
        <View style={styles.rightSection}>
          <Pressable
            style={styles.pauseIconContainer}
            onPressIn={() => {
              setPauseVisible(!pauseVisible);
            }}>
            <Image
              source={require('../assets/icon/pause.png')}
              style={styles.pauseIcon}
            />
          </Pressable>
          <Pressable
            onPressIn={openSetting}
            style={styles.settingIconContainer}>
            <Image
              source={require('../assets/icon/setting.png')}
              style={styles.settingIcon}
            />
          </Pressable>
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(91,139,241)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  sudoku: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sudokuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    position: 'absolute',
    left: 0,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    paddingRight: 5,
    position: 'absolute',
    right: 0,
  },
  pauseIconContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  settingIconContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  pauseIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  backIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  settingIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
});

export default TarBarsSudoku;
