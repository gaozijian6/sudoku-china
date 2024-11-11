import React from 'react';
import {StyleSheet, Image, Pressable, Modal} from 'react-native';

interface PauseOverlayProps {
  tooglePause: () => void;
  visible: boolean;
}

const PauseOverlay: React.FC<PauseOverlayProps> = ({tooglePause, visible}) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <Pressable style={styles.overlay} onPressIn={tooglePause}>
        <Image
          source={require('../assets/icon/pause2.png')}
          style={styles.pauseIcon}
        />
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseIcon: {
    width: 50,
    height: 50,
  },
});

export default PauseOverlay;
