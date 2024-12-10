import {Dimensions, StatusBar, StyleSheet, PixelRatio} from 'react-native';

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
    marginBottom: PixelRatio.get()===3?10:20,
    alignSelf: 'center',
    height: PixelRatio.get()===3?40:80,
    position: 'relative',
    top: PixelRatio.get()===3?15:30,
  },
  gameInfoItem: {
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameInfoItem1: {
    alignItems: 'flex-start',
  },
  gameInfoItem2: {
  },
  gameInfoItem3: {
    alignItems: 'flex-end',
  },
  gameInfoError: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  errorIcon: {
    width: PixelRatio.get()===3?20:40,
    height: PixelRatio.get()===3?20:40,
    marginRight: PixelRatio.get()===3?5:10,
    resizeMode: 'contain',
  },
  gameInfoText: {
    fontSize: PixelRatio.get() === 3 ? 16 : 32,
    color: 'rgb(59, 61, 99)',
    textAlign: 'center',
  },
  gameInfoTextError: {
    fontSize: PixelRatio.get() === 3 ? 16 : 32,
    color: 'rgb(59, 61, 99)',
  },
  leftText: {
    width: PixelRatio.get()===3?100:200,
    alignItems: 'center', // 添加垂直居中
    textAlign: 'center', // 添加文字居中
  },
  middleText: {
    width: PixelRatio.get()===3?100:200,
    alignItems: 'center', // 添加垂直居中
    textAlign: 'center', // 添加文字居中
  },
  rightText: {
    width: PixelRatio.get()===3?100:200,
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
  cellValue: {
    fontSize: PixelRatio.get() === 3 ? 30 : 60,
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
    fontSize: PixelRatio.get() === 3 ? 8 : 16,
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
    fontSize: PixelRatio.get()===3?30:60,
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
    marginTop: PixelRatio.get()===3?20:40,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  controlButtons: {
    marginTop: PixelRatio.get()===3?20:40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    position: 'relative',
    top: -30,
  },
  buttonContainer: {
    alignItems: 'center',
    width: PixelRatio.get() === 3 ? 60 : 120,
    height: PixelRatio.get() === 3 ? 60 : 120,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    marginTop: PixelRatio.get() === 3 ? 4 : 8,
    fontSize: PixelRatio.get() === 3 ? 12 : 24,
    color: '#666666',
    width: PixelRatio.get() === 3 ? 70 : 140,
    textAlign: 'center',
  },
  buttonIcon: {
    width: PixelRatio.get() === 3 ? 32 : 64,
    height: PixelRatio.get() === 3 ? 32 : 64,
  },
  numberButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: PixelRatio.get()===3?10:20,
    position: 'relative',
    top: -25,
  },
  numberButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: PixelRatio.get()===3?40:80,
    height: PixelRatio.get()===3?60:120,
    margin: 2,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 5,
    fontSize: PixelRatio.get()===3?30:60,
    paddingBottom: PixelRatio.get()===3?6:12,
    paddingTop: PixelRatio.get()===3?4:8,
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
    fontSize: PixelRatio.get()===3?12:24,
    marginTop: PixelRatio.get()===3?2:4,
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
    width: PixelRatio.get() === 3 ? 40 : 80,
    height: PixelRatio.get() === 3 ? 4 : 8,
    borderRadius: PixelRatio.get() === 3 ? 2 : 4,
  },
  drawerTitle: {
    fontSize: PixelRatio.get() === 3 ? 24 : 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  drawerText: {
    fontSize: PixelRatio.get() === 3 ? 16 : 32,
    marginBottom: PixelRatio.get() === 3 ? 20 : 40,
    color: '#000',
    fontWeight: 'bold',
    lineHeight: PixelRatio.get() === 3 ? 24 : 48,
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
    width: PixelRatio.get() === 3 ? 100 : 200,
    height: PixelRatio.get() === 3 ? 40 : 80,
    borderRadius: PixelRatio.get() === 3 ? 8 : 16,
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
    fontSize: PixelRatio.get() === 3 ? 16 : 32,
    color: '#fff',
    fontWeight: '500',
  },
  drawerButtonTextCancel: {
    fontSize: PixelRatio.get() === 3 ? 16 : 32,
    color: '#000',
    fontWeight: '500',
  },
  closeIconButton: {
    position: 'absolute',
    right: 0,
  },
  closeIcon: {
    width: PixelRatio.get() === 3 ? 20 : 40,
    height: PixelRatio.get() === 3 ? 20 : 40,
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
    fontSize: PixelRatio.get() === 3 ? 16 : 32,
    color: 'rgb(59, 61, 99)',
    flexDirection: 'row',
    alignItems: 'center',
    width: PixelRatio.get() === 3 ? 150 : 300,
    display: 'flex',
    justifyContent: 'center',
  },
  gameInfoIcon: {
    width: PixelRatio.get() === 3 ? 20 : 40,
    height: PixelRatio.get() === 3 ? 20 : 40,
    resizeMode: 'contain',
    marginRight: PixelRatio.get() === 3 ? 5 : 10,
  },
  selectionModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  selectionModeText: {
    fontSize: PixelRatio.get() === 3 ? 16 : 32,
    color: '#666666',
  },
});

export default sudokuStyles;
