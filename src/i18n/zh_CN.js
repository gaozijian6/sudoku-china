export default {
  translation: {
    home: {
      title: '数独游戏',
      startGame: '开始游戏',
      createGame: '创建游戏',
      settings: '设置',
    },
    game: {
      pause: '暂停',
      resume: '继续',
      restart: '重新开始',
      quit: '退出',
    },
    difficulty: {
      title: '选择难度',
      entry: '😀入门',
      easy: '🤔简单',
      medium: '😮中等',
      hard: '😣困难',
      extreme: '🤯极难',
      custom: '自定义',
    },
    start: '开始',
    continue: '继续',
    undo: '撤销',
    erase: '擦除',
    notes: '笔记',
    autoNote: '自动笔记',
    hint: '提示',
    apply: '应用',
    cancel: '取消',
    selectMode: '选择模式',
    legal: '数独合法',
    solving: '求解中...',
    illegal: '数独不合法',
    answer: '答案',
    incomplete: '数独不完整',
    CHECK_CANDIDATE: '候选数检查',
    SINGLE_CANDIDATE: '唯一候选数',
    HIDDEN_SINGLE_ROW: '隐性唯一数',
    HIDDEN_SINGLE_COLUMN: '隐性唯一数',
    HIDDEN_SINGLE_BOX: '隐性唯一数',
    BLOCK_ELIMINATION_ROW: '区块消除',
    BLOCK_ELIMINATION_COLUMN: '区块消除',
    BLOCK_ELIMINATION_BOX_ROW: '区块消除',
    BLOCK_ELIMINATION_BOX_COLUMN: '区块消除',
    NAKED_PAIR_ROW: '显性数对',
    NAKED_PAIR_COLUMN: '显性数对',
    NAKED_PAIR_BOX: '显性数对',
    NAKED_TRIPLE_ROW1: '显性三数对',
    NAKED_TRIPLE_COLUMN1: '显性三数对',
    NAKED_TRIPLE_BOX1: '显性三数对',
    NAKED_TRIPLE_ROW2: '显性三数对',
    NAKED_TRIPLE_COLUMN2: '显性三数对',
    NAKED_TRIPLE_BOX2: '显性三数对',
    HIDDEN_PAIR_ROW: '隐性数对',
    HIDDEN_PAIR_COLUMN: '隐性数对',
    HIDDEN_PAIR_BOX: '隐性数对',
    HIDDEN_TRIPLE_ROW: '隐性三数对',
    HIDDEN_TRIPLE_COLUMN: '隐性三数对',
    HIDDEN_TRIPLE_BOX: '隐性三数对',
    NAKED_QUADRUPLE_ROW: '显性四数对',
    NAKED_QUADRUPLE_COLUMN: '显性四数对',
    NAKED_QUADRUPLE_BOX: '显性四数对',
    X_WING_ROW: 'X翼',
    X_WING_COLUMN: 'X翼',
    X_WING_VARIENT_ROW: '带鳍X翼',
    X_WING_VARIENT_COLUMN: '带鳍X翼',
    XY_WING: 'xy-wing',
    XYZ_WING: 'xyz-wing',
    SKYSCRAPER: '摩天楼',
    SKYSCRAPER2: '摩天楼2',
    REMOTE_PAIR: '远程数对',
    COMBINATION_CHAIN: '组合链',
    SWORDFISH_ROW: '三阶鱼',
    SWORDFISH_COLUMN: '三阶鱼',
    JELLYFISH_ROW: '四阶鱼',
    JELLYFISH_COLUMN: '四阶鱼',
    WXYZ_WING: 'wxyz-wing',
    LOOP: '环',
    UNIQUE_RECTANGLE: '唯一矩形',
    BINARY_UNIVERSAL_GRAVE: '全双值坟墓',
    DOUBLE_COLOR_CHAIN: '双色链',
    TRIPLE_COLOR_CHAIN: '三色链',
    TRIAL_AND_ERROR: '试错法',
    duration: '用时',
    mistakes: '错误次数',
    hintCount: '提示次数',
    hints: {
      SINGLE_CANDIDATE:
        '注意到单元格R{{row}}C{{col}}只剩{{target}}一个候选数，所以可以确定该单元格的值为{{target}}',
      HIDDEN_SINGLE_ROW:
        '候选数{{target}}在第{{row}}行中，只有一个候选方格，所以可以确定该单元格的值为{{target}}',
      HIDDEN_SINGLE_COLUMN:
        '候选数{{target}}在第{{col}}列中，只有一个候选方格，所以可以确定该单元格的值为{{target}}',
      HIDDEN_SINGLE_BOX:
        '候选数{{target}}在第{{box}}宫中，只有一个候选方格，所以可以确定该单元格的值为{{target}}',
      TRIAL_AND_ERROR:
        '尝试向拥有最少候选数的方格内填入{{target}}，若后续无解，说明填入{{target}}是错误的，则尝试其他候选数',
      BLOCK_ELIMINATION_ROW:
        '在第{{box}}宫中，候选数{{target}}只出现在{{positions}}这些位置中，因此无论存在哪个方格中，同一行的其他位置不能出现候选数{{target}}',
      BLOCK_ELIMINATION_COLUMN:
        '在第{{box}}宫中，候选数{{target}}只出现在{{positions}}这些位置中，因此无论存在哪个方格中，同一列的其他位置不能出现候选数{{target}}',
      BLOCK_ELIMINATION_BOX_ROW:
        '在第{{row}}行中，候选数{{target}}只出现在{{positions}}这些位置中，因此无论存在哪个方格中，同一宫的其他位置不能出现候选数{{target}}',
      BLOCK_ELIMINATION_BOX_COLUMN:
        '在第{{col}}列中，候选数{{target}}只出现在{{positions}}这些位置中，因此无论存在哪个方格中，同一宫的其他位置不能出现候选数{{target}}',
      NAKED_PAIR_ROW:
        '在第{{row}}行中，因为候选数{{target}}只能出现在{{positions}}这两个方格中，所以此行其他位置都不应出现候选数{{target}}',
      NAKED_PAIR_COLUMN:
        '在第{{col}}列中，因为候选数{{target}}只能出现在{{positions}}这两个方格中，所以此列其他位置都不应出现候选数{{target}}',
      NAKED_PAIR_BOX:
        '在第{{box}}宫中，因为候选数{{target}}只能出现在{{positions}}这两个方格中，所以此宫其他位置都不应出现候选数{{target}}',
      NAKED_TRIPLE_ROW1:
        '在第{{row}}行中，因为候选数{{target}}只能出现在{{positions}}这三个方格中，所以此行其他位置都不应出现候选数{{target}}',
      NAKED_TRIPLE_COLUMN1:
        '在第{{col}}列中，因为候选数{{target}}只能出现在{{positions}}这三个方格中，所以此列其他位置都不应出现候选数{{target}}',
      NAKED_TRIPLE_BOX1:
        '在第{{box}}宫中，因为候选数{{target}}只能出现在{{positions}}这三个方格中，所以此宫其他位置都不应出现候选数{{target}}',
      NAKED_TRIPLE_ROW2:
        '在第{{row}}行中，因为候选数{{target}}只能出现在{{positions}}这三个方格中，所以此行其他位置都不应出现候选数{{target}}',
      NAKED_TRIPLE_COLUMN2:
        '在第{{col}}列中，因为候选数{{target}}只能出现在{{positions}}这三个方格中，所以此列其他位置都不应出现候选数{{target}}',
      NAKED_TRIPLE_BOX2:
        '在第{{box}}宫中，因为候选数{{target}}只能出现在{{positions}}这三个方格中，所以此宫其他位置都不应出现候选数{{target}}',
      NAKED_QUADRUPLE_ROW:
        '在第{{row}}行中，因为候选数{{target}}只能出现在{{positions}}这四个方格中，所以此行其他位置都不应出现候选数{{target}}',
      NAKED_QUADRUPLE_COLUMN:
        '在第{{col}}列中，因为候选数{{target}}只能出现在{{positions}}这四个方格中，所以此列其他位置都不应出现候选数{{target}}',
      NAKED_QUADRUPLE_BOX:
        '在第{{box}}宫中，因为候选数{{target}}只能出现在{{positions}}这四个方格中，所以此宫其他位置都不应出现候选数{{target}}',
      HIDDEN_PAIR_ROW:
        '在第{{row}}行中，因为候选数{{candStr}}只出现在{{positions}}这两个方格中，因此这两个方格不应出现其他候选数',
      HIDDEN_PAIR_COLUMN:
        '在第{{col}}列中，因为候选数{{candStr}}只出现在{{positions}}这两个方格中，因此这两个方格不应出现其他候选数',
      HIDDEN_PAIR_BOX:
        '在第{{box}}宫中，因为候选数{{candStr}}只出现在{{positions}}这两个方格中，因此这两个方格不应出现其他候选数',
      HIDDEN_TRIPLE_ROW:
        '在第{{row}}行中，因为候选数{{candStr}}只出现在{{positions}}这三个方格中，因此这三个方格不应出现其他候选数',
      HIDDEN_TRIPLE_COLUMN:
        '在第{{col}}列中，因为候选数{{candStr}}只出现在{{positions}}这三个方格中，因此这三个方格不应出现其他候选数',
      HIDDEN_TRIPLE_BOX:
        '在第{{box}}宫中，因为候选数{{candStr}}只出现在{{positions}}这三个方格中，因此这三个方格不应出现其他候选数',
      X_WING_ROW:
        '在第{{row1}}和第{{row2}}行中，候选数{{candStr}}每行都有两个候选方格且他们的列号相同，在这四个候选方格内无论哪两个为真，都会导致这两列其他位置为假',
      X_WING_COLUMN:
        '在第{{col1}}和第{{col2}}列中，候选数{{candStr}}每列都有两个候选方格且他们的行号相同，在这四个候选方格内无论哪两个为真，都会导致这两行其他位置为假',
      X_WING_VARIENT_ROW:
        '在{{positions}}这{{length}}个候选方格内无论哪两个取{{candStr}}，都会导致R{{row}}C{{col}}内不应出现候选数{{candStr}}',
      X_WING_VARIENT_COLUMN:
        '在{{positions}}这{{length}}个候选方格内无论哪两个取{{candStr}}，都会导致R{{row}}C{{col}}内不应出现候选数{{candStr}}',
      XY_WING:
        '无论{{positions}}这三个候选方格内如何取值，{{deleteStr}}内都不能出现候选数{{candStr}}',
      XYZ_WING:
        '无论{{positions}}这三个候选方格内如何取值，{{deleteStr}}内都不能出现候选数{{candStr}}',
      SKYSCRAPER:
        '{{positions}}这几个蓝色方格构成共轭链，无论R{{row1}}C{{col1}}还是R{{row2}}C{{col2}}取值为{{target}}，{{deleteStr}}内都不能出现候选数{{target}}',
      SKYSCRAPER2:
        '单元格R{{row1}}C{{col1}}和R{{row2}}C{{col2}}形成一个强链，单元格R{{row3}}C{{col3}}和R{{row4}}C{{col4}}形成另一个强链，这两个强链通过R{{row3}}C{{col3}}和R{{row2}}C{{col2}}之间的弱链相连。如果R{{row1}}C{{col1}}为真，则{{deleteStr}}必须为假。如果R{{row1}}C{{col1}}为假，则R{{row4}}C{{col4}}必须为真，这仍然会使{{deleteStr}}为假。无论如何，候选数{{target}}都不能出现在{{deleteStr}}内。',
      REMOTE_PAIR:
        '{{posStr1}}构成远程数对，这两个远程数对通过{{posStr2}}形成强链，无论{{posStr1}}谁为真，{{posStr}}内都不能出现候选数{{target}}',
      WXYZ_WING:
        '{{candStr}}构成WXYZ-Wing，其中R{{row1}}C{{col1}}为枢纽，无论这四个候选方格内如何取值，候选数{{target}}都不能出现在{{deleteStr}}内',
      COMBINATION_CHAIN_3_2_1_STRONG:
        '{{candStr1}}的组合与{{candStr2}}构成强链，无论{{candStr4}}内谁为真，候选数{{target}}都不能出现在{{posStr}}内',
      COMBINATION_CHAIN_3_2_1_WEAK:
        '{{candStr1}}的组合与{{candStr2}}构成强链，{{candStr3}}四个方格构成强链，这两条强链通过{{pivotStr}}构成的弱链相连，无论{{candStr4}}内谁为真，候选数{{target}}都不能出现在{{posStr}}内',
      COMBINATION_CHAIN_3_2_2_WEAK:
        '{{candStr1}}的组合与{{candStr2}}构成强链，{{candStr3}}两个方格构成强链，这两条强链通过{{pivotStr1}}与{{pivotStr2}}两方格的整体构成的弱链相连，无论{{candStr4}}内谁为真，候选数{{target}}都不能出现在{{posStr}}内',
      COMBINATION_CHAIN_3_2_2_STRONG:
        '{{candStr1}}的组合与{{candStr2}}构成强链，{{candStr3}}两个方格构成强链，这两条强链通过{{pivotStr1}}与{{pivotStr2}}两方格的整体构成的强链相连，无论{{candStr4}}内谁为真，候选数{{target}}都不能出现在{{posStr}}内',
      LOOP_3_2_2:
        '{{nodeStr1}}构成一组强链，{{nodeStr2}}构成一组强链，{{nodeStr3}}构成一组强链，它们之间通过弱链相连构成一个环，假设{{rootNodeStr}}为假并以它为起点分别以顺时针和逆时针进行逻辑推导，最终会导致环上某个节点矛盾，因此{{rootNodeStr}}必须为真',
      LOOP_3_2:
        '{{nodeStr1}}构成一组强链，{{nodeStr2}}构成一组强链，它们之间通过弱链相连构成一个环，假设{{rootNodeStr}}为假并以它为起点分别以顺时针和逆时针进行逻辑推导，最终会导致环上某个节点矛盾，因此{{rootNodeStr}}必须为真',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}}与{{deleteStr}}构成类似唯一矩形的结构，即棋盘内存在四个方格位于两个宫中，它们的位置构成矩形且内部均有两个相同的候选数，当棋盘内出现这种结构时，代表当前数独不合法，因此{{deleteStr}}必须消除候选数{{target}}才能保证数独具有唯一解',
      UNIQUE_RECTANGLE2:
        '如果红色方格内取值为{{target}},那么{{nodeStr}}四个方格会构成唯一矩形的结构，即棋盘内存在四个方格位于两个宫中，它们的位置构成矩形且内部均有两个相同的候选数，当棋盘内出现这种结构时，代表当前数独不合法，因此红色方格内一定不会有候选数{{target}}',
      BINARY_UNIVERSAL_GRAVE:
        '假设{{posStr}}不为{{target}},棋盘内所有候选方格中都只有两个候选数，且每个候选数在每行、每列、每宫中都只出现两次，这种结构会导致数独出现多解，为避免这种情况出现，{{posStr}}必须为{{target}}',
      SWORDFISH_ROW:
        '蓝色方格所在的三行上不存在其他关于{{target}}的候选方格,无论这些方格中如何取值,其对应的三列上不应存在候选数{{target}}',
      SWORDFISH_COLUMN:
        '蓝色方格所在的三列上不存在其他关于{{target}}的候选方格,无论这些方格中如何取值,其对应的三行上不应存在候选数{{target}}',
      JELLYFISH_ROW:
        '蓝色方格所在的四行上不存在其他关于{{target}}的候选方格,无论这些方格中如何取值,其对应的四列上不应存在候选数{{target}}',
      JELLYFISH_COLUMN:
        '蓝色方格所在的四列上不存在其他关于{{target}}的候选方格,无论这些方格中如何取值,其对应的四行上不应存在候选数{{target}}',
      DOUBLE_COLOR_CHAIN_delete: '{{posStr}}取{{target}}时红色方格内不能取{{target}}',
      DOUBLE_COLOR_CHAIN_s: '{{posStr1}}取{{target1}}时会导致{{posStr2}}取{{target2}}',
      DOUBLE_COLOR_CHAIN_r: '{{posStr1}}取{{target}}时会导致{{posStr2}}不能取{{target}}',
      DOUBLE_COLOR_CHAIN_q:
        '因为{{posStr1}}与{{posStr2}}是关于{{target}}的强链，所以{{posStr2}}为{{target}}',
      DOUBLE_COLOR_CHAIN_q_start: '{{posStr}}取{{target1}}时会使得当前方格无法取{{target2}}',
    },
    back: '返回',
    next: '下一关',
    errorDraft: '笔记有错误，请先修正',
    pleaseConnectNetwork: '请先连接网络',
    setting: '设置',
    removeAD: '移除广告',
    sound: '音效',
    notice: '通知',
    privacyPolicy: '隐私政策',
    serviceTerms: '服务条款',
    language: '语言',
    feedback: '反馈',
    feedbackMessage: '留言：',
    congratulations: '恭喜通关！',
    restore: '恢复购买',
    restoring: '恢复中...',
    purchasing: '购买中...',
    illegalPrompt: '系统检测到您频繁退出程序，有规避广告的嫌疑，请等待一分钟后重试',
    highlight: '高亮',
    myBoards: '我的题库',
    Home: '首页',
    saveToMyBoards: '存入题库',
    pleaseNameYourSudoku: '请为您的数独起个名字',
    success: '成功',
    sudokuSavedToMyBoards: '数独已成功保存到题库！',
    error: '错误',
    saveFailedPleaseTryAgainLater: '保存失败，请稍后重试',
    confirm: '确定',
    noNetwork: '您没有连接网络，继续返回将不会保存您的题目，确定要继续返回吗？',
    loading: '加载中...',
    pleaseCheckNetwork: '加载失败，请检查网络是否连接',
    pleaseCheckiCloud: '加载失败,请检查iCloud是否登陆',
    untitled: '未命名',
    enlarge: '放大',
    encourage: '鼓励我们❤️',
    share: '分享App',
    shareMessage: '一款支持自定义的数独游戏，快来试试吧！',
    wether: '无论哪种情况,红色方格内都不能取{{target}}',
    case1: '情形一:',
    case2: '情形二:',
    case3: '情形三:',
    comma: '，',
    period: '。',
    end1: '红色方格不能取{{target}}',
    end2: '红色方格还是不能取{{target}}',
    theme: '主题',
    selectTheme: '选择主题',
    lightMode: '浅色模式',
    darkMode: '深色模式',
    strictMode: '严格模式',
    reasonMode: '推理模式',
    strictText: '严格模式:当您输入的数字与答案不符时，会提示错误',
    reasonText: '推理模式:当您输入的数字与答案不符时，不会提示错误',
    localGames: '本地题库',
    statistics: '统计',
    entry: '入门',
    easy: '简单',
    medium: '中等',
    hard: '困难',
    extreme: '极难',
  },
};
