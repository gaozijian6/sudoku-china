export default {
  translation: {
    home: {
      title: 'Sudoku Game',
      startGame: 'Start Game',
      createGame: 'Create Game',
      settings: 'Settings',
    },
    game: {
      pause: 'Pause',
      resume: 'Resume',
      restart: 'Restart',
      quit: 'Quit',
    },
    difficulty: {
      title: 'Select Difficulty',
      entry: '😀Entry',
      easy: '🤔Easy',
      medium: '😮Medium',
      hard: '😣Hard',
      extreme: '🤯Extreme',
      custom: 'Custom',
    },
    start: 'Start',
    continue: 'Continue',
    undo: 'Undo',
    erase: 'Erase',
    notes: 'Notes',
    autoNote: 'Auto Notes',
    hint: 'Hint',
    apply: 'Apply',
    cancel: 'Cancel',
    selectMode: 'Select Mode',
    legal: 'Legal',
    solving: 'Solving...',
    illegal: 'Illegal',
    answer: 'Answer',
    CHECK_CANDIDATE: 'Candidate Check',
    SINGLE_CANDIDATE: 'Single Candidate',
    HIDDEN_SINGLE_ROW: 'Hidden Single',
    HIDDEN_SINGLE_COLUMN: 'Hidden Single',
    HIDDEN_SINGLE_BOX: 'Hidden Single',
    BLOCK_ELIMINATION_ROW: 'Block Elimination',
    BLOCK_ELIMINATION_COLUMN: 'Block Elimination',
    BLOCK_ELIMINATION_BOX_ROW: 'Block Elimination',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Block Elimination',
    NAKED_PAIR_ROW: 'Naked Pair',
    NAKED_PAIR_COLUMN: 'Naked Pair',
    NAKED_PAIR_BOX: 'Naked Pair',
    NAKED_TRIPLE_ROW1: 'Naked Triple',
    NAKED_TRIPLE_COLUMN1: 'Naked Triple',
    NAKED_TRIPLE_BOX1: 'Naked Triple',
    NAKED_TRIPLE_ROW2: 'Naked Triple',
    NAKED_TRIPLE_COLUMN2: 'Naked Triple',
    NAKED_TRIPLE_BOX2: 'Naked Triple',
    HIDDEN_PAIR_ROW: 'Hidden Pair',
    HIDDEN_PAIR_COLUMN: 'Hidden Pair',
    HIDDEN_PAIR_BOX: 'Hidden Pair',
    HIDDEN_TRIPLE_ROW: 'Hidden Triple',
    HIDDEN_TRIPLE_COLUMN: 'Hidden Triple',
    HIDDEN_TRIPLE_BOX: 'Hidden Triple',
    NAKED_QUADRUPLE_ROW: 'Naked Quadruple',
    NAKED_QUADRUPLE_COLUMN: 'Naked Quadruple',
    NAKED_QUADRUPLE_BOX: 'Naked Quadruple',
    X_WING_ROW: 'X Wing',
    X_WING_COLUMN: 'X Wing',
    X_WING_VARIENT_ROW: 'X Wing Varient',
    X_WING_VARIENT_COLUMN: 'X Wing Varient',
    XY_WING: 'XY Wing',
    XYZ_WING: 'XYZ Wing',
    SKYSCRAPER: 'Skyscraper',
    SKYSCRAPER2: 'Skyscraper2',
    REMOTE_PAIR: 'Remote Pair',
    COMBINATION_CHAIN: 'Combination Chain',
    SWORDFISH_ROW: 'Swordfish',
    SWORDFISH_COLUMN: 'Swordfish',
    JELLYFISH_ROW: 'Jellyfish',
    JELLYFISH_COLUMN: 'Jellyfish',
    WXYZ_WING: 'WXYZ Wing',
    LOOP: 'Loop',
    UNIQUE_RECTANGLE: 'Unique Rectangle',
    BINARY_UNIVERSAL_GRAVE: 'Binary Universal Grave',
    DOUBLE_COLOR_CHAIN: 'Bicolor Chain',
    TRIPLE_COLOR_CHAIN: 'Tricolor Chain',
    TRIAL_AND_ERROR: 'Trial and Error',
    duration: 'Duration',
    mistakes: 'Mistakes',
    hintCount: 'Hints',
    incomplete: 'Incomplete Sudoku',
    hints: {
      SINGLE_CANDIDATE:
        'Notice that cell R{{row}}C{{col}} has only one candidate {{target}}, so this cell must be {{target}}',
      HIDDEN_SINGLE_ROW:
        'Since {{target}} appears as a candidate in only one cell in row {{row}}, this cell must be {{target}}',
      HIDDEN_SINGLE_COLUMN:
        'Since {{target}} appears as a candidate in only one cell in column {{col}}, this cell must be {{target}}',
      HIDDEN_SINGLE_BOX:
        'Since {{target}} appears as a candidate in only one cell in box {{box}}, this cell must be {{target}}',
      TRIAL_AND_ERROR:
        'Try placing {{target}} in the cell with the fewest candidates. If this leads to no solution, {{target}} must be incorrect - try other candidates',
      BLOCK_ELIMINATION_ROW:
        'Since {{target}} is confined to cells {{positions}} in box {{box}}, it can be removed as a candidate from other cells in that row',
      BLOCK_ELIMINATION_COLUMN:
        'Since {{target}} is confined to cells {{positions}} in box {{box}}, it can be removed as a candidate from other cells in that column',
      BLOCK_ELIMINATION_BOX_ROW:
        'Since {{target}} is confined to cells {{positions}} in row {{row}}, it can be removed as a candidate from other cells in that box',
      BLOCK_ELIMINATION_BOX_COLUMN:
        'Since {{target}} is confined to cells {{positions}} in column {{col}}, it can be removed as a candidate from other cells in that box',
      NAKED_PAIR_ROW:
        'Since candidate {{target}} can only appear in cells {{positions}} in row {{row}}, it can be removed as a candidate from other cells in this row',
      NAKED_PAIR_COLUMN:
        'Since candidate {{target}} can only appear in cells {{positions}} in column {{col}}, it can be removed as a candidate from other cells in this column',
      NAKED_PAIR_BOX:
        'Since candidate {{target}} can only appear in cells {{positions}} in box {{box}}, it can be removed as a candidate from other cells in this box',
      NAKED_TRIPLE_ROW1:
        'Since candidate {{target}} can only appear in cells {{positions}} in row {{row}}, it can be removed as a candidate from other cells in this row',
      NAKED_TRIPLE_COLUMN1:
        'Since candidate {{target}} can only appear in cells {{positions}} in column {{col}}, it can be removed as a candidate from other cells in this column',
      NAKED_TRIPLE_BOX1:
        'Since candidate {{target}} can only appear in cells {{positions}} in box {{box}}, it can be removed as a candidate from other cells in this box',
      NAKED_TRIPLE_ROW2:
        'Since candidate {{target}} can only appear in cells {{positions}} in row {{row}}, it can be removed as a candidate from other cells in this row',
      NAKED_TRIPLE_COLUMN2:
        'Since candidate {{target}} can only appear in cells {{positions}} in column {{col}}, it can be removed as a candidate from other cells in this column',
      NAKED_TRIPLE_BOX2:
        'Since candidate {{target}} can only appear in cells {{positions}} in box {{box}}, it can be removed as a candidate from other cells in this box',
      NAKED_QUADRUPLE_ROW:
        'Since candidate {{target}} can only appear in cells {{positions}} in row {{row}}, it can be removed as a candidate from other cells in this row',
      NAKED_QUADRUPLE_COLUMN:
        'Since candidate {{target}} can only appear in cells {{positions}} in column {{col}}, it can be removed as a candidate from other cells in this column',
      NAKED_QUADRUPLE_BOX:
        'Since candidate {{target}} can only appear in cells {{positions}} in box {{box}}, it can be removed as a candidate from other cells in this box',
      HIDDEN_PAIR_ROW:
        'Since candidate {{candStr}} appears only in cells {{positions}} in row {{row}}, other candidates can be removed from these cells',
      HIDDEN_PAIR_COLUMN:
        'Since candidate {{candStr}} appears only in cells {{positions}} in column {{col}}, other candidates can be removed from these cells',
      HIDDEN_PAIR_BOX:
        'Since candidate {{candStr}} appears only in cells {{positions}} in box {{box}}, other candidates can be removed from these cells',
      HIDDEN_TRIPLE_ROW:
        'Since candidate {{candStr}} appears only in cells {{positions}} in row {{row}}, other candidates can be removed from these cells',
      HIDDEN_TRIPLE_COLUMN:
        'Since candidate {{candStr}} appears only in cells {{positions}} in column {{col}}, other candidates can be removed from these cells',
      HIDDEN_TRIPLE_BOX:
        'Since candidate {{candStr}} appears only in cells {{positions}} in box {{box}}, other candidates can be removed from these cells',
      X_WING_ROW:
        'In rows {{row1}} and {{row2}}, candidate number {{candStr}} has two possible cells in each row and these cells are aligned in the same columns. Regardless of which two cells among these four actually contain {{candStr}}, this candidate can be eliminated from all other cells in these columns.',
      X_WING_COLUMN:
        'In columns {{col1}} and {{col2}}, candidate number {{candStr}} has two possible cells in each column and these cells are aligned in the same rows. Regardless of which two cells among these four actually contain {{candStr}}, this candidate can be eliminated from all other cells in these rows.',
      X_WING_VARIENT_ROW:
        'Among the {{length}} candidate cells at {{positions}}, regardless of which two cells contain {{candStr}}, this means that candidate {{candStr}} cannot appear in the cell at R{{row}}C{{col}}.',
      X_WING_VARIENT_COLUMN:
        'Among the {{length}} candidate cells at {{positions}}, regardless of which two cells contain {{candStr}}, this means that candidate {{candStr}} cannot appear in the cell at R{{row}}C{{col}}.',
      XY_WING:
        'Regardless of what values are placed in these three candidate cells at {{positions}}, candidate {{candStr}} cannot appear in {{deleteStr}}.',
      XYZ_WING:
        'Regardless of what values are placed in these three candidate cells at {{positions}}, candidate {{candStr}} cannot appear in {{deleteStr}}.',
      SKYSCRAPER:
        'The blue cells at {{positions}} form a conjugate pair. Whether cell R{{row1}}C{{col1}} or cell R{{row2}}C{{col2}} contains {{target}}, candidate {{target}} cannot appear in {{deleteStr}}.',
      SKYSCRAPER2:
        'Cells R{{row1}}C{{col1}} and R{{row2}}C{{col2}} form one strong link, while R{{row3}}C{{col3}} and R{{row4}}C{{col4}} form another strong link. These are connected by a weak link between R{{row3}}C{{col3}} and R{{row2}}C{{col2}}. If R{{row1}}C{{col1}} is true, then {{deleteStr}} must be false. If R{{row1}}C{{col1}} is false, then R{{row4}}C{{col4}} must be true, which still makes {{deleteStr}} false. Either way, candidate {{target}} cannot appear in {{deleteStr}}.',
      REMOTE_PAIR:
        '{{posStr1}} form a remote pair. These two remote pairs form a strong link through {{posStr2}}. Regardless of which cell in {{posStr1}} is true, candidate {{target}} cannot appear in {{posStr}}.',
      WXYZ_WING:
        '{{candStr}} form a WXYZ-Wing, with R{{row1}}C{{col1}} as the pivot. Regardless of what values are placed in these four candidate cells, candidate {{target}} cannot appear in {{deleteStr}}.',
      COMBINATION_CHAIN_3_2_1_STRONG:
        'The combination of the two cells with {{candStr1}} forms a strong link with {{candStr2}}. Regardless of which cell in {{candStr4}} is true, candidate {{target}} cannot appear in {{posStr}}.',
      COMBINATION_CHAIN_3_2_1_WEAK:
        'The combination of two cells with {{candStr1}} forms a strong link with {{candStr2}}, four cells with {{candStr3}} form a strong link, these two strong links are connected through a weak link formed by {{pivotStr}}. Regardless of which cell in {{candStr4}} is true, candidate {{target}} cannot appear in {{posStr}}.',
      COMBINATION_CHAIN_3_2_2_WEAK:
        'The combination of two cells with {{candStr1}} forms a strong link with {{candStr2}}, two cells with {{candStr3}} form a strong link, these two strong links are connected through a weak link formed by the combination of two cells {{pivotStr1}} and {{pivotStr2}}. Regardless of which cell in {{candStr4}} is true, candidate {{target}} cannot appear in {{posStr}}.',
      COMBINATION_CHAIN_3_2_2_STRONG:
        'The combination of two cells with {{candStr1}} forms a strong link with {{candStr2}}, two cells with {{candStr3}} form a strong link, these two strong links are connected through a strong link formed by the combination of two cells {{pivotStr1}} and {{pivotStr2}}. Regardless of which cell in {{candStr4}} is true, candidate {{target}} cannot appear in {{posStr}}.',
      LOOP_3_2_2:
        '{{nodeStr1}} forms a strong link, {{nodeStr2}} forms a strong link, {{nodeStr3}} forms a strong link, they are connected through a weak link to form a loop. Assuming {{rootNodeStr}} is false and starts from it, the logical deduction in both clockwise and counterclockwise directions will eventually lead to a contradiction on the loop, so {{rootNodeStr}} must be true.',
      LOOP_3_2:
        '{{nodeStr1}} forms a strong link, {{nodeStr2}} forms a strong link, they are connected through a weak link to form a loop. Assuming {{rootNodeStr}} is false and starts from it, the logical deduction in both clockwise and counterclockwise directions will eventually lead to a contradiction on the loop, so {{rootNodeStr}} must be true.',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}} and {{deleteStr}} form a similar unique rectangle structure, that is, there are four cells in the board located in two boxes, they form a rectangle and each of them has two same candidates, when the board has this structure, it means that the sudoku is not legal, so {{deleteStr}} must eliminate candidate {{target}} to ensure that the sudoku has a unique solution.',
      UNIQUE_RECTANGLE2:
        'If the red cell contains {{target}}, then the four cells at {{nodeStr}} will form a unique rectangle structure, meaning there are four cells on the board located in two boxes that form a rectangle and each of them has two identical candidates. When this structure appears on the board, it indicates that the current sudoku is invalid. Therefore, the red cell cannot contain candidate {{target}}.',
      BINARY_UNIVERSAL_GRAVE:
        'Assuming {{posStr}} does not contain {{target}}, all candidate cells on the board will have only two candidates, and each candidate appears only twice in each row, column, and box. This structure will lead to multiple solutions in sudoku. To avoid this situation, {{posStr}} must contain {{target}}.',
      SWORDFISH_ROW:
        'The blue cells in these three rows have no other candidate cells for {{target}}. Regardless of how these cells are filled, candidate {{target}} should not appear in the corresponding three columns.',
      SWORDFISH_COLUMN:
        'The blue cells in these three columns have no other candidate cells for {{target}}. Regardless of how these cells are filled, candidate {{target}} should not appear in the corresponding three rows.',
      JELLYFISH_ROW:
        'The blue cells in these four rows have no other candidate cells for {{target}}. Regardless of how these cells are filled, candidate {{target}} should not appear in the corresponding four columns.',
      JELLYFISH_COLUMN:
        'The blue cells in these four columns have no other candidate cells for {{target}}. Regardless of how these cells are filled, candidate {{target}} should not appear in the corresponding four rows.',
      DOUBLE_COLOR_CHAIN_delete:
        'when {{posStr}} takes {{target}}, the red cell cannot take {{target}}',
      DOUBLE_COLOR_CHAIN_s:
        'when {{posStr1}} takes {{target1}}, it will lead to {{posStr2}} taking {{target2}}',
      DOUBLE_COLOR_CHAIN_r:
        'when {{posStr1}} takes {{target}}, it will cause {{posStr2}} to not be able to take {{target}}',
      DOUBLE_COLOR_CHAIN_q:
        'because {{posStr1}} and {{posStr2}} form a strong link for {{target}}, {{posStr2}} must be {{target}}',
      DOUBLE_COLOR_CHAIN_q_start:
        'when {{posStr}} takes {{target1}}, the current cell cannot take {{target2}}',
    },
    back: 'Back',
    next: 'Next',
    errorDraft: 'The notes contain errors. Please correct them first.',
    pleaseConnectNetwork: 'Please connect to the network first.',
    setting: 'Setting',
    removeAD: 'Remove AD',
    sound: 'Sound',
    notice: 'Notice',
    privacyPolicy: 'Privacy Policy',
    serviceTerms: 'Service Terms',
    language: 'Language',
    feedback: 'Feedback',
    feedbackMessage: 'Message:',
    congratulations: 'Congratulations!',
    restore: 'Restore Purchase',
    restoring: 'Restoring Purchase...',
    purchasing: 'Purchasing...',
    illegalPrompt:
      'The system detected that you are frequently exiting the program, which may be a sign of avoiding ads. Please wait a minute and try again.',
    highlight: 'Highlight',
    myBoards: 'My Sudoku',
    Home: 'Home',
    saveToMyBoards: 'Save to My Sudoku',
    pleaseNameYourSudoku: 'Please name your Sudoku',
    success: 'Success',
    sudokuSavedToMyBoards: 'Sudoku saved to My Sudoku!',
    error: 'Error',
    saveFailedPleaseTryAgainLater: 'Save failed, please try again later',
    confirm: 'Confirm',
    noNetwork:
      'You do not have a network connection. Continuing will not save your puzzle. Are you sure you want to continue?',
    loading: 'Loading...',
    pleaseCheckNetwork: 'Load failed, please check if the network is connected',
    pleaseCheckiCloud: 'Load failed, please check if iCloud is logged in',
    untitled: 'Untitled',
    enlarge: 'Enlarge',
    encourage: 'Encourage us❤️',
    share: 'Share App',
    shareMessage: 'A sudoku game that supports customization, try it!',
    wether: 'Regardless of which situation, the red cell cannot contain {{target}}',
    case1: 'Case 1:',
    case2: 'Case 2:',
    case3: 'Case 3:',
    comma: ',',
    period: '.',
    end1: 'The red cell cannot contain {{target}}',
    end2: 'The red cell still cannot contain {{target}}',
    theme: 'Theme',
    selectTheme: 'Select Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    strictMode: 'Strict Mode',
    reasonMode: 'Reasoning Mode',
    strictText:
      'Strict Mode: When the number you enter does not match the answer, it will prompt an error',
    reasonText:
      'Reasoning Mode: When the number you enter does not match the answer, it will not prompt an error',
    localGames: 'Local Sudoku',
    statistics: 'Statistics',
    entry: 'Entry',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    extreme: 'Extreme',
    dataSync: 'Data Synchronization Instructions',
    dataSyncDescription:
      '1.Friendly reminder: If you change your device, iCloud data may not sync to the new device immediately. We suggest reopening the App several times or waiting for a while. During this period, you can work on local puzzles. After the old data is updated, the App will automatically help you integrate the new data together.',
    total: 'Total',
    pleaseLoginGameCenter: 'Please login GameCenter',
    tips: 'Tips',
    dataSyncDescription2: '2.Your ranking will be synchronized globally within 24 hours.',
  },
};
