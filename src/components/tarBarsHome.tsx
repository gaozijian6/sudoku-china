import React, {FC} from 'react';
import {Text, StyleSheet, View, Platform, StatusBar} from 'react-native';

const TarBarsHome: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.home}>home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(91,139,241)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  home: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TarBarsHome;
