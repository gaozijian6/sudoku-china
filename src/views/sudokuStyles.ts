import { StyleSheet } from 'react-native';

const sudokuStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 360,
    marginBottom: 20,
    alignSelf: 'center',
    height: 40,
    position: 'relative',
    top: 10,
  },
  sudokuGrid: {
    width: 365,
    height: 365,
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
    width: 40,
    height: 40,
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
    color: '#000',
  },
  userNumber: {
    color: 'rgb(80,101,182)',
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
  },
  draftCellText: {
    fontSize: 8,
  },
  selectedCell: {
    borderWidth: 2,
    backgroundColor: 'rgb(204,223,253)',
  },
  selectedNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(78,106,176)',
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
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    position: 'relative',
    top: -25,
  },
  buttonContainer: {
    alignItems: 'center',
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
  remainingCount: {
    fontSize: 12,
    marginTop: 2,
    color: 'rgb(125,123,134)',
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
