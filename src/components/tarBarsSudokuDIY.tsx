import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Alert,
  NativeModules,
  Text,
  Modal,
} from 'react-native';
import { useSudokuStore } from '../store';
import TarBars from './tarBars';
import { SudokuType } from '../constans';
import i18n from '../i18n';
import DropDownPicker from 'react-native-dropdown-picker';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';

const model = DeviceInfo.getModel();

const isIpad = model.includes('iPad');

const { CloudKitManager } = NativeModules;

const { t } = i18n;

interface TarBarsSudokuProps {
  onBack: () => void;
  saveDataDIY: () => void;
  resetSudoku: () => void;
  handleLock: () => void;
  handleUnlock: () => void;
  isLocked: boolean;
}

function TarBarsSudoku({ onBack, saveDataDIY, resetSudoku, handleLock, handleUnlock, isLocked }: TarBarsSudokuProps) {
  const navigation = useNavigation();
  const setIsHome = useSudokuStore(state => state.setIsHome);
  const setIsDIY = useSudokuStore(state => state.setIsDIY);
  const myBoards = useSudokuStore(state => state.myBoards);
  const setMyBoards = useSudokuStore(state => state.setMyBoards);
  const setSudokuType = useSudokuStore(state => state.setSudokuType);
  const sudokuType = useSudokuStore(state => state.sudokuType);
  const currentName = useSudokuStore(state => state.currentName);
  const isConnected = useSudokuStore(state => state.isConnected);
  const localsudokuDataDIY1 = useSudokuStore(state => state.localsudokuDataDIY1);
  const localsudokuDataDIY2 = useSudokuStore(state => state.localsudokuDataDIY2);
  const scaleValue2 = useSudokuStore(state => state.scaleValue2);
  const setScaleValue2 = useSudokuStore(state => state.setScaleValue2);
  const setIsEnlarge = useSudokuStore(state => state.setIsEnlarge);
  const isHint = useSudokuStore(state => state.isHint);
  const isSetting = useSudokuStore(state => state.isSetting);
  const isDark = useSudokuStore(state => state.isDark);

  const styles = createStyles(isDark);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(scaleValue2);
  const lastValue = useRef(scaleValue2);
  const [items, setItems] = useState([
    { label: '1.0x', value: 1.0 },
    { label: '1.5x', value: 1.5 },
    { label: '2.0x', value: 2.0 },
  ]);

  const handleScaleChange = useCallback(
    (value: number | null) => {
      if (value === null) return;

      setScaleValue2(value);

      if (value === 1.0) {
        setIsEnlarge(false);
      } else {
        setIsEnlarge(true);
        lastValue.current = value;
      }
    },
    [setScaleValue2, setIsEnlarge]
  );

  useEffect(() => {
    if (isHint) {
      lastValue.current = scaleValue2;
      handleScaleChange(1);
    } else {
      handleScaleChange(lastValue.current);
    }
  }, [isHint]);

  useEffect(() => {
    if (sudokuType !== SudokuType.DIY1 || isSetting) {
      lastValue.current = value;
      handleScaleChange(1);
    } else {
      handleScaleChange(lastValue.current);
    }
  }, [sudokuType, isSetting]);

  const backToHome = useCallback(() => {
    if (sudokuType === SudokuType.DIY2 && !isConnected) {
      Alert.alert('⚠️', t('noNetwork'), [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('confirm'),
          style: 'default',
          onPress: () => {
            saveDataDIY();
            setIsHome(true);
            setIsDIY(false);
            onBack();
            if (sudokuType === SudokuType.DIY2) {
              setSudokuType(SudokuType.MY_BOARDS);
            } else if (sudokuType === SudokuType.DIY1) {
              setSudokuType(SudokuType.HOME);
            }
          },
        },
      ]);
      return;
    }
    saveDataDIY();
    setIsHome(true);
    setIsDIY(false);
    onBack();
    if (sudokuType === SudokuType.DIY2) {
      setSudokuType(SudokuType.MY_BOARDS);
    } else if (sudokuType === SudokuType.DIY1) {
      setSudokuType(SudokuType.HOME);
    }
  }, [sudokuType, isConnected, saveDataDIY, setIsHome, setIsDIY, onBack, setSudokuType]);

  const saveData = useCallback(async () => {
    if (!isConnected) {
      Alert.alert('⚠️', t('pleaseConnectNetwork'));
      return;
    }
    const board = localsudokuDataDIY2?.board;
    let puzzle = '';
    board?.forEach(row => {
      row.forEach(cell => {
        puzzle += cell.value ? cell.value : '0';
      });
    });

    let isLoading = false;

    const showPrompt = () => {
      Alert.prompt(
        t('saveToMyBoards'),
        t('pleaseNameYourSudoku'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
            onPress: () => {
              isLoading = false;
            },
          },
          {
            text: t('confirm'),
            style: 'default',
            onPress: async (name?: string) => {
              if (isLoading) return;
              isLoading = true;

              const data = {
                name: name?.trim(),
                puzzle,
                sudokuDataDIY2: localsudokuDataDIY2,
                sudokuDataDIY1: localsudokuDataDIY1,
              };

              try {
                const res = await CloudKitManager.saveData(JSON.stringify(data));
                const newMyBoards = [...myBoards];
                newMyBoards.unshift({ id: res.id, data });
                setMyBoards(newMyBoards);
                Alert.alert(t('success'), t('sudokuSavedToMyBoards'));
              } catch (error) {
                Alert.alert(t('error'), t('saveFailedPleaseTryAgainLater'));
              } finally {
                isLoading = false;
              }
            },
          },
        ],
        'plain-text',
        ''
      );
    };

    showPrompt();
  }, [isConnected, localsudokuDataDIY1, localsudokuDataDIY2, myBoards, setMyBoards]);

  return (
    <>
      <TarBars />
      <View style={[styles.container]}>
        <Pressable style={[styles.leftSection]} onPressIn={backToHome}>
          <Image source={require('../assets/icon/back.png')} style={styles.backIcon} />
        </Pressable>
        <View style={styles.centerSection}>
          {sudokuType === SudokuType.DIY2 && (
            <Text style={styles.sudoku} numberOfLines={1} ellipsizeMode="tail">
              {currentName}
            </Text>
          )}
        </View>
        <View style={styles.rightSection}>
          {sudokuType === SudokuType.DIY1 && !isIpad && (
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
          {sudokuType === SudokuType.DIY2 && (
            !isLocked ? (
              <Pressable style={styles.saveIconContainer} onPressIn={handleLock}>
                <Image source={require('../assets/icon/unlock.png')} style={styles.saveIcon} />
              </Pressable>
            ) : (
              <Pressable style={styles.saveIconContainer} onPressIn={handleUnlock}>
                <Image source={require('../assets/icon/lock.png')} style={styles.saveIcon} />
              </Pressable>
            )
          )}
          <Pressable style={styles.resetIconContainer} onPressIn={resetSudoku}>
            <Image source={require('../assets/icon/refresh.png')} style={styles.resetIcon} />
          </Pressable>
          {sudokuType === SudokuType.DIY1 && (
            <Pressable style={styles.saveIconContainer} onPressIn={saveData}>
              <Image source={require('../assets/icon/save2.png')} style={styles.saveIcon} />
            </Pressable>
          )}
          <Pressable
            onPressIn={() => {
              navigation.navigate('Setting');
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

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      zIndex: 1000,
      width: '101%',
    },
    sudoku: {
      color: isDark ? '#777' : 'white',
      fontSize: 20,
      fontWeight: 'bold',
      width: 200,
      textAlign: 'center',
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
      position: 'absolute',
      right: 0,
      zIndex: 1000,
    },
    resetIconContainer: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
    },
    saveIconContainer: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
    },
    settingIconContainer: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      width: 40,
    },
    resetIcon: {
      width: 30,
      height: 30,
      tintColor: isDark ? '#666' : '#fff',
    },
    saveIcon: {
      width: 28,
      height: 28,
      tintColor: isDark ? '#666' : '#fff',
    },
    backIcon: {
      width: 22,
      height: 22,
      marginRight: 10,
      tintColor: isDark ? '#666' : '#fff',
    },
    settingIcon: {
      width: 26,
      height: 26,
      marginRight: 10,
      tintColor: isDark ? '#666' : '#fff',
    },
    dropdownContainer: {
      width: 90,
      marginRight: 10,
      zIndex: 3000,
      elevation: 3,
    },
    dropdown: {
      backgroundColor: isDark ? 'rgba(124, 124, 124, 0.2)' : 'rgba(255, 255, 255, 0.2)',
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
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'white',
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
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
      color: isDark ? '#666' : '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    dropdownItemLabel: {
      color: isDark ? '#666' : '#333',
      fontSize: 14,
    },
    placeholderStyle: {
      color: isDark ? '#666' : '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

export default TarBarsSudoku;
