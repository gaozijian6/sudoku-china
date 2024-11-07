import Sudoku from './src/views/sudoku';
import {
  StatusBar,
  SafeAreaView,
} from 'react-native';
import TarBars from './src/components/tarBars';
import React, {useRef, useState} from 'react';

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

export default App;
