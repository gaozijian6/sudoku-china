import { Dimensions, StyleSheet } from 'react-native';
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

const getGridWidth = (isPortrait: boolean) => {
  if (model.includes('iPad')) {
    if (isPortrait) {
      // iPad竖屏时系数保持不变
      return Dimensions.get('window').width * 0.7;
    } else {
      // iPad横屏时根据型号分类讨论
      switch (true) {
        case model.includes('iPad Pro 12.9'):
          return Dimensions.get('window').width * 0.45;
        case model.includes('iPad Pro 11'):
        case model.includes('iPad Air'):
          return Dimensions.get('window').width * 0.4;
        case model.includes('iPad'):
          return Dimensions.get('window').width * 0.4;
          default:
          // 普通iPad或其他型号
          return Dimensions.get('window').width * 0.4;
      }
    }
  }

  // 非iPad设备保持原有逻辑
  return Dimensions.get('window').width * 0.95;
};

const getControlButtonsWidth = (isPortrait: boolean) => {
  if (model.includes('iPad')) {
    if (isPortrait) {
      // iPad竖屏时使用全宽
      return '100%';
    } else {
      // iPad横屏时根据型号详细区分
      switch (true) {
        case model.includes('iPad Pro 12.9'):
          return '60%'; // 12.9英寸iPad Pro横屏时使用更窄的宽度
        case model.includes('iPad Pro 11'):
          return '55%'; // 11英寸iPad Pro横屏时使用中等宽度
        case model.includes('iPad Air'):
          return '60%'; // iPad Air横屏时使用稍宽的宽度
        case model.includes('iPad'):
          return '50%'; // 普通iPad横屏时使用较宽的宽度
        default:
          // 其他iPad型号默认宽度
          return '60%';
      }
    }
  }

  // 非iPad设备保持原有逻辑
  return !isPortrait ? '60%' : '100%';
};

const sudokuStyles = (isDark: boolean, draftMode: boolean = false, isPortrait: boolean) => {
  // 获取实际的网格宽度比例
  const gridWidthRatio = (() => {
    if (model.includes('iPad')) {
      if (isPortrait) {
        return 0.8;
      } else {
        // iPad横屏时根据型号返回不同比例
        switch (true) {
          case model.includes('iPad Pro 12.9'):
            return 0.45;
          case model.includes('iPad Pro 11'):
          case model.includes('iPad Air'):
          case model.includes('iPad'):
            return 0.4;
          default:
            return 0.4;
        }
      }
    }
    return 0.95;
  })();

  const cellSize = Dimensions.get('window').width * gridWidthRatio * 0.11;

  // 调整iPhone主格子数字大小
  const fontSizeMultiplier = (() => {
    if (model.includes('iPad')) {
      return !isPortrait ? 0.95 : 0.7;
    } else {
      // iPhone设备 - 调大数字
      return isPortrait ? 0.8 : 0.5;
    }
  })();

  const draftFontSizeMultiplier =
    model.includes('iPad') && !isPortrait ? 1.4 : isPortrait ? 1.1 : 0.6;

  // 计算草稿数字的lineHeight，使其等于height以实现垂直居中
  const draftCellHeight = cellSize / 3; // 每个草稿格子的高度是单元格的1/3
  const draftFontSize = cellSize * 0.6 * 0.33 * draftFontSizeMultiplier;

  // 针对不同设备和方向调整lineHeight
  const mainCellLineHeightMultiplier = (() => {
    if (model.includes('iPad')) {
      return isPortrait ? 1.2 : 1.1;
    } else {
      // iPhone设备
      return isPortrait ? 1.15 : 1.05;
    }
  })();

  // 针对不同设备调整草稿数字的lineHeight
  const draftLineHeight = (() => {
    if (model.includes('iPad')) {
      // iPad竖屏时需要减小lineHeight来实现垂直居中
      if (isPortrait) {
        return draftCellHeight * 0.85;
      } else {
        return draftCellHeight;
      }
    } else {
      // iPhone设备需要稍微调整
      return draftCellHeight * 0.95;
    }
  })();

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'absolute' as const,
      backgroundColor: isDark ? 'rgb( 22, 23, 25)' : 'white',
      zIndex: 30,
      height: '100%',
      width: '100%',
    },
    text: {
      color: isDark ? '#999' : '#333',
      fontSize: 16,
    },
    ipadPlaceholder: {
      height: model.includes('iPad') && isPortrait ? 50 : 0,
      width: '100%',
    },
    gameInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: getGridWidth(isPortrait),
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
    gameInfoItem2: {},
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
      color: isDark ? '#999' : 'rgb(59, 61, 99)',
      textAlign: 'center',
    },
    gameInfoTextError: {
      fontSize: 16,
      color: isDark ? '#999' : 'rgb(59, 61, 99)',
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
      width: getGridWidth(isPortrait),
      height: getGridWidth(isPortrait),
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
      backgroundColor: isDark ? 'rgb(  28, 30, 32)' : 'white',
      borderColor: isDark ? 'rgb(95, 103, 117)' : 'rgb(204,223,253)',
      margin: -0.05,
    },
    sudokuCellRightBorder: {
      borderRightWidth: 2,
      borderRightColor: isDark ? 'rgb(95, 103, 117)' : 'rgb(164, 193, 243)',
    },
    sudokuCellBottomBorder: {
      borderBottomWidth: 2,
      borderBottomColor: isDark ? 'rgb(95, 103, 117)' : 'rgb(164, 193, 243)',
    },
    sudokuCellLeftBorder: {
      borderLeftWidth: 2,
      borderLeftColor: isDark ? 'rgb(95, 103, 117)' : 'rgb(164, 193, 243)',
    },
    sudokuCellTopBorder: {
      borderTopWidth: 2,
      borderTopColor: isDark ? 'rgb(95, 103, 117)' : 'rgb(164, 193, 243)',
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
      fontSize: cellSize * fontSizeMultiplier,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      lineHeight: cellSize * fontSizeMultiplier * mainCellLineHeightMultiplier,
      includeFontPadding: false,
    },
    givenNumber: {
      color: isDark ? '#777' : '#000',
    },
    userNumber: {
      color: 'rgb(80,101,182)',
    },
    errorCell: {
      backgroundColor: '#ffccc7',
      borderColor: '#ffccc7',
      borderLeftColor: '#ffccc7',
      borderRightColor: '#ffccc7',
      borderTopColor: '#ffccc7',
      borderBottomColor: '#ffccc7',
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
      borderRadius: 4,
      overflow: 'hidden',
    },
    draftCellText: {
      fontSize: draftFontSize,
      width: '33.33%',
      height: '33.33%',
      textAlign: 'center',
      lineHeight: draftLineHeight,
      position: 'absolute',
      color: isDark ? '#888' : '#000',
    },
    selectedCell: {
      borderWidth: 2,
      backgroundColor: isDark ? 'rgb(68, 79, 94)' : 'rgb(204,223,253)',
    },
    selectedNumberButton: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'rgb(78,106,176)',
    },
    selectedNumber: {
      backgroundColor: isDark ? 'rgb(40, 61, 129)' : '#1890ff',
      borderRightColor: isDark ? 'rgb(40, 61, 129)' : '#1890ff',
      borderBottomColor: isDark ? 'rgb(40, 61, 129)' : '#1890ff',
      borderLeftColor: isDark ? 'rgb(40, 61, 129)' : '#1890ff',
      borderTopColor: isDark ? 'rgb(40, 61, 129)' : '#1890ff',
      borderWidth: 2,
    },
    selectedNumberText: {
      color: isDark ? '#999' : '#fff',
    },
    // 候选数高亮
    candidateNumber: {
      backgroundColor: isDark ? 'rgb(50, 83, 55)' : '#9bf9ab',
    },
    positionHighlight: {
      backgroundColor: isDark ? 'rgb(125, 67, 67)' : '#fe9e9e',
    },
    promptHighlight: {
      backgroundColor: isDark ? 'rgb(72, 89, 116)' : '#9dc3ff',
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
      width: getControlButtonsWidth(isPortrait),
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
      width: 62,
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
      opacity: isDark ? 0.6 : 1,
    },
    buttonIconDraft: {
      tintColor: draftMode ? '#1890ff' : 'rgb(101,101,101)',
    },
    numberButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      marginTop: 10,
      position: 'relative',
      top: -25,
      width: !isPortrait ? '50%' : '100%',
    },
    numberButton: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '10%',
      height: 60,
      borderWidth: 1,
      borderColor: isDark ? '#999' : '#d9d9d9',
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
    candidateHighlightDelete: {
      // backgroundColor: 'rgb(206, 71,100)',
      backgroundColor: isDark ? 'rgb(86, 26, 39)' : 'rgb(206, 71,100)',
      borderRadius: 8,
    },
    candidateHighlightDeleteText: {
      // color: '#ffffff',
      color: isDark ? '#999' : '#ffffff',
    },
    candidateHighlightHint: {
      // backgroundColor: 'rgb(77,104,182)',
      backgroundColor: isDark ? 'rgb(37, 55, 109)' : 'rgb(77,104,182)',
      borderRadius: 8,
      opacity: 1,
    },
    candidateHighlightHint2: {
      // backgroundColor: 'rgb(32, 150, 112)',
      backgroundColor: isDark ? 'rgb(12, 72, 53)' : 'rgb(32, 150, 112)',
      borderRadius: 8,
      opacity: 1,
    },
    candidateHighlightHint3: {
      // backgroundColor: 'rgb(255, 159, 10)',
      backgroundColor: isDark ? 'rgb(118, 72, 3)' : 'rgb(255, 159, 10)',
      borderRadius: 8,
      opacity: 1,
    },
    candidateHighlightHintText: {
      // color: '#ffffff',
      color: isDark ? '#999' : '#ffffff',
      opacity: 1,
    },
    drawer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    drawerContent: {
      position: 'relative',
      marginTop: 'auto',
      bottom: 0,
      padding: 5,
      paddingHorizontal: 20,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      // backgroundColor: '#fff',
      backgroundColor: isDark ? 'rgb( 32, 31, 33)' : '#fff',
      height: getDrawerHeight(),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 1,
      shadowRadius: 15,
      elevation: 5,
      flexDirection: 'column',
    },
    drawerTextContainer: {
      height: 200,
      marginBottom: 10,
      width: '100%',
      // backgroundColor: '#fff',
      backgroundColor: isDark ? 'rgb( 32, 31, 33)' : '#fff',
    },
    drawerTextContentContainer: {
      width: '100%',
    },
    drawerText: {
      fontSize: 16,
      // color: '#000',
      color: isDark ? '#999' : '#000',
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
      // color: '#333',
      color: isDark ? '#999' : '#333',
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
      // backgroundColor: 'rgb(91,139,241)',
      backgroundColor: isDark ? 'rgb(58, 88, 155)' : 'rgb(91,139,241)',
    },
    drawerButtonCancel: {
      // backgroundColor: 'rgb(239,239,249)',
      backgroundColor: isDark ? 'rgb(161, 161, 168)' : 'rgb(239,239,249)',
    },
    drawerButtonTextApply: {
      fontSize: 16,
      // color: '#fff',
      color: isDark ? '#999' : '#fff',
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
      width: getGridWidth(isPortrait),
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
      opacity: isDark ? 0.5 : 1,
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
    bannerContainer: {
      position: 'absolute',
      bottom: 30,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: 'transparent',
      paddingVertical: 5,
      zIndex: 9000,
      opacity: isDark ? 0.5 : 1,
    },
    tooltipPressable: {
      position: 'relative',
      marginLeft: 10,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    hintIcon: {
      width: 28,
      height: 28,
      opacity: isDark ? 0.5 : 1,
    },
    tooltipText: {
      fontSize: 18,
      color: 'black',
    },
    tooltip: {
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'white',
    },
    tooltipBackground: {
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'white',
    },
    backIcon: {
      width: 22,
      height: 22,
      marginRight: 10,
      // tintColor: 'white',
      tintColor: isDark ? '#666' : '#fff',
    },
  });
};

export default sudokuStyles;
