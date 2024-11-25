import React from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';
import {useSudokuStore} from '../store';

const PauseOverlay: React.FC = () => {
  const {setPauseVisible, pauseVisible} = useSudokuStore();
  return (
      <Pressable
        style={styles.overlay}
        onPressIn={() => setPauseVisible(!pauseVisible)}>
        <Image
          source={require('../assets/icon/pause2.png')}
          style={styles.pauseIcon}
        />
      </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  pauseIcon: {
    width: 50,
    height: 50,
  },
});

export default PauseOverlay;
