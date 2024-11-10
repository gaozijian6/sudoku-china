import React, {FC} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';

interface TarBarsProps {
  isHome: boolean;
  tooglePause?: () => void;
  setIsHome?: (value: boolean) => void;
}

const TarBars: FC<TarBarsProps> = ({isHome, tooglePause, setIsHome}) => {
  return (
    <View style={styles.container}>
      {isHome ? (
        <Text style={styles.home}>home</Text>
      ) : (
        <>
          <Pressable
            style={[styles.leftSection]}
            onPressIn={() => setIsHome && setIsHome(true)}>
            <Image
              source={require('../assets/icon/back.png')}
              style={styles.backIcon}
            />
          </Pressable>
          <View style={styles.centerSection}>
            <Text style={styles.sudoku}>sudoku</Text>
          </View>
          <Pressable
            style={[styles.rightSection]}
            onPressIn={tooglePause}>
            <Image
              source={require('../assets/icon/pause.png')}
              style={styles.pauseIcon}
            />
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(91,139,241)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
    height: 80,
  },
  home: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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

export default TarBars;
