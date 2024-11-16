import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Pressable, Animated} from 'react-native';
import {DIFFICULTY} from '../constans';
import {useSudokuStore} from '../store';

interface LevelCardProps {
  level: string;
  onPressIn: () => void;
  style?: any;
}

const LevelCard: React.FC<LevelCardProps> = ({level, onPressIn, style}) => (
  <Pressable onPressIn={onPressIn} style={style}>
    <Text style={styles.cardText}>{level}</Text>
  </Pressable>
);

interface LevelProps {
  onClose: () => void;
  visible: boolean;
  onLevelSelect: (level: string) => void;
}

const Level: React.FC<LevelProps> = ({onClose, visible, onLevelSelect}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showShadow, setShowShadow] = useState(true);
  const {setIsContinue} = useSudokuStore();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleLevelSelect = (level: string) => {
    onLevelSelect(level);
    setIsContinue(false);
  };

  const handleClose = () => {
    setShowShadow(false);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 0.2,
        useNativeDriver: true,
        friction: 12,
        tension: 40,
        velocity: 0.4,
      }),
    ]).start(() => {
      onClose();
      setShowShadow(true);
    });
  };

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      ]}
      onTouchEnd={handleClose}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{scale: scaleAnim}],
          },
        ]}
        onTouchEnd={e => e.stopPropagation()}>
        <View style={styles.header}>
          <Text style={styles.title}>选择难度</Text>
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>×</Text>
          </Pressable>
        </View>
        <LevelCard
          level={DIFFICULTY.EASY}
          onPressIn={() => handleLevelSelect(DIFFICULTY.EASY)}
          style={showShadow ? styles.card : styles.cardNoShadow}
        />
        <LevelCard
          level={DIFFICULTY.MEDIUM}
          onPressIn={() => handleLevelSelect(DIFFICULTY.MEDIUM)}
          style={showShadow ? styles.card : styles.cardNoShadow}
        />
        <LevelCard
          level={DIFFICULTY.HARD}
          onPressIn={() => handleLevelSelect(DIFFICULTY.HARD)}
          style={showShadow ? styles.card : styles.cardNoShadow}
        />
        <LevelCard
          level={DIFFICULTY.EXTREME}
          onPressIn={() => handleLevelSelect(DIFFICULTY.EXTREME)}
          style={showShadow ? styles.card : styles.cardNoShadow}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    marginBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    right: -10,
    top: -10,
    padding: 10,
  },
  closeIcon: {
    fontSize: 24,
    color: '#333',
  },
  cardNoShadow: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
});

export default Level;
