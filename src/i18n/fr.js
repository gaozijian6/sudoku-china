export default {
  translation: {
    home: {
      title: 'Sudoku',
      startGame: 'Commencer',
      createGame: 'Créer une partie',
      settings: 'Paramètres',
    },
    game: {
      pause: 'Pause',
      resume: 'Reprendre',
      restart: 'Recommencer',
      quit: 'Quitter',
    },
    difficulty: {
      title: 'Choisir la difficulté',
      entry: '😀Débutant',
      easy: '🤔Facile',
      medium: '😮Moyen',
      hard: '😣Difficile',
      extreme: '🤯Extrême',
      custom: 'Personnalisé',
    },
    start: 'Commencer',
    continue: 'Continuer',
    undo: 'Annuler',
    erase: 'Effacer',
    notes: 'Notes',
    autoNote: 'Notes auto',
    hint: 'Indice',
    apply: 'Appliquer',
    cancel: 'Annuler',
    selectMode: 'Sélectionner le mode',
    legal: 'Sudoku valide',
    solving: 'Résolution...',
    illegal: 'Sudoku invalide',
    answer: 'Solution',
    incomplete: 'Sudoku incomplet',
    CHECK_CANDIDATE: 'Vérification des candidats',
    SINGLE_CANDIDATE: 'Candidat unique',
    HIDDEN_SINGLE_ROW: 'Caché unique',
    HIDDEN_SINGLE_COLUMN: 'Caché unique',
    HIDDEN_SINGLE_BOX: 'Caché unique',
    BLOCK_ELIMINATION_ROW: 'Élimination de bloc',
    BLOCK_ELIMINATION_COLUMN: 'Élimination de bloc',
    BLOCK_ELIMINATION_BOX_ROW: 'Élimination de bloc',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Élimination de bloc',
    NAKED_PAIR_ROW: 'Paire nue',
    NAKED_PAIR_COLUMN: 'Paire nue',
    NAKED_PAIR_BOX: 'Paire nue',
    NAKED_TRIPLE_ROW1: 'Triple nu',
    NAKED_TRIPLE_COLUMN1: 'Triple nu',
    NAKED_TRIPLE_BOX1: 'Triple nu',
    NAKED_TRIPLE_ROW2: 'Triple nu',
    NAKED_TRIPLE_COLUMN2: 'Triple nu',
    NAKED_TRIPLE_BOX2: 'Triple nu',
    HIDDEN_PAIR_ROW: 'Paire cachée',
    HIDDEN_PAIR_COLUMN: 'Paire cachée',
    HIDDEN_PAIR_BOX: 'Paire cachée',
    HIDDEN_TRIPLE_ROW: 'Triple caché',
    HIDDEN_TRIPLE_COLUMN: 'Triple caché',
    HIDDEN_TRIPLE_BOX: 'Triple caché',
    NAKED_QUADRUPLE_ROW: 'Quadruple nu',
    NAKED_QUADRUPLE_COLUMN: 'Quadruple nu',
    NAKED_QUADRUPLE_BOX: 'Quadruple nu',
    X_WING_ROW: 'X-Wing',
    X_WING_COLUMN: 'X-Wing',
    X_WING_VARIENT_ROW: 'X-Wing avec aileron',
    X_WING_VARIENT_COLUMN: 'X-Wing avec aileron',
    XY_WING: 'XY-Wing',
    XYZ_WING: 'XYZ-Wing',
    SKYSCRAPER: 'Gratte-ciel',
    SKYSCRAPER2: 'Gratte-ciel 2',
    REMOTE_PAIR: 'Paire à distance',
    COMBINATION_CHAIN: 'Chaîne combinée',
    SWORDFISH_ROW: 'Swordfish',
    SWORDFISH_COLUMN: 'Swordfish',
    JELLYFISH_ROW: 'Jellyfish',
    JELLYFISH_COLUMN: 'Jellyfish',
    WXYZ_WING: 'WXYZ-Wing',
    LOOP: 'Boucle',
    UNIQUE_RECTANGLE: 'Rectangle unique',
    BINARY_UNIVERSAL_GRAVE: 'Grave universelle binaire',
    DOUBLE_COLOR_CHAIN: 'Chaîne Bicolor',
    TRIPLE_COLOR_CHAIN: 'Chaîne Tricolor',
    TRIAL_AND_ERROR: 'Essai et erreur',
    duration: 'Durée',
    mistakes: 'Erreurs',
    hintCount: 'Indices utilisés',
    hints: {
      SINGLE_CANDIDATE:
        "La cellule R{{row}}C{{col}} n'a qu'un seul candidat {{target}}, donc sa valeur est {{target}}",
      HIDDEN_SINGLE_ROW:
        "Le candidat {{target}} n'apparaît qu'une fois dans la ligne {{row}}, donc sa valeur est {{target}}",
      HIDDEN_SINGLE_COLUMN:
        "Le candidat {{target}} n'apparaît qu'une fois dans la colonne {{col}}, donc sa valeur est {{target}}",
      HIDDEN_SINGLE_BOX:
        "Le candidat {{target}} n'apparaît qu'une fois dans le bloc {{box}}, donc sa valeur est {{target}}",
      TRIAL_AND_ERROR:
        'Essayons {{target}} dans la cellule avec le moins de candidats. Si cela mène à une contradiction, {{target}} est faux',
      BLOCK_ELIMINATION_ROW:
        "Dans le bloc {{box}}, le candidat {{target}} n'apparaît que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la même ligne",
      BLOCK_ELIMINATION_COLUMN:
        "Dans le bloc {{box}}, le candidat {{target}} n'apparaît que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la même colonne",
      BLOCK_ELIMINATION_BOX_ROW:
        "Dans la ligne {{row}}, le candidat {{target}} n'apparaît que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans le même bloc",
      BLOCK_ELIMINATION_BOX_COLUMN:
        "Dans la colonne {{col}}, le candidat {{target}} n'apparaît que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans le même bloc",
      NAKED_PAIR_ROW:
        'Dans la ligne {{row}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la ligne',
      NAKED_PAIR_COLUMN:
        'Dans la colonne {{col}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la colonne',
      NAKED_PAIR_BOX:
        'Dans le bloc {{box}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans le bloc',
      NAKED_TRIPLE_ROW1:
        'Dans la ligne {{row}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la ligne',
      NAKED_TRIPLE_COLUMN1:
        'Dans la colonne {{col}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la colonne',
      NAKED_TRIPLE_BOX1:
        'Dans le bloc {{box}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans le bloc',
      NAKED_TRIPLE_ROW2:
        'Dans la ligne {{row}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la ligne',
      NAKED_TRIPLE_COLUMN2:
        'Dans la colonne {{col}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la colonne',
      NAKED_TRIPLE_BOX2:
        'Dans le bloc {{box}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans le bloc',
      NAKED_QUADRUPLE_ROW:
        'Dans la ligne {{row}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la ligne',
      NAKED_QUADRUPLE_COLUMN:
        'Dans la colonne {{col}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans la colonne',
      NAKED_QUADRUPLE_BOX:
        'Dans le bloc {{box}}, le candidat {{target}} ne peut apparaître que dans les positions {{positions}}, donc il ne peut pas apparaître ailleurs dans le bloc',
      HIDDEN_PAIR_ROW:
        "Dans la ligne {{row}}, les candidats {{candStr}} n'apparaissent que dans les positions {{positions}}, donc ces cellules ne peuvent pas contenir d'autres candidats",
      HIDDEN_PAIR_COLUMN:
        "Dans la colonne {{col}}, les candidats {{candStr}} n'apparaissent que dans les positions {{positions}}, donc ces cellules ne peuvent pas contenir d'autres candidats",
      HIDDEN_PAIR_BOX:
        "Dans le bloc {{box}}, les candidats {{candStr}} n'apparaissent que dans les positions {{positions}}, donc ces cellules ne peuvent pas contenir d'autres candidats",
      HIDDEN_TRIPLE_ROW:
        "Dans la ligne {{row}}, les candidats {{candStr}} n'apparaissent que dans les positions {{positions}}, donc ces cellules ne peuvent pas contenir d'autres candidats",
      HIDDEN_TRIPLE_COLUMN:
        "Dans la colonne {{col}}, les candidats {{candStr}} n'apparaissent que dans les positions {{positions}}, donc ces cellules ne peuvent pas contenir d'autres candidats",
      HIDDEN_TRIPLE_BOX:
        "Dans le bloc {{box}}, les candidats {{candStr}} n'apparaissent que dans les positions {{positions}}, donc ces cellules ne peuvent pas contenir d'autres candidats",
      X_WING_ROW:
        "Dans les lignes {{row1}} et {{row2}}, le candidat {{candStr}} n'apparaît que dans deux positions avec les mêmes colonnes. Quelle que soit la solution, les autres positions de ces colonnes ne peuvent pas contenir {{candStr}}",
      X_WING_COLUMN:
        "Dans les colonnes {{col1}} et {{col2}}, le candidat {{candStr}} n'apparaît que dans deux positions avec les mêmes lignes. Quelle que soit la solution, les autres positions de ces lignes ne peuvent pas contenir {{candStr}}",
      X_WING_VARIENT_ROW:
        'Parmi les {{length}} positions {{positions}}, quelle que soit la solution, R{{row}}C{{col}} ne peut pas contenir {{candStr}}',
      X_WING_VARIENT_COLUMN:
        'Parmi les {{length}} positions {{positions}}, quelle que soit la solution, R{{row}}C{{col}} ne peut pas contenir {{candStr}}',
      XY_WING:
        'Quelle que soit la solution pour les positions {{positions}}, {{deleteStr}} ne peut pas contenir {{candStr}}',
      XYZ_WING:
        'Quelle que soit la solution pour les positions {{positions}}, {{deleteStr}} ne peut pas contenir {{candStr}}',
      SKYSCRAPER:
        'Les cellules bleues {{positions}} forment une chaîne conjuguée. Que ce soit R{{row1}}C{{col1}} ou R{{row2}}C{{col2}} qui contienne {{target}}, {{deleteStr}} ne peut pas contenir {{target}}',
      SKYSCRAPER2:
        'Les cellules R{{row1}}C{{col1}} et R{{row2}}C{{col2}} forment une chaîne forte, les cellules R{{row3}}C{{col3}} et R{{row4}}C{{col4}} forment une autre chaîne forte, reliées par une chaîne faible entre R{{row3}}C{{col3}} et R{{row2}}C{{col2}}. Si R{{row1}}C{{col1}} est vrai, {{deleteStr}} doit être faux. Si R{{row1}}C{{col1}} est faux, R{{row4}}C{{col4}} doit être vrai, ce qui rend également {{deleteStr}} faux. Dans tous les cas, {{target}} ne peut pas apparaître dans {{deleteStr}}',
      REMOTE_PAIR:
        '{{posStr1}} forme une paire à distance, ces deux paires à distance forment une chaîne forte via {{posStr2}}. Quel que soit {{posStr1}}, {{posStr}} ne peut pas contenir {{target}}',
      WXYZ_WING:
        '{{candStr}} forme un WXYZ-Wing avec R{{row1}}C{{col1}} comme pivot. Quelle que soit la solution, {{target}} ne peut pas apparaître dans {{deleteStr}}',
      COMBINATION_CHAIN_3_2_1_STRONG:
        'La combinaison de {{candStr1}} et {{candStr2}} forme une chaîne forte. Quel que soit {{candStr4}}, {{target}} ne peut pas apparaître dans {{posStr}}',
      COMBINATION_CHAIN_3_2_1_WEAK:
        'La combinaison de {{candStr1}} et {{candStr2}} forme une chaîne forte, {{candStr3}} forme une chaîne forte avec quatre cellules, reliées par une chaîne faible via {{pivotStr}}. Quel que soit {{candStr4}}, {{target}} ne peut pas apparaître dans {{posStr}}',
      COMBINATION_CHAIN_3_2_2_WEAK:
        'La combinaison de {{candStr1}} et {{candStr2}} forme une chaîne forte, {{candStr3}} forme une chaîne forte, reliées par une chaîne faible via {{pivotStr1}} et {{pivotStr2}}. Quel que soit {{candStr4}}, {{target}} ne peut pas apparaître dans {{posStr}}',
      COMBINATION_CHAIN_3_2_2_STRONG:
        'La combinaison de {{candStr1}} et {{candStr2}} forme une chaîne forte, {{candStr3}} forme une chaîne forte, reliées par une chaîne forte via {{pivotStr1}} et {{pivotStr2}}. Quel que soit {{candStr4}}, {{target}} ne peut pas apparaître dans {{posStr}}',
      LOOP_3_2_2:
        '{{nodeStr1}} forme une chaîne forte, {{nodeStr2}} forme une chaîne forte, {{nodeStr3}} forme une chaîne forte. Elles sont reliées par une chaîne faible pour former un cycle. Si {{rootNodeStr}} est faux et part de lui, la déduction logique dans les deux sens finalement mènera à une contradiction sur le cycle, donc {{rootNodeStr}} doit être vrai.',
      LOOP_3_2:
        '{{nodeStr1}} forme une chaîne forte, {{nodeStr2}} forme une chaîne forte. Elles sont reliées par une chaîne faible pour former un cycle. Si {{rootNodeStr}} est faux et part de lui, la déduction logique dans les deux sens finalement mènera à une contradiction sur le cycle, donc {{rootNodeStr}} doit être vrai.',
      UNIQUE_RECTANGLE1:
        "{{nodeStr}} et {{deleteStr}} forment une structure similaire à un rectangle unique, c'est-à-dire qu'il y a quatre cellules sur la grille formant un rectangle avec deux candidats identiques à l'intérieur, positionnées dans deux lignes et deux colonnes différentes et situées dans deux blocs. Lorsque cette structure apparaît, cela signifie que le sudoku actuel n'est pas valide, donc {{deleteStr}} doit supprimer le candidat {{target}} pour garantir une solution unique au sudoku",
      UNIQUE_RECTANGLE2:
        "Si la cellule rouge contient {{target}}, alors les quatre cellules {{nodeStr}} formeront une structure de rectangle unique, c'est-à-dire qu'il y a quatre cellules sur la grille formant un rectangle avec deux candidats identiques à l'intérieur, positionnées dans deux lignes et deux colonnes différentes et situées dans deux blocs. Lorsque cette structure apparaît, cela signifie que le sudoku actuel n'est pas valide, donc la cellule rouge ne peut pas contenir le candidat {{target}}",
      BINARY_UNIVERSAL_GRAVE:
        "Si nous supposons que {{posStr}} ne contient pas {{target}}, alors toutes les cellules candidates sur la grille n'auront que deux candidats, et chaque candidat n'apparaîtra que deux fois dans chaque ligne, colonne et bloc. Cette structure entraînera plusieurs solutions pour le sudoku. Pour éviter cela, {{posStr}} doit contenir {{target}}",
      SWORDFISH_ROW:
        "Les cellules bleues situées dans trois lignes ne contiennent pas d'autres candidats pour {{target}}. Quelle que soit la solution, {{target}} ne devrait pas apparaître dans les trois colonnes correspondantes",
      SWORDFISH_COLUMN:
        "Les cellules bleues situées dans trois colonnes ne contiennent pas d'autres candidats pour {{target}}. Quelle que soit la solution, {{target}} ne devrait pas apparaître dans les trois lignes correspondantes",
      JELLYFISH_ROW:
        "Les cellules bleues situées dans quatre lignes ne contiennent pas d'autres candidats pour {{target}}. Quelle que soit la solution, {{target}} ne devrait pas apparaître dans les quatre colonnes correspondantes",
      JELLYFISH_COLUMN:
        "Les cellules bleues situées dans quatre colonnes ne contiennent pas d'autres candidats pour {{target}}. Quelle que soit la solution, {{target}} ne devrait pas apparaître dans les quatre lignes correspondantes",
      DOUBLE_COLOR_CHAIN_delete:
        'quand {{posStr}} prend {{target}}, la cellule rouge ne peut pas prendre {{target}}',
      DOUBLE_COLOR_CHAIN_s:
        'quand {{posStr1}} prend {{target1}}, cela conduit {{posStr2}} à prendre {{target2}}',
      DOUBLE_COLOR_CHAIN_r:
        'quand {{posStr1}} prend {{target}}, cela empêche {{posStr2}} de prendre {{target}}',
      DOUBLE_COLOR_CHAIN_q:
        'parce que {{posStr1}} et {{posStr2}} forment un lien fort pour {{target}}, {{posStr2}} doit être {{target}}',
      DOUBLE_COLOR_CHAIN_q_start:
        'quand {{posStr}} prend {{target1}}, la cellule actuelle ne peut pas prendre {{target2}}',
    },
    back: 'Retour',
    next: 'Suivant',
    errorDraft: 'Il y a des erreurs dans les notes, veuillez les corriger',
    pleaseConnectNetwork: 'Veuillez vous connecter à Internet',
    setting: 'Paramètres',
    removeAD: 'Supprimer les pubs',
    sound: 'Son',
    notice: 'Notifications',
    privacyPolicy: 'Politique de confidentialité',
    serviceTerms: "Conditions d'utilisation",
    language: 'Langue',
    feedback: 'Feedback',
    feedbackMessage: 'Message:',
    congratulations: 'Félicitations!',
    restore: 'Restaurer la commande',
    restoring: 'Restauration de la commande...',
    purchasing: 'Commande en cours...',
    illegalPrompt:
      'Le système a détecté que vous quittez le programme fréquemment, ce qui pourrait être un signe de fuite de publicité. Veuillez patienter une minute et réessayer.',
    highlight: 'Surbrillance',
    myBoards: 'Mes sudokus',
    Home: 'Accueil',
    saveToMyBoards: 'Enregistrer dans Mes sudokus',
    pleaseNameYourSudoku: 'Veuillez nommer votre sudoku',
    success: 'Succès',
    sudokuSavedToMyBoards: 'Sudoku enregistré dans Mes sudokus!',
    error: 'Erreur',
    saveFailedPleaseTryAgainLater: 'Enregistrement impossible, veuillez réessayer plus tard',
    confirm: 'Confirmer',
    noNetwork:
      "Vous n'avez pas de connexion internet. Si vous continuez, votre sudoku ne sera pas enregistré. Êtes-vous sûr de vouloir continuer?",
    loading: 'Chargement...',
    pleaseCheckNetwork:
      'Chargement impossible, veuillez vérifier si la connexion internet est établie',
    pleaseCheckiCloud: 'Chargement impossible, veuillez vérifier si iCloud est connecté',
    untitled: 'Sans nom',
    enlarge: 'Agrandir',
    encourage: 'Encourager nous❤️',
    share: "Partager l'application",
    shareMessage: 'Un jeu de sudoku qui supporte la personnalisation, essayez-le!',
    wether: 'Quel que soit le cas, la cellule rouge ne peut pas contenir {{target}}',
    case1: 'Cas 1:',
    case2: 'Cas 2:',
    case3: 'Cas 3:',
    comma: ',',
    period: '.',
    end1: 'La cellule rouge ne peut pas contenir {{target}}',
    end2: 'La cellule rouge ne peut toujours pas contenir {{target}}',
    theme: 'Thème',
    selectTheme: 'Choisir le thème',
    lightMode: 'Mode clair',
    darkMode: 'Mode sombre',
    strictMode: 'Mode strict',
    reasonMode: 'Mode raisonnement',
    strictText:
      "Mode strict: Lorsque la valeur que vous entrez ne correspond pas à la réponse, un message d'erreur s'affiche",
    reasonText:
      "Mode raisonnement: Lorsque la valeur que vous entrez ne correspond pas à la réponse, un message d'erreur n'est pas affiché",
    localGames: 'Sudokus locaux',
    statistics: 'Statistiques',
    entry: 'Débutant',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    extreme: 'Extrême',
    dataSync: 'Instructions de synchronisation des données',
    dataSyncDescription:
      "1.Note importante : Si vous changez d'appareil, les données iCloud peuvent ne pas se synchroniser immédiatement sur le nouvel appareil. Nous vous suggérons de rouvrir l'application plusieurs fois ou d'attendre un moment. Pendant cette période, vous pouvez travailler sur des puzzles locaux. Une fois les anciennes données mises à jour, l'application vous aidera automatiquement à intégrer les nouvelles données.",
    total: 'Total',
    pleaseLoginGameCenter: 'Veuillez vous connecter à GameCenter',
    tips: 'Conseils',
    dataSyncDescription2: '2.Votre classement sera synchronisé mondialement dans les 24 heures.',
  },
};
