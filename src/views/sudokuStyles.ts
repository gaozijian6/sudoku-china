import { StyleSheet } from 'react-native';

const sudokuStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 360,
    marginBottom: 20,
    alignSelf: 'center',
  },
  sudokuGrid: {
    width: 365,
    height: 365,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    borderWidth: 2,
    // borderColor: '#000',
  },
  sudokuCell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#d9d9d9',
  },
  sudokuCellRightBorder: {
    borderRightWidth: 3,
    borderRightColor: '#000000',
  },
  sudokuCellBottomBorder: {
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
  },
  sudokuCellLeftBorder: {
    borderLeftWidth: 3,
    borderLeftColor: '#000000',
  },
  sudokuCellTopBorder: {
    borderTopWidth: 3,
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
    fontSize: 20,
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
    fontWeight: 'bold',
    color: '#1890ff',
  },
  errorCell: {
    backgroundColor: '#ffccc7',
  },
  draftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignContent: 'space-evenly',
  },
  draftCell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  draftCellActive: {
    backgroundColor: '#f0f0f0',
  },
  draftCellText: {
    fontSize: 8,
  },
  selectedCell: {
    backgroundColor: '#e6f7ff',
    borderWidth: 2,
    borderColor: '#1890ff',
  },
  selectedNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  candidateNumber: {
    backgroundColor: '#9bf9ab',
  },
  positionHighlight: {
    backgroundColor: '#fe9e9e',
  },
  promptHighlight: {
    backgroundColor: '#9dc3ff',
  },
  positionAndPromptHighlight: {
    backgroundColor: '#f3f37f',
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
  },
  numberButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  numberButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 60,
    margin: 2,
  },
  remainingCount: {
    fontSize: 12,
    marginTop: 2,
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
    color: '#ffffff',
    backgroundColor: '#ff0000',
    borderRadius: 8,
  },
  candidateHighlightHint: {
    color: '#ffffff',
    backgroundColor: '#0000ff',
    borderRadius: 8,
  },
  drawerContent: {
    padding: 20,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  drawerText: {
    fontSize: 16,
    marginBottom: 20,
  },
  drawerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  drawerButton: {
    width: '40%',
  },
});

export default sudokuStyles;
