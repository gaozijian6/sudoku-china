export default {
  translation: {
    home: {
      title: 'Sudoku',
      startGame: 'Start Spel',
      createGame: 'Maak Spel',
      settings: 'Instellingen',
    },
    game: {
      pause: 'Pauzeren',
      resume: 'Hervatten',
      restart: 'Opnieuw starten',
      quit: 'Afsluiten',
    },
    difficulty: {
      title: 'Kies Moeilijkheidsgraad',
      entry: '😀Beginner',
      easy: '🤔Makkelijk',
      medium: '😮Gemiddeld',
      hard: '😣Moeilijk',
      extreme: '🤯Extreem',
      custom: 'Aangepast',
    },
    start: 'Start',
    continue: 'Doorgaan',
    undo: 'Ongedaan maken',
    erase: 'Wissen',
    notes: 'Notities',
    autoNote: 'Auto Notitie',
    hint: 'Hint',
    apply: 'Toepassen',
    cancel: 'Annuleren',
    selectMode: 'Selecteer Modus',
    legal: 'Geldig',
    solving: 'Oplossen...',
    illegal: 'Ongeldig',
    answer: 'Antwoord',
    incomplete: 'Onvolledig',
    CHECK_CANDIDATE: 'Kandidaat Check',
    SINGLE_CANDIDATE: 'Enkele Kandidaat',
    HIDDEN_SINGLE_ROW: 'Verborgen Enkele',
    HIDDEN_SINGLE_COLUMN: 'Verborgen Enkele',
    HIDDEN_SINGLE_BOX: 'Verborgen Enkele',
    BLOCK_ELIMINATION_ROW: 'Blok Eliminatie',
    BLOCK_ELIMINATION_COLUMN: 'Blok Eliminatie',
    BLOCK_ELIMINATION_BOX_ROW: 'Blok Eliminatie',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Blok Eliminatie',
    NAKED_PAIR_ROW: 'Naakte Paar',
    NAKED_PAIR_COLUMN: 'Naakte Paar',
    NAKED_PAIR_BOX: 'Naakte Paar',
    NAKED_TRIPLE_ROW1: 'Naakte Drieling',
    NAKED_TRIPLE_COLUMN1: 'Naakte Drieling',
    NAKED_TRIPLE_BOX1: 'Naakte Drieling',
    NAKED_TRIPLE_ROW2: 'Naakte Drieling',
    NAKED_TRIPLE_COLUMN2: 'Naakte Drieling',
    NAKED_TRIPLE_BOX2: 'Naakte Drieling',
    HIDDEN_PAIR_ROW: 'Verborgen Paar',
    HIDDEN_PAIR_COLUMN: 'Verborgen Paar',
    HIDDEN_PAIR_BOX: 'Verborgen Paar',
    HIDDEN_TRIPLE_ROW: 'Verborgen Drieling',
    HIDDEN_TRIPLE_COLUMN: 'Verborgen Drieling',
    HIDDEN_TRIPLE_BOX: 'Verborgen Drieling',
    NAKED_QUADRUPLE_ROW: 'Naakte Vierling',
    NAKED_QUADRUPLE_COLUMN: 'Naakte Vierling',
    NAKED_QUADRUPLE_BOX: 'Naakte Vierling',
    X_WING_ROW: 'X-Wing',
    X_WING_COLUMN: 'X-Wing',
    X_WING_VARIENT_ROW: 'X-Wing met Vin',
    X_WING_VARIENT_COLUMN: 'X-Wing met Vin',
    XY_WING: 'XY-Wing',
    XYZ_WING: 'XYZ-Wing',
    SKYSCRAPER: 'Wolkenkrabber',
    SKYSCRAPER2: 'Twee sterke verbindingen',
    THREESTRONGLINKS: 'Drie sterke verbindingen',
    XCHAIN: 'X-Ketting',
    COMBINATION_CHAIN: 'Combinatieketting',
    SWORDFISH_ROW: 'Zwaardvis',
    SWORDFISH_COLUMN: 'Zwaardvis',
    JELLYFISH_ROW: 'Medusa',
    JELLYFISH_COLUMN: 'Medusa',
    WXYZ_WING: 'WXYZ-Wing',
    LOOP: 'Loop',
    UNIQUE_RECTANGLE: 'Uniek Rechthoek',
    BINARY_UNIVERSAL_GRAVE: 'Binair Universaal Graf',
    DOUBLE_COLOR_CHAIN: 'Tweekleurige Ketting',
    TRIPLE_COLOR_CHAIN: 'Driekleurige Ketting',
    TRIAL_AND_ERROR: 'Trial en Error',
    duration: 'Tijd',
    mistakes: 'Fouten',
    hintCount: 'Hints',
    hints: {
      SINGLE_CANDIDATE:
        'Cel R{{row}}C{{col}} heeft alleen {{target}} als kandidaat, dus dit moet de waarde zijn',
      HIDDEN_SINGLE_ROW:
        'In rij {{row}} kan {{target}} alleen in één cel voorkomen, dus dit moet de waarde zijn',
      HIDDEN_SINGLE_COLUMN:
        'In kolom {{col}} kan {{target}} alleen in één cel voorkomen, dus dit moet de waarde zijn',
      HIDDEN_SINGLE_BOX:
        'In blok {{box}} kan {{target}} alleen in één cel voorkomen, dus dit moet de waarde zijn',
      TRIAL_AND_ERROR:
        'Probeer {{target}} in te vullen in de cel met de minste kandidaten. Als er geen oplossing mogelijk is, is {{target}} onjuist en moeten we andere kandidaten proberen',
      BLOCK_ELIMINATION_ROW:
        'In blok {{box}} komt {{target}} alleen voor in {{positions}}, dus kan {{target}} niet voorkomen in andere cellen in dezelfde rij',
      BLOCK_ELIMINATION_COLUMN:
        'In blok {{box}} komt {{target}} alleen voor in {{positions}}, dus kan {{target}} niet voorkomen in andere cellen in dezelfde kolom',
      BLOCK_ELIMINATION_BOX_ROW:
        'In rij {{row}} komt {{target}} alleen voor in {{positions}}, dus kan {{target}} niet voorkomen in andere cellen in hetzelfde blok',
      BLOCK_ELIMINATION_BOX_COLUMN:
        'In kolom {{col}} komt {{target}} alleen voor in {{positions}}, dus kan {{target}} niet voorkomen in andere cellen in hetzelfde blok',
      NAKED_PAIR_ROW:
        'In rij {{row}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in deze rij',
      NAKED_PAIR_COLUMN:
        'In kolom {{col}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in deze kolom',
      NAKED_PAIR_BOX:
        'In blok {{box}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in dit blok',
      NAKED_TRIPLE_ROW1:
        'In rij {{row}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in deze rij',
      NAKED_TRIPLE_COLUMN1:
        'In kolom {{col}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in deze kolom',
      NAKED_TRIPLE_BOX1:
        'In blok {{box}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in dit blok',
      NAKED_TRIPLE_ROW2:
        'In rij {{row}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in deze rij',
      NAKED_TRIPLE_COLUMN2:
        'In kolom {{col}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in deze kolom',
      NAKED_TRIPLE_BOX2:
        'In blok {{box}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in dit blok',
      NAKED_QUADRUPLE_ROW:
        'In rij {{row}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in deze rij',
      NAKED_QUADRUPLE_COLUMN:
        'In kolom {{col}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in deze kolom',
      NAKED_QUADRUPLE_BOX:
        'In blok {{box}} kunnen de kandidaten {{target}} alleen voorkomen in {{positions}}, dus kunnen deze kandidaten niet voorkomen in andere cellen in dit blok',
      HIDDEN_PAIR_ROW:
        'In rij {{row}} komen de kandidaten {{candStr}} alleen voor in {{positions}}, dus kunnen deze cellen geen andere kandidaten bevatten',
      HIDDEN_PAIR_COLUMN:
        'In kolom {{col}} komen de kandidaten {{candStr}} alleen voor in {{positions}}, dus kunnen deze cellen geen andere kandidaten bevatten',
      HIDDEN_PAIR_BOX:
        'In blok {{box}} komen de kandidaten {{candStr}} alleen voor in {{positions}}, dus kunnen deze cellen geen andere kandidaten bevatten',
      HIDDEN_TRIPLE_ROW:
        'In rij {{row}} komen de kandidaten {{candStr}} alleen voor in {{positions}}, dus kunnen deze cellen geen andere kandidaten bevatten',
      HIDDEN_TRIPLE_COLUMN:
        'In kolom {{col}} komen de kandidaten {{candStr}} alleen voor in {{positions}}, dus kunnen deze cellen geen andere kandidaten bevatten',
      HIDDEN_TRIPLE_BOX:
        'In blok {{box}} komen de kandidaten {{candStr}} alleen voor in {{positions}}, dus kunnen deze cellen geen andere kandidaten bevatten',
      X_WING_ROW:
        'In rijen {{row1}} en {{row2}} komt kandidaat {{candStr}} alleen voor in twee cellen met dezelfde kolomnummers. Ongeacht welke twee van deze vier cellen de waarde bevatten, kunnen andere cellen in deze kolommen deze waarde niet bevatten',
      X_WING_COLUMN:
        'In kolommen {{col1}} en {{col2}} komt kandidaat {{candStr}} alleen voor in twee cellen met dezelfde rijnummers. Ongeacht welke twee van deze vier cellen de waarde bevatten, kunnen andere cellen in deze rijen deze waarde niet bevatten',
      X_WING_VARIENT_ROW:
        'Van de {{length}} kandidaatcellen in {{positions}}, welke twee ook {{candStr}} bevatten, cel R{{row}}C{{col}} kan deze waarde niet bevatten',
      X_WING_VARIENT_COLUMN:
        'Van de {{length}} kandidaatcellen in {{positions}}, welke twee ook {{candStr}} bevatten, cel R{{row}}C{{col}} kan deze waarde niet bevatten',
      XY_WING:
        'Ongeacht hoe de drie cellen {{positions}} worden ingevuld, kan {{candStr}} niet voorkomen in {{deleteStr}}',
      XYZ_WING:
        'Ongeacht hoe de drie cellen {{positions}} worden ingevuld, kan {{candStr}} niet voorkomen in {{deleteStr}}',
      SKYSCRAPER:
        'De blauwe cellen {{positions}} vormen een geconjugeerde ketting. Of R{{row1}}C{{col1}} of R{{row2}}C{{col2}} moet {{target}} zijn, dus {{deleteStr}} kan geen {{target}} bevatten',
      SKYSCRAPER2:
        'Cellen R{{row1}}C{{col1}} en R{{row2}}C{{col2}} vormen een sterke ketting, cellen R{{row3}}C{{col3}} en R{{row4}}C{{col4}} vormen een andere sterke ketting. Deze kettingen zijn verbonden door een zwakke ketting tussen R{{row3}}C{{col3}} en R{{row2}}C{{col2}}. Als R{{row1}}C{{col1}} waar is, moet {{deleteStr}} onwaar zijn. Als R{{row1}}C{{col1}} onwaar is, moet R{{row4}}C{{col4}} waar zijn, wat nog steeds betekent dat {{deleteStr}} onwaar moet zijn. In beide gevallen kan {{target}} niet voorkomen in {{deleteStr}}',
      WXYZ_WING:
        '{{candStr}} vormt een WXYZ-Wing met R{{row1}}C{{col1}} als spil. Ongeacht hoe deze vier cellen worden ingevuld, kan {{target}} niet voorkomen in {{deleteStr}}',
      COMBINATION_CHAIN_3_2_1_STRONG:
        'De combinatie van {{candStr1}} en {{candStr2}} vormt een sterke ketting. Ongeacht welke van {{candStr4}} waar is, kan {{target}} niet voorkomen in {{posStr}}',
      COMBINATION_CHAIN_3_2_1_WEAK:
        'De combinatie van {{candStr1}} en {{candStr2}} vormt een sterke ketting, {{candStr3}} vormt een sterke ketting tussen vier cellen. Deze kettingen zijn verbonden door een zwakke ketting via {{pivotStr}}. Ongeacht welke van {{candStr4}} waar is, kan {{target}} niet voorkomen in {{posStr}}',
      COMBINATION_CHAIN_3_2_2_WEAK:
        'De combinatie van {{candStr1}} en {{candStr2}} vormt een sterke ketting, {{candStr3}} vormt een sterke ketting tussen twee cellen. Deze kettingen zijn verbonden door een zwakke ketting via de combinatie van {{pivotStr1}} en {{pivotStr2}}. Ongeacht welke van {{candStr4}} waar is, kan {{target}} niet voorkomen in {{posStr}}',
      COMBINATION_CHAIN_3_2_2_STRONG:
        'De combinatie van {{candStr1}} en {{candStr2}} vormt een sterke ketting, {{candStr3}} vormt een sterke ketting tussen twee cellen. Deze kettingen zijn verbonden door een sterke ketting via de combinatie van {{pivotStr1}} en {{pivotStr2}}. Ongeacht welke van {{candStr4}} waar is, kan {{target}} niet voorkomen in {{posStr}}',
      LOOP_3_2_2:
        '{{nodeStr1}} vormt een sterke ketting, {{nodeStr2}} vormt een sterke ketting, {{nodeStr3}} vormt een sterke ketting. Deze drie sterke kettingen zijn verbonden door een zwakke ketting voor een lus. Als {{rootNodeStr}} onwaar is en begint bij hem, zal de logische deductie in beide richtingen uiteindelijk tot een contradictie op de lus leiden, dus {{rootNodeStr}} moet waar zijn.',
      LOOP_3_2:
        '{{nodeStr1}} vormt een sterke ketting, {{nodeStr2}} vormt een sterke ketting. Deze twee sterke kettingen zijn verbonden door een zwakke ketting voor een lus. Als {{rootNodeStr}} onwaar is en begint bij hem, zal de logische deductie in beide richtingen uiteindelijk tot een contradictie op de lus leiden, dus {{rootNodeStr}} moet waar zijn.',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}} en {{deleteStr}} vormen een soortgelijke unieke rechthoekstructuur, dat wil zeggen, er zijn vier cellen op het bord, ze vormen een rechthoek die zich in twee blokken bevindt en elk van hen heeft twee dezelfde kandidaten. Wanneer het bord deze structuur heeft, betekent dit dat de sudoku niet legaal is, dus {{deleteStr}} moet kandidaat {{target}} elimineren om ervoor te zorgen dat de sudoku een unieke oplossing heeft',
      UNIQUE_RECTANGLE2:
        'Als de rode cel {{target}} bevat, zullen de vier cellen bij {{nodeStr}} een unieke rechthoekstructuur vormen, wat betekent dat er vier cellen op het bord zijn die een rechthoek vormen die zich in twee blokken bevindt en elk van hen heeft twee identieke kandidaten. Wanneer deze structuur op het bord verschijnt, geeft dit aan dat de huidige sudoku ongeldig is. Daarom kan de rode cel geen kandidaat {{target}} bevatten',
      BINARY_UNIVERSAL_GRAVE:
        'Als we aannemen dat {{posStr}} geen {{target}} bevat, zullen alle kandidaatcellen op het bord slechts twee kandidaten hebben, en elke kandidaat verschijnt slechts twee keer in elke rij, kolom en blok. Deze structuur zal leiden tot meerdere oplossingen in sudoku. Om deze situatie te vermijden, moet {{posStr}} {{target}} bevatten',
      SWORDFISH_ROW:
        'De blauwe cellen in de drie rijen bevatten geen andere kandidaatcellen voor {{target}}, ongeacht hoe deze cellen worden ingevuld, kan {{target}} niet voorkomen in de corresponderende drie kolommen',
      SWORDFISH_COLUMN:
        'De blauwe cellen in de drie kolommen bevatten geen andere kandidaatcellen voor {{target}}, ongeacht hoe deze cellen worden ingevuld, kan {{target}} niet voorkomen in de corresponderende drie rijen',
      JELLYFISH_ROW:
        'De blauwe cellen in de vier rijen bevatten geen andere kandidaatcellen voor {{target}}, ongeacht hoe deze cellen worden ingevuld, kan {{target}} niet voorkomen in de corresponderende vier kolommen',
      JELLYFISH_COLUMN:
        'De blauwe cellen in de vier kolommen bevatten geen andere kandidaatcellen voor {{target}}, ongeacht hoe deze cellen worden ingevuld, kan {{target}} niet voorkomen in de corresponderende vier rijen',
      DOUBLE_COLOR_CHAIN_delete:
        'wanneer {{posStr}} de waarde {{target}} heeft, kan de rode cel niet de waarde {{target}} hebben',
      DOUBLE_COLOR_CHAIN_s:
        'wanneer {{posStr1}} de waarde {{target1}} heeft, leidt dit ertoe dat {{posStr2}} de waarde {{target2}} heeft',
      DOUBLE_COLOR_CHAIN_r:
        'wanneer {{posStr1}} de waarde {{target}} heeft, kan {{posStr2}} niet de waarde {{target}} hebben',
      DOUBLE_COLOR_CHAIN_q:
        'omdat {{posStr1}} en {{posStr2}} een sterke verbinding vormen voor {{target}}, moet {{posStr2}} de waarde {{target}} hebben',
      DOUBLE_COLOR_CHAIN_q_start:
        'wanneer {{posStr}} de waarde {{target1}} heeft, kan de huidige cel niet de waarde {{target2}} hebben',
      COMBINATION_CHAIN_AB_STRONG: '{{A}} en {{B}} vormen een sterke verbinding',
      COMBINATION_CHAIN_AB_WEAK: '{{A}} en {{B}} vormen een zwakke verbinding',
      COMBINATION_CHAIN_END:
        'Wanneer {{A}} waar is, is de rode cel onwaar. Wanneer {{A}} onwaar is, wordt door deductie {{B}} waar, en de rode cel blijft onwaar',
      SKYSCRAPER2_1:
        'Er bestaat een sterke verbinding tussen de twee cellen {{As}}, er bestaat een sterke verbinding tussen vier cellen {{Bs}}, en deze twee sterke verbindingen zijn verbonden door een zwakke verbinding tussen de twee cellen {{Cs}}. Wanneer {{A}} waar is, is de rode cel onwaar. Wanneer {{A}} onwaar is, is {{B}} waar, en de rode cel blijft onwaar',
      SKYSCRAPER2_2:
        'Er bestaat een sterke verbinding tussen de twee cellen {{As}}, er bestaat een sterke verbinding tussen de twee cellen {{Bs}}, en er bestaat een sterke verbinding tussen de twee cellen {{Cs}}. Elke sterke verbinding is met de anderen verbonden door zwakke verbindingen. Wanneer {{A}} waar is, is de rode cel onwaar. Wanneer {{A}} onwaar is, is {{B}} waar, en de rode cel blijft onwaar',
    },
    back: 'Terug',
    next: 'Volgende',
    errorDraft: 'Fout in notities, corrigeer eerst',
    pleaseConnectNetwork: 'Maak verbinding met internet',
    setting: 'Instellingen',
    removeAD: 'Verwijder Advertenties',
    sound: 'Geluid',
    notice: 'Meldingen',
    privacyPolicy: 'Privacybeleid',
    serviceTerms: 'Servicevoorwaarden',
    language: 'Taal',
    feedback: 'Feedback',
    feedbackMessage: 'Bericht:',
    congratulations: 'Gelukt!',
    restore: 'Herstellen',
    restoring: 'Herstellen...',
    purchasing: 'Kopen...',
    illegalPrompt:
      'Het systeem heeft vastgesteld dat je het programma vaak verlaat, wat erop kan wijzen dat je aan het ontkoppelen bent. Wacht een minuut en probeer het opnieuw.',
    highlight: 'Highlight',
    myBoards: 'Mijn Sudoku',
    Home: 'Start',
    saveToMyBoards: 'Opslaan in Mijn Sudoku',
    pleaseNameYourSudoku: 'Geef uw Sudoku een naam',
    success: 'Succes',
    sudokuSavedToMyBoards: 'Sudoku opgeslagen in Mijn Sudoku!',
    error: 'Fout',
    saveFailedPleaseTryAgainLater: 'Opslaan mislukt, probeer het opnieuw later',
    confirm: 'Bevestigen',
    noNetwork:
      'U heeft geen internetverbinding. Als u doorgaat, wordt uw Sudoku niet opgeslagen. Wilt u doorgaan?',
    loading: 'Laden...',
    pleaseCheckNetwork: 'Laden mislukt, controleer of de internetverbinding is ingesteld',
    pleaseCheckiCloud: 'Laden mislukt, controleer of iCloud is ingelogd',
    untitled: 'Onbenoemd',
    enlarge: 'Vergroten',
    encourage: 'Ons ondersteunen❤️',
    share: 'Delen',
    shareMessage: 'Een sudoku-spel dat aanpassingen ondersteunt, probeer het!',
    wether: 'Hoe dan ook, de rode cel kan geen kandidaat {{target}} bevatten',
    case1: 'Case 1:',
    case2: 'Case 2:',
    case3: 'Case 3:',
    comma: ',',
    period: '.',
    end1: 'De rode cel kan geen {{target}} bevatten',
    end2: 'De rode cel kan nog steeds geen {{target}} bevatten',
    theme: 'Thema',
    selectTheme: 'Thema selecteren',
    lightMode: 'Lichtmodus',
    darkMode: 'Donkermodus',
    strictMode: 'Strenge Modus',
    reasonMode: 'Beweismodus',
    strictText:
      'Strenge Modus: Wanneer de waarde die u invoert niet overeenkomt met de oplossing, wordt een foutbericht weergegeven',
    reasonText:
      'Beweismodus: Wanneer de waarde die u invoert niet overeenkomt met de oplossing, wordt geen foutbericht weergegeven',
    localGames: 'Lokale Sudoku',
    statistics: 'Statistieken',
    entry: 'Beginner',
    easy: 'Makkelijk',
    medium: 'Gemiddeld',
    hard: 'Moeilijk',
    extreme: 'Extreem',
    dataSync: 'Gegevenssynchronisatieinstructie',
    dataSyncDescription:
      '1.Vriendelijke herinnering: Als u van apparaat verandert, worden iCloud-gegevens mogelijk niet direct gesynchroniseerd met het nieuwe apparaat. We raden u aan de app een paar keer opnieuw te openen of even te wachten. Gedurende deze periode kunt u werken aan lokale puzzels. Nadat de oude gegevens zijn bijgewerkt, helpt de app u automatisch de nieuwe gegevens te integreren.',
    total: 'Totaal',
    pleaseLoginGameCenter:
      'Log eerst in op GameCenter. Als u al bent ingelogd, open de app dan opnieuw.',
    tips: 'Tips',
    dataSyncDescription2: '2.Uw ranglijst wordt binnen 24 uur wereldwijd gesynchroniseerd.',
  },
};
