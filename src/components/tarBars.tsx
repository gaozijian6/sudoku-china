import React, {FC} from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TarBarsProps {}

const TarBars: FC<TarBarsProps> = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {
      height: insets.top,
      width: '100%',
    }]}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(91,139,241)',
    // backgroundColor: 'red',
  },
});

export default TarBars;
