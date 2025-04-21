export default {
  translation: {
    home: {
      title: 'Sudoku',
      startGame: 'Inizia Partita',
      createGame: 'Crea Partita',
      settings: 'Impostazioni',
    },
    game: {
      pause: 'Pausa',
      resume: 'Riprendi',
      restart: 'Ricomincia',
      quit: 'Esci',
    },
    difficulty: {
      title: 'Seleziona Difficoltà',
      entry: '😀Principiante',
      easy: '🤔Facile',
      medium: '😮Medio',
      hard: '😣Difficile',
      extreme: '🤯Estremo',
      custom: 'Personalizzato',
    },
    start: 'Inizia',
    continue: 'Continua',
    undo: 'Annulla',
    erase: 'Cancella',
    notes: 'Note',
    autoNote: 'Note Automatiche',
    hint: 'Suggerimento',
    apply: 'Applica',
    cancel: 'Annulla',
    selectMode: 'Seleziona Modalità',
    legal: 'Sudoku Valido',
    solving: 'Risolvendo...',
    illegal: 'Sudoku Non Valido',
    answer: 'Risposta',
    incomplete: 'Sudoku Incompleto',
    CHECK_CANDIDATE: 'Controllo Candidati',
    SINGLE_CANDIDATE: 'Candidato Singolo',
    HIDDEN_SINGLE_ROW: 'Singolo Nascosto',
    HIDDEN_SINGLE_COLUMN: 'Singolo Nascosto',
    HIDDEN_SINGLE_BOX: 'Singolo Nascosto',
    BLOCK_ELIMINATION_ROW: 'Eliminazione Blocco',
    BLOCK_ELIMINATION_COLUMN: 'Eliminazione Blocco',
    BLOCK_ELIMINATION_BOX_ROW: 'Eliminazione Blocco',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Eliminazione Blocco',
    NAKED_PAIR_ROW: 'Coppia Nuda',
    NAKED_PAIR_COLUMN: 'Coppia Nuda',
    NAKED_PAIR_BOX: 'Coppia Nuda',
    NAKED_TRIPLE_ROW1: 'Tripletta Nuda',
    NAKED_TRIPLE_COLUMN1: 'Tripletta Nuda',
    NAKED_TRIPLE_BOX1: 'Tripletta Nuda',
    NAKED_TRIPLE_ROW2: 'Tripletta Nuda',
    NAKED_TRIPLE_COLUMN2: 'Tripletta Nuda',
    NAKED_TRIPLE_BOX2: 'Tripletta Nuda',
    HIDDEN_PAIR_ROW: 'Coppia Nascosta',
    HIDDEN_PAIR_COLUMN: 'Coppia Nascosta',
    HIDDEN_PAIR_BOX: 'Coppia Nascosta',
    HIDDEN_TRIPLE_ROW: 'Tripletta Nascosta',
    HIDDEN_TRIPLE_COLUMN: 'Tripletta Nascosta',
    HIDDEN_TRIPLE_BOX: 'Tripletta Nascosta',
    NAKED_QUADRUPLE_ROW: 'Quadrupla Nuda',
    NAKED_QUADRUPLE_COLUMN: 'Quadrupla Nuda',
    NAKED_QUADRUPLE_BOX: 'Quadrupla Nuda',
    X_WING_ROW: 'X-Wing',
    X_WING_COLUMN: 'X-Wing',
    X_WING_VARIENT_ROW: 'X-Wing con Pinna',
    X_WING_VARIENT_COLUMN: 'X-Wing con Pinna',
    XY_WING: 'XY-Wing',
    XYZ_WING: 'XYZ-Wing',
    SKYSCRAPER: 'Grattacielo',
    SKYSCRAPER2: 'Due collegamenti forti',
    THREESTRONGLINKS: 'Tre collegamenti forti',
    XCHAIN: 'Catena X',
    COMBINATION_CHAIN: 'Catena Combinata',
    SWORDFISH_ROW: 'Pesce Spada',
    SWORDFISH_COLUMN: 'Pesce Spada',
    JELLYFISH_ROW: 'Medusa',
    JELLYFISH_COLUMN: 'Medusa',
    WXYZ_WING: 'WXYZ-Wing',
    LOOP: 'Loop',
    UNIQUE_RECTANGLE: 'Rettangolo Unico',
    BINARY_UNIVERSAL_GRAVE: 'Tumba binaria universale',
    DOUBLE_COLOR_CHAIN: 'Catena Bicolor',
    TRIPLE_COLOR_CHAIN: 'Catena Tricolor',
    TRIAL_AND_ERROR: 'Tentativi ed Errori',
    duration: 'Tempo',
    mistakes: 'Errori',
    hintCount: 'Suggerimenti',
    hints: {
      SINGLE_CANDIDATE:
        'La cella R{{row}}C{{col}} ha solo il candidato {{target}}, quindi il suo valore deve essere {{target}}',
      HIDDEN_SINGLE_ROW:
        'Il candidato {{target}} nella riga {{row}} appare solo in una cella, quindi il suo valore deve essere {{target}}',
      HIDDEN_SINGLE_COLUMN:
        'Il candidato {{target}} nella colonna {{col}} appare solo in una cella, quindi il suo valore deve essere {{target}}',
      HIDDEN_SINGLE_BOX:
        'Il candidato {{target}} nel box {{box}} appare solo in una cella, quindi il suo valore deve essere {{target}}',
      TRIAL_AND_ERROR:
        'Prova a inserire {{target}} nella cella con il minor numero di candidati. Se non porta a una soluzione, il {{target}} è errato e si devono provare altri candidati',
      BLOCK_ELIMINATION_ROW:
        'Nel box {{box}}, il candidato {{target}} appare solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della stessa riga',
      BLOCK_ELIMINATION_COLUMN:
        'Nel box {{box}}, il candidato {{target}} appare solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della stessa colonna',
      BLOCK_ELIMINATION_BOX_ROW:
        'Nella riga {{row}}, il candidato {{target}} appare solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle dello stesso box',
      BLOCK_ELIMINATION_BOX_COLUMN:
        'Nella colonna {{col}}, il candidato {{target}} appare solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle dello stesso box',
      NAKED_PAIR_ROW:
        'Nella riga {{row}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della riga',
      NAKED_PAIR_COLUMN:
        'Nella colonna {{col}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della colonna',
      NAKED_PAIR_BOX:
        'Nel box {{box}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle del box',
      NAKED_TRIPLE_ROW1:
        'Nella riga {{row}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della riga',
      NAKED_TRIPLE_COLUMN1:
        'Nella colonna {{col}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della colonna',
      NAKED_TRIPLE_BOX1:
        'Nel box {{box}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle del box',
      NAKED_TRIPLE_ROW2:
        'Nella riga {{row}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della riga',
      NAKED_TRIPLE_COLUMN2:
        'Nella colonna {{col}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della colonna',
      NAKED_TRIPLE_BOX2:
        'Nel box {{box}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle del box',
      NAKED_QUADRUPLE_ROW:
        'Nella riga {{row}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della riga',
      NAKED_QUADRUPLE_COLUMN:
        'Nella colonna {{col}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle della colonna',
      NAKED_QUADRUPLE_BOX:
        'Nel box {{box}}, il candidato {{target}} può apparire solo nelle posizioni {{positions}}, quindi non può apparire nelle altre celle del box',
      HIDDEN_PAIR_ROW:
        'Nella riga {{row}}, i candidati {{candStr}} appaiono solo nelle posizioni {{positions}}, quindi queste celle non possono contenere altri candidati',
      HIDDEN_PAIR_COLUMN:
        'Nella colonna {{col}}, i candidati {{candStr}} appaiono solo nelle posizioni {{positions}}, quindi queste celle non possono contenere altri candidati',
      HIDDEN_PAIR_BOX:
        'Nel box {{box}}, i candidati {{candStr}} appaiono solo nelle posizioni {{positions}}, quindi queste celle non possono contenere altri candidati',
      HIDDEN_TRIPLE_ROW:
        'Nella riga {{row}}, i candidati {{candStr}} appaiono solo nelle posizioni {{positions}}, quindi queste celle non possono contenere altri candidati',
      HIDDEN_TRIPLE_COLUMN:
        'Nella colonna {{col}}, i candidati {{candStr}} appaiono solo nelle posizioni {{positions}}, quindi queste celle non possono contenere altri candidati',
      HIDDEN_TRIPLE_BOX:
        'Nel box {{box}}, i candidati {{candStr}} appaiono solo nelle posizioni {{positions}}, quindi queste celle non possono contenere altri candidati',
      X_WING_ROW:
        'Nelle righe {{row1}} e {{row2}}, il candidato {{candStr}} forma un X-Wing, quindi non può apparire nelle altre celle delle colonne interessate',
      X_WING_COLUMN:
        'Nelle colonne {{col1}} e {{col2}}, il candidato {{candStr}} forma un X-Wing, quindi non può apparire nelle altre celle delle righe interessate',
      X_WING_VARIENT_ROW:
        'Nelle posizioni {{positions}} con {{length}} celle, qualsiasi combinazione di {{candStr}} implica che R{{row}}C{{col}} non può contenere {{candStr}}',
      X_WING_VARIENT_COLUMN:
        'Nelle posizioni {{positions}} con {{length}} celle, qualsiasi combinazione di {{candStr}} implica che R{{row}}C{{col}} non può contenere {{candStr}}',
      XY_WING:
        'Qualunque sia la combinazione nelle posizioni {{positions}}, {{deleteStr}} non può contenere il candidato {{candStr}}',
      XYZ_WING:
        'Qualunque sia la combinazione nelle posizioni {{positions}}, {{deleteStr}} non può contenere il candidato {{candStr}}',
      SKYSCRAPER:
        'Le celle blu {{positions}} formano una catena coniugata. Sia che R{{row1}}C{{col1}} o R{{row2}}C{{col2}} sia {{target}}, {{deleteStr}} non può contenere {{target}}',
      SKYSCRAPER2:
        "Le celle R{{row1}}C{{col1}} e R{{row2}}C{{col2}} formano una catena forte, R{{row3}}C{{col3}} e R{{row4}}C{{col4}} formano un'altra catena forte, collegate da una catena debole tra R{{row3}}C{{col3}} e R{{row2}}C{{col2}}. In ogni caso, {{deleteStr}} non può contenere {{target}}",
      WXYZ_WING:
        '{{candStr}} forma un WXYZ-Wing con perno in R{{row1}}C{{col1}}. Qualunque sia la combinazione, {{target}} non può apparire in {{deleteStr}}',
      COMBINATION_CHAIN_3_2_1_STRONG:
        'La combinazione di {{candStr1}} e {{candStr2}} forma una catena forte. Qualunque sia il valore in {{candStr4}}, {{target}} non può apparire in {{posStr}}',
      COMBINATION_CHAIN_3_2_1_WEAK:
        "La combinazione di {{candStr1}} e {{candStr2}} forma una catena forte, {{candStr3}} forma un'altra catena forte con quattro celle, collegate da {{pivotStr}}. Qualunque sia il valore in {{candStr4}}, {{target}} non può apparire in {{posStr}}",
      COMBINATION_CHAIN_3_2_2_WEAK:
        "La combinazione di {{candStr1}} e {{candStr2}} forma una catena forte, {{candStr3}} forma un'altra catena forte, collegate da {{pivotStr1}} e {{pivotStr2}}. Qualunque sia il valore in {{candStr4}}, {{target}} non può apparire in {{posStr}}",
      COMBINATION_CHAIN_3_2_2_STRONG:
        "La combinazione di {{candStr1}} e {{candStr2}} forma una catena forte, {{candStr3}} forma un'altra catena forte, collegate fortemente da {{pivotStr1}} e {{pivotStr2}}. Qualunque sia il valore in {{candStr4}}, {{target}} non può apparire in {{posStr}}",
      LOOP_3_2_2:
        '{{nodeStr1}} forma una catena forte, {{nodeStr2}} forma una catena forte, {{nodeStr3}} forma una catena forte. Sono collegate da una catena debole per formare un ciclo. Supponiamo che {{rootNodeStr}} sia falso e parta da esso, la deduzione logica in entrambe le direzioni finirà per portare a una contraddizione sul ciclo, quindi {{rootNodeStr}} deve essere vero.',
      LOOP_3_2:
        '{{nodeStr1}} forma una catena forte, {{nodeStr2}} forma una catena forte. Sono collegate da una catena debole per formare un ciclo. Supponiamo che {{rootNodeStr}} sia falso e parta da esso, la deduzione logica in entrambe le direzioni finirà per portare a una contraddizione sul ciclo, quindi {{rootNodeStr}} deve essere vero.',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}} e {{deleteStr}} formano una struttura simile a un rettangolo unico, cioè ci sono quattro celle che formano un rettangolo, posizionate in due box diversi, e contengono due stessi candidati. Quando appare questa struttura, significa che il Sudoku non è valido, quindi {{deleteStr}} deve eliminare il candidato {{target}} per garantire una soluzione unica',
      UNIQUE_RECTANGLE2:
        'Se la cella rossa contiene {{target}}, allora {{nodeStr}} formano una struttura simile a un rettangolo unico, cioè ci sono quattro celle che formano un rettangolo, posizionate in due box diversi, e contengono due stessi candidati. Quando appare questa struttura, significa che il Sudoku non è valido, quindi la cella rossa non può contenere il candidato {{target}}',
      BINARY_UNIVERSAL_GRAVE:
        'Supponiamo che {{posStr}} non sia {{target}}, tutte le celle candidate nella griglia contengono solo due candidati, e ogni candidato appare solo due volte in ogni riga, colonna e box. Questa struttura porta a soluzioni multiple, quindi per evitare ciò, {{posStr}} deve essere {{target}}',
      SWORDFISH_ROW:
        'Le celle blu nelle tre righe non contengono altri candidati per {{target}}. Qualunque sia la combinazione in queste celle, il candidato {{target}} non dovrebbe apparire nelle tre colonne corrispondenti',
      SWORDFISH_COLUMN:
        'Le celle blu nelle tre colonne non contengono altri candidati per {{target}}. Qualunque sia la combinazione in queste celle, il candidato {{target}} non dovrebbe apparire nelle tre righe corrispondenti',
      JELLYFISH_ROW:
        'Le celle blu nelle quattro righe non contengono altri candidati per {{target}}. Qualunque sia la combinazione in queste celle, il candidato {{target}} non dovrebbe apparire nelle quattro colonne corrispondenti',
      JELLYFISH_COLUMN:
        'Le celle blu nelle quattro colonne non contengono altri candidati per {{target}}. Qualunque sia la combinazione in queste celle, il candidato {{target}} non dovrebbe apparire nelle quattro righe corrispondenti',
      DOUBLE_COLOR_CHAIN_delete:
        'quando {{posStr}} assume {{target}}, la cella rossa non può assumere {{target}}',
      DOUBLE_COLOR_CHAIN_s:
        'quando {{posStr1}} assume {{target1}}, porta {{posStr2}} ad assumere {{target2}}',
      DOUBLE_COLOR_CHAIN_r:
        'quando {{posStr1}} assume {{target}}, impedisce a {{posStr2}} di assumere {{target}}',
      DOUBLE_COLOR_CHAIN_q:
        'poiché {{posStr1}} e {{posStr2}} formano un collegamento forte per {{target}}, {{posStr2}} deve essere {{target}}',
      DOUBLE_COLOR_CHAIN_q_start:
        'quando {{posStr}} assume {{target1}}, la cella corrente non può assumere {{target2}}',
      COMBINATION_CHAIN_AB_STRONG: '{{A}} e {{B}} formano un collegamento forte',
      COMBINATION_CHAIN_AB_WEAK: '{{A}} e {{B}} formano un collegamento debole',
      COMBINATION_CHAIN_END:
        'Quando {{A}} è vero, la cella rossa è falsa. Quando {{A}} è falso, tramite deduzione {{B}} diventa vero, e la cella rossa rimane falsa',
      SKYSCRAPER2_1:
        'Esiste un collegamento forte tra le due celle {{As}}, esiste un collegamento forte tra quattro celle {{Bs}}, e questi due collegamenti forti sono connessi da un collegamento debole tra le due celle {{Cs}}. Quando {{A}} è vero, la cella rossa è falsa. Quando {{A}} è falso, {{B}} è vero, e la cella rossa rimane falsa',
      SKYSCRAPER2_2:
        'Esiste un collegamento forte tra le due celle {{As}}, esiste un collegamento forte tra le due celle {{Bs}}, ed esiste un collegamento forte tra le due celle {{Cs}}. Ogni collegamento forte è connesso agli altri da collegamenti deboli. Quando {{A}} è vero, la cella rossa è falsa. Quando {{A}} è falso, {{B}} è vero, e la cella rossa rimane falsa',
    },
    back: 'Indietro',
    next: 'Prossimo Livello',
    errorDraft: 'Ci sono errori nelle note, correggili prima',
    pleaseConnectNetwork: 'Connettiti alla rete',
    setting: 'Impostazioni',
    removeAD: 'Rimuovi Pubblicità',
    sound: 'Suono',
    notice: 'Notifiche',
    privacyPolicy: 'Privacy Policy',
    serviceTerms: 'Termini di Servizio',
    language: 'Lingua',
    feedback: 'Feedback',
    feedbackMessage: 'Messaggio:',
    congratulations: 'Congratulazioni!',
    restore: 'Ripristina acquisto',
    restoring: 'Ripristino acquisto...',
    purchasing: 'Acquisto in corso...',
    illegalPrompt:
      'Il sistema ha rilevato che stai abbandonando il programma frequentemente, il che potrebbe essere un segno di evasione delle pubblicità. Per favore, attendi un minuto e riprova.',
    highlight: 'Sottolinea',
    myBoards: 'I miei Sudoku',
    Home: 'Home',
    saveToMyBoards: 'Salva in I miei Sudoku',
    pleaseNameYourSudoku: 'Per favore, dai un nome al tuo Sudoku',
    success: 'Successo',
    sudokuSavedToMyBoards: 'Sudoku salvato in I miei Sudoku!',
    error: 'Errore',
    saveFailedPleaseTryAgainLater: 'Salvataggio fallito, per favore riprova più tardi',
    confirm: 'Conferma',
    noNetwork:
      'Non hai una connessione internet. Se prosegui, il tuo sudoku non sarà salvato. Sei sicuro di voler proseguire?',
    loading: 'Caricamento...',
    pleaseCheckNetwork:
      'Caricamento fallito, per favore controlla se la connessione internet è stabilita',
    pleaseCheckiCloud: 'Caricamento fallito, per favore controlla se iCloud è connesso',
    untitled: 'Senza nome',
    enlarge: 'Aumenta',
    encourage: 'Incentiva noi❤️',
    share: 'Condividi',
    shareMessage: 'Un gioco di sudoku che supporta la personalizzazione, prova!',
    wether: 'Qualunque sia la situazione, la cella rossa non può contenere {{target}}',
    case1: 'Caso 1:',
    case2: 'Caso 2:',
    case3: 'Caso 3:',
    comma: ',',
    period: '.',
    end1: 'La cella rossa non può contenere {{target}}',
    end2: 'La cella rossa non può ancora contenere {{target}}',
    theme: 'Tema',
    selectTheme: 'Seleziona Tema',
    lightMode: 'Modalità Chiaro',
    darkMode: 'Modalità Scuro',
    strictMode: 'Modalità stretta',
    reasonMode: 'Modalità deduzione',
    strictText:
      'Modalità stretta: Quando il valore che inserisci non corrisponde alla risposta, viene visualizzato un messaggio di errore',
    reasonText:
      'Modalità deduzione: Quando il valore che inserisci non corrisponde alla risposta, non viene visualizzato un messaggio di errore',
    localGames: 'Sudoku Locali',
    statistics: 'Statistiche',
    entry: 'Principiante',
    easy: 'Facile',
    medium: 'Medio',
    hard: 'Difficile',
    extreme: 'Estremo',
    dataSync: 'Istruzioni di sincronizzazione dei dati',
    dataSyncDescription:
      "1.Promemoria amichevole: Se cambi dispositivo, i dati di iCloud potrebbero non sincronizzarsi immediatamente sul nuovo dispositivo. Ti suggeriamo di riaprire l'App più volte o di attendere un po'. Durante questo periodo, puoi lavorare sui puzzle locali. Dopo l'aggiornamento dei vecchi dati, l'App ti aiuterà automaticamente a integrare insieme i nuovi dati.",
    total: 'Totale',
    pleaseLoginGameCenter:
      "Accedi prima a GameCenter. Se hai già effettuato l'accesso, riapri l'applicazione.",
    tips: 'Suggerimenti',
    dataSyncDescription2: '2.La tua classifica sarà sincronizzata a livello globale entro 24 ore.',
  },
};
