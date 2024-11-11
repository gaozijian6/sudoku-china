import React, {useState} from 'react';
import {View, Text, Pressable, StatusBar} from 'react-native';
import Level from './Level';
import TarBarsHome from '../components/tarBarsHome';

interface HomeProps {
  setIsHome: (value: boolean) => void;
  setDifficulty: (value: string) => void;
  openSudoku: () => void;
}

const Home: React.FC<HomeProps> = ({setIsHome, setDifficulty, openSudoku}) => {
  const [showLevel, setShowLevel] = useState(false);
  const handleLevelSelect = (level: string) => {
    openSudoku();
    setDifficulty(level);
    setIsHome(false);
    setShowLevel(false);
  };

  return (
    <View 
      style={[
        styles.container,
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }
      ]}
    >
      <TarBarsHome />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.startButton} onPress={() => setShowLevel(true)}>
          <Text style={styles.startButtonText}>开始</Text>
          <Text style={styles.arrowIcon}>❯</Text>
        </Pressable>
        <Pressable style={styles.continueButton}>
          <Text style={styles.continueButtonText}>继续</Text>
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(246,247,251)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    position: 'absolute' as const,
    top: StatusBar.currentHeight || 0,
    left: 0,
    width: '100%',
    height: '100%',
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
    width: '60%',
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
    width: '60%',
  },
  continueButtonText: {
    color: '#666666',
    fontSize: 18,
    marginRight: 10,
  },
  arrowIcon: {
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
};

export default Home;
