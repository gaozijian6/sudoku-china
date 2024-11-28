import {Dimensions, StatusBar, StyleSheet} from 'react-native';

const sudokuStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute' as const,
    top: StatusBar.currentHeight || 0,
    left: 0,
    backgroundColor: 'white',
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.95,
    marginBottom: 20,
    alignSelf: 'center',
    height: 40,
    position: 'relative',
    top: 25,
  },
  leftText: {
    width: 100,
    alignItems: 'center', // 添加垂直居中
    textAlign: 'center', // 添加文字居中
  },
  middleText: {
    width: 100,
    alignItems: 'center', // 添加垂直居中
    textAlign: 'center', // 添加文字居中
  },
  rightText: {
    width: 100,
    alignItems: 'center', // 添加垂直居中
    textAlign: 'center', // 添加文字居中
  },
  sudokuGrid: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').width * 0.95,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  gameInfoText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'rgb(59, 61, 99)',
  },
  sudokuCell: {
    width: '11.11%',
    height: '11.11%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'rgb(204,223,253)',
  },
  sudokuCellRightBorder: {
    borderRightWidth: 2,
    borderRightColor: '#000000',
  },
  sudokuCellBottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  sudokuCellLeftBorder: {
    borderLeftWidth: 2,
    borderLeftColor: '#000000',
  },
  sudokuCellTopBorder: {
    borderTopWidth: 2,
    borderTopColor: '#000000',
  },
  sudokuCellTopNoBorder: {
    borderTopWidth: 0,
  },
  sudokuCellRightNoBorder: {
    borderRightWidth: 0,
  },
  sudokuCellBottomNoBorder: {
    borderBottomWidth: 0,
  },
  sudokuCellLeftNoBorder: {
    borderLeftWidth: 0,
  },
  emptySudokuCell: {
    // 注意：React Native 不支持 :hover，需要通过 onPressIn 和 onPressOut 来模拟
  },
  cellValue: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  candidatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  candidateCell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  candidateCellText: {
    fontSize: 8,
  },
  givenNumber: {
    color: '#000',
  },
  userNumber: {
    color: 'rgb(80,101,182)',
  },
  errorCell: {
    backgroundColor: '#ffccc7',
    borderColor: '#ffccc7',
  },
  draftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  draftCell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  draftCellText: {
    fontSize: 8,
    width: '33.33%',
    height: '33.33%',
    textAlign: 'center',
    position: 'absolute',
  },
  selectedCell: {
    borderWidth: 2,
    backgroundColor: 'rgb(204,223,253)',
  },
  selectedNumberButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(78,106,176)',
  },
  selectedNumber:{
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
  },
  selectedNumberText: {
    color: '#fff',
  },
  // 候选数高亮
  candidateNumber: {
    backgroundColor: '#9bf9ab',
  },
  positionHighlight: {
    backgroundColor: '#fe9e9e',
  },
  promptHighlight: {
    backgroundColor: '#9dc3ff',
  },
  // positionAndPromptHighlight: {
  //   backgroundColor: '#f3f37f',
  // },
  selectMode: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  controlButtons: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    position: 'relative',
    top: -25,
  },
  buttonContainer: {
    alignItems: 'center',
    width: 50
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d9d9d9',
  },
  buttonText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666666',
  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
  numberButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    position: 'relative',
    top: -25,
  },
  numberButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 60,
    margin: 2,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 5,
    fontSize: 30,
    paddingBottom: 6,
    paddingTop: 4,
  },
  numberButtonDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#d9d9d9',
    opacity: 0,
  },
  selectedNumberButtonDisabled: {
    color: 'rgba(0, 0, 0, 0.25)',
  },
  remainingCount: {
    fontSize: 12,
    marginTop: 2,
    color: 'rgb(125,123,134)',
  },
  remainingCountDisabled: {
    color: 'rgba(0, 0, 0, 0.25)',
  },
  solveButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  visualHint2: {
    backgroundColor: '#9bf9ab',
  },
  rowHighlight: {
    backgroundColor: '#ffd700',
  },
  columnHighlight: {
    backgroundColor: '#ffd700',
  },
  boxHighlight: {
    backgroundColor: '#ffd700',
  },
  candidateHighlightDelete: {
    backgroundColor: 'rgb(206, 71,100)',
    borderRadius: 8,
  },
  candidateHighlightDeleteText: {
    color: '#ffffff',
  },
  candidateHighlightHint: {
    backgroundColor: 'rgb(77,104,182)',
    borderRadius: 8,
    opacity: 1,
  },
  candidateHighlightHintText: {
    color: '#ffffff',
    opacity: 1,
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  drawerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
    height: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 24,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  drawerHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  drawerText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  drawerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  drawerButton: {
    width: 100,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerButtonApply: {
    backgroundColor: 'rgb(91,139,241)',
  },
  drawerButtonCancel: {
    backgroundColor: 'rgb(239,239,249)',
  },
  drawerButtonTextApply: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  drawerButtonTextCancel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  closeIconButton: {
    position: 'absolute',
    right: 0,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  draftModeSwitch: {
    position: 'absolute',
    right: -20,
    top: -10,
    zIndex: 1,
  },
  draftModeSwitchStyle: {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
  },
  gameInfoError: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 30,
    justifyContent: 'space-between',
  },
  errorIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
  gameInfoTextError: {
    fontSize: 16,
    color: 'rgb(59, 61, 99)',
  },
  gameInfoDIY: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    display: 'flex',
    width: Dimensions.get('window').width * 0.95,
  },
  gameInfoTextDIY: {
    fontSize: 16,
    color: 'rgb(59, 61, 99)',
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  gameInfoIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  selectionModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  selectionModeText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default sudokuStyles;
