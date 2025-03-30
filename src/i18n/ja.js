export default {
  translation: {
    home: {
      title: '数独ゲーム',
      startGame: 'ゲームを始める',
      createGame: 'ゲームを作成',
      settings: '設定',
    },
    game: {
      pause: '一時停止',
      resume: '再開',
      restart: 'リスタート',
      quit: '終了',
    },
    difficulty: {
      title: '難易度選択',
      entry: '😀入門',
      easy: '🤔簡単',
      medium: '😮普通',
      hard: '😣難しい',
      extreme: '🤯超難しい',
      custom: 'カスタム',
    },
    start: '開始',
    continue: '続ける',
    undo: '元に戻す',
    erase: '消去',
    notes: 'メモ',
    autoNote: '自動メモ',
    hint: 'ヒント',
    apply: '適用',
    cancel: 'キャンセル',
    selectMode: 'モード選択',
    legal: '有効な数独',
    solving: '解析中...',
    illegal: '無効な数独',
    answer: '解答',
    incomplete: '未完成の数独',
    CHECK_CANDIDATE: '候補数チェック',
    SINGLE_CANDIDATE: '単一候補数',
    HIDDEN_SINGLE_ROW: '隠れ単一数',
    HIDDEN_SINGLE_COLUMN: '隠れ単一数',
    HIDDEN_SINGLE_BOX: '隠れ単一数',
    BLOCK_ELIMINATION_ROW: 'ブロック消去',
    BLOCK_ELIMINATION_COLUMN: 'ブロック消去',
    BLOCK_ELIMINATION_BOX_ROW: 'ブロック消去',
    BLOCK_ELIMINATION_BOX_COLUMN: 'ブロック消去',
    NAKED_PAIR_ROW: '顕在ペア',
    NAKED_PAIR_COLUMN: '顕在ペア',
    NAKED_PAIR_BOX: '顕在ペア',
    NAKED_TRIPLE_ROW1: '顕在トリプル',
    NAKED_TRIPLE_COLUMN1: '顕在トリプル',
    NAKED_TRIPLE_BOX1: '顕在トリプル',
    NAKED_TRIPLE_ROW2: '顕在トリプル',
    NAKED_TRIPLE_COLUMN2: '顕在トリプル',
    NAKED_TRIPLE_BOX2: '顕在トリプル',
    HIDDEN_PAIR_ROW: '隠れペア',
    HIDDEN_PAIR_COLUMN: '隠れペア',
    HIDDEN_PAIR_BOX: '隠れペア',
    HIDDEN_TRIPLE_ROW: '隠れトリプル',
    HIDDEN_TRIPLE_COLUMN: '隠れトリプル',
    HIDDEN_TRIPLE_BOX: '隠れトリプル',
    NAKED_QUADRUPLE_ROW: '顕在クアッド',
    NAKED_QUADRUPLE_COLUMN: '顕在クアッド',
    NAKED_QUADRUPLE_BOX: '顕在クアッド',
    X_WING_ROW: 'X-Wing',
    X_WING_COLUMN: 'X-Wing',
    X_WING_VARIENT_ROW: 'フィンX-Wing',
    X_WING_VARIENT_COLUMN: 'フィンX-Wing',
    XY_WING: 'XY-Wing',
    XYZ_WING: 'XYZ-Wing',
    SKYSCRAPER: 'スカイスクレーパー',
    SKYSCRAPER2: 'スカイスクレーパー2',
    REMOTE_PAIR: 'リモートペア',
    COMBINATION_CHAIN: '組み合わせチェーン',
    SWORDFISH_ROW: 'ソードフィッシュ',
    SWORDFISH_COLUMN: 'ソードフィッシュ',
    JELLYFISH_ROW: 'ジェリーフィッシュ',
    JELLYFISH_COLUMN: 'ジェリーフィッシュ',
    WXYZ_WING: 'WXYZ-Wing',
    LOOP: 'ループ',
    UNIQUE_RECTANGLE: '唯一矩形（ゆいいちくけい）',
    BINARY_UNIVERSAL_GRAVE: '全双値墳墓',
    DOUBLE_COLOR_CHAIN: '二色連鎖',
    TRIPLE_COLOR_CHAIN: '三色チェーン',
    TRIAL_AND_ERROR: '試行錯誤法',
    duration: '経過時間',
    mistakes: 'ミス回数',
    hintCount: 'ヒント使用回数',
    hints: {
      SINGLE_CANDIDATE:
        'マスR{{row}}C{{col}}には{{target}}という候補数が1つしかないため、このマスの値は{{target}}となります',
      HIDDEN_SINGLE_ROW:
        '{{row}}行目で候補数{{target}}が入れるマスは1つしかないため、このマスの値は{{target}}となります',
      HIDDEN_SINGLE_COLUMN:
        '{{col}}列目で候補数{{target}}が入れるマスは1つしかないため、このマスの値は{{target}}となります',
      HIDDEN_SINGLE_BOX:
        'ブロック{{box}}で候補数{{target}}が入れるマスは1つしかないため、このマスの値は{{target}}となります',
      TRIAL_AND_ERROR:
        '最も候補数の少ないマスに{{target}}を入れてみて、矛盾が生じた場合は{{target}}は誤りとなり、他の候補数を試します',
      BLOCK_ELIMINATION_ROW:
        'ブロック{{box}}内で候補数{{target}}は{{positions}}のマスにしか現れないため、同じ行の他のマスには{{target}}は入りません',
      BLOCK_ELIMINATION_COLUMN:
        'ブロック{{box}}内で候補数{{target}}は{{positions}}のマスにしか現れないため、同じ列の他のマスには{{target}}は入りません',
      BLOCK_ELIMINATION_BOX_ROW:
        '{{row}}行目で候補数{{target}}は{{positions}}のマスにしか現れないため、同じブロックの他のマスには{{target}}は入りません',
      BLOCK_ELIMINATION_BOX_COLUMN:
        '{{col}}列目で候補数{{target}}は{{positions}}のマスにしか現れないため、同じブロックの他のマスには{{target}}は入りません',
      NAKED_PAIR_ROW:
        '{{row}}行目で候補数{{target}}は{{positions}}の2マスにしか現れないため、同じ行の他のマスには{{target}}は入りません',
      NAKED_PAIR_COLUMN:
        '{{col}}列目で候補数{{target}}は{{positions}}の2マスにしか現れないため、同じ列の他のマスには{{target}}は入りません',
      NAKED_PAIR_BOX:
        'ブロック{{box}}内で候補数{{target}}は{{positions}}の2マスにしか現れないため、同じブロックの他のマスには{{target}}は入りません',
      NAKED_TRIPLE_ROW1:
        '{{row}}行目で候補数{{target}}は{{positions}}の3マスにしか現れないため、同じ行の他のマスには{{target}}は入りません',
      NAKED_TRIPLE_COLUMN1:
        '{{col}}列目で候補数{{target}}は{{positions}}の3マスにしか現れないため、同じ列の他のマスには{{target}}は入りません',
      NAKED_TRIPLE_BOX1:
        'ブロック{{box}}内で候補数{{target}}は{{positions}}の3マスにしか現れないため、同じブロックの他のマスには{{target}}は入りません',
      NAKED_TRIPLE_ROW2:
        '{{row}}行目で候補数{{target}}は{{positions}}の3マスにしか現れないため、同じ行の他のマスには{{target}}は入りません',
      NAKED_TRIPLE_COLUMN2:
        '{{col}}列目で候補数{{target}}は{{positions}}の3マスにしか現れないため、同じ列の他のマスには{{target}}は入りません',
      NAKED_TRIPLE_BOX2:
        'ブロック{{box}}内で候補数{{target}}は{{positions}}の3マスにしか現れないため、同じブロックの他のマスには{{target}}は入りません',
      NAKED_QUADRUPLE_ROW:
        '{{row}}行目で候補数{{target}}は{{positions}}の4マスにしか現れないため、同じ行の他のマスには{{target}}は入りません',
      NAKED_QUADRUPLE_COLUMN:
        '{{col}}列目で候補数{{target}}は{{positions}}の4マスにしか現れないため、同じ列の他のマスには{{target}}は入りません',
      NAKED_QUADRUPLE_BOX:
        'ブロック{{box}}内で候補数{{target}}は{{positions}}の4マスにしか現れないため、同じブロックの他のマスには{{target}}は入りません',
      HIDDEN_PAIR_ROW:
        '{{row}}行目で候補数{{candStr}}は{{positions}}の2マスにしか現れないため、これらのマスには他の候補数は入りません',
      HIDDEN_PAIR_COLUMN:
        '{{col}}列目で候補数{{candStr}}は{{positions}}の2マスにしか現れないため、これらのマスには他の候補数は入りません',
      HIDDEN_PAIR_BOX:
        'ブロック{{box}}内で候補数{{candStr}}は{{positions}}の2マスにしか現れないため、これらのマスには他の候補数は入りません',
      HIDDEN_TRIPLE_ROW:
        '{{row}}行目で候補数{{candStr}}は{{positions}}の3マスにしか現れないため、これらのマスには他の候補数は入りません',
      HIDDEN_TRIPLE_COLUMN:
        '{{col}}列目で候補数{{candStr}}は{{positions}}の3マスにしか現れないため、これらのマスには他の候補数は入りません',
      HIDDEN_TRIPLE_BOX:
        'ブロック{{box}}内で候補数{{candStr}}は{{positions}}の3マスにしか現れないため、これらのマスには他の候補数は入りません',
      X_WING_ROW:
        '{{row1}}行目と{{row2}}行目で、候補数{{candStr}}は各行2マスずつ同じ列に現れます。これら4マスのうちどの2マスが真になっても、その2列の他のマスは偽となります',
      X_WING_COLUMN:
        '{{col1}}列目と{{col2}}列目で、候補数{{candStr}}は各列2マスずつ同じ行に現れます。これら4マスのうちどの2マスが真になっても、その2行の他のマスは偽となります',
      X_WING_VARIENT_ROW:
        '{{positions}}の{{length}}マスのうちどの2マスに{{candStr}}が入っても、R{{row}}C{{col}}には候補数{{candStr}}は入りません',
      X_WING_VARIENT_COLUMN:
        '{{positions}}の{{length}}マスのうちどの2マスに{{candStr}}が入っても、R{{row}}C{{col}}には候補数{{candStr}}は入りません',
      XY_WING:
        '{{positions}}の3マスがどのような値になっても、{{deleteStr}}には候補数{{candStr}}は入りません',
      XYZ_WING:
        '{{positions}}の3マスがどのような値になっても、{{deleteStr}}には候補数{{candStr}}は入りません',
      SKYSCRAPER:
        '{{positions}}の青マスは共役鎖を形成します。R{{row1}}C{{col1}}またはR{{row2}}C{{col2}}が{{target}}になると、{{deleteStr}}には候補数{{target}}は入りません',
      SKYSCRAPER2:
        'マスR{{row1}}C{{col1}}とR{{row2}}C{{col2}}は強いリンクを形成し、マスR{{row3}}C{{col3}}とR{{row4}}C{{col4}}は別の強いリンクを形成します。これら2つの強いリンクはR{{row3}}C{{col3}}とR{{row2}}C{{col2}}間の弱いリンクで接続されています。R{{row1}}C{{col1}}が真の場合、{{deleteStr}}は偽となります。R{{row1}}C{{col1}}が偽の場合、R{{row4}}C{{col4}}は真となり、やはり{{deleteStr}}は偽となります。いずれの場合も、候補数{{target}}は{{deleteStr}}には入りません。',
      REMOTE_PAIR:
        '{{posStr1}}はリモートペアを形成し、これら2つのリモートペアは{{posStr2}}を通じて強いリンクを形成します。{{posStr1}}のどちらが真になっても、{{posStr}}には候補数{{target}}は入りません',
      WXYZ_WING:
        '{{candStr}}はWXYZ-Wingを形成し、R{{row1}}C{{col1}}がピボットとなります。これら4マスがどのような値になっても、候補数{{target}}は{{deleteStr}}には入りません',
      COMBINATION_CHAIN_3_2_1_STRONG:
        '{{candStr1}}の組み合わせと{{candStr2}}は強いリンクを形成します。{{candStr4}}のどれが真になっても、候補数{{target}}は{{posStr}}には入りません',
      COMBINATION_CHAIN_3_2_1_WEAK:
        '{{candStr1}}の組み合わせと{{candStr2}}は強いリンクを形成し、{{candStr3}}の4マスは強いリンクを形成します。これら2つの強いリンクは{{pivotStr}}による弱いリンクで接続されています。{{candStr4}}のどれが真になっても、候補数{{target}}は{{posStr}}には入りません',
      COMBINATION_CHAIN_3_2_2_WEAK:
        '{{candStr1}}の組み合わせと{{candStr2}}は強いリンクを形成し、{{candStr3}}の2マスは強いリンクを形成します。これら2つの強いリンクは{{pivotStr1}}と{{pivotStr2}}の2マスの全体による弱いリンクで接続されています。{{candStr4}}のどれが真になっても、候補数{{target}}は{{posStr}}には入りません',
      COMBINATION_CHAIN_3_2_2_STRONG:
        '{{candStr1}}の組み合わせと{{candStr2}}は強いリンクを形成し、{{candStr3}}の2マスは強いリンクを形成します。これら2つの強いリンクは{{pivotStr1}}と{{pivotStr2}}の2マスの全体による強いリンクで接続されています。{{candStr4}}のどれが真になっても、候補数{{target}}は{{posStr}}には入りません',
      LOOP_3_2_2:
        '{{nodeStr1}}は強いリンクを形成し、{{nodeStr2}}は強いリンクを形成し、{{nodeStr3}}は強いリンクを形成します。これらは弱いリンクを通じて循環します。{{rootNodeStr}}が偽であり、それから始まると仮定すると、両方向の論理的推論は最終的に循環に矛盾をもたらし、{{rootNodeStr}}は真でなければなりません',
      LOOP_3_2:
        '{{nodeStr1}}は強いリンクを形成し、{{nodeStr2}}は強いリンクを形成します。これらは弱いリンクを通じて循環します。{{rootNodeStr}}が偽であり、それから始まると仮定すると、両方向の論理的推論は最終的に循環に矛盾をもたらし、{{rootNodeStr}}は真でなければなりません',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}}と{{deleteStr}}は唯一の長方形のような構造を形成します。つまり、盤面には4つのマスがあり、それらの位置は長方形を形成し、2つの宫に位置し、内部には同じ候補数が2つずつあります。このような構造が盤面に現れると、この数独は不正であることを意味するため、{{deleteStr}}は候補数{{target}}を削除して数独が唯一の解を持つようにする必要があります',
      UNIQUE_RECTANGLE2:
        '赤いマスに{{target}}が入ると、{{nodeStr}}の4つのマスが唯一の長方形の構造を形成します。つまり、盤面には4つのマスがあり、それらの位置は長方形を形成し、2つの宫に位置し、内部には同じ候補数が2つずつあります。このような構造が盤面に現れると、この数独は不正であることを意味するため、赤いマスには候補数{{target}}が入ることはありません',
      BINARY_UNIVERSAL_GRAVE:
        '{{posStr}}が{{target}}でないと仮定すると、盤面のすべての候補マスには2つの候補数しかなく、各候補数は各行、各列、各ブロックに2回ずつしか現れません。このような構造は数独に複数の解をもたらすため、この状況を避けるために、{{posStr}}は{{target}}でなければなりません',
      SWORDFISH_ROW:
        '青色のマスがある3行には{{target}}に関する他の候補マスが存在せず、これらのマスがどのような値になっても、対応する3列には候補数{{target}}は存在しないはずです',
      SWORDFISH_COLUMN:
        '青色のマスがある3列には{{target}}に関する他の候補マスが存在せず、これらのマスがどのような値になっても、対応する3行には候補数{{target}}は存在しないはずです',
      JELLYFISH_ROW:
        '青色のマスがある4行には{{target}}に関する他の候補マスが存在せず、これらのマスがどのような値になっても、対応する4列には候補数{{target}}は存在しないはずです',
      JELLYFISH_COLUMN:
        '青色のマスがある4列には{{target}}に関する他の候補マスが存在せず、これらのマスがどのような値になっても、対応する4行には候補数{{target}}は存在しないはずです',
      DOUBLE_COLOR_CHAIN_delete:
        '{{posStr}}が{{target}}の場合、赤色のマスには{{target}}が入れません',
      DOUBLE_COLOR_CHAIN_s: '{{posStr1}}が{{target1}}の場合、{{posStr2}}は{{target2}}になります',
      DOUBLE_COLOR_CHAIN_r: '{{posStr1}}が{{target}}の場合、{{posStr2}}は{{target}}になれません',
      DOUBLE_COLOR_CHAIN_q:
        '{{posStr1}}と{{posStr2}}は{{target}}に関する強いリンクを形成するため、{{posStr2}}は{{target}}です',
      DOUBLE_COLOR_CHAIN_q_start:
        '{{posStr}}が{{target1}}の場合、現在のマスは{{target2}}になれません',
    },
    back: '戻る',
    next: '次のレベル',
    errorDraft: 'メモに誤りがあります。修正してください',
    pleaseConnectNetwork: 'ネットワークに接続してください',
    setting: '設定',
    removeAD: '広告を削除',
    sound: '効果音',
    notice: '通知',
    privacyPolicy: 'プライバシーポリシー',
    serviceTerms: '利用規約',
    language: '言語',
    feedback: 'フィードバック',
    feedbackMessage: 'メッセージ:',
    congratulations: 'おめでとうございます！',
    restore: '購入を復元',
    restoring: '購入を復元中...',
    purchasing: '購入中...',
    illegalPrompt:
      'システムは、頻繁にプログラムを終了することを検出しました。広告回避の疑いがあります。1分待ってから再試行してください。',
    highlight: 'ハイライト',
    myBoards: '自作数独',
    Home: 'ホーム',
    saveToMyBoards: '自作数独に保存',
    pleaseNameYourSudoku: '自作数独の名前をつけてください',
    success: '成功',
    sudokuSavedToMyBoards: '自作数独に保存しました！',
    error: 'エラー',
    saveFailedPleaseTryAgainLater: '保存に失敗しました。少し待ってから再試行してください。',
    confirm: '確認',
    noNetwork: 'ネットワーク接続がありません。続行すると、自作数独が保存されません。続行しますか？',
    loading: '読み込み中...',
    pleaseCheckNetwork: '読み込みに失敗しました。ネットワーク接続を確認してください。',
    pleaseCheckiCloud: '読み込みに失敗しました。iCloudにログインしていることを確認してください。',
    untitled: '未命名',
    enlarge: '拡大',
    encourage: '応援します❤️',
    share: 'アプリをシェアする',
    shareMessage: 'カスタマイズをサポートする数独ゲーム、ぜひ試してみてください！',
    wether: 'どのような場合でも、赤いマスには候補数{{target}}が入りません',
    case1: '場合1:',
    case2: '場合2:',
    case3: '場合3:',
    comma: '、',
    period: '.',
    end1: '赤いマスには候補数{{target}}が入りません',
    end2: '赤いマスにはやはり候補数{{target}}が入りません',
    theme: 'テーマ',
    selectTheme: 'テーマを選択',
    lightMode: 'ライトモード',
    darkMode: 'ダークモード',
    strictMode: '厳格モード',
    reasonMode: '推論モード',
    strictText: '厳格モード: 入力した数字が答えと一致しない場合、エラーメッセージが表示されます',
    reasonText: '推論モード: 入力した数字が答えと一致しない場合、エラーメッセージが表示されません',
  },
};
