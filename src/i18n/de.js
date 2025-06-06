export default {
  translation: {
    home: {
      title: 'Sudoku',
      startGame: 'Spiel starten',
      createGame: 'Spiel erstellen',
      settings: 'Einstellungen',
    },
    game: {
      pause: 'Pause',
      resume: 'Fortsetzen',
      restart: 'Neustart',
      quit: 'Beenden',
    },
    difficulty: {
      title: 'Schwierigkeitsgrad wählen',
      entry: '😀Einführung',
      easy: '🤔Leicht',
      medium: '😮Mittel',
      hard: '😣Schwer',
      extreme: '🤯Extrem',
      custom: 'Benutzerdefiniert',
    },
    start: 'Start',
    continue: 'Fortsetzen',
    undo: 'Rückgängig',
    erase: 'Löschen',
    notes: 'Notizen',
    autoNote: 'Auto-Notizen',
    hint: 'Tipp',
    apply: 'Anwenden',
    cancel: 'Abbrechen',
    selectMode: 'Modus wählen',
    legal: 'Gültiges Sudoku',
    solving: 'Wird gelöst...',
    illegal: 'Ungültiges Sudoku',
    answer: 'Lösung',
    incomplete: 'Unvollständiges Sudoku',
    CHECK_CANDIDATE: 'Kandidatenprüfung',
    SINGLE_CANDIDATE: 'Einzelner Kandidat',
    HIDDEN_SINGLE_ROW: 'Versteckter Einzelwert',
    HIDDEN_SINGLE_COLUMN: 'Versteckter Einzelwert',
    HIDDEN_SINGLE_BOX: 'Versteckter Einzelwert',
    BLOCK_ELIMINATION_ROW: 'Blockausschluss',
    BLOCK_ELIMINATION_COLUMN: 'Blockausschluss',
    BLOCK_ELIMINATION_BOX_ROW: 'Blockausschluss',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Blockausschluss',
    NAKED_PAIR_ROW: 'Offenes Paar',
    NAKED_PAIR_COLUMN: 'Offenes Paar',
    NAKED_PAIR_BOX: 'Offenes Paar',
    NAKED_TRIPLE_ROW1: 'Offenes Tripel',
    NAKED_TRIPLE_COLUMN1: 'Offenes Tripel',
    NAKED_TRIPLE_BOX1: 'Offenes Tripel',
    NAKED_TRIPLE_ROW2: 'Offenes Tripel',
    NAKED_TRIPLE_COLUMN2: 'Offenes Tripel',
    NAKED_TRIPLE_BOX2: 'Offenes Tripel',
    HIDDEN_PAIR_ROW: 'Verstecktes Paar',
    HIDDEN_PAIR_COLUMN: 'Verstecktes Paar',
    HIDDEN_PAIR_BOX: 'Verstecktes Paar',
    HIDDEN_TRIPLE_ROW: 'Verstecktes Tripel',
    HIDDEN_TRIPLE_COLUMN: 'Verstecktes Tripel',
    HIDDEN_TRIPLE_BOX: 'Verstecktes Tripel',
    NAKED_QUADRUPLE_ROW: 'Offenes Quadrupel',
    NAKED_QUADRUPLE_COLUMN: 'Offenes Quadrupel',
    NAKED_QUADRUPLE_BOX: 'Offenes Quadrupel',
    X_WING_ROW: 'X-Wing',
    X_WING_COLUMN: 'X-Wing',
    X_WING_VARIENT_ROW: 'X-Wing mit Finne',
    X_WING_VARIENT_COLUMN: 'X-Wing mit Finne',
    XY_WING: 'XY-Wing',
    XYZ_WING: 'XYZ-Wing',
    SKYSCRAPER: 'Wolkenkratzer',
    SKYSCRAPER2: 'Zwei starke Verbindungen',
    THREESTRONGLINKS: 'Drei starke Verbindungen',
    XCHAIN: 'X-Kette',
    COMBINATION_CHAIN: 'Kombinationskette',
    SWORDFISH_ROW: 'Schwertfisch',
    SWORDFISH_COLUMN: 'Schwertfisch',
    JELLYFISH_ROW: 'Schwertfisch',
    JELLYFISH_COLUMN: 'Schwertfisch',
    WXYZ_WING: 'WXYZ-Wing',
    LOOP: 'Schleife',
    UNIQUE_RECTANGLE: 'Eindeutige Rechtecke',
    BINARY_UNIVERSAL_GRAVE: 'Binäre Universale Grube',
    DOUBLE_COLOR_CHAIN: 'Zweifarbige Kette',
    TRIPLE_COLOR_CHAIN: 'Dreifarbige Kette',
    TWO_STRING_KITE: 'Zweifarbige-Kette',
    TRIAL_AND_ERROR: 'Versuch und Irrtum',
    duration: 'Zeit',
    mistakes: 'Fehler',
    hintCount: 'Tipps',
    hints: {
      SINGLE_CANDIDATE:
        'In Zelle R{{row}}C{{col}} gibt es nur den Kandidaten {{target}}, daher muss dieser Wert {{target}} sein',
      HIDDEN_SINGLE_ROW:
        'In Zeile {{row}} gibt es nur eine mögliche Position für {{target}}, daher muss dieser Wert {{target}} sein',
      HIDDEN_SINGLE_COLUMN:
        'In Spalte {{col}} gibt es nur eine mögliche Position für {{target}}, daher muss dieser Wert {{target}} sein',
      HIDDEN_SINGLE_BOX:
        'Im Block {{box}} gibt es nur eine mögliche Position für {{target}}, daher muss dieser Wert {{target}} sein',
      TRIAL_AND_ERROR:
        'Versuche {{target}} in die Zelle mit den wenigsten Kandidaten einzutragen. Wenn keine Lösung möglich ist, war {{target}} falsch und andere Kandidaten müssen getestet werden',
      BLOCK_ELIMINATION_ROW:
        'Im Block {{box}} erscheint {{target}} nur in {{positions}}. Daher kann {{target}} in der gleichen Zeile nicht an anderen Positionen erscheinen',
      BLOCK_ELIMINATION_COLUMN:
        'Im Block {{box}} erscheint {{target}} nur in {{positions}}. Daher kann {{target}} in der gleichen Spalte nicht an anderen Positionen erscheinen',
      BLOCK_ELIMINATION_BOX_ROW:
        'In Zeile {{row}} erscheint {{target}} nur in {{positions}}. Daher kann {{target}} im gleichen Block nicht an anderen Positionen erscheinen',
      BLOCK_ELIMINATION_BOX_COLUMN:
        'In Spalte {{col}} erscheint {{target}} nur in {{positions}}. Daher kann {{target}} im gleichen Block nicht an anderen Positionen erscheinen',
      NAKED_PAIR_ROW:
        'In Zeile {{row}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_PAIR_COLUMN:
        'In Spalte {{col}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_PAIR_BOX:
        'Im Block {{box}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_TRIPLE_ROW1:
        'In Zeile {{row}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_TRIPLE_COLUMN1:
        'In Spalte {{col}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_TRIPLE_BOX1:
        'Im Block {{box}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_TRIPLE_ROW2:
        'In Zeile {{row}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_TRIPLE_COLUMN2:
        'In Spalte {{col}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_TRIPLE_BOX2:
        'Im Block {{box}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_QUADRUPLE_ROW:
        'In Zeile {{row}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_QUADRUPLE_COLUMN:
        'In Spalte {{col}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      NAKED_QUADRUPLE_BOX:
        'Im Block {{box}} können die Kandidaten {{target}} nur in {{positions}} erscheinen. Daher können in diesen Zellen keine anderen Kandidaten vorkommen',
      HIDDEN_PAIR_ROW:
        'In Zeile {{row}} erscheinen die Kandidaten {{candStr}} nur in {{positions}}. Daher können diese Zellen keine anderen Kandidaten enthalten',
      HIDDEN_PAIR_COLUMN:
        'In Spalte {{col}} erscheinen die Kandidaten {{candStr}} nur in {{positions}}. Daher können diese Zellen keine anderen Kandidaten enthalten',
      HIDDEN_PAIR_BOX:
        'Im Block {{box}} erscheinen die Kandidaten {{candStr}} nur in {{positions}}. Daher können diese Zellen keine anderen Kandidaten enthalten',
      HIDDEN_TRIPLE_ROW:
        'In Zeile {{row}} erscheinen die Kandidaten {{candStr}} nur in {{positions}}. Daher können diese Zellen keine anderen Kandidaten enthalten',
      HIDDEN_TRIPLE_COLUMN:
        'In Spalte {{col}} erscheinen die Kandidaten {{candStr}} nur in {{positions}}. Daher können diese Zellen keine anderen Kandidaten enthalten',
      HIDDEN_TRIPLE_BOX:
        'Im Block {{box}} erscheinen die Kandidaten {{candStr}} nur in {{positions}}. Daher können diese Zellen keine anderen Kandidaten enthalten',
      X_WING_ROW:
        'In den Zeilen {{row1}} und {{row2}} hat der Kandidat {{candStr}} jeweils zwei mögliche Positionen in denselben Spalten. Unabhängig von der Lösung können in diesen Spalten keine weiteren {{candStr}} vorkommen',
      X_WING_COLUMN:
        'In den Spalten {{col1}} und {{col2}} hat der Kandidat {{candStr}} jeweils zwei mögliche Positionen in denselben Zeilen. Unabhängig von der Lösung können in diesen Zeilen keine weiteren {{candStr}} vorkommen',
      X_WING_VARIENT_ROW:
        'Von den {{length}} Kandidaten in {{positions}} müssen zwei {{candStr}} sein. Daher kann R{{row}}C{{col}} nicht {{candStr}} sein',
      X_WING_VARIENT_COLUMN:
        'Von den {{length}} Kandidaten in {{positions}} müssen zwei {{candStr}} sein. Daher kann R{{row}}C{{col}} nicht {{candStr}} sein',
      XY_WING:
        'Unabhängig von der Lösung der drei Zellen {{positions}} kann {{deleteStr}} nicht {{candStr}} enthalten',
      XYZ_WING:
        'Unabhängig von der Lösung der drei Zellen {{positions}} kann {{deleteStr}} nicht {{candStr}} enthalten',
      SKYSCRAPER:
        'Die blauen Zellen {{positions}} bilden eine Verkettung. Ob R{{row1}}C{{col1}} oder R{{row2}}C{{col2}} den Wert {{target}} enthält, {{deleteStr}} kann nicht {{target}} sein',
      SKYSCRAPER2:
        'Die Zellen R{{row1}}C{{col1}} und R{{row2}}C{{col2}} bilden eine starke Verkettung, R{{row3}}C{{col3}} und R{{row4}}C{{col4}} eine weitere. Diese sind durch eine schwache Verkettung zwischen R{{row3}}C{{col3}} und R{{row2}}C{{col2}} verbunden. Wenn R{{row1}}C{{col1}} wahr ist, muss {{deleteStr}} falsch sein. Wenn R{{row1}}C{{col1}} falsch ist, muss R{{row4}}C{{col4}} wahr sein, was ebenfalls {{deleteStr}} falsch macht. In beiden Fällen kann {{target}} nicht in {{deleteStr}} erscheinen',
      WXYZ_WING:
        '{{candStr}} bildet einen WXYZ-Wing mit R{{row1}}C{{col1}} als Drehpunkt. Unabhängig von der Lösung der vier Zellen kann {{target}} nicht in {{deleteStr}} erscheinen',
      COMBINATION_CHAIN_3_2_1_STRONG:
        'Die Kombination {{candStr1}} und {{candStr2}} bildet eine starke Verkettung. Unabhängig davon, welches Element aus {{candStr4}} wahr ist, kann {{target}} nicht in {{posStr}} erscheinen',
      COMBINATION_CHAIN_3_2_1_WEAK:
        'Die Kombination {{candStr1}} und {{candStr2}} bildet eine starke Verkettung, {{candStr3}} vier Zellen bilden eine weitere starke Verkettung. Diese sind durch eine schwache Verkettung über {{pivotStr}} verbunden. Unabhängig davon, welches Element aus {{candStr4}} wahr ist, kann {{target}} nicht in {{posStr}} erscheinen',
      COMBINATION_CHAIN_3_2_2_WEAK:
        'Die Kombination {{candStr1}} und {{candStr2}} bildet eine starke Verkettung, {{candStr3}} bildet eine weitere starke Verkettung. Diese sind durch eine schwache Verkettung über {{pivotStr1}} und {{pivotStr2}} verbunden. Unabhängig davon, welches Element aus {{candStr4}} wahr ist, kann {{target}} nicht in {{posStr}} erscheinen',
      COMBINATION_CHAIN_3_2_2_STRONG:
        'Die Kombination {{candStr1}} und {{candStr2}} bildet eine starke Verkettung, {{candStr3}} bildet eine weitere starke Verkettung. Diese sind durch eine starke Verkettung über {{pivotStr1}} und {{pivotStr2}} verbunden. Unabhängig davon, welches Element aus {{candStr4}} wahr ist, kann {{target}} nicht in {{posStr}} erscheinen',
      LOOP_3_2_2:
        '{{nodeStr1}} bilden eine starke Verkettung, {{nodeStr2}} bilden eine starke Verkettung, {{nodeStr3}} bilden eine starke Verkettung. Diese sind durch eine schwache Verkettung verbunden. Wenn {{rootNodeStr}} falsch ist und von ihm ausgeht, wird die logische Schlussfolgerung in beiden Richtungen schließlich zu einem Widerspruch auf der Schleife führen, so dass {{rootNodeStr}} wahr sein muss',
      LOOP_3_2:
        '{{nodeStr1}} bilden eine starke Verkettung, {{nodeStr2}} bilden eine starke Verkettung. Diese sind durch eine schwache Verkettung verbunden. Wenn {{rootNodeStr}} falsch ist und von ihm ausgeht, wird die logische Schlussfolgerung in beiden Richtungen schließlich zu einem Widerspruch auf der Schleife führen, so dass {{rootNodeStr}} wahr sein muss',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}} und {{deleteStr}} bilden eine Struktur ähnlich einem einzigartigen Rechteck, d.h. es gibt vier Zellen auf dem Brett, die ein Rechteck bilden, in zwei Blöcken liegen und jeweils zwei gleiche Kandidaten enthalten. Wenn diese Struktur auf dem Brett erscheint, bedeutet dies, dass das aktuelle Sudoku ungültig ist. Daher muss {{deleteStr}} den Kandidaten {{target}} entfernen, um sicherzustellen, dass das Sudoku eine eindeutige Lösung hat',
      UNIQUE_RECTANGLE2:
        'Wenn die rote Zelle den Wert {{target}} hat, dann bilden die vier Zellen {{nodeStr}} eine Struktur ähnlich einem einzigartigen Rechteck, d.h. es gibt vier Zellen auf dem Brett, die ein Rechteck bilden, in zwei Blöcken liegen und jeweils zwei gleiche Kandidaten enthalten. Wenn diese Struktur auf dem Brett erscheint, bedeutet dies, dass das aktuelle Sudoku ungültig ist. Daher kann die rote Zelle nicht den Kandidaten {{target}} enthalten',
      BINARY_UNIVERSAL_GRAVE:
        'Angenommen, {{posStr}} ist nicht {{target}}, dann gibt es auf dem Brett nur zwei Kandidaten in allen Kandidatenzellen, und jeder Kandidat erscheint nur zweimal in jeder Zeile, Spalte und Box. Diese Struktur führt zu mehreren Lösungen im Sudoku. Um dies zu vermeiden, muss {{posStr}} {{target}} sein',
      SWORDFISH_ROW:
        'Die blauen Zellen in den drei Zeilen enthalten keine anderen Kandidaten für {{target}}. Unabhängig davon, wie diese Zellen gelöst werden, sollten die entsprechenden drei Spalten keine Kandidaten für {{target}} enthalten',
      SWORDFISH_COLUMN:
        'Die blauen Zellen in den drei Spalten enthalten keine anderen Kandidaten für {{target}}. Unabhängig davon, wie diese Zellen gelöst werden, sollten die entsprechenden drei Zeilen keine Kandidaten für {{target}} enthalten',
      JELLYFISH_ROW:
        'Die blauen Zellen in den vier Zeilen enthalten keine anderen Kandidaten für {{target}}. Unabhängig davon, wie diese Zellen gelöst werden, sollten die entsprechenden vier Spalten keine Kandidaten für {{target}} enthalten',
      JELLYFISH_COLUMN:
        'Die blauen Zellen in den vier Spalten enthalten keine anderen Kandidaten für {{target}}. Unabhängig davon, wie diese Zellen gelöst werden, sollten die entsprechenden vier Zeilen keine Kandidaten für {{target}} enthalten',
      DOUBLE_COLOR_CHAIN_delete:
        'wenn {{posStr}} den Wert {{target}} hat, kann das rote Feld nicht den Wert {{target}} haben',
      DOUBLE_COLOR_CHAIN_s:
        'wenn {{posStr1}} den Wert {{target1}} hat, führt dies dazu, dass {{posStr2}} den Wert {{target2}} hat',
      DOUBLE_COLOR_CHAIN_r:
        'wenn {{posStr1}} den Wert {{target}} hat, kann {{posStr2}} nicht den Wert {{target}} haben',
      DOUBLE_COLOR_CHAIN_q:
        'da {{posStr1}} und {{posStr2}} eine starke Verbindung bezüglich {{target}} bilden, muss {{posStr2}} den Wert {{target}} haben',
      DOUBLE_COLOR_CHAIN_q_start:
        'wenn {{posStr}} den Wert {{target1}} hat, kann das aktuelle Feld nicht den Wert {{target2}} haben',
      COMBINATION_CHAIN_AB_STRONG: '{{A}} und {{B}} bilden eine starke Verknüpfung',
      COMBINATION_CHAIN_AB_WEAK: '{{A}} und {{B}} bilden eine schwache Verknüpfung',
      COMBINATION_CHAIN_END:
        'Wenn {{A}} wahr ist, ist das rote Feld falsch. Wenn {{A}} falsch ist, wird durch Deduktion {{B}} wahr, und das rote Feld bleibt falsch',
      SKYSCRAPER2_1:
        'Zwischen den zwei Feldern {{As}} besteht eine starke Verknüpfung, zwischen vier Feldern {{Bs}} besteht eine starke Verknüpfung, und diese beiden starken Verknüpfungen werden durch eine schwache Verknüpfung zwischen den zwei Feldern {{Cs}} verbunden. Wenn {{A}} wahr ist, ist das rote Feld falsch. Wenn {{A}} falsch ist, ist {{B}} wahr, und das rote Feld bleibt falsch',
      SKYSCRAPER2_2:
        'Zwischen den zwei Feldern {{As}} besteht eine starke Verknüpfung, zwischen den zwei Feldern {{Bs}} besteht eine starke Verknüpfung, und zwischen den zwei Feldern {{Cs}} besteht eine starke Verknüpfung. Jede starke Verknüpfung ist mit den anderen durch schwache Verknüpfungen verbunden. Wenn {{A}} wahr ist, ist das rote Feld falsch. Wenn {{A}} falsch ist, ist {{B}} wahr, und das rote Feld bleibt falsch',
    },
    back: 'Zurück',
    next: 'Nächstes Level',
    errorDraft: 'Fehlerhafte Notizen, bitte korrigieren',
    pleaseConnectNetwork: 'Bitte mit dem Internet verbinden',
    setting: 'Einstellungen',
    removeAD: 'Werbung entfernen',
    sound: 'Ton',
    notice: 'Benachrichtigungen',
    privacyPolicy: 'Datenschutzerklärung',
    serviceTerms: 'Nutzungsbedingungen',
    language: 'Sprache',
    feedback: 'Feedback',
    feedbackMessage: 'Nachricht:',
    congratulations: 'Glückwunsch!',
    restore: 'Kauf wiederherstellen',
    restoring: 'Kauf wiederherstellen...',
    purchasing: 'Kaufen...',
    illegalPrompt:
      'Das System hat festgestellt, dass Sie das Programm häufig verlassen, was ein Zeichen dafür sein könnte, Werbung zu umgehen. Bitte warten Sie eine Minute und versuchen Sie es erneut.',
    highlight: 'Hervorheben',
    myBoards: 'Meine Sudokus',
    Home: 'Startseite',
    saveToMyBoards: 'In Meine Sudokus speichern',
    pleaseNameYourSudoku: 'Bitte geben Sie Ihrem Sudoku einen Namen',
    success: 'Erfolg',
    sudokuSavedToMyBoards: 'Sudoku in Meine Sudokus gespeichert!',
    error: 'Fehler',
    saveFailedPleaseTryAgainLater: 'Speichern fehlgeschlagen, bitte versuchen Sie es später erneut',
    confirm: 'Bestätigen',
    noNetwork:
      'Sie haben keine Netzwerkverbindung. Wenn Sie fortfahren, wird Ihr Sudoku nicht gespeichert. Sind Sie sicher, dass Sie fortfahren möchten?',
    loading: 'Laden...',
    pleaseCheckNetwork:
      'Laden fehlgeschlagen, bitte überprüfen Sie, ob die Netzwerkverbindung hergestellt ist',
    pleaseCheckiCloud: 'Laden fehlgeschlagen, bitte überprüfen Sie, ob iCloud eingeloggt ist',
    untitled: 'Unbenannt',
    enlarge: 'Vergrößern',
    encourage: 'Unterstützen Sie uns❤️',
    share: 'Teilen',
    shareMessage: 'Eine Sudoku-App, die Anpassungen unterstützt, versuchen Sie es!',
    wether: 'Unabhängig von der Situation kann die rote Zelle nicht den Wert {{target}} enthalten',
    case1: 'Fall 1:',
    case2: 'Fall 2:',
    case3: 'Fall 3:',
    comma: ',',
    period: '.',
    end1: 'Die rote Zelle kann nicht den Wert {{target}} enthalten',
    end2: 'Die rote Zelle kann immer noch nicht den Wert {{target}} enthalten',
    theme: 'Thema',
    selectTheme: 'Thema auswählen',
    lightMode: 'Hellmodus',
    darkMode: 'Dunkelmodus',
    strictMode: 'Strenge Modus',
    reasonMode: 'Beweismodus',
    strictText:
      'Strenge Modus: Wenn der Wert, den Sie eingeben, nicht mit der Lösung übereinstimmt, wird eine Fehlermeldung angezeigt',
    reasonText:
      'Beweismodus: Wenn der Wert, den Sie eingeben, nicht mit der Lösung übereinstimmt, wird keine Fehlermeldung angezeigt',
    localGames: 'Lokale Sudokus',
    statistics: 'Statistiken',
    entry: 'Einführung',
    easy: 'Leicht',
    medium: 'Mittel',
    hard: 'Schwer',
    extreme: 'Extrem',
    dataSync: 'Datensynchronisierungsanleitung',
    dataSyncDescription:
      '1.Freundlicher Hinweis: Wenn Sie Ihr Gerät wechseln, synchronisieren sich iCloud-Daten möglicherweise nicht sofort mit dem neuen Gerät. Wir empfehlen, die App mehrmals zu öffnen oder eine Weile zu warten. In dieser Zeit können Sie an lokalen Rätseln arbeiten. Nachdem die alten Daten aktualisiert wurden, hilft Ihnen die App automatisch, die neuen Daten zusammenzuführen.',
    total: 'Gesamt',
    pleaseLoginGameCenter:
      'Bitte melden Sie sich zuerst bei GameCenter an. Falls Sie bereits angemeldet sind, öffnen Sie die App bitte erneut.',
    tips: 'Tipps',
    dataSyncDescription2: '2.Ihre Rangliste wird innerhalb von 24 Stunden weltweit synchronisiert.',
    fastestTime: 'Schnellste',
    averageTime: 'Durchschnittliche',
    fixedDescription:
      'Diese Aktion wird die aktuellen Zahlen auf dem Brett fixieren. Sie können die fixierten Zahlen nicht mehr ändern. Sind Sie sicher, dass Sie fortfahren möchten?',
    doNotShowAgain: 'Nicht mehr anzeigen',
    boardLimit: 'Die Anzahl der Sudokus hat die Obergrenze erreicht, und Sie können nur bis zu 300 Sudokus erstellen',
    updateAvailable: 'Update verfügbar',
    updateMessage: 'Neue Version {{version}} ist verfügbar. Wir empfehlen das Update für eine bessere Erfahrung und die neuesten Funktionen.',
    updateNow: 'Jetzt aktualisieren',
    later: 'Später',
    contactAuthor: 'Kontaktieren Sie den Autor',
  },
};
