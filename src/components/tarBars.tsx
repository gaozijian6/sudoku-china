import React, { FC } from 'react';
import { Text, StyleSheet, View, Platform, StatusBar } from 'react-native';

interface TarBarsProps {
  isHome: boolean;
}

const TarBars: FC<TarBarsProps> = ({isHome}) => {
  return (
    <View style={styles.container}>
      {isHome ? <Text style={styles.home}>home</Text> : <Text style={styles.sudoku}>sudoku</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(91,139,241)',
    justifyContent: 'center',
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
});

export default TarBars;
