import Sudoku from './src/views/sudoku';
import {
  StatusBar,
  SafeAreaView,
  Pressable,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import TarBars from './src/components/tarBars';
import {useRef, useState} from 'react';

function App() {
  const [isHome, setIsHome] = useState(false);
  const isMoving = useRef(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgb(91,139,241)" />
      <TarBars isHome={isHome} />
      <Sudoku />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 200,
    backgroundColor: 'red',
  },
});

export default App;
