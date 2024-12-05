import React from 'react';
import { View } from 'react-native';

interface WatchIconProps {
  visible: boolean;
  top?: number;
  right?: number;
}

const WatchIcon: React.FC<WatchIconProps> = ({ visible, top = 0, right = 0 }) => {
  return (
    visible && <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#1890ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top,
        right,
        zIndex: 1000,
      }}
    >
      <View
        style={{
          width: 0,
          height: 0,
          borderTopWidth: 4,
          borderBottomWidth: 4,
          borderLeftWidth: 4.8,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'white',
          marginLeft: 2,
        }}
      />
    </View>
  );
};

export default WatchIcon; 