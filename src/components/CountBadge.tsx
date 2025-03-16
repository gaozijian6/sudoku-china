import React from 'react';
import { View, Text } from 'react-native';

interface CountBadgeProps {
  count: number;
  top?: number;
  right?: number;
  visible: boolean;
}

const CountBadge: React.FC<CountBadgeProps> = ({ count, top = 0, right = 0, visible }) => {
  return (
    visible && (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 16,
          height: 16,
          paddingHorizontal: 6,
          backgroundColor: '#1890ff',
          borderRadius: 8,
          position: 'absolute',
          top,
          right,
          zIndex: 1000,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: '#fff',
            lineHeight: 16,
          }}
        >
          {count}
        </Text>
      </View>
    )
  );
};

export default CountBadge;
