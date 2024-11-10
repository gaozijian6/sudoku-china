import React, {FC, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
} from 'react-native';

interface TarBarsSudokuProps {
  onBack: () => void;
  tooglePause: () => void;
  setDifficulty: (value: string) => void;
  setIsHome: (value: boolean) => void;
}

const TarBarsSudoku: FC<TarBarsSudokuProps> = ({
  onBack,
  tooglePause,
  setDifficulty,
  setIsHome,
}) => {
  const backToHome = useCallback(() => {
    setDifficulty('');
    setIsHome(true);
    onBack();
  }, [setDifficulty, setIsHome, onBack]);

  return (
    <View style={styles.container}>
      <>
        <Pressable style={[styles.leftSection]} onPress={backToHome}>
          <Image
            source={require('../assets/icon/back.png')}
            style={styles.backIcon}
          />
        </Pressable>
        <View style={styles.centerSection}>
          <Text style={styles.sudoku}>sudoku</Text>
        </View>
        <Pressable style={[styles.rightSection]} onPress={tooglePause}>
          <Image
            source={require('../assets/icon/pause.png')}
            style={styles.pauseIcon}
          />
        </Pressable>
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
    paddingHorizontal: 15,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },
  pauseIcon: {
    width: 26,
    height: 26,
    marginLeft: 10,
  },
  backIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
});

export default TarBarsSudoku;
