import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import Level from './Level';
import {playSound} from '../tools/Sound';
import {useSudokuStore} from '../store';


interface HomeProps {
  openSudoku: () => void;
  openSetting: () => void;
}

const Home: React.FC<HomeProps> = ({
  openSudoku,
  openSetting,
}) => {
  const {setIsContinue, setDifficulty, setIsHome, isSound} = useSudokuStore();
  const [showLevel, setShowLevel] = useState(false);
  const handleLevelSelect = (level: string) => {
    openSudoku();
    setDifficulty(level);
    setIsHome(false);
    setShowLevel(false);
  };

  const handleStart = () => {
    playSound('switch', isSound);
    setShowLevel(true);
  };

  const handleContinue = () => {
    playSound('switch', isSound);
    setIsContinue(true);
    openSudoku();
    setIsHome(false);
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.tarbar}>
        <Pressable onPressIn={openSetting}>
          <Image
            source={require('../assets/icon/setting.png')}
            style={styles.logo}
          />
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.startButton}
          onPressIn={handleStart}>
          <Text style={styles.startButtonText}>开始</Text>
          <Text style={styles.arrowIcon}>❯</Text>
        </Pressable>
        <Pressable style={styles.continueButton} onPressIn={handleContinue}>
          <Text style={styles.continueButtonText}>继续</Text>
          <Text style={styles.arrowIcon}>❯</Text>
        </Pressable>
        <Pressable style={styles.customButton}>
          <Text style={styles.customButtonText}>自定义</Text>
          <Text style={styles.arrowIcon}>❯</Text>
        </Pressable>
      </View>
      {showLevel && (
        <Level
          onClose={() => setShowLevel(false)}
          visible={showLevel}
          onLevelSelect={handleLevelSelect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(246,247,251)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    top: StatusBar.currentHeight || 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  tarbar: {
    backgroundColor: 'rgb(91,139,241)',
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 15,
  },
  logo: {
    position: 'absolute',
    right: 15,
    top: 12,
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 100,
  },
  buttonContainer: {
    width: '80%' as const,
    gap: 20,
    alignItems: 'center' as const,
    position: 'relative' as const,
    top: -50,
  },
  startButton: {
    backgroundColor: '#6495ED',
    borderRadius: 25,
    padding: 15,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '60%' as const,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '60%' as const,
  },
  continueButtonText: {
    color: '#666666',
    fontSize: 18,
    marginRight: 10,
  },
  customButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '60%',
  },
  customButtonText: {
    color: '#666666',
    fontSize: 18,
    marginRight: 10,
  },
  arrowIcon: {
    position: 'relative' as const,
    top: -2,
    fontSize: 18,
    color: '#666666',
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
