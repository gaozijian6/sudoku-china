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
            entry: '入門',
            easy: '簡単',
            medium: '普通',
            hard: '難しい',
            extreme: '超難しい',
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
        HIDDEN_TRIPLE_ROW1: '隠れトリプル',
        HIDDEN_TRIPLE_COLUMN1: '隠れトリプル',
        HIDDEN_TRIPLE_BOX1: '隠れトリプル',
        HIDDEN_TRIPLE_ROW2: '隠れトリプル',
        HIDDEN_TRIPLE_COLUMN2: '隠れトリプル',
        HIDDEN_TRIPLE_BOX2: '隠れトリプル',
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
        SWORDFISH_WITH_FIN_ROW: 'フィンソードフィッシュ',
        SWORDFISH_WITH_FIN_COLUMN: 'フィンソードフィッシュ',
        WXYZ_WING: 'WXYZ-Wing',
        LOOP: 'ループ',
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
            HIDDEN_TRIPLE_ROW1:
                '{{row}}行目で候補数{{candStr}}は{{positions}}の3マスにしか現れないため、これらのマスには他の候補数は入りません',
            HIDDEN_TRIPLE_COLUMN1:
                '{{col}}列目で候補数{{candStr}}は{{positions}}の3マスにしか現れないため、これらのマスには他の候補数は入りません',
            HIDDEN_TRIPLE_BOX1:
                'ブロック{{box}}内で候補数{{candStr}}は{{positions}}の3マスにしか現れないため、これらのマスには他の候補数は入りません',
            HIDDEN_TRIPLE_ROW2:
                '{{row}}行目で候補数{{candStr}}は{{positions}}の3マスにしか現れないため、これらのマスには他の候補数は入りません',
            HIDDEN_TRIPLE_COLUMN2:
                '{{col}}列目で候補数{{candStr}}は{{positions}}の3マスにしか現れないため、これらのマスには他の候補数は入りません',
            HIDDEN_TRIPLE_BOX2:
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
                '{{positions}}の4マスは共役鎖を形成します。R{{row1}}C{{col1}}またはR{{row2}}C{{col2}}が{{target}}になると、{{deleteStr}}には候補数{{target}}は入りません',
            SKYSCRAPER2:
                'マスR{{row1}}C{{col1}}とR{{row2}}C{{col2}}は強いリンクを形成し、マスR{{row3}}C{{col3}}とR{{row4}}C{{col4}}は別の強いリンクを形成します。これら2つの強いリンクはR{{row3}}C{{col3}}とR{{row2}}C{{col2}}間の弱いリンクで接続されています。R{{row1}}C{{col1}}が真の場合、{{deleteStr}}は偽となります。R{{row1}}C{{col1}}が偽の場合、R{{row4}}C{{col4}}は真となり、やはり{{deleteStr}}は偽となります。いずれの場合も、候補数{{target}}は{{deleteStr}}には入りません。',
            REMOTE_PAIR:
                '{{posStr1}}はリモートペアを形成し、これら2つのリモートペアは{{posStr2}}を通じて強いリンクを形成します。{{posStr1}}のどちらが真になっても、{{posStr}}には候補数{{target}}は入りません',
            SWORDFISH_ROW:
                '{{posStr}}の{{length}}マスのうちどの3マスに{{target}}が入っても、{{columns}}列には候補数{{target}}は入りません',
            SWORDFISH_COLUMN:
                '{{posStr}}の{{length}}マスのうちどの3マスに{{target}}が入っても、{{rows}}行には候補数{{target}}は入りません',
            WXYZ_WING:
                '{{candStr}}はWXYZ-Wingを形成し、R{{row1}}C{{col1}}がピボットとなります。これら4マスがどのような値になっても、候補数{{target}}は{{deleteStr}}には入りません',
            COMBINATION_CHAIN_3_2_1_STRONG:
                '{{candStr1}}の組み合わせと{{candStr2}}は強いリンクを形成します。{{candStr4}}のどれが真になっても、候補数{{target}}は{{posStr}}には入りません',
            COMBINATION_CHAIN_3_2_1_WEAK:
                '{{candStr1}}の組み合わせと{{candStr2}}は強いリンクを形成し、{{candStr3}}の2マスは強いリンクを形成します。これら2つの強いリンクは{{pivotStr}}による弱いリンクで接続されています。{{candStr4}}のどれが真になっても、候補数{{target}}は{{posStr}}には入りません',
            COMBINATION_CHAIN_3_2_2_WEAK:
                '{{candStr1}}の組み合わせと{{candStr2}}は強いリンクを形成し、{{candStr3}}の2マスは強いリンクを形成します。これら2つの強いリンクは{{pivotStr1}}と{{pivotStr2}}の2マスの全体による弱いリンクで接続されています。{{candStr4}}のどれが真になっても、候補数{{target}}は{{posStr}}には入りません',
            COMBINATION_CHAIN_3_2_2_STRONG:
                '{{candStr1}}の組み合わせと{{candStr2}}は強いリンクを形成し、{{candStr3}}の2マスは強いリンクを形成します。これら2つの強いリンクは{{pivotStr1}}と{{pivotStr2}}の2マスの全体による強いリンクで接続されています。{{candStr4}}のどれが真になっても、候補数{{target}}は{{posStr}}には入りません',
            LOOP_3_2_2:
                '{{nodeStr1}}は強いリンクを形成し、{{nodeStr2}}は強いリンクを形成し、{{nodeStr3}}は強いリンクを形成します。これらは弱いリンクを通じて循環します。{{rootNodeStr}}が偽であり、それから始まると仮定すると、両方向の論理的推論は最終的に循環に矛盾をもたらし、{{rootNodeStr}}は真でなければなりません',
            LOOP_3_2:
                '{{nodeStr1}}は強いリンクを形成し、{{nodeStr2}}は強いリンクを形成します。これらは弱いリンクを通じて循環します。{{rootNodeStr}}が偽であり、それから始まると仮定すると、両方向の論理的推論は最終的に循環に矛盾をもたらし、{{rootNodeStr}}は真でなければなりません',
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
        illegalPrompt: 'システムは、頻繁にプログラムを終了することを検出しました。広告回避の疑いがあります。1分待ってから再試行してください。',
        highlight: 'ハイライト',
    },
};
