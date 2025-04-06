import React, { useCallback, useEffect, useState, memo, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  NativeModules,
  TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSudokuStore, Board } from '../store';
import { SudokuType } from '../constans';
import { playSound } from '../tools/Sound';
import DeviceInfo from 'react-native-device-info';
import TarBars from '../components/tarBars';
import { useNavigation } from '@react-navigation/native';

const model = DeviceInfo.getModel();
const isIpad = model.includes('iPad');

const { CloudKitManager } = NativeModules;

const MiniSudokuBoard = memo(({ puzzle, styles }: { puzzle: string; styles: any }) => {
  return (
    <View style={styles.miniBoard}>
      {Array(9)
        .fill(null)
        .map((_, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.miniBoardRow}>
            {Array(9)
              .fill(null)
              .map((_, colIndex) => {
                const index = rowIndex * 9 + colIndex;
                const number = puzzle?.[index] || '0';
                return (
                  <View
                    key={`cell-${rowIndex}-${colIndex}`}
                    style={[
                      styles.miniBoardCell,
                      colIndex % 3 !== 2 && colIndex !== 8 && styles.miniBoardRightNormal,
                      rowIndex % 3 !== 2 && rowIndex !== 8 && styles.miniBoardBottomNormal,
                      (colIndex + 1) % 3 === 0 && colIndex !== 8 && styles.miniBoardRightBorder,
                      (rowIndex + 1) % 3 === 0 && rowIndex !== 8 && styles.miniBoardBottomBorder,
                      rowIndex === 0 && colIndex === 0 && styles.topLeftRadius,
                      rowIndex === 0 && colIndex === 8 && styles.topRightRadius,
                      rowIndex === 8 && colIndex === 0 && styles.bottomLeftRadius,
                      rowIndex === 8 && colIndex === 8 && styles.bottomRightRadius,
                    ]}
                  >
                    {number !== '0' && <Text style={styles.miniCellText}>{number}</Text>}
                  </View>
                );
              })}
          </View>
        ))}
    </View>
  );
});

const MyBoards = memo(() => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const myBoards = useSudokuStore(state => state.myBoards);
  const setMyBoards = useSudokuStore(state => state.setMyBoards);
  const setIsDIY = useSudokuStore(state => state.setIsDIY);
  const isConnected = useSudokuStore(state => state.isConnected);
  const setSudokuType = useSudokuStore(state => state.setSudokuType);
  const setSudokuDataDIY1 = useSudokuStore(state => state.setSudokuDataDIY1);
  const setSudokuDataDIY2 = useSudokuStore(state => state.setSudokuDataDIY2);
  const setCurrentIndex = useSudokuStore(state => state.setCurrentIndex);
  const setCurrentName = useSudokuStore(state => state.setCurrentName);
  const isSound = useSudokuStore(state => state.isSound);
  const initSudokuDataDIY1 = useSudokuStore(state => state.initSudokuDataDIY1);
  const initSudokuDataDIY2 = useSudokuStore(state => state.initSudokuDataDIY2);
  const isDark = useSudokuStore(state => state.isDark);
  const styles = createStyles(isDark);
  const [isEditing, setIsEditing] = useState(false);
  const deletedBoardsRef = useRef<Board[]>([]);
  const myBoardsCopy = useRef<Board[]>([]);
  const insets = useSafeAreaInsets();
  const [editingNameIndex, setEditingNameIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const isCreating = useRef(false);
  const isDeleting = useRef(false);

  const handleCreateNew = useCallback(() => {
    if (isCreating.current || isEditing || isDeleting.current) return;
    isCreating.current = true;
    // 先创建一个临时ID
    const tempId = `temp-${Date.now()}`;
    // 立即更新UI
    const newBoard = {
      id: tempId,
      data: { sudokuDataDIY1: initSudokuDataDIY1, sudokuDataDIY2: initSudokuDataDIY2 },
    };
    const newBoards = [...myBoards];
    newBoards.unshift(newBoard);
    setMyBoards(newBoards);

    // 在后台进行CloudKit操作
    CloudKitManager.saveData(JSON.stringify(newBoard.data))
      .then(result => {
        newBoards[0].id = result.id;
        setMyBoards(newBoards);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        isCreating.current = false;
      });
  }, [initSudokuDataDIY1, initSudokuDataDIY2, myBoards, setMyBoards, isEditing]);

  const handleDeleteBoard = useCallback(
    (index: number) => {
      const newBoards = myBoards.filter((_, i) => i !== index);
      deletedBoardsRef.current?.push(myBoards[index]);
      setMyBoards(newBoards);
    },
    [myBoards, setMyBoards]
  );

  const handleSelectBoard = useCallback(
    (index: number) => {
      if (isEditing) return;
      navigation.navigate('SudokuDIY');
      setIsDIY(true);
      setSudokuType(SudokuType.DIY2);
      playSound('switch', isSound);
      setCurrentIndex(index);
      setCurrentName(myBoards[index].data?.name || t('untitled'));
      setSudokuDataDIY1(myBoards[index].data?.sudokuDataDIY1);
      setSudokuDataDIY2(myBoards[index].data?.sudokuDataDIY2);
    },
    [
      isEditing,
      setIsDIY,
      setSudokuType,
      isSound,
      setSudokuDataDIY1,
      myBoards,
      setSudokuDataDIY2,
      setCurrentIndex,
      setCurrentName,
      t,
      navigation,
    ]
  );

  const handleNamePress = useCallback(
    (index: number, currentName: string) => {
      if (isEditing) return;
      setEditingNameIndex(index);
      setEditingName(currentName || '');
    },
    [isEditing]
  );

  const handleNameSubmit = useCallback(
    (index: number) => {
      const { id, data = {} } = myBoards[index];
      data.name = editingName.trim();
      const newBoards = [...myBoards];
      newBoards[index] = { id, data };
      setMyBoards(newBoards);

      // 保存到 CloudKit
      CloudKitManager.updateData(id, JSON.stringify(data))
        .then(result => {
          console.log('Name updated successfully');
        })
        .catch(error => {
          console.log('Error updating name:', error);
        });
      setEditingNameIndex(null);
    },
    [myBoards, editingName, setMyBoards]
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      if (index === 0) {
        return (
          <Pressable style={styles.createButton} onPress={handleCreateNew}>
            <Text style={styles.plusIcon}>+</Text>
          </Pressable>
        );
      }

      const boardIndex = index - 1;
      const isEditingThisName = editingNameIndex === boardIndex;

      return (
        <View style={styles.boardWrapper}>
          <Pressable style={styles.boardButton} onPress={() => handleSelectBoard(boardIndex)}>
            <MiniSudokuBoard puzzle={item.data?.puzzle || ''} styles={styles} />
          </Pressable>
          {isEditingThisName ? (
            <TextInput
              style={styles.nameInput}
              value={editingName}
              onChangeText={setEditingName}
              onBlur={() => handleNameSubmit(boardIndex)}
              autoFocus
              selectTextOnFocus
              onSubmitEditing={() => handleNameSubmit(boardIndex)}
            />
          ) : (
            <Pressable
              style={styles.boardNameWrapper}
              onPress={() => handleNamePress(boardIndex, item.data?.name || '')}
            >
              <Text style={styles.boardName} numberOfLines={1} ellipsizeMode="tail">
                {item.data?.name || t('untitled')}
              </Text>
            </Pressable>
          )}
          {isEditing && (
            <Pressable style={styles.deleteButton} onPress={() => handleDeleteBoard(boardIndex)}>
              <Text style={styles.deleteText}>×</Text>
            </Pressable>
          )}
        </View>
      );
    },
    [
      editingNameIndex,
      editingName,
      t,
      isEditing,
      handleCreateNew,
      handleSelectBoard,
      handleNameSubmit,
      handleNamePress,
      handleDeleteBoard,
      styles,
    ]
  );

  const handleDelete = useCallback(() => {
    myBoardsCopy.current = myBoards;
    setIsEditing(true);
  }, [myBoards]);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    if (deletedBoardsRef.current?.length) {
      isDeleting.current = true;
      const recordIds = deletedBoardsRef.current.map(board => board.id);
      CloudKitManager.deleteData(recordIds)
        .then(result => {
          deletedBoardsRef.current = [];
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          isDeleting.current = false;
        });
    }
  }, [setIsEditing]);

  const handleCancel = useCallback(() => {
    deletedBoardsRef.current = [];
    setMyBoards(myBoardsCopy.current);
    setIsEditing(false);
  }, [setMyBoards]);

  useEffect(() => {
    CloudKitManager.fetchData('myBoards')
      .then(result => {
        const parsedResult = result.map(item => ({
          ...item,
          data: item.data ? JSON.parse(item.data) : null,
        }));
        setMyBoards(parsedResult);
        myBoardsCopy.current = parsedResult;
        setStatus('success');
      })
      .catch(error => {
        console.log('加载题库失败', error);
        setStatus('error');
      });
  }, []);

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (isConnected) {
      setStatus('loading');
      CloudKitManager.fetchData('myBoards')
        .then(result => {
          const parsedResult = result.map(item => ({
            ...item,
            data: item.data ? JSON.parse(item.data) : null,
          }));
          setMyBoards(parsedResult);
          myBoardsCopy.current = parsedResult;
          setStatus('success');
        })
        .catch(error => {
          console.log('加载题库失败');
          setStatus('error');
        });
    }
  }, [isConnected, setMyBoards]);

  return (
    <>
      <TarBars />
      <View
        style={[
          styles.container,
          {
            top: insets.top,
          },
        ]}
      >
        <View style={[styles.title1, { position: 'absolute', top: 0, left: 0 }]}>
          <View style={styles.leftSection} />
          <View style={styles.centerSection}>
            <Text style={styles.sudoku}>{t('myBoards')}</Text>
          </View>
          <View style={styles.rightSection}>
            {!isEditing ? (
              <Pressable style={styles.iconContainer} onPressIn={handleDelete}>
                <Image source={require('../assets/icon/delete.png')} style={styles.icon} />
              </Pressable>
            ) : (
              <>
                <Pressable style={styles.iconContainer} onPressIn={handleCancel}>
                  <Image source={require('../assets/icon/cancel.png')} style={styles.icon} />
                </Pressable>
                <Pressable style={styles.iconContainer} onPressIn={handleSave}>
                  <Image source={require('../assets/icon/save.png')} style={styles.icon} />
                </Pressable>
              </>
            )}
            <Pressable
              style={[styles.iconContainer, { marginRight: 10 }]}
              onPressIn={() => {
                navigation.navigate('Setting');
              }}
              hitSlop={{ right: 20 }}
            >
              <Image source={require('../assets/icon/setting.png')} style={styles.icon} />
            </Pressable>
          </View>
        </View>
        {status === 'loading' ? (
          <View>
            <Text>{t('loading')}</Text>
          </View>
        ) : !isConnected ? (
          <View>
            <Text>{t('pleaseCheckNetwork')}</Text>
          </View>
        ) : status === 'error' ? (
          <View>
            <Text>{t('pleaseCheckiCloud')}</Text>
          </View>
        ) : (
          <FlatList
            key={`grid-${isIpad ? 6 : 4}`}
            data={[null, ...myBoards]}
            renderItem={renderItem}
            numColumns={isIpad ? 6 : 4}
            contentContainerStyle={styles.boardsContainer}
            columnWrapperStyle={styles.columnWrapper}
            keyExtractor={(_, index) => `board-${index}`}
            windowSize={3}
            removeClippedSubviews={true}
          />
        )}
      </View>
    </>
  );
});

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? 'rgb(22,23,25)' : 'rgb(246,247,251)',
      alignItems: 'center',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      paddingBottom: 60,
      zIndex: 2,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    editButton: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 15,
      backgroundColor: '#f0f0f0',
    },
    editText: {
      color: '#666',
      fontSize: 16,
    },
    scrollView: {
      flex: 1,
    },
    ScrollContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    boardsContainer: {
      paddingTop: 10,
      width: '100%',
      flexGrow: 1,
      position: 'relative',
      top: 40,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    columnWrapper: {
      width: '100%',
      gap: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 10,
      flexWrap: 'wrap',
    },
    boardWrapper: {
      width: isIpad ? '15%' : '22%',
      aspectRatio: 1,
      position: 'relative',
      alignItems: 'center',
      marginBottom: 20,
    },
    boardButton: {
      width: '100%',
      aspectRatio: 1,
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#666',
    },
    createButton: {
      width: isIpad ? '15%' : '22%',
      aspectRatio: 1,
      backgroundColor: isDark ? '#666' : '#f0f0f0',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    plusIcon: {
      fontSize: 40,
      color: isDark ? '#888' : '#666',
    },
    deleteButton: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: isDark ? 'rgb(111, 30, 30)' : '#ff4444',
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    deleteText: {
      color: isDark ? '#666' : '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    miniBoard: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: isDark ? 'rgb( 32, 31, 33)' : 'white',
    },
    miniBoardRow: {
      flex: 1,
      flexDirection: 'row',
    },
    miniBoardCell: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    miniBoardRightNormal: {
      borderRightWidth: 0.5,
      borderRightColor: isDark ? '#666' : '#ccc',
    },
    miniBoardBottomNormal: {
      borderBottomWidth: 0.5,
      borderBottomColor: isDark ? '#666' : '#ccc',
    },
    miniBoardRightBorder: {
      borderRightWidth: 1,
      borderRightColor: isDark ? '#666' : '#666',
    },
    miniBoardBottomBorder: {
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#666' : '#666',
    },
    topLeftRadius: {
      borderTopLeftRadius: 10,
    },
    topRightRadius: {
      borderTopRightRadius: 10,
    },
    bottomLeftRadius: {
      borderBottomLeftRadius: 10,
    },
    bottomRightRadius: {
      borderBottomRightRadius: 10,
    },
    title1: {
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
      flexDirection: 'row',
      height: 40,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1,
    },
    leftSection: {
      flex: 1,
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
    },
    sudoku: {
      color: isDark ? '#666' : '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      width: 180,
      textAlign: 'center',
    },
    iconContainer: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      marginRight: 5,
    },
    icon: {
      width: 26,
      height: 26,
      tintColor: isDark ? '#666' : '#fff',
    },
    boardName: {
      marginTop: 4,
      fontSize: 12,
      color: isDark ? '#666' : 'black',
      textAlign: 'center',
      width: '100%',
      height: 20,
      overflow: 'hidden',
    },
    nameInput: {
      marginTop: 4,
      fontSize: 12,
      color: isDark ? '#666' : 'black',
      textAlign: 'center',
      width: '100%',
      padding: 2,
      borderWidth: 1,
      borderColor: 'rgb(91,139,241)',
      borderRadius: 4,
      backgroundColor: 'white',
    },
    miniCellText: {
      fontSize: 8,
      textAlign: 'center',
      color: isDark ? '#888' : '#333',
      lineHeight: 9,
    },
    boardNameWrapper: {
      width: '100%',
      height: '100%',
    },
  });

export default MyBoards;
