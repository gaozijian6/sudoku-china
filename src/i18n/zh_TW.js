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
            entry: '入門',
            easy: '簡單',
            medium: '中等',
            hard: '困難',
            extreme: '極難',
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
        HIDDEN_TRIPLE_ROW1: '隱性三數對',
        HIDDEN_TRIPLE_COLUMN1: '隱性三數對',
        HIDDEN_TRIPLE_BOX1: '隱性三數對',
        HIDDEN_TRIPLE_ROW2: '隱性三數對',
        HIDDEN_TRIPLE_COLUMN2: '隱性三數對',
        HIDDEN_TRIPLE_BOX2: '隱性三數對',
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
        SKYSCRAPER2: '摩天樓2',
        REMOTE_PAIR: '遠程數對',
        COMBINATION_CHAIN: '組合鏈',
        SWORDFISH_ROW: '三階魚',
        SWORDFISH_COLUMN: '三階魚',
        SWORDFISH_WITH_FIN_ROW: '三階帶鰭魚',
        SWORDFISH_WITH_FIN_COLUMN: '三階帶鰭魚',
        WXYZ_WING: 'wxyz-wing',
        LOOP: '環',
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
            HIDDEN_TRIPLE_ROW1:
                '在第{{row}}行中，因為候選數{{candStr}}只出現在{{positions}}這三個方格中，因此這三個方格不應出現其他候選數',
            HIDDEN_TRIPLE_COLUMN1:
                '在第{{col}}列中，因為候選數{{candStr}}只出現在{{positions}}這三個方格中，因此這三個方格不應出現其他候選數',
            HIDDEN_TRIPLE_BOX1:
                '在第{{box}}宮中，因為候選數{{candStr}}只出現在{{positions}}這三個方格中，因此這三個方格不應出現其他候選數',
            HIDDEN_TRIPLE_ROW2:
                '在第{{row}}行中，因為候選數{{candStr}}只出現在{{positions}}這三個方格中，因此這三個方格不應出現其他候選數',
            HIDDEN_TRIPLE_COLUMN2:
                '在第{{col}}列中，因為候選數{{candStr}}只出現在{{positions}}這三個方格中，因此這三個方格不應出現其他候選數',
            HIDDEN_TRIPLE_BOX2:
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
                '{{positions}}這四個方格構成共軛鏈，無論R{{row1}}C{{col1}}還是R{{row2}}C{{col2}}取值為{{target}}，{{deleteStr}}內都不能出現候選數{{target}}',
            SKYSCRAPER2:
                '單元格R{{row1}}C{{col1}}和R{{row2}}C{{col2}}形成一個強鏈，單元格R{{row3}}C{{col3}}和R{{row4}}C{{col4}}形成另一個強鏈，這兩個強鏈通過R{{row3}}C{{col3}}和R{{row2}}C{{col2}}之間的弱鏈相連。如果R{{row1}}C{{col1}}為真，則{{deleteStr}}必須為假。如果R{{row1}}C{{col1}}為假，則R{{row4}}C{{col4}}必須為真，這仍然會使{{deleteStr}}為假。無論如何，候選數{{target}}都不能出現在{{deleteStr}}內。',
            REMOTE_PAIR:
                '{{posStr1}}構成遠程數對，這兩個遠程數對通過{{posStr2}}形成強鏈，無論{{posStr1}}誰為真，{{posStr}}內都不能出現候選數{{target}}',
            SWORDFISH_ROW:
                '在{{posStr}}這{{length}}個候選方格內，無論哪三個取{{target}}，第{{columns}}列內都不能出現候選數{{target}}',
            SWORDFISH_COLUMN:
                '在{{posStr}}這{{length}}個候選方格內，無論哪三個取{{target}}，第{{rows}}行內都不能出現候選數{{target}}',
            WXYZ_WING:
                '{{candStr}}構成WXYZ-Wing，其中R{{row1}}C{{col1}}為樞紐，無論這四個候選方格內如何取值，候選數{{target}}都不能出現在{{deleteStr}}內',
            COMBINATION_CHAIN_3_2_1_STRONG:
                '{{candStr1}}的組合與{{candStr2}}構成強鏈，無論{{candStr4}}內誰為真，候選數{{target}}都不能出現在{{posStr}}內',
            COMBINATION_CHAIN_3_2_1_WEAK:
                '{{candStr1}}的組合與{{candStr2}}構成強鏈，{{candStr3}}兩個方格構成強鏈，這兩條強鏈通過{{pivotStr}}構成的弱鏈相連，無論{{candStr4}}內誰為真，候選數{{target}}都不能出現在{{posStr}}內',
            COMBINATION_CHAIN_3_2_2_WEAK:
                '{{candStr1}}的組合與{{candStr2}}構成強鏈，{{candStr3}}兩個方格構成強鏈，這兩條強鏈通過{{pivotStr1}}與{{pivotStr2}}兩方格的整體構成的弱鏈相連，無論{{candStr4}}內誰為真，候選數{{target}}都不能出現在{{posStr}}內',
            COMBINATION_CHAIN_3_2_2_STRONG:
                '{{candStr1}}的組合與{{candStr2}}構成強鏈，{{candStr3}}兩個方格構成強鏈，這兩條強鏈通過{{pivotStr1}}與{{pivotStr2}}兩方格的整體構成的強鏈相連，無論{{candStr4}}內誰為真，候選數{{target}}都不能出現在{{posStr}}內',
            LOOP_3_2_2:
                '{{nodeStr1}}構成一組強鏈，{{nodeStr2}}構成一組強鏈，{{nodeStr3}}構成一組強鏈，它們之間通過弱鏈相連構成一個環，假設{{rootNodeStr}}為假并以它為起點分別以順時針和逆時針進行邏輯推導，最終會導致環上某個節點矛盾，因此{{rootNodeStr}}必須為真',
            LOOP_3_2:
                '{{nodeStr1}}構成一組強鏈，{{nodeStr2}}構成一組強鏈，它們之間通過弱鏈相連構成一個環，假設{{rootNodeStr}}為假并以它為起點分別以順時針和逆時針進行邏輯推導，最終會導致環上某個節點矛盾，因此{{rootNodeStr}}必須為真'
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
    },
};
