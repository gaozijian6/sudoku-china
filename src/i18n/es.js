export default {
  translation: {
    home: {
      title: 'Sudoku',
      startGame: 'Comenzar juego',
      createGame: 'Crear juego',
      settings: 'Ajustes',
    },
    game: {
      pause: 'Pausar',
      resume: 'Continuar',
      restart: 'Reiniciar',
      quit: 'Salir',
    },
    difficulty: {
      title: 'Seleccionar dificultad',
      entry: '😀Principiante',
      easy: '🤔Fácil',
      medium: '😮Medio',
      hard: '😣Difícil',
      extreme: '🤯Extremo',
      custom: 'Personalizado',
    },
    start: 'Comenzar',
    continue: 'Continuar',
    undo: 'Deshacer',
    erase: 'Borrar',
    notes: 'Notas',
    autoNote: 'Notas automáticas',
    hint: 'Pista',
    apply: 'Aplicar',
    cancel: 'Cancelar',
    selectMode: 'Seleccionar modo',
    legal: 'Sudoku válido',
    solving: 'Resolviendo...',
    illegal: 'Sudoku inválido',
    answer: 'Respuesta',
    incomplete: 'Sudoku incompleto',
    CHECK_CANDIDATE: 'Verificar candidatos',
    SINGLE_CANDIDATE: 'Candidato único',
    HIDDEN_SINGLE_ROW: 'Único oculto',
    HIDDEN_SINGLE_COLUMN: 'Único oculto',
    HIDDEN_SINGLE_BOX: 'Único oculto',
    BLOCK_ELIMINATION_ROW: 'Eliminación de bloque',
    BLOCK_ELIMINATION_COLUMN: 'Eliminación de bloque',
    BLOCK_ELIMINATION_BOX_ROW: 'Eliminación de bloque',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Eliminación de bloque',
    NAKED_PAIR_ROW: 'Par desnudo',
    NAKED_PAIR_COLUMN: 'Par desnudo',
    NAKED_PAIR_BOX: 'Par desnudo',
    NAKED_TRIPLE_ROW1: 'Triple desnudo',
    NAKED_TRIPLE_COLUMN1: 'Triple desnudo',
    NAKED_TRIPLE_BOX1: 'Triple desnudo',
    NAKED_TRIPLE_ROW2: 'Triple desnudo',
    NAKED_TRIPLE_COLUMN2: 'Triple desnudo',
    NAKED_TRIPLE_BOX2: 'Triple desnudo',
    HIDDEN_PAIR_ROW: 'Par oculto',
    HIDDEN_PAIR_COLUMN: 'Par oculto',
    HIDDEN_PAIR_BOX: 'Par oculto',
    HIDDEN_TRIPLE_ROW: 'Triple oculto',
    HIDDEN_TRIPLE_COLUMN: 'Triple oculto',
    HIDDEN_TRIPLE_BOX: 'Triple oculto',
    NAKED_QUADRUPLE_ROW: 'Cuádruple desnudo',
    NAKED_QUADRUPLE_COLUMN: 'Cuádruple desnudo',
    NAKED_QUADRUPLE_BOX: 'Cuádruple desnudo',
    X_WING_ROW: 'X-Wing',
    X_WING_COLUMN: 'X-Wing',
    X_WING_VARIENT_ROW: 'X-Wing con aleta',
    X_WING_VARIENT_COLUMN: 'X-Wing con aleta',
    XY_WING: 'XY-Wing',
    XYZ_WING: 'XYZ-Wing',
    SKYSCRAPER: 'Rascacielos',
    SKYSCRAPER2: 'Dos enlaces fuertes',
    THREESTRONGLINKS: 'Tres enlaces fuertes',
    XCHAIN: 'Cadena X',
    COMBINATION_CHAIN: 'Cadena de combinación',
    SWORDFISH_ROW: 'Pez espada',
    SWORDFISH_COLUMN: 'Pez espada',
    JELLYFISH_ROW: 'Pez espada',
    JELLYFISH_COLUMN: 'Pez espada',
    WXYZ_WING: 'WXYZ-Wing',
    LOOP: 'Bucle',
    UNIQUE_RECTANGLE: 'Rectángulo único',
    BINARY_UNIVERSAL_GRAVE: 'Tumba binaria universal',
    DOUBLE_COLOR_CHAIN: 'Cadena Bicolor',
    TRIPLE_COLOR_CHAIN: 'Cadena Tricolor',
    TWO_STRING_KITE: 'Cadena de dos cadenas',
    TRIAL_AND_ERROR: 'Prueba y error',
    duration: 'Tiempo',
    mistakes: 'Errores',
    hintCount: 'Pistas usadas',
    hints: {
      SINGLE_CANDIDATE:
        'La celda R{{row}}C{{col}} solo tiene un candidato {{target}}, por lo tanto su valor debe ser {{target}}',
      HIDDEN_SINGLE_ROW:
        'El candidato {{target}} en la fila {{row}} solo aparece en una celda, por lo tanto su valor debe ser {{target}}',
      HIDDEN_SINGLE_COLUMN:
        'El candidato {{target}} en la columna {{col}} solo aparece en una celda, por lo tanto su valor debe ser {{target}}',
      HIDDEN_SINGLE_BOX:
        'El candidato {{target}} en el bloque {{box}} solo aparece en una celda, por lo tanto su valor debe ser {{target}}',
      TRIAL_AND_ERROR:
        'Intentando colocar {{target}} en la celda con menos candidatos. Si no hay solución, {{target}} es incorrecto y se probarán otros candidatos',
      BLOCK_ELIMINATION_ROW:
        'En el bloque {{box}}, el candidato {{target}} solo aparece en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la misma fila',
      BLOCK_ELIMINATION_COLUMN:
        'En el bloque {{box}}, el candidato {{target}} solo aparece en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la misma columna',
      BLOCK_ELIMINATION_BOX_ROW:
        'En la fila {{row}}, el candidato {{target}} solo aparece en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones del mismo bloque',
      BLOCK_ELIMINATION_BOX_COLUMN:
        'En la columna {{col}}, el candidato {{target}} solo aparece en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones del mismo bloque',
      NAKED_PAIR_ROW:
        'En la fila {{row}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la fila',
      NAKED_PAIR_COLUMN:
        'En la columna {{col}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la columna',
      NAKED_PAIR_BOX:
        'En el bloque {{box}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones del bloque',
      NAKED_TRIPLE_ROW1:
        'En la fila {{row}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la fila',
      NAKED_TRIPLE_COLUMN1:
        'En la columna {{col}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la columna',
      NAKED_TRIPLE_BOX1:
        'En el bloque {{box}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones del bloque',
      NAKED_TRIPLE_ROW2:
        'En la fila {{row}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la fila',
      NAKED_TRIPLE_COLUMN2:
        'En la columna {{col}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la columna',
      NAKED_TRIPLE_BOX2:
        'En el bloque {{box}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones del bloque',
      NAKED_QUADRUPLE_ROW:
        'En la fila {{row}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la fila',
      NAKED_QUADRUPLE_COLUMN:
        'En la columna {{col}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones de la columna',
      NAKED_QUADRUPLE_BOX:
        'En el bloque {{box}}, el candidato {{target}} solo puede aparecer en las posiciones {{positions}}, por lo tanto no puede aparecer en otras posiciones del bloque',
      HIDDEN_PAIR_ROW:
        'En la fila {{row}}, los candidatos {{candStr}} solo aparecen en las posiciones {{positions}}, por lo tanto estas celdas no pueden contener otros candidatos',
      HIDDEN_PAIR_COLUMN:
        'En la columna {{col}}, los candidatos {{candStr}} solo aparecen en las posiciones {{positions}}, por lo tanto estas celdas no pueden contener otros candidatos',
      HIDDEN_PAIR_BOX:
        'En el bloque {{box}}, los candidatos {{candStr}} solo aparecen en las posiciones {{positions}}, por lo tanto estas celdas no pueden contener otros candidatos',
      HIDDEN_TRIPLE_ROW:
        'En la fila {{row}}, los candidatos {{candStr}} solo aparecen en las posiciones {{positions}}, por lo tanto estas celdas no pueden contener otros candidatos',
      HIDDEN_TRIPLE_COLUMN:
        'En la columna {{col}}, los candidatos {{candStr}} solo aparecen en las posiciones {{positions}}, por lo tanto estas celdas no pueden contener otros candidatos',
      HIDDEN_TRIPLE_BOX:
        'En el bloque {{box}}, los candidatos {{candStr}} solo aparecen en las posiciones {{positions}}, por lo tanto estas celdas no pueden contener otros candidatos',
      X_WING_ROW:
        'En las filas {{row1}} y {{row2}}, el candidato {{candStr}} aparece solo en dos posiciones por fila con las mismas columnas. Sin importar cuáles sean verdaderas, las otras posiciones en estas columnas no pueden contener {{candStr}}',
      X_WING_COLUMN:
        'En las columnas {{col1}} y {{col2}}, el candidato {{candStr}} aparece solo en dos posiciones por columna con las mismas filas. Sin importar cuáles sean verdaderas, las otras posiciones en estas filas no pueden contener {{candStr}}',
      X_WING_VARIENT_ROW:
        'De las {{length}} posiciones {{positions}}, sin importar cuáles contengan {{candStr}}, la celda R{{row}}C{{col}} no puede contener {{candStr}}',
      X_WING_VARIENT_COLUMN:
        'De las {{length}} posiciones {{positions}}, sin importar cuáles contengan {{candStr}}, la celda R{{row}}C{{col}} no puede contener {{candStr}}',
      XY_WING:
        'Sin importar cómo se resuelvan las tres celdas {{positions}}, {{deleteStr}} no puede contener el candidato {{candStr}}',
      XYZ_WING:
        'Sin importar cómo se resuelvan las tres celdas {{positions}}, {{deleteStr}} no puede contener el candidato {{candStr}}',
      SKYSCRAPER:
        'Las celdas azules {{positions}} forman una cadena conjugada. Ya sea que R{{row1}}C{{col1}} o R{{row2}}C{{col2}} contenga {{target}}, {{deleteStr}} no puede contener {{target}}',
      SKYSCRAPER2:
        'Las celdas R{{row1}}C{{col1}} y R{{row2}}C{{col2}} forman un enlace fuerte, las celdas R{{row3}}C{{col3}} y R{{row4}}C{{col4}} forman otro enlace fuerte, conectados por un enlace débil entre R{{row3}}C{{col3}} y R{{row2}}C{{col2}}. Si R{{row1}}C{{col1}} es verdadero, {{deleteStr}} debe ser falso. Si R{{row1}}C{{col1}} es falso, R{{row4}}C{{col4}} debe ser verdadero, lo que también hace que {{deleteStr}} sea falso. En cualquier caso, {{target}} no puede aparecer en {{deleteStr}}',
      WXYZ_WING:
        '{{candStr}} forma un WXYZ-Wing con R{{row1}}C{{col1}} como pivote. Sin importar cómo se resuelvan estas cuatro celdas, {{target}} no puede aparecer en {{deleteStr}}',
      COMBINATION_CHAIN_3_2_1_STRONG:
        'La combinación de {{candStr1}} y {{candStr2}} forma un enlace fuerte. Sin importar cuál de {{candStr4}} sea verdadero, {{target}} no puede aparecer en {{posStr}}',
      COMBINATION_CHAIN_3_2_1_WEAK:
        'La combinación de {{candStr1}} y {{candStr2}} forma un enlace fuerte, {{candStr3}} forma un enlace fuerte entre cuatro celdas, estos dos enlaces fuertes están conectados por un enlace débil a través de {{pivotStr}}. Sin importar cuál de {{candStr4}} sea verdadero, {{target}} no puede aparecer en {{posStr}}',
      COMBINATION_CHAIN_3_2_2_WEAK:
        'La combinación de {{candStr1}} y {{candStr2}} forma un enlace fuerte, {{candStr3}} forma un enlace fuerte entre dos celdas, estos dos enlaces fuertes están conectados por un enlace débil a través del conjunto de {{pivotStr1}} y {{pivotStr2}}. Sin importar cuál de {{candStr4}} sea verdadero, {{target}} no puede aparecer en {{posStr}}',
      COMBINATION_CHAIN_3_2_2_STRONG:
        'La combinación de {{candStr1}} y {{candStr2}} forma un enlace fuerte, {{candStr3}} forma un enlace fuerte entre dos celdas, estos dos enlaces fuertes están conectados por un enlace fuerte a través del conjunto de {{pivotStr1}} y {{pivotStr2}}. Sin importar cuál de {{candStr4}} sea verdadero, {{target}} no puede aparecer en {{posStr}}',
      LOOP_3_2_2:
        '{{nodeStr1}} forma un enlace fuerte, {{nodeStr2}} forma un enlace fuerte, {{nodeStr3}} forma un enlace fuerte. Estos están conectados por un enlace débil para formar un bucle. Suponiendo que {{rootNodeStr}} es falso y comienza desde él, la deducción lógica en ambas direcciones finalmente conducirá a una contradicción en el bucle, por lo que {{rootNodeStr}} debe ser verdadero.',
      LOOP_3_2:
        '{{nodeStr1}} forma un enlace fuerte, {{nodeStr2}} forma un enlace fuerte. Estos están conectados por un enlace débil para formar un bucle. Suponiendo que {{rootNodeStr}} es falso y comienza desde él, la deducción lógica en ambas direcciones finalmente conducirá a una contradicción en el bucle, por lo que {{rootNodeStr}} debe ser verdadero.',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}} y {{deleteStr}} forman una estructura similar a un rectángulo único, es decir, hay cuatro celdas en el tablero que forman un rectángulo, ubicadas en dos bloques, y contienen los mismos dos candidatos. Cuando aparece esta estructura, significa que el sudoku no es válido, por lo tanto, {{deleteStr}} debe eliminar el candidato {{target}} para asegurar una solución única',
      UNIQUE_RECTANGLE2:
        'Si la celda roja contiene {{target}}, entonces las cuatro celdas {{nodeStr}} formarán una estructura de rectángulo único, es decir, hay cuatro celdas en el tablero que forman un rectángulo, ubicadas en dos bloques, y contienen los mismos dos candidatos. Cuando aparece esta estructura, significa que el sudoku no es válido, por lo tanto, la celda roja no puede contener el candidato {{target}}',
      BINARY_UNIVERSAL_GRAVE:
        'Suponiendo que {{posStr}} no contiene {{target}}, todas las celdas candidatas en el tablero solo tendrán dos candidatos, y cada candidato aparecerá solo dos veces en cada fila, columna y bloque. Esta estructura llevará a múltiples soluciones en el sudoku. Para evitar esto, {{posStr}} debe contener {{target}}',
      SWORDFISH_ROW:
        'Las celdas azules en las tres filas no tienen otros candidatos para {{target}}. Sin importar cómo se resuelvan estas celdas, las tres columnas correspondientes no deben contener el candidato {{target}}',
      SWORDFISH_COLUMN:
        'Las celdas azules en las tres columnas no tienen otros candidatos para {{target}}. Sin importar cómo se resuelvan estas celdas, las tres filas correspondientes no deben contener el candidato {{target}}',
      JELLYFISH_ROW:
        'Las celdas azules en las cuatro filas no tienen otros candidatos para {{target}}. Sin importar cómo se resuelvan estas celdas, las cuatro columnas correspondientes no deben contener el candidato {{target}}',
      JELLYFISH_COLUMN:
        'Las celdas azules en las cuatro columnas no tienen otros candidatos para {{target}}. Sin importar cómo se resuelvan estas celdas, las cuatro filas correspondientes no deben contener el candidato {{target}}',
      DOUBLE_COLOR_CHAIN_delete:
        'cuando {{posStr}} toma {{target}}, la celda roja no puede tomar {{target}}',
      DOUBLE_COLOR_CHAIN_s:
        'cuando {{posStr1}} toma {{target1}}, llevará a que {{posStr2}} tome {{target2}}',
      DOUBLE_COLOR_CHAIN_r:
        'cuando {{posStr1}} toma {{target}}, provocará que {{posStr2}} no pueda tomar {{target}}',
      DOUBLE_COLOR_CHAIN_q:
        'como {{posStr1}} y {{posStr2}} forman un enlace fuerte para {{target}}, {{posStr2}} debe ser {{target}}',
      DOUBLE_COLOR_CHAIN_q_start:
        'cuando {{posStr}} toma {{target1}}, la celda actual no puede tomar {{target2}}',
      COMBINATION_CHAIN_AB_STRONG: '{{A}} y {{B}} forman un enlace fuerte',
      COMBINATION_CHAIN_AB_WEAK: '{{A}} y {{B}} forman un enlace débil',
      COMBINATION_CHAIN_END:
        'Cuando {{A}} es verdadero, la celda roja es falsa. Cuando {{A}} es falso, mediante deducción {{B}} se vuelve verdadero, y la celda roja sigue siendo falsa',
      SKYSCRAPER2_1:
        'Existe un enlace fuerte entre las dos celdas {{As}}, existe un enlace fuerte entre cuatro celdas {{Bs}}, y estos dos enlaces fuertes están conectados por un enlace débil entre las dos celdas {{Cs}}. Cuando {{A}} es verdadero, la celda roja es falsa. Cuando {{A}} es falso, {{B}} es verdadero, y la celda roja sigue siendo falsa',
      SKYSCRAPER2_2:
        'Existe un enlace fuerte entre las dos celdas {{As}}, existe un enlace fuerte entre las dos celdas {{Bs}}, y existe un enlace fuerte entre las dos celdas {{Cs}}. Cada enlace fuerte está conectado a los otros por enlaces débiles. Cuando {{A}} es verdadero, la celda roja es falsa. Cuando {{A}} es falso, {{B}} es verdadero, y la celda roja sigue siendo falsa',
    },
    back: 'Volver',
    next: 'Siguiente nivel',
    errorDraft: 'Hay errores en las notas, por favor corrígelos primero',
    pleaseConnectNetwork: 'Por favor conecta a internet',
    setting: 'Ajustes',
    removeAD: 'Quitar anuncios',
    sound: 'Sonido',
    notice: 'Notificaciones',
    privacyPolicy: 'Política de privacidad',
    serviceTerms: 'Términos de servicio',
    language: 'Idioma',
    feedback: 'Feedback',
    feedbackMessage: 'Mensaje:',
    congratulations: '¡Felicidades!',
    restore: 'Restaurar compra',
    restoring: 'Restaurando compra...',
    purchasing: 'Comprando...',
    illegalPrompt:
      'El sistema ha detectado que está saliendo del programa con frecuencia, lo que podría ser una señal de evasión de anuncios. Por favor, espere un minuto y vuelva a intentarlo.',
    highlight: 'Resaltar',
    myBoards: 'Mis sudokus',
    Home: 'Inicio',
    saveToMyBoards: 'Guardar en Mis sudokus',
    pleaseNameYourSudoku: 'Por favor, dale un nombre a tu sudoku',
    success: '¡Éxito!',
    sudokuSavedToMyBoards: '¡Sudoku guardado en Mis sudokus!',
    error: '¡Error!',
    saveFailedPleaseTryAgainLater: '¡Guardado falló, por favor, inténtalo de nuevo más tarde',
    confirm: 'Confirmar',
    noNetwork:
      'No tiene conexión a internet. Si continúa, su sudoku no se guardará. ¿Está seguro de que desea continuar?',
    loading: 'Cargando...',
    pleaseCheckNetwork:
      'Carga fallida, por favor, verifique si la conexión a internet está establecida',
    pleaseCheckiCloud: 'Carga fallida, por favor, verifique si iCloud está iniciado sesión',
    untitled: 'Sin nombre',
    enlarge: 'Ampliar',
    encourage: 'Animarnos❤️',
    share: 'Compartir',
    shareMessage: 'Una aplicación de sudoku que admite personalizaciones, ¡inténtala!',
    wether: 'Independientemente de la situación, la celda roja no puede contener {{target}}',
    case1: 'Caso 1:',
    case2: 'Caso 2:',
    case3: 'Caso 3:',
    comma: ',',
    period: '.',
    end1: 'La celda roja no puede contener {{target}}',
    end2: 'La celda roja todavía no puede contener {{target}}',
    theme: 'Tema',
    selectTheme: 'Seleccionar tema',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    strictMode: 'Modo estricto',
    reasonMode: 'Modo de razonamiento',
    strictText:
      'Modo estricto: Cuando el valor que ingresa no coincide con la respuesta, se mostrará un mensaje de error',
    reasonText:
      'Modo de razonamiento: Cuando el valor que ingresa no coincide con la respuesta, no se mostrará un mensaje de error',
    localGames: 'Sudokus locales',
    statistics: 'Estadísticas',
    entry: 'Principiante',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    extreme: 'Extremo',
    dataSync: 'Instrucciones de sincronización de datos',
    dataSyncDescription:
      '1.Aviso amistoso: Si cambia de dispositivo, es posible que los datos de iCloud no se sincronicen inmediatamente con el nuevo dispositivo. Le sugerimos volver a abrir la aplicación varias veces o esperar un tiempo. Durante este período, puede trabajar en puzzles locales. Después de que se actualicen los datos antiguos, la aplicación le ayudará automáticamente a integrar los nuevos datos.',
    total: 'Total',
    pleaseLoginGameCenter:
      'Por favor, inicie sesión en GameCenter primero. Si ya ha iniciado sesión, vuelva a abrir la aplicación.',
    tips: 'Consejos',
    dataSyncDescription2: '2.Su clasificación se sincronizará globalmente en 24 horas.',
    fastestTime: 'Más rápido',
    averageTime: 'Promedio',
    fixedDescription:
      'Esta operación fijará los números actuales en el tablero. No podrá modificar los números fijados. ¿Está seguro de que desea continuar?',
    doNotShowAgain: 'No mostrar de nuevo',
    boardLimit: 'El número de sudokus ha alcanzado el límite superior, y solo puede crear hasta 300 sudokus',
    updateAvailable: 'Actualización disponible',
    updateMessage: 'Nueva versión {{version}} disponible. Recomendamos actualizar para obtener una mejor experiencia y las últimas funciones.',
    updateNow: 'Actualizar ahora',
    later: 'Más tarde',
    contactAuthor: 'Contactar al autor',
    storageSpaceInsufficient: 'Espacio de almacenamiento insuficiente',
    storageSpaceInsufficientDescription: 'El espacio de almacenamiento de iCloud está lleno. Por favor libere espacio de almacenamiento e inténtelo de nuevo, o actualice su plan de almacenamiento de iCloud.',
    networkConnectionFailed: 'Falló la conexión de red',
    networkConnectionFailedDescription: 'Por favor verifique su conexión de red y configuración de iCloud e inténtelo de nuevo.',
    saveFailed: 'Error al guardar',
    saveFailedDescription: 'Ocurrió un error al guardar datos en iCloud: {{error}}',
  },
};
