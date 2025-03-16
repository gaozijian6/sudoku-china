import React, { useCallback, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useSudokuStore } from '../store';
import TarBars from './tarBars';
import DropDownPicker from 'react-native-dropdown-picker';
import DeviceInfo from 'react-native-device-info';

const model = DeviceInfo.getModel();

const isIpad = model.includes('iPad');

interface TarBarsSudokuProps {
  onBack: () => void;
  openSetting: () => void;
  saveData: () => void;
}

function TarBarsSudoku({ onBack, openSetting, saveData }: TarBarsSudokuProps) {
  const {
    setIsHome,
    setIsSudoku,
    setIsContinue,
    setIsLevel,
    setIsEnlarge,
    scaleValue1,
    setScaleValue1,
    isHint,
    isContinue,
    isSudoku,
    isSetting,
  } = useSudokuStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(scaleValue1);
  const lastValue = useRef(scaleValue1);
  const [items, setItems] = useState([
    { label: '1.0x', value: 1.0 },
    { label: '1.5x', value: 1.5 },
    { label: '2.0x', value: 2.0 },
  ]);

  const handleScaleChange = useCallback(
    (value: number | null) => {
      if (value === null) return;

      setScaleValue1(value);
      console.log('value', value);

      if (value === 1.0) {
        setIsEnlarge(false);
      } else {
        setIsEnlarge(true);
        lastValue.current = value;
      }
    },
    [setScaleValue1, setIsEnlarge]
  );

  const backToHome = useCallback(async () => {
    await saveData();
    onBack();
    setTimeout(() => {
      setIsHome(true);
      setIsSudoku(false);
      setIsContinue(false);
      setIsLevel(false);
    }, 0);
  }, [onBack, setIsLevel, saveData, setIsHome, setIsSudoku, setIsContinue]);

  useEffect(() => {
    if (isHint) {
      lastValue.current = scaleValue1;
      handleScaleChange(1);
    } else {
      handleScaleChange(lastValue.current);
    }
  }, [isHint]);

  useEffect(() => {
    if ((!isSudoku && !isContinue) || isSetting) {
      lastValue.current = value;
      handleScaleChange(1);
    } else {
      setValue(lastValue.current);
      handleScaleChange(lastValue.current);
    }
  }, [isSudoku, isContinue, isSetting]);

  return (
    <>
      <TarBars />
      <View style={[styles.container]}>
        <Pressable
          style={[styles.leftSection]}
          onPressIn={() => {
            backToHome();
          }}
        >
          <Image source={require('../assets/icon/back.png')} style={styles.backIcon} />
        </Pressable>
        <View style={styles.centerSection}></View>
        <View style={styles.rightSection}>
          {!isIpad && (
            <View style={styles.dropdownContainer}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={handleScaleChange}
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.dropdownMenu}
                labelStyle={styles.dropdownLabel}
                listItemLabelStyle={styles.dropdownItemLabel}
                zIndex={3000}
                zIndexInverse={1000}
                placeholder="缩放"
                placeholderStyle={styles.placeholderStyle}
                maxHeight={120}
                listMode="SCROLLVIEW"
              />
            </View>
          )}
          <Pressable
            onPressIn={() => {
              openSetting();
            }}
            style={styles.settingIconContainer}
            hitSlop={{ right: 20 }}
          >
            <Image source={require('../assets/icon/setting.png')} style={styles.settingIcon} />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(91,139,241)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    position: 'relative',
    width: '100%',
    zIndex: 1000,
  },
  sudoku: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sudokuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    position: 'absolute',
    left: 0,
    height: '100%',
    zIndex: 100,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    paddingRight: 5,
    position: 'absolute',
    right: 0,
    zIndex: 1000,
  },
  settingIconContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 40,
  },
  pauseIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  backIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  settingIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  dropdownContainer: {
    width: 90,
    marginRight: 10,
    zIndex: 3000,
    elevation: 3,
  },
  dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 0,
    minHeight: 30,
    height: 30,
  },
  dropdownText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    position: 'absolute',
    top: 30,
    zIndex: 9999,
    paddingVertical: 5,
  },
  dropdownLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdownItemLabel: {
    color: '#333',
    fontSize: 14,
  },
  placeholderStyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TarBarsSudoku;
