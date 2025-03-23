import React, { FC } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSudokuStore } from '../store';

const TarBars: FC = () => {
  const insets = useSafeAreaInsets();
  const { isDark } = useSudokuStore();
  const styles = createStyles(isDark);
  return (
    <View
      style={[
        styles.container,
        {
          height: insets.top,
          width: '100%',
        },
      ]}
    ></View>
  );
};

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      // backgroundColor: 'rgb(91,139,241)',
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
    },
  });
export default TarBars;
