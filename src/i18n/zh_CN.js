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
            entry: '入门',
            easy: '简单',
            medium: '中等',
            hard: '困难',
            extreme: '极难',
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
        HIDDEN_TRIPLE_ROW1: '隐性三数对',
        HIDDEN_TRIPLE_COLUMN1: '隐性三数对',
        HIDDEN_TRIPLE_BOX1: '隐性三数对',
        HIDDEN_TRIPLE_ROW2: '隐性三数对',
        HIDDEN_TRIPLE_COLUMN2: '隐性三数对',
        HIDDEN_TRIPLE_BOX2: '隐性三数对',
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
        SWORDFISH_WITH_FIN_ROW: '三阶带鳍鱼',
        SWORDFISH_WITH_FIN_COLUMN: '三阶带鳍鱼',
        WXYZ_WING: 'wxyz-wing',
        LOOP: '环',
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
                '在第{{position[0].row + 1}}行中，因为候选数{{candStr}}只出现在{{positions}}这两个方格中，因此这两个方格不应出现其他候选数',
            HIDDEN_PAIR_COLUMN:
                '在第{{col}}列中，因为候选数{{candStr}}只出现在{{positions}}这两个方格中，因此这两个方格不应出现其他候选数',
            HIDDEN_PAIR_BOX:
                '在第{{box}}宫中，因为候选数{{candStr}}只出现在{{positions}}这两个方格中，因此这两个方格不应出现其他候选数',
            HIDDEN_TRIPLE_ROW1:
                '在第{{position[0].row + 1}}行中，因为候选数{{candStr}}只出现在{{positions}}这三个方格中，因此这三个方格不应出现其他候选数',
            HIDDEN_TRIPLE_COLUMN1:
                '在第{{col}}列中，因为候选数{{candStr}}只出现在{{positions}}这三个方格中，因此这三个方格不应出现其他候选数',
            HIDDEN_TRIPLE_BOX1:
                '在第{{box}}宫中，因为候选数{{candStr}}只出现在{{positions}}这三个方格中，因此这三个方格不应出现其他候选数',
            HIDDEN_TRIPLE_ROW2:
                '在第{{row}}行中，因为候选数{{candStr}}只出现在{{positions}}这三个方格中，因此这三个方格不应出现其他候选数',
            HIDDEN_TRIPLE_COLUMN2:
                '在第{{col}}列中，因为候选数{{candStr}}只出现在{{positions}}这三个方格中，因此这三个方格不应出现其他候选数',
            HIDDEN_TRIPLE_BOX2:
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
                '{{positions}}这四个方格构成共轭链，无论R{{row1}}C{{col1}}还是R{{row2}}C{{col2}}取值为{{target}}，{{deleteStr}}内都不能出现候选数{{target}}',
            SKYSCRAPER2:
                '单元格R{{row1}}C{{col1}}和R{{row2}}C{{col2}}形成一个强链，单元格R{{row3}}C{{col3}}和R{{row4}}C{{col4}}形成另一个强链，这两个强链通过R{{row3}}C{{col3}}和R{{row2}}C{{col2}}之间的弱链相连。如果R{{row1}}C{{col1}}为真，则{{deleteStr}}必须为假。如果R{{row1}}C{{col1}}为假，则R{{row4}}C{{col4}}必须为真，这仍然会使{{deleteStr}}为假。无论如何，候选数{{target}}都不能出现在{{deleteStr}}内。',
            REMOTE_PAIR:
                '{{posStr1}}构成远程数对，这两个远程数对通过{{posStr2}}形成强链，无论{{posStr1}}谁为真，{{posStr}}内都不能出现候选数{{target}}',
            SWORDFISH_ROW:
                '在{{posStr}}这{{length}}个候选方格内，无论哪三个取{{target}}，第{{columns}}列内都不能出现候选数{{target}}',
            SWORDFISH_COLUMN:
                '在{{posStr}}这{{length}}个候选方格内，无论哪三个取{{target}}，第{{rows}}行内都不能出现候选数{{target}}',
            WXYZ_WING:
                '{{candStr}}构成WXYZ-Wing，其中R{{row1}}C{{col1}}为枢纽，无论这四个候选方格内如何取值，候选数{{target}}都不能出现在{{deleteStr}}内',
            COMBINATION_CHAIN_3_2_1_STRONG:
                '{{candStr1}}的组合与{{candStr2}}构成强链，无论{{candStr4}}内谁为真，候选数{{target}}都不能出现在{{posStr}}内',
            COMBINATION_CHAIN_3_2_1_WEAK:
                '{{candStr1}}的组合与{{candStr2}}构成强链，{{candStr3}}两个方格构成强链，这两条强链通过{{pivotStr}}构成的弱链相连，无论{{candStr4}}内谁为真，候选数{{target}}都不能出现在{{posStr}}内',
            COMBINATION_CHAIN_3_2_2_WEAK:
                '{{candStr1}}的组合与{{candStr2}}构成强链，{{candStr3}}两个方格构成强链，这两条强链通过{{pivotStr1}}与{{pivotStr2}}两方格的整体构成的弱链相连，无论{{candStr4}}内谁为真，候选数{{target}}都不能出现在{{posStr}}内',
            COMBINATION_CHAIN_3_2_2_STRONG:
                '{{candStr1}}的组合与{{candStr2}}构成强链，{{candStr3}}两个方格构成强链，这两条强链通过{{pivotStr1}}与{{pivotStr2}}两方格的整体构成的强链相连，无论{{candStr4}}内谁为真，候选数{{target}}都不能出现在{{posStr}}内',
            LOOP_3_2_2:
                '{{nodeStr1}}构成一组强链，{{nodeStr2}}构成一组强链，{{nodeStr3}}构成一组强链，它们之间通过弱链相连构成一个环，假设{{rootNodeStr}}为假并以它为起点分别以顺时针和逆时针进行逻辑推导，最终会导致环上某个节点矛盾，因此{{rootNodeStr}}必须为真'
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
        cancel: '取消',
        feedback: '反馈',
        feedbackMessage: '留言：',
        congratulations: '恭喜通关！',
        restore: '恢复购买',
        restoring: '恢复中...',
        purchasing: '购买中...',
    },
};
