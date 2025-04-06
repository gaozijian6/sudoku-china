import React from 'react';
import { Text, TouchableOpacityProps, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSudokuStore } from '../store';

interface CustomTabButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  accessibilityState?: {
    selected?: boolean;
  };
  label: string;
  icon: React.ReactNode;
}

const CustomTabButton = (props: CustomTabButtonProps) => {
  const { onPress, accessibilityState } = props;
  const isDark = useSudokuStore(state => state.isDark);
  const isFocused = accessibilityState?.selected;

  // 从props中提取出label
  const label = props.label;
  // 从props中提取出icon
  const icon = props.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.5}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text
          style={[
            styles.label,
            {
              color: isFocused
                ? isDark
                  ? 'rgb(47, 82, 158)'
                  : 'rgb(91,139,241)'
                : isDark
                ? '#888'
                : '#666',
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 3,
    borderRadius: 1.5,
  },
});

export default CustomTabButton;
