export default {
  translation: {
    home: {
      title: '數獨遊戲',
      startGame: '開始遊戲',
      createGame: '創建遊戲',
      settings: '設置',
    },
    game: {
      pause: '暫停',
      resume: '繼續',
      restart: '重新開始',
      quit: '退出',
    },
    difficulty: {
      title: '選擇難度',
      entry: '😀入門',
      easy: '🤔簡單',
      medium: '😮中等',
      hard: '😣困難',
      extreme: '🤯極難',
      custom: '自定義',
    },
    start: '開始',
    continue: '繼續',
    undo: '撤銷',
    erase: '擦除',
    notes: '筆記',
    autoNote: '自動筆記',
    hint: '提示',
    apply: '應用',
    cancel: '取消',
    selectMode: '選擇模式',
    legal: '數獨合法',
    solving: '求解中...',
    illegal: '數獨不合法',
    answer: '答案',
    incomplete: '數獨不完整',
    CHECK_CANDIDATE: '候選數檢查',
    SINGLE_CANDIDATE: '唯一候選數',
    HIDDEN_SINGLE_ROW: '隱性唯一數',
    HIDDEN_SINGLE_COLUMN: '隱性唯一數',
    HIDDEN_SINGLE_BOX: '隱性唯一數',
    BLOCK_ELIMINATION_ROW: '區塊消除',
    BLOCK_ELIMINATION_COLUMN: '區塊消除',
    BLOCK_ELIMINATION_BOX_ROW: '區塊消除',
    BLOCK_ELIMINATION_BOX_COLUMN: '區塊消除',
    NAKED_PAIR_ROW: '顯性數對',
    NAKED_PAIR_COLUMN: '顯性數對',
    NAKED_PAIR_BOX: '顯性數對',
    NAKED_TRIPLE_ROW1: '顯性三數對',
    NAKED_TRIPLE_COLUMN1: '顯性三數對',
    NAKED_TRIPLE_BOX1: '顯性三數對',
    NAKED_TRIPLE_ROW2: '顯性三數對',
    NAKED_TRIPLE_COLUMN2: '顯性三數對',
    NAKED_TRIPLE_BOX2: '顯性三數對',
    HIDDEN_PAIR_ROW: '隱性數對',
    HIDDEN_PAIR_COLUMN: '隱性數對',
    HIDDEN_PAIR_BOX: '隱性數對',
    HIDDEN_TRIPLE_ROW: '隱性三數對',
    HIDDEN_TRIPLE_COLUMN: '隱性三數對',
    HIDDEN_TRIPLE_BOX: '隱性三數對',
    NAKED_QUADRUPLE_ROW: '顯性四數對',
    NAKED_QUADRUPLE_COLUMN: '顯性四數對',
    NAKED_QUADRUPLE_BOX: '顯性四數對',
    X_WING_ROW: 'X翼',
    X_WING_COLUMN: 'X翼',
    X_WING_VARIENT_ROW: '帶鰭X翼',
    X_WING_VARIENT_COLUMN: '帶鰭X翼',
    XY_WING: 'xy-wing',
    XYZ_WING: 'xyz-wing',
    SKYSCRAPER: '摩天樓',
    SKYSCRAPER2: '雙強鏈',
    THREESTRONGLINKS: '三強鏈',
    XCHAIN: 'X鏈',
    COMBINATION_CHAIN: '組合鏈',
    SWORDFISH_ROW: '三階魚',
    SWORDFISH_COLUMN: '三階魚',
    JELLYFISH_ROW: '四階魚',
    JELLYFISH_COLUMN: '四階魚',
    WXYZ_WING: 'wxyz-wing',
    LOOP: '環',
    UNIQUE_RECTANGLE: '唯一矩形',
    BINARY_UNIVERSAL_GRAVE: '全雙值墳墓',
    DOUBLE_COLOR_CHAIN: '雙色鏈',
    TRIPLE_COLOR_CHAIN: '三色鏈',
    TWO_STRING_KITE: '雙線風箏',
    TRIAL_AND_ERROR: '試錯法',
    duration: '用時',
    mistakes: '錯誤次數',
    hintCount: '提示次數',
    hints: {
      SINGLE_CANDIDATE:
        '注意到單元格R{{row}}C{{col}}只剩{{target}}一個候選數，所以可以確定該單元格的值為{{target}}',
      HIDDEN_SINGLE_ROW:
        '候選數{{target}}在第{{row}}行中，只有一個候選方格，所以可以確定該單元格的值為{{target}}',
      HIDDEN_SINGLE_COLUMN:
        '候選數{{target}}在第{{col}}列中，只有一個候選方格，所以可以確定該單元格的值為{{target}}',
      HIDDEN_SINGLE_BOX:
        '候選數{{target}}在第{{box}}宮中，只有一個候選方格，所以可以確定該單元格的值為{{target}}',
      TRIAL_AND_ERROR:
        '嘗試向擁有最少候選數的方格內填入{{target}}，若後續無解，說明填入{{target}}是錯誤的，則嘗試其他候選數',
      BLOCK_ELIMINATION_ROW:
        '在第{{box}}宮中，候選數{{target}}只出現在{{positions}}這些位置中，因此無論存在哪個方格中，同一行的其他位置不能出現候選數{{target}}',
      BLOCK_ELIMINATION_COLUMN:
        '在第{{box}}宮中，候選數{{target}}只出現在{{positions}}這些位置中，因此無論存在哪個方格中，同一列的其他位置不能出現候選數{{target}}',
      BLOCK_ELIMINATION_BOX_ROW:
        '在第{{row}}行中，候選數{{target}}只出現在{{positions}}這些位置中，因此無論存在哪個方格中，同一宮的其他位置不能出現候選數{{target}}',
      BLOCK_ELIMINATION_BOX_COLUMN:
        '在第{{col}}列中，候選數{{target}}只出現在{{positions}}這些位置中，因此無論存在哪個方格中，同一宮的其他位置不能出現候選數{{target}}',
      NAKED_PAIR_ROW:
        '在第{{row}}行中，因為候選數{{target}}只能出現在{{positions}}這兩個方格中，所以此行其他位置都不應出現候選數{{target}}',
      NAKED_PAIR_COLUMN:
        '在第{{col}}列中，因為候選數{{target}}只能出現在{{positions}}這兩個方格中，所以此列其他位置都不應出現候選數{{target}}',
      NAKED_PAIR_BOX:
        '在第{{box}}宮中，因為候選數{{target}}只能出現在{{positions}}這兩個方格中，所以此宮其他位置都不應出現候選數{{target}}',
      NAKED_TRIPLE_ROW1:
        '在第{{row}}行中，因為候選數{{target}}只能出現在{{positions}}這三個方格中，所以此行其他位置都不應出現候選數{{target}}',
      NAKED_TRIPLE_COLUMN1:
        '在第{{col}}列中，因為候選數{{target}}只能出現在{{positions}}這三個方格中，所以此列其他位置都不應出現候選數{{target}}',
      NAKED_TRIPLE_BOX1:
        '在第{{box}}宮中，因為候選數{{target}}只能出現在{{positions}}這三個方格中，所以此宮其他位置都不應出現候選數{{target}}',
      NAKED_TRIPLE_ROW2:
        '在第{{row}}行中，因為候選數{{target}}只能出現在{{positions}}這三個方格中，所以此行其他位置都不應出現候選數{{target}}',
      NAKED_TRIPLE_COLUMN2:
        '在第{{col}}列中，因為候選數{{target}}只能出現在{{positions}}這三個方格中，所以此列其他位置都不應出現候選數{{target}}',
      NAKED_TRIPLE_BOX2:
        '在第{{box}}宮中，因為候選數{{target}}只能出現在{{positions}}這三個方格中，所以此宮其他位置都不應出現候選數{{target}}',
      NAKED_QUADRUPLE_ROW:
        '在第{{row}}行中，因為候選數{{target}}只能出現在{{positions}}這四個方格中，所以此行其他位置都不應出現候選數{{target}}',
      NAKED_QUADRUPLE_COLUMN:
        '在第{{col}}列中，因為候選數{{target}}只能出現在{{positions}}這四個方格中，所以此列其他位置都不應出現候選數{{target}}',
      NAKED_QUADRUPLE_BOX:
        '在第{{box}}宮中，因為候選數{{target}}只能出現在{{positions}}這四個方格中，所以此宮其他位置都不應出現候選數{{target}}',
      HIDDEN_PAIR_ROW:
        '在第{{row}}行中，因為候選數{{candStr}}只出現在{{positions}}這兩個方格中，因此這兩個方格不應出現其他候選數',
      HIDDEN_PAIR_COLUMN:
        '在第{{col}}列中，因為候選數{{candStr}}只出現在{{positions}}這兩個方格中，因此這兩個方格不應出現其他候選數',
      HIDDEN_PAIR_BOX:
        '在第{{box}}宮中，因為候選數{{candStr}}只出現在{{positions}}這兩個方格中，因此這兩個方格不應出現其他候選數',
      HIDDEN_TRIPLE_ROW:
        '在第{{row}}行中，因為候選數{{candStr}}只出現在{{positions}}這三個方格中，因此這三個方格不應出現其他候選數',
      HIDDEN_TRIPLE_COLUMN:
        '在第{{col}}列中，因為候選數{{candStr}}只出現在{{positions}}這三個方格中，因此這三個方格不應出現其他候選數',
      HIDDEN_TRIPLE_BOX:
        '在第{{box}}宮中，因為候選數{{candStr}}只出現在{{positions}}這三個方格中，因此這三個方格不應出現其他候選數',
      X_WING_ROW:
        '在第{{row1}}和第{{row2}}行中，候選數{{candStr}}每行都有兩個候選方格且他們的列號相同，在這四個候選方格內無論哪兩個為真，都會導致這兩列其他位置為假',
      X_WING_COLUMN:
        '在第{{col1}}和第{{col2}}列中，候選數{{candStr}}每列都有兩個候選方格且他們的行號相同，在這四個候選方格內無論哪兩個為真，都會導致這兩行其他位置為假',
      X_WING_VARIENT_ROW:
        '在{{positions}}這{{length}}個候選方格內無論哪兩個取{{candStr}}，都會導致R{{row}}C{{col}}內不應出現候選數{{candStr}}',
      X_WING_VARIENT_COLUMN:
        '在{{positions}}這{{length}}個候選方格內無論哪兩個取{{candStr}}，都會導致R{{row}}C{{col}}內不應出現候選數{{candStr}}',
      XY_WING:
        '無論{{positions}}這三個候選方格內如何取值，{{deleteStr}}內都不能出現候選數{{candStr}}',
      XYZ_WING:
        '無論{{positions}}這三個候選方格內如何取值，{{deleteStr}}內都不能出現候選數{{candStr}}',
      SKYSCRAPER:
        '{{positions}}這幾個藍色方格構成共軛鏈，無論R{{row1}}C{{col1}}還是R{{row2}}C{{col2}}取值為{{target}}，{{deleteStr}}內都不能出現候選數{{target}}',
      SKYSCRAPER2:
        '單元格R{{row1}}C{{col1}}和R{{row2}}C{{col2}}形成一個強鏈，單元格R{{row3}}C{{col3}}和R{{row4}}C{{col4}}形成另一個強鏈，這兩個強鏈通過R{{row3}}C{{col3}}和R{{row2}}C{{col2}}之間的弱鏈相連。如果R{{row1}}C{{col1}}為真，則{{deleteStr}}必須為假。如果R{{row1}}C{{col1}}為假，則R{{row4}}C{{col4}}必須為真，這仍然會使{{deleteStr}}為假。無論如何，候選數{{target}}都不能出現在{{deleteStr}}內。',
      WXYZ_WING:
        '{{candStr}}構成WXYZ-Wing，其中R{{row1}}C{{col1}}為樞紐，無論這四個候選方格內如何取值，候選數{{target}}都不能出現在{{deleteStr}}內',
      COMBINATION_CHAIN_3_2_1_STRONG:
        '{{candStr1}}的組合與{{candStr2}}構成強鏈，無論{{candStr4}}內誰為真，候選數{{target}}都不能出現在{{posStr}}內',
      COMBINATION_CHAIN_3_2_1_WEAK:
        '{{candStr1}}的組合與{{candStr2}}構成強鏈，{{candStr3}}四個方格構成強鏈，這兩條強鏈通過{{pivotStr}}構成的弱鏈相連，無論{{candStr4}}內誰為真，候選數{{target}}都不能出現在{{posStr}}內',
      COMBINATION_CHAIN_3_2_2_WEAK:
        '{{candStr1}}的組合與{{candStr2}}構成強鏈，{{candStr3}}兩個方格構成強鏈，這兩條強鏈通過{{pivotStr1}}與{{pivotStr2}}兩方格的整體構成的弱鏈相連，無論{{candStr4}}內誰為真，候選數{{target}}都不能出現在{{posStr}}內',
      COMBINATION_CHAIN_3_2_2_STRONG:
        '{{candStr1}}的組合與{{candStr2}}構成強鏈，{{candStr3}}兩個方格構成強鏈，這兩條強鏈通過{{pivotStr1}}與{{pivotStr2}}兩方格的整體構成的強鏈相連，無論{{candStr4}}內誰為真，候選數{{target}}都不能出現在{{posStr}}內',
      LOOP_3_2_2:
        '{{nodeStr1}}構成一組強鏈，{{nodeStr2}}構成一組強鏈，{{nodeStr3}}構成一組強鏈，它們之間通過弱鏈相連構成一個環，假設{{rootNodeStr}}為假并以它為起點分別以順時針和逆時針進行邏輯推導，最終會導致環上某個節點矛盾，因此{{rootNodeStr}}必須為真',
      LOOP_3_2:
        '{{nodeStr1}}構成一組強鏈，{{nodeStr2}}構成一組強鏈，它們之間通過弱鏈相連構成一個環，假設{{rootNodeStr}}為假并以它為起點分別以順時針和逆時針進行邏輯推導，最終會導致環上某個節點矛盾，因此{{rootNodeStr}}必須為真',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}}與{{deleteStr}}構成類似唯一矩形的結構，即棋盤內存在四個方格位於兩個宮中，它們的位置構成矩形且內部均有兩個相同的候選數，當棋盤內出現這種結構時，代表當前數獨不合法，因此{{deleteStr}}必須消除候選數{{target}}才能保證數獨具有唯一解',
      UNIQUE_RECTANGLE2:
        '假設{{posStr}}不為{{target}}，則{{nodeStr}}四個方格構成唯一矩形，即棋盤內存在四個方格位於兩個宮中，它們的位置構成矩形且內部均有兩個相同的候選數，當棋盤內出現這種結構時，代表當前數獨有多種答案，因此{{posStr}}必須為{{target}}才能保證數獨具有唯一解',
      BINARY_UNIVERSAL_GRAVE:
        '假設{{posStr}}不為{{target}}，棋盤內所有候選方格中都只有兩個候選數，且每個候選數在每行、每列、每宮中都只出現兩次，這種結構會導致數獨出現多解，為避免這種情況出現，{{posStr}}必須為{{target}}',
      SWORDFISH_ROW:
        '藍色方格所在的三行上不存在其他關於{{target}}的候選方格,無論這些方格中如何取值,其對應的三列上不應存在候選數{{target}}',
      SWORDFISH_COLUMN:
        '藍色方格所在的三列上不存在其他關於{{target}}的候選方格,無論這些方格中如何取值,其對應的三行上不應存在候選數{{target}}',
      JELLYFISH_ROW:
        '藍色方格所在的四行上不存在其他關於{{target}}的候選方格,無論這些方格中如何取值,其對應的四列上不應存在候選數{{target}}',
      JELLYFISH_COLUMN:
        '藍色方格所在的四列上不存在其他關於{{target}}的候選方格,無論這些方格中如何取值,其對應的四行上不應存在候選數{{target}}',
      DOUBLE_COLOR_CHAIN_delete: '當{{posStr}}取{{target}}時，紅色方格內不能取{{target}}',
      DOUBLE_COLOR_CHAIN_s: '當{{posStr1}}取{{target1}}時，會導致{{posStr2}}取{{target2}}',
      DOUBLE_COLOR_CHAIN_r: '當{{posStr1}}取{{target}}時，會導致{{posStr2}}不能取{{target}}',
      DOUBLE_COLOR_CHAIN_q:
        '因為{{posStr1}}與{{posStr2}}是關於{{target}}的強鏈，所以{{posStr2}}為{{target}}',
      DOUBLE_COLOR_CHAIN_q_start: '當{{posStr}}取{{target1}}時，當前方格無法取{{target2}}',
      COMBINATION_CHAIN_AB_STRONG: '{{A}}與{{B}}構成強鏈',
      COMBINATION_CHAIN_AB_WEAK: '{{A}}與{{B}}構成弱鏈',
      COMBINATION_CHAIN_END:
        '{{A}}為真時紅色方格內為假，{{A}}為假時通過推理{{B}}為真，紅色方格內仍然為假',
      SKYSCRAPER2_1:
        '{{As}}兩個方格之間構成一條強鏈，{{Bs}}四個方格之間構成一條強鏈，兩條強鏈通過{{Cs}}這兩個方格之間的弱鏈相連，{{A}}為真時，紅色方格內為假，{{A}}為假時，{{B}}為真，紅色方格內仍然為假',
      SKYSCRAPER2_2:
        '{{As}}兩個方格之間構成一條強鏈，{{Bs}}兩個方格之間構成一條強鏈，{{Cs}}兩個方格之間構成一條強鏈，每條強鏈都通過弱鏈相互連接，{{A}}為真時，紅色方格內為假，{{A}}為假時，{{B}}為真，紅色方格內仍然為假',
    },
    back: '返回',
    next: '下一關',
    errorDraft: '筆記有錯誤，請先修正',
    pleaseConnectNetwork: '請先連接網絡',
    setting: '設置',
    removeAD: '移除廣告',
    sound: '音效',
    notice: '通知',
    privacyPolicy: '隱私政策',
    serviceTerms: '服務條款',
    language: '語言',
    feedback: '反饋',
    feedbackMessage: '留言：',
    congratulations: '恭喜通關！',
    restore: '恢復購買',
    restoring: '恢復中...',
    purchasing: '購買中...',
    illegalPrompt: '系統檢測到您頻繁退出程序，有規避廣告的嫌疑，請等待一分钟后重試',
    highlight: '高亮',
    myBoards: '我的題庫',
    Home: '首頁',
    saveToMyBoards: '存入題庫',
    pleaseNameYourSudoku: '請為您的數獨起個名字',
    success: '成功',
    sudokuSavedToMyBoards: '數獨已成功保存到題庫！',
    error: '錯誤',
    saveFailedPleaseTryAgainLater: '保存失敗，請稍後重試',
    confirm: '確定',
    noNetwork: '您沒有連接網絡，繼續返回將不會保存您的題目，確定要繼續返回嗎？',
    loading: '加載中...',
    pleaseCheckNetwork: '加載失敗，請檢查網絡是否連接',
    pleaseCheckiCloud: '加載失敗,請檢查iCloud是否登錄',
    untitled: '未命名',
    enlarge: '放大',
    encourage: '鼓勵我們❤️',
    share: '分享App',
    shareMessage: '一款支持自定義的數獨遊戲，快來試試吧！',
    wether: '無論哪種情況,紅色方格內都不能取{{target}}',
    case1: '情形一:',
    case2: '情形二:',
    case3: '情形三:',
    comma: ',',
    period: '。',
    end1: '紅色方格不能取{{target}}',
    end2: '紅色方格還是不能取{{target}}',
    theme: '主題',
    selectTheme: '選擇主題',
    lightMode: '淺色模式',
    darkMode: '深色模式',
    strictMode: '嚴格模式',
    reasonMode: '推理模式',
    strictText: '嚴格模式:當您輸入的數字與答案不符時，會提示錯誤',
    reasonText: '推理模式:當您輸入的數字與答案不符時，不會提示錯誤',
    localGames: '本地題庫',
    statistics: '統計',
    entry: '入門',
    easy: '簡單',
    medium: '中等',
    hard: '困難',
    extreme: '極難',
    dataSync: '資料同步說明',
    dataSyncDescription:
      '1.溫馨提示：如果您更換了裝置，iCloud資料可能不會立即同步到新裝置上，建議您重新打開幾次App或等待一段時間，在此期間您可以做本地題庫，等待舊的資料更新後，App會自動幫您將新的資料整合到一起',
    total: '總計',
    pleaseLoginGameCenter: '請先登錄GameCenter，如已登錄請重新打開App',
    tips: '提示',
    dataSyncDescription2: '2.您的排名會在24小時內同步全球。',
    fastestTime: '最快',
    averageTime: '平均',
    fixedDescription:
      '此操作會將當前棋盤里的數字固定，您將無法對被固定的數字進行修改，確定要執行嗎？',
    doNotShowAgain: '不再顯示',
    contactAuthor: '聯絡作者',
    boardLimit: '數獨題庫數量已達上限，最多只能創建300個題庫',
    storageSpaceInsufficient: '儲存空間不足',
    storageSpaceInsufficientDescription: 'iCloud儲存空間已滿，請清理儲存空間後重試，或者升級您的iCloud儲存計劃。',
    networkConnectionFailed: '網路連接失敗',
    networkConnectionFailedDescription: '請檢查您的網路連接和iCloud設定後重試。',
    saveFailed: '儲存失敗',
    saveFailedDescription: '資料儲存到iCloud時出現錯誤：{{error}}',
    updateAvailable: '發現新版本',
    updateMessage: '發現新版本 {{version}}，建議您更新以獲得更好的體驗和最新功能。',
    updateNow: '立即更新',
    later: '稍後提醒',
    updateNotes: '更新內容',
    currentVersion: '當前版本',
    newVersion: '新版本',
  },
};
