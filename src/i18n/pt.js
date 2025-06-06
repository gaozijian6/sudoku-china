export default {
  translation: {
    home: {
      title: 'Sudoku',
      startGame: 'Iniciar Jogo',
      createGame: 'Criar Jogo',
      settings: 'Configurações',
    },
    game: {
      pause: 'Pausar',
      resume: 'Continuar',
      restart: 'Reiniciar',
      quit: 'Sair',
    },
    difficulty: {
      title: 'Selecionar Dificuldade',
      entry: '😀Iniciante',
      easy: '🤔Fácil',
      medium: '😮Médio',
      hard: '😣Difícil',
      extreme: '🤯Extremo',
      custom: 'Personalizado',
    },
    start: 'Iniciar',
    continue: 'Continuar',
    undo: 'Desfazer',
    erase: 'Apagar',
    notes: 'Notas',
    autoNote: 'Nota Automática',
    hint: 'Dica',
    apply: 'Aplicar',
    cancel: 'Cancelar',
    selectMode: 'Selecionar Modo',
    legal: 'Sudoku Válido',
    solving: 'Resolvendo...',
    illegal: 'Sudoku Inválido',
    answer: 'Resposta',
    incomplete: 'Sudoku Incompleto',
    CHECK_CANDIDATE: 'Verificar Candidatos',
    SINGLE_CANDIDATE: 'Candidato Único',
    HIDDEN_SINGLE_ROW: 'Único Oculto',
    HIDDEN_SINGLE_COLUMN: 'Único Oculto',
    HIDDEN_SINGLE_BOX: 'Único Oculto',
    BLOCK_ELIMINATION_ROW: 'Eliminação em Bloco',
    BLOCK_ELIMINATION_COLUMN: 'Eliminação em Bloco',
    BLOCK_ELIMINATION_BOX_ROW: 'Eliminação em Bloco',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Eliminação em Bloco',
    NAKED_PAIR_ROW: 'Par Explícito',
    NAKED_PAIR_COLUMN: 'Par Explícito',
    NAKED_PAIR_BOX: 'Par Explícito',
    NAKED_TRIPLE_ROW1: 'Triplo Explícito',
    NAKED_TRIPLE_COLUMN1: 'Triplo Explícito',
    NAKED_TRIPLE_BOX1: 'Triplo Explícito',
    NAKED_TRIPLE_ROW2: 'Triplo Explícito',
    NAKED_TRIPLE_COLUMN2: 'Triplo Explícito',
    NAKED_TRIPLE_BOX2: 'Triplo Explícito',
    HIDDEN_PAIR_ROW: 'Par Oculto',
    HIDDEN_PAIR_COLUMN: 'Par Oculto',
    HIDDEN_PAIR_BOX: 'Par Oculto',
    HIDDEN_TRIPLE_ROW: 'Triplo Oculto',
    HIDDEN_TRIPLE_COLUMN: 'Triplo Oculto',
    HIDDEN_TRIPLE_BOX: 'Triplo Oculto',
    NAKED_QUADRUPLE_ROW: 'Quádruplo Explícito',
    NAKED_QUADRUPLE_COLUMN: 'Quádruplo Explícito',
    NAKED_QUADRUPLE_BOX: 'Quádruplo Explícito',
    X_WING_ROW: 'X-Wing',
    X_WING_COLUMN: 'X-Wing',
    X_WING_VARIENT_ROW: 'X-Wing com Barbatana',
    X_WING_VARIENT_COLUMN: 'X-Wing com Barbatana',
    XY_WING: 'XY-Wing',
    XYZ_WING: 'XYZ-Wing',
    SKYSCRAPER: 'Arranha-céu',
    SKYSCRAPER2: 'Dois elos fortes',
    THREESTRONGLINKS: 'Três elos fortes',
    XCHAIN: 'Cadeia X',
    COMBINATION_CHAIN: 'Cadeia de Combinação',
    SWORDFISH_ROW: 'Peixe-espada',
    SWORDFISH_COLUMN: 'Peixe-espada',
    JELLYFISH_ROW: 'Medusa',
    JELLYFISH_COLUMN: 'Medusa',
    WXYZ_WING: 'WXYZ-Wing',
    LOOP: 'Loop',
    UNIQUE_RECTANGLE: 'Retângulo Único',
    BINARY_UNIVERSAL_GRAVE: 'Tumba Binária Universal',
    DOUBLE_COLOR_CHAIN: 'Cadeia Bicolor',
    TRIPLE_COLOR_CHAIN: 'Cadeia Tricolor',
    TWO_STRING_KITE: 'Pipa de duas cordas',
    TRIAL_AND_ERROR: 'Tentativa e Erro',
    duration: 'Tempo',
    mistakes: 'Erros',
    hintCount: 'Dicas Usadas',
    hints: {
      SINGLE_CANDIDATE:
        'A célula R{{row}}C{{col}} tem apenas um candidato {{target}}, então seu valor deve ser {{target}}',
      HIDDEN_SINGLE_ROW:
        'O candidato {{target}} na linha {{row}} tem apenas uma posição possível, então seu valor deve ser {{target}}',
      HIDDEN_SINGLE_COLUMN:
        'O candidato {{target}} na coluna {{col}} tem apenas uma posição possível, então seu valor deve ser {{target}}',
      HIDDEN_SINGLE_BOX:
        'O candidato {{target}} no bloco {{box}} tem apenas uma posição possível, então seu valor deve ser {{target}}',
      TRIAL_AND_ERROR:
        'Tente preencher {{target}} na célula com menos candidatos. Se não houver solução, {{target}} está errado e outros candidatos devem ser tentados',
      BLOCK_ELIMINATION_ROW:
        'No bloco {{box}}, o candidato {{target}} só aparece nas posições {{positions}}, então {{target}} não pode aparecer em outras posições na mesma linha',
      BLOCK_ELIMINATION_COLUMN:
        'No bloco {{box}}, o candidato {{target}} só aparece nas posições {{positions}}, então {{target}} não pode aparecer em outras posições na mesma coluna',
      BLOCK_ELIMINATION_BOX_ROW:
        'Na linha {{row}}, o candidato {{target}} só aparece nas posições {{positions}}, então {{target}} não pode aparecer em outras posições no mesmo bloco',
      BLOCK_ELIMINATION_BOX_COLUMN:
        'Na coluna {{col}}, o candidato {{target}} só aparece nas posições {{positions}}, então {{target}} não pode aparecer em outras posições no mesmo bloco',
      NAKED_PAIR_ROW:
        'Na linha {{row}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições desta linha',
      NAKED_PAIR_COLUMN:
        'Na coluna {{col}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições desta coluna',
      NAKED_PAIR_BOX:
        'No bloco {{box}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições deste bloco',
      NAKED_TRIPLE_ROW1:
        'Na linha {{row}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições desta linha',
      NAKED_TRIPLE_COLUMN1:
        'Na coluna {{col}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições desta coluna',
      NAKED_TRIPLE_BOX1:
        'No bloco {{box}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições deste bloco',
      NAKED_TRIPLE_ROW2:
        'Na linha {{row}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições desta linha',
      NAKED_TRIPLE_COLUMN2:
        'Na coluna {{col}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições desta coluna',
      NAKED_TRIPLE_BOX2:
        'No bloco {{box}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições deste bloco',
      NAKED_QUADRUPLE_ROW:
        'Na linha {{row}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições desta linha',
      NAKED_QUADRUPLE_COLUMN:
        'Na coluna {{col}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições desta coluna',
      NAKED_QUADRUPLE_BOX:
        'No bloco {{box}}, como o candidato {{target}} só pode aparecer nas células {{positions}}, {{target}} não pode aparecer em outras posições deste bloco',
      HIDDEN_PAIR_ROW:
        'Na linha {{row}}, como os candidatos {{candStr}} só aparecem nas células {{positions}}, estas células não devem conter outros candidatos',
      HIDDEN_PAIR_COLUMN:
        'Na coluna {{col}}, como os candidatos {{candStr}} só aparecem nas células {{positions}}, estas células não devem conter outros candidatos',
      HIDDEN_PAIR_BOX:
        'No bloco {{box}}, como os candidatos {{candStr}} só aparecem nas células {{positions}}, estas células não devem conter outros candidatos',
      HIDDEN_TRIPLE_ROW:
        'Na linha {{row}}, como os candidatos {{candStr}} só aparecem nas células {{positions}}, estas células não devem conter outros candidatos',
      HIDDEN_TRIPLE_COLUMN:
        'Na coluna {{col}}, como os candidatos {{candStr}} só aparecem nas células {{positions}}, estas células não devem conter outros candidatos',
      HIDDEN_TRIPLE_BOX:
        'No bloco {{box}}, como os candidatos {{candStr}} só aparecem nas células {{positions}}, estas células não devem conter outros candidatos',
      X_WING_ROW:
        'Nas linhas {{row1}} e {{row2}}, o candidato {{candStr}} tem duas posições possíveis em cada linha com as mesmas colunas. Independentemente de quais duas das quatro células sejam verdadeiras, outras posições nestas duas colunas devem ser falsas',
      X_WING_COLUMN:
        'Nas colunas {{col1}} e {{col2}}, o candidato {{candStr}} tem duas posições possíveis em cada coluna com as mesmas linhas. Independentemente de quais duas das quatro células sejam verdadeiras, outras posições nestas duas linhas devem ser falsas',
      X_WING_VARIENT_ROW:
        'Independentemente de quais duas células entre {{positions}} ({{length}} células) contenham {{candStr}}, R{{row}}C{{col}} não deve conter o candidato {{candStr}}',
      X_WING_VARIENT_COLUMN:
        'Independentemente de quais duas células entre {{positions}} ({{length}} células) contenham {{candStr}}, R{{row}}C{{col}} não deve conter o candidato {{candStr}}',
      XY_WING:
        'Independentemente de como as células {{positions}} são preenchidas, {{deleteStr}} não pode conter o candidato {{candStr}}',
      XYZ_WING:
        'Independentemente de como as células {{positions}} são preenchidas, {{deleteStr}} não pode conter o candidato {{candStr}}',
      SKYSCRAPER:
        'As células azuis {{positions}} formam uma cadeia conjugada. Seja R{{row1}}C{{col1}} ou R{{row2}}C{{col2}} igual a {{target}}, {{deleteStr}} não pode conter o candidato {{target}}',
      SKYSCRAPER2:
        'As células R{{row1}}C{{col1}} e R{{row2}}C{{col2}} formam uma cadeia forte, e R{{row3}}C{{col3}} e R{{row4}}C{{col4}} formam outra cadeia forte. Estas duas cadeias estão conectadas por uma cadeia fraca entre R{{row3}}C{{col3}} e R{{row2}}C{{col2}}. Se R{{row1}}C{{col1}} for verdadeiro, {{deleteStr}} deve ser falso. Se R{{row1}}C{{col1}} for falso, R{{row4}}C{{col4}} deve ser verdadeiro, o que ainda faria {{deleteStr}} falso. Em qualquer caso, o candidato {{target}} não pode aparecer em {{deleteStr}}',
      WXYZ_WING:
        '{{candStr}} forma um WXYZ-Wing com R{{row1}}C{{col1}} como pivô. Independentemente de como estas quatro células são preenchidas, o candidato {{target}} não pode aparecer em {{deleteStr}}',
      COMBINATION_CHAIN_3_2_1_STRONG:
        'A combinação de {{candStr1}} e {{candStr2}} forma uma cadeia forte. Independentemente de qual em {{candStr4}} seja verdadeiro, o candidato {{target}} não pode aparecer em {{posStr}}',
      COMBINATION_CHAIN_3_2_1_WEAK:
        'A combinação de {{candStr1}} e {{candStr2}} forma uma cadeia forte, {{candStr3}} forma uma cadeia forte entre quatro células, e estas duas cadeias fortes estão conectadas por uma cadeia fraca formada por {{pivotStr}}. Independentemente de qual em {{candStr4}} seja verdadeiro, o candidato {{target}} não pode aparecer em {{posStr}}',
      COMBINATION_CHAIN_3_2_2_WEAK:
        'A combinação de {{candStr1}} e {{candStr2}} forma uma cadeia forte, {{candStr3}} forma uma cadeia forte entre duas células, e estas duas cadeias fortes estão conectadas por uma cadeia fraca formada pelo conjunto de {{pivotStr1}} e {{pivotStr2}}. Independentemente de qual em {{candStr4}} seja verdadeiro, o candidato {{target}} não pode aparecer em {{posStr}}',
      COMBINATION_CHAIN_3_2_2_STRONG:
        'A combinação de {{candStr1}} e {{candStr2}} forma uma cadeia forte, {{candStr3}} forma uma cadeia forte entre duas células, e estas duas cadeias fortes estão conectadas por uma cadeia forte formada pelo conjunto de {{pivotStr1}} e {{pivotStr2}}. Independentemente de qual em {{candStr4}} seja verdadeiro, o candidato {{target}} não pode aparecer em {{posStr}}',
      LOOP_3_2_2:
        '{{nodeStr1}} forma uma cadeia forte, {{nodeStr2}} forma uma cadeia forte, {{nodeStr3}} forma uma cadeia forte. Estas três cadeias fortes estão conectadas por uma cadeia fraca para formar um ciclo. Suponha que {{rootNodeStr}} seja falso e comece por ele, a dedução lógica em ambas as direções terminará por levar a uma contradição no ciclo, então {{rootNodeStr}} deve ser verdadeiro.',
      LOOP_3_2:
        '{{nodeStr1}} forma uma cadeia forte, {{nodeStr2}} forma uma cadeia forte. Estas duas cadeias fortes estão conectadas por uma cadeia fraca para formar um ciclo. Suponha que {{rootNodeStr}} seja falso e comece por ele, a dedução lógica em ambas as direções terminará por levar a uma contradição no ciclo, então {{rootNodeStr}} deve ser verdadeiro.',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}} e {{deleteStr}} formam uma estrutura de retângulo único, ou seja, existem quatro células no tabuleiro que formam um retângulo, posicionadas em dois blocos diferentes, e cada uma delas tem dois candidatos iguais. Quando essa estrutura aparece no tabuleiro, significa que o sudoku não é válido, então {{deleteStr}} deve eliminar o candidato {{target}} para garantir que o sudoku tenha uma solução única.',
      UNIQUE_RECTANGLE2:
        'Se a célula vermelha contiver {{target}}, então as quatro células em {{nodeStr}} formarão uma estrutura de retângulo único, ou seja, existem quatro células no tabuleiro que formam um retângulo, posicionadas em dois blocos diferentes, e cada uma delas tem dois candidatos iguais. Quando essa estrutura aparece no tabuleiro, significa que o sudoku atual é inválido. Portanto, a célula vermelha não pode conter o candidato {{target}}.',
      BINARY_UNIVERSAL_GRAVE:
        'Suponha que {{posStr}} não contenha {{target}}, todas as células candidatas no tabuleiro terão apenas dois candidatos, e cada candidato aparecerá apenas duas vezes em cada linha, coluna e bloco. Essa estrutura levará a múltiplas soluções no sudoku. Para evitar essa situação, {{posStr}} deve conter {{target}}.',
      SWORDFISH_ROW:
        'As células azuis estão localizadas em três linhas onde não existem outros candidatos para {{target}}. Independentemente de como essas células são preenchidas, o candidato {{target}} não deve aparecer nas três colunas correspondentes',
      SWORDFISH_COLUMN:
        'As células azuis estão localizadas em três colunas onde não existem outros candidatos para {{target}}. Independentemente de como essas células são preenchidas, o candidato {{target}} não deve aparecer nas três linhas correspondentes',
      JELLYFISH_ROW:
        'As células azuis estão localizadas em quatro linhas onde não existem outros candidatos para {{target}}. Independentemente de como essas células são preenchidas, o candidato {{target}} não deve aparecer nas quatro colunas correspondentes',
      JELLYFISH_COLUMN:
        'As células azuis estão localizadas em quatro colunas onde não existem outros candidatos para {{target}}. Independentemente de como essas células são preenchidas, o candidato {{target}} não deve aparecer nas quatro linhas correspondentes',
      DOUBLE_COLOR_CHAIN_delete:
        'quando {{posStr}} assume {{target}}, a célula vermelha não pode assumir {{target}}',
      DOUBLE_COLOR_CHAIN_s:
        'quando {{posStr1}} assume {{target1}}, isso fará com que {{posStr2}} assuma {{target2}}',
      DOUBLE_COLOR_CHAIN_r:
        'quando {{posStr1}} assume {{target}}, isso impede que {{posStr2}} assuma {{target}}',
      DOUBLE_COLOR_CHAIN_q:
        'como {{posStr1}} e {{posStr2}} formam uma ligação forte para {{target}}, {{posStr2}} deve ser {{target}}',
      DOUBLE_COLOR_CHAIN_q_start:
        'quando {{posStr}} assume {{target1}}, a célula atual não pode assumir {{target2}}',
      COMBINATION_CHAIN_AB_STRONG: '{{A}} e {{B}} formam um elo forte',
      COMBINATION_CHAIN_AB_WEAK: '{{A}} e {{B}} formam um elo fraco',
      COMBINATION_CHAIN_END:
        'Quando {{A}} é verdadeiro, a célula vermelha é falsa. Quando {{A}} é falso, através de dedução {{B}} torna-se verdadeiro, e a célula vermelha continua falsa',
      SKYSCRAPER2_1:
        'Existe um elo forte entre as duas células {{As}}, existe um elo forte entre quatro células {{Bs}}, e estes dois elos fortes estão conectados por um elo fraco entre as duas células {{Cs}}. Quando {{A}} é verdadeiro, a célula vermelha é falsa. Quando {{A}} é falso, {{B}} é verdadeiro, e a célula vermelha continua falsa',
      SKYSCRAPER2_2:
        'Existe um elo forte entre as duas células {{As}}, existe um elo forte entre as duas células {{Bs}}, e existe um elo forte entre as duas células {{Cs}}. Cada elo forte está conectado aos outros por elos fracos. Quando {{A}} é verdadeiro, a célula vermelha é falsa. Quando {{A}} é falso, {{B}} é verdadeiro, e a célula vermelha continua falsa',
    },
    back: 'Voltar',
    next: 'Próximo',
    errorDraft: 'Há erros nas notas, por favor corrija primeiro',
    pleaseConnectNetwork: 'Por favor, conecte-se à internet',
    setting: 'Configurações',
    removeAD: 'Remover Anúncios',
    sound: 'Som',
    notice: 'Notificações',
    privacyPolicy: 'Política de Privacidade',
    serviceTerms: 'Termos de Serviço',
    language: 'Idioma',
    feedback: 'Feedback',
    feedbackMessage: 'Mensagem:',
    congratulations: 'Parabéns!',
    restore: 'Restaurar compra',
    restoring: 'Restaurando compra...',
    purchasing: 'Comprando...',
    illegalPrompt:
      'O sistema detectou que você está saindo do programa frequentemente, o que pode ser um sinal de evasão de anúncios. Por favor, aguarde um minuto e tente novamente.',
    highlight: 'Resaltar',
    myBoards: 'Meus Sudokus',
    Home: 'Início',
    saveToMyBoards: 'Salvar em Meus Sudokus',
    pleaseNameYourSudoku: 'Por favor, dê um nome ao seu Sudoku',
    success: 'Sucesso',
    sudokuSavedToMyBoards: 'Sudoku salvo em Meus Sudokus!',
    error: 'Erro',
    saveFailedPleaseTryAgainLater: 'Salvamento falhou, por favor, tente novamente mais tarde',
    confirm: 'Confirmar',
    noNetwork:
      'Você não tem uma conexão de internet. Se continuar, seu sudoku não será salvo. Você deseja continuar?',
    loading: 'Carregando...',
    pleaseCheckNetwork:
      'Carregamento falhou, por favor, verifique se a conexão de internet está estabelecida',
    pleaseCheckiCloud: 'Carregamento falhou, por favor, verifique se iCloud está conectado',
    untitled: 'Sem título',
    enlarge: 'Aumentar',
    encourage: 'Incentivar-nos❤️',
    share: 'Compartilhar',
    shareMessage: 'Um jogo de sudoku que suporta personalização, experimente!',
    wether: 'Independentemente de qual situação, a célula vermelha não pode conter {{target}}',
    case1: 'Caso 1:',
    case2: 'Caso 2:',
    case3: 'Caso 3:',
    comma: ',',
    period: '.',
    end1: 'A célula vermelha não pode conter {{target}}',
    end2: 'A célula vermelha ainda não pode conter {{target}}',
    theme: 'Tema',
    selectTheme: 'Selecionar Tema',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Escuro',
    strictMode: 'Modo Estrito',
    reasonMode: 'Modo de Razonamento',
    strictText:
      'Modo estrito: Quando o valor que você insere não corresponde à resposta, uma mensagem de erro será exibida',
    reasonText:
      'Modo de razonamento: Quando o valor que você insere não corresponde à resposta, uma mensagem de erro não será exibida',
    localGames: 'Sudokus Locais',
    statistics: 'Estatísticas',
    entry: 'Iniciante',
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
    extreme: 'Extremo',
    dataSync: 'Instruções de sincronização de dados',
    dataSyncDescription:
      '1.Lembrete amigável: Se você trocar de dispositivo, os dados do iCloud podem não sincronizar imediatamente com o novo dispositivo. Sugerimos reabrir o aplicativo várias vezes ou aguardar um pouco. Durante este período, você pode trabalhar em puzzles locais. Após a atualização dos dados antigos, o aplicativo automaticamente ajudará a integrar os novos dados.',
    total: 'Total',
    pleaseLoginGameCenter:
      'Por favor, faça login no GameCenter primeiro. Se já estiver logado, reabra o aplicativo.',
    tips: 'Dicas',
    dataSyncDescription2: '2.Sua classificação será sincronizada globalmente em 24 horas.',
    fastestTime: 'Mais rápido',
    averageTime: 'Médio',
    fixedDescription:
      'Esta operação fixará os números atuais no tabuleiro. Você não poderá modificar os números fixados. Tem certeza de que deseja continuar?',
    doNotShowAgain: 'Não mostrar novamente',
    boardLimit: 'O número de sudokus atingiu o limite superior, e você só pode criar até 300 sudokus',
    updateAvailable: 'Atualização disponível',
    updateMessage: 'Nova versão {{version}} disponível. Recomendamos atualizar para melhor experiência e recursos mais recentes.',
    updateNow: 'Atualizar agora',
    later: 'Mais tarde',
    contactAuthor: 'Contate o autor',
  },
};
