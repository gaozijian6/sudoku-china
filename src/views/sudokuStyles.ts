import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const model = DeviceInfo.getModel();

const getDrawerHeight = () => {
  switch (true) {
    case model.includes('Plus'):
    case model.includes('Pro Max'):
      return Dimensions.get('window').height * 0.4;
    case model.includes('SE'):
      return Dimensions.get('window').height * 0.32;
    case model.includes('iPad'):
      return Dimensions.get('window').height * 0.27;
    default:
      return Dimensions.get('window').height * 0.38;
  }
};

const getMarginBottom = () => {
  switch (true) {
    case model.includes('SE'):
      return 5;
    default:
      return 30;
  }
};

const getGridWidth = () => {
  switch (true) {
    case model.includes('iPad'):
      return Dimensions.get('window').width * 0.8;
    default:
      return Dimensions.get('window').width * 0.95;
  }
};

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
    width: getGridWidth(),
    marginBottom: 10,
    alignSelf: 'center',
    height: 30,
    position: 'relative',
    top: 5,
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
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
  gameInfoText: {
    fontSize: 16,
    color: 'rgb(59, 61, 99)',
    textAlign: 'center',
  },
  gameInfoTextError: {
    fontSize: 16,
    color: 'rgb(59, 61, 99)',
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
    width: getGridWidth(),
    height: getGridWidth(),
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
    margin: -0.05,
  },
  sudokuCellRightBorder: {
    borderRightWidth: 2,
    borderRightColor: 'rgb(164, 193, 243)',
  },
  sudokuCellBottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(164, 193, 243)',
  },
  sudokuCellLeftBorder: {
    borderLeftWidth: 2,
    borderLeftColor: 'rgb(164, 193, 243)',
  },
  sudokuCellTopBorder: {
    borderTopWidth: 2,
    borderTopColor: 'rgb(164, 193, 243)',
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
    fontSize: Dimensions.get('window').width * 0.95 * 0.11 * 0.6,
    fontWeight: 'bold',
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
    fontSize: Dimensions.get('window').width * 0.95 * 0.11 * 0.6 * 0.33 * 0.9,
    width: '33.33%',
    height: '33.33%',
    textAlign: 'center',
    lineHeight: Dimensions.get('window').width * 0.95 * 0.11 * 0.6 * 0.5,
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
  selectedNumber: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderRightColor: '#1890ff',
    borderBottomColor: '#1890ff',
    borderLeftColor: '#1890ff',
    borderTopColor: '#1890ff',
    borderWidth: 2,
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
    position: 'relative',
    top: -30,
    height: 70,
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    width: 74,
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonContainerDIY: {
    alignItems: 'center',
    width: 65,
    height: 60,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666666',
    width: 70,
    textAlign: 'center',
  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
  numberButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 10,
    position: 'relative',
    top: -25,
    width: '100%',
  },
  numberButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: 60,
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
  remainingCountDraft: {
    width: 15,
    height: 15,
    fontSize: 12,
    marginTop: 2,
    tintColor: 'rgb(125,123,134)',
    opacity: 0,
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
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '85%',
    zIndex: 100,
  },
  drawerContent: {
    position: 'relative',
    marginTop: 'auto',
    bottom: 0,
    padding: 5,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
    height: getDrawerHeight(),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 24,
    flexDirection: 'column',
  },
  drawerTextContainer: {
    height: 200,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  drawerTextContentContainer: {
    width: '100%',
  },
  drawerText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
    width: '100%',
  },
  drawerIconContainer: {
    position: 'absolute',
    right: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  drawerIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
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
  drawerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: getMarginBottom(),
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
  gameInfoDIY: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    display: 'flex',
    width: getGridWidth(),
  },
  gameInfoTextDIY: {
    fontSize: 16,
    color: 'rgb(59, 61, 99)',
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
    display: 'flex',
    justifyContent: 'center',
  },
  gameInfoIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  selectionModeText: {
    fontSize: 16,
    color: '#666666',
  },
  selectionModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
  },

});

export default sudokuStyles;
