export default {
  translation: {
    home: {
      title: '스도쿠 게임',
      startGame: '게임 시작',
      createGame: '게임 만들기',
      settings: '설정',
    },
    game: {
      pause: '일시정지',
      resume: '계속하기',
      restart: '다시 시작',
      quit: '종료',
    },
    difficulty: {
      title: '난이도 선택',
      entry: '😀입문',
      easy: '🤔쉬움',
      medium: '😮보통',
      hard: '😣어려움',
      extreme: '🤯매우 어려움',
      custom: '사용자 지정',
    },
    start: '시작',
    continue: '계속하기',
    undo: '실행 취소',
    erase: '지우기',
    notes: '메모',
    autoNote: '자동 메모',
    hint: '힌트',
    apply: '적용',
    cancel: '취소',
    selectMode: '모드 선택',
    legal: '유효한 스도쿠',
    solving: '해결 중...',
    illegal: '유효하지 않은 스도쿠',
    answer: '정답',
    incomplete: '미완성 스도쿠',
    CHECK_CANDIDATE: '후보 숫자 확인',
    SINGLE_CANDIDATE: '단일 후보',
    HIDDEN_SINGLE_ROW: '숨겨진 단일 숫자',
    HIDDEN_SINGLE_COLUMN: '숨겨진 단일 숫자',
    HIDDEN_SINGLE_BOX: '숨겨진 단일 숫자',
    BLOCK_ELIMINATION_ROW: '블록 제거',
    BLOCK_ELIMINATION_COLUMN: '블록 제거',
    BLOCK_ELIMINATION_BOX_ROW: '블록 제거',
    BLOCK_ELIMINATION_BOX_COLUMN: '블록 제거',
    NAKED_PAIR_ROW: '노출된 쌍',
    NAKED_PAIR_COLUMN: '노출된 쌍',
    NAKED_PAIR_BOX: '노출된 쌍',
    NAKED_TRIPLE_ROW1: '노출된 삼중',
    NAKED_TRIPLE_COLUMN1: '노출된 삼중',
    NAKED_TRIPLE_BOX1: '노출된 삼중',
    NAKED_TRIPLE_ROW2: '노출된 삼중',
    NAKED_TRIPLE_COLUMN2: '노출된 삼중',
    NAKED_TRIPLE_BOX2: '노출된 삼중',
    HIDDEN_PAIR_ROW: '숨겨진 쌍',
    HIDDEN_PAIR_COLUMN: '숨겨진 쌍',
    HIDDEN_PAIR_BOX: '숨겨진 쌍',
    HIDDEN_TRIPLE_ROW: '숨겨진 삼중',
    HIDDEN_TRIPLE_COLUMN: '숨겨진 삼중',
    HIDDEN_TRIPLE_BOX: '숨겨진 삼중',
    NAKED_QUADRUPLE_ROW: '노출된 사중',
    NAKED_QUADRUPLE_COLUMN: '노출된 사중',
    NAKED_QUADRUPLE_BOX: '노출된 사중',
    X_WING_ROW: 'X-윙',
    X_WING_COLUMN: 'X-윙',
    X_WING_VARIENT_ROW: '지느러미 X-윙',
    X_WING_VARIENT_COLUMN: '지느러미 X-윙',
    XY_WING: 'XY-윙',
    XYZ_WING: 'XYZ-윙',
    SKYSCRAPER: '스카이스크래퍼',
    SKYSCRAPER2: '이중 강한 연결',
    THREESTRONGLINKS: '삼중 강한 연결',
    XCHAIN: 'X 체인',
    COMBINATION_CHAIN: '조합 체인',
    SWORDFISH_ROW: '스워드피시',
    SWORDFISH_COLUMN: '스워드피시',
    JELLYFISH_ROW: '젤리피시',
    JELLYFISH_COLUMN: '젤리피시',
    WXYZ_WING: 'WXYZ-윙',
    LOOP: '루프',
    UNIQUE_RECTANGLE: '유일한 사각형',
    BINARY_UNIVERSAL_GRAVE: '이진 전체 무덤',
    DOUBLE_COLOR_CHAIN: '이중색 체인',
    TRIPLE_COLOR_CHAIN: '삼색 체인',
    TWO_STRING_KITE: '두 줄 연',
    TRIAL_AND_ERROR: '시행착오법',
    duration: '소요 시간',
    mistakes: '실수 횟수',
    hintCount: '힌트 사용 횟수',
    hints: {
      SINGLE_CANDIDATE:
        'R{{row}}C{{col}} 셀에는 {{target}} 하나의 후보만 남아있으므로, 이 셀의 값은 {{target}}입니다',
      HIDDEN_SINGLE_ROW:
        '{{row}}행에서 {{target}}은 한 곳에만 올 수 있으므로, 이 셀의 값은 {{target}}입니다',
      HIDDEN_SINGLE_COLUMN:
        '{{col}}열에서 {{target}}은 한 곳에만 올 수 있으므로, 이 셀의 값은 {{target}}입니다',
      HIDDEN_SINGLE_BOX:
        '{{box}}번 박스에서 {{target}}은 한 곳에만 올 수 있으므로, 이 셀의 값은 {{target}}입니다',
      TRIAL_AND_ERROR:
        '가장 적은 후보 숫자를 가진 셀에 {{target}}을 시도해보고, 해결이 불가능하다면 다른 후보 숫자를 시도합니다',
      BLOCK_ELIMINATION_ROW:
        '{{box}}번 박스에서 {{target}}은 {{positions}} 위치에만 있으므로, 같은 행의 다른 위치에는 {{target}}이 올 수 없습니다',
      BLOCK_ELIMINATION_COLUMN:
        '{{box}}번 박스에서 {{target}}은 {{positions}} 위치에만 있으므로, 같은 열의 다른 위치에는 {{target}}이 올 수 없습니다',
      BLOCK_ELIMINATION_BOX_ROW:
        '{{row}}행에서 {{target}}은 {{positions}} 위치에만 있으므로, 같은 박스의 다른 위치에는 {{target}}이 올 수 없습니다',
      BLOCK_ELIMINATION_BOX_COLUMN:
        '{{col}}열에서 {{target}}은 {{positions}} 위치에만 있으므로, 같은 박스의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_PAIR_ROW:
        '{{row}}행에서 {{target}}은 {{positions}} 두 셀에만 올 수 있으므로, 이 행의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_PAIR_COLUMN:
        '{{col}}열에서 {{target}}은 {{positions}} 두 셀에만 올 수 있으므로, 이 열의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_PAIR_BOX:
        '{{box}}번 박스에서 {{target}}은 {{positions}} 두 셀에만 올 수 있으므로, 이 박스의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_TRIPLE_ROW1:
        '{{row}}행에서 {{target}}은 {{positions}} 세 셀에만 올 수 있으므로, 이 행의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_TRIPLE_COLUMN1:
        '{{col}}열에서 {{target}}은 {{positions}} 세 셀에만 올 수 있으므로, 이 열의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_TRIPLE_BOX1:
        '{{box}}번 박스에서 {{target}}은 {{positions}} 세 셀에만 올 수 있으므로, 이 박스의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_TRIPLE_ROW2:
        '{{row}}행에서 {{target}}은 {{positions}} 세 셀에만 올 수 있으므로, 이 행의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_TRIPLE_COLUMN2:
        '{{col}}열에서 {{target}}은 {{positions}} 세 셀에만 올 수 있으므로, 이 열의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_TRIPLE_BOX2:
        '{{box}}번 박스에서 {{target}}은 {{positions}} 세 셀에만 올 수 있으므로, 이 박스의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_QUADRUPLE_ROW:
        '{{row}}행에서 {{target}}은 {{positions}} 네 셀에만 올 수 있으므로, 이 행의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_QUADRUPLE_COLUMN:
        '{{col}}열에서 {{target}}은 {{positions}} 네 셀에만 올 수 있으므로, 이 열의 다른 위치에는 {{target}}이 올 수 없습니다',
      NAKED_QUADRUPLE_BOX:
        '{{box}}번 박스에서 {{target}}은 {{positions}} 네 셀에만 올 수 있으므로, 이 박스의 다른 위치에는 {{target}}이 올 수 없습니다',
      HIDDEN_PAIR_ROW:
        '{{row}}행에서 {{candStr}} 숫자들은 {{positions}} 두 셀에만 나타나므로, 이 두 셀에는 다른 후보 숫자가 올 수 없습니다',
      HIDDEN_PAIR_COLUMN:
        '{{col}}열에서 {{candStr}} 숫자들은 {{positions}} 두 셀에만 나타나므로, 이 두 셀에는 다른 후보 숫자가 올 수 없습니다',
      HIDDEN_PAIR_BOX:
        '{{box}}번 박스에서 {{candStr}} 숫자들은 {{positions}} 두 셀에만 나타나므로, 이 두 셀에는 다른 후보 숫자가 올 수 없습니다',
      HIDDEN_TRIPLE_ROW:
        '{{row}}행에서 {{candStr}} 숫자들은 {{positions}} 세 셀에만 나타나므로, 이 세 셀에는 다른 후보 숫자가 올 수 없습니다',
      HIDDEN_TRIPLE_COLUMN:
        '{{col}}열에서 {{candStr}} 숫자들은 {{positions}} 세 셀에만 나타나므로, 이 세 셀에는 다른 후보 숫자가 올 수 없습니다',
      HIDDEN_TRIPLE_BOX:
        '{{box}}번 박스에서 {{candStr}} 숫자들은 {{positions}} 세 셀에만 나타나므로, 이 세 셀에는 다른 후보 숫자가 올 수 없습니다',
      X_WING_ROW:
        '{{row1}}행과 {{row2}}행에서 {{candStr}}은 각 행에서 두 개의 후보 위치를 가지며 열 번호가 동일합니다. 이 네 개의 후보 위치 중 어느 두 개가 참이든 해당 열의 다른 위치는 거짓이 됩니다',
      X_WING_COLUMN:
        '{{col1}}열과 {{col2}}열에서 {{candStr}}은 각 열에서 두 개의 후보 위치를 가지며 행 번호가 동일합니다. 이 네 개의 후보 위치 중 어느 두 개가 참이든 해당 행의 다른 위치는 거짓이 됩니다',
      X_WING_VARIENT_ROW:
        '{{positions}} {{length}}개의 후보 위치 중 어느 두 개가 {{candStr}}을 가지든, R{{row}}C{{col}}에는 {{candStr}}이 올 수 없습니다',
      X_WING_VARIENT_COLUMN:
        '{{positions}} {{length}}개의 후보 위치 중 어느 두 개가 {{candStr}}을 가지든, R{{row}}C{{col}}에는 {{candStr}}이 올 수 없습니다',
      XY_WING:
        '{{positions}} 세 셀의 값이 어떻게 결정되든, {{deleteStr}}에는 {{candStr}}이 올 수 없습니다',
      XYZ_WING:
        '{{positions}} 세 셀의 값이 어떻게 결정되든, {{deleteStr}}에는 {{candStr}}이 올 수 없습니다',
      SKYSCRAPER:
        '{{positions}} 파란색 셀이 강한 연결을 형성하며, R{{row1}}C{{col1}} 또는 R{{row2}}C{{col2}}가 {{target}}이든, {{deleteStr}}에는 {{target}}이 올 수 없습니다',
      SKYSCRAPER2:
        'R{{row1}}C{{col1}}과 R{{row2}}C{{col2}} 셀이 하나의 강한 연결을 형성하고, R{{row3}}C{{col3}}과 R{{row4}}C{{col4}} 셀이 다른 하나의 강한 연결을 형성합니다. 이 두 강한 연결은 R{{row3}}C{{col3}}과 R{{row2}}C{{col2}} 사이의 약한 연결로 이어집니다. R{{row1}}C{{col1}}이 참이면 {{deleteStr}}는 거짓이어야 하고, R{{row1}}C{{col1}}이 거짓이면 R{{row4}}C{{col4}}가 참이어야 하며, 이 경우에도 {{deleteStr}}는 거짓이어야 합니다. 어떤 경우든 {{target}}은 {{deleteStr}}에 올 수 없습니다',
      WXYZ_WING:
        '{{candStr}}이 WXYZ-윙을 형성하며, R{{row1}}C{{col1}}이 중심점입니다. 이 네 셀의 값이 어떻게 결정되든 {{target}}은 {{deleteStr}}에 올 수 없습니다',
      COMBINATION_CHAIN_3_2_1_STRONG:
        '{{candStr1}}의 조합과 {{candStr2}}이 강한 연결을 형성합니다. {{candStr4}} 중 어느 것이 참이든 {{target}}은 {{posStr}}에 올 수 없습니다',
      COMBINATION_CHAIN_3_2_1_WEAK:
        '{{candStr1}}의 조합과 {{candStr2}}이 강한 연결을 형성하고, {{candStr3}} 네 셀이 강한 연결을 형성합니다. 이 두 강한 연결은 {{pivotStr}}이 형성하는 약한 연결로 이어집니다. {{candStr4}} 중 어느 것이 참이든 {{target}}은 {{posStr}}에 올 수 없습니다',
      COMBINATION_CHAIN_3_2_2_WEAK:
        '{{candStr1}}의 조합과 {{candStr2}}이 강한 연결을 형성하고, {{candStr3}} 두 셀이 강한 연결을 형성합니다. 이 두 강한 연결은 {{pivotStr1}}과 {{pivotStr2}} 두 셀의 전체가 형성하는 약한 연결로 이어집니다. {{candStr4}} 중 어느 것이 참이든 {{target}}은 {{posStr}}에 올 수 없습니다',
      COMBINATION_CHAIN_3_2_2_STRONG:
        '{{candStr1}}의 조합과 {{candStr2}}이 강한 연결을 형성하고, {{candStr3}} 두 셀이 강한 연결을 형성합니다. 이 두 강한 연결은 {{pivotStr1}}과 {{pivotStr2}} 두 셀의 전체가 형성하는 강한 연결로 이어집니다. {{candStr4}} 중 어느 것이 참이든 {{target}}은 {{posStr}}에 올 수 없습니다',
      LOOP_3_2_2:
        '{{nodeStr1}}는 강한 연결을 형성하고, {{nodeStr2}}는 강한 연결을 형성하고, {{nodeStr3}}는 강한 연결을 형성합니다. 이 세 강한 연결은 약한 연결을 통해 사이클을 형성합니다. {{rootNodeStr}}가 거짓이며 이를 시작점으로 하여 시계 방향으로 방향으로 논리적 추론을 따르면 최종적으로 사이클에 대한 모순이 발생하므로 {{rootNodeStr}}은 참이어야 합니다',
      LOOP_3_2:
        '{{nodeStr1}}는 강한 연결을 형성하고, {{nodeStr2}}는 강한 연결을 형성합니다. 이 두 강한 연결은 약한 연결을 통해 사이클을 형성합니다. {{rootNodeStr}}가 거짓이며 이를 시작점으로 하여 시계 방향과 반시계 방향으로 논리적 추론을 따르면 최종적으로 사이클에 대한 모순이 발생하므로 {{rootNodeStr}}은 참이어야 합니다',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}}와 {{deleteStr}}는 유일한 직사각형 구조를 형성합니다. 즉, 보드에는 네 개의 셀이 있으며, 이들의 위치는 직사각형을 형성하고 위치는 두 개의 박스에 걸쳐 있으며 내부에는 동일한 후보 숫자가 두 개씩 있습니다. 보드에 이러한 구조가 나타나면 이 스도쿠는 유효하지 않음을 의미하므로, {{deleteStr}}는 후보 숫자 {{target}}을 삭제하여 스도쿠가 유일한 해를 갖도록 해야 합니다',
      UNIQUE_RECTANGLE2:
        '빨간 셀에 {{target}}이 들어가면, {{nodeStr}} 네 개의 셀이 유일한 직사각형 구조를 형성합니다. 즉, 보드에는 네 개의 셀이 있으며, 이들의 위치는 직사각형을 형성하고 위치는 두 개의 박스에 걸쳐 있으며 내부에는 동일한 후보 숫자가 두 개씩 있습니다. 보드에 이러한 구조가 나타나면 이 스도쿠는 유효하지 않음을 의미하므로, 빨간 셀에는 후보 숫자 {{target}}이 들어갈 수 없습니다',
      BINARY_UNIVERSAL_GRAVE:
        '{{posStr}}가 {{target}}이 아니라고 가정하면, 보드의 모든 후보 셀에는 두 개의 후보 숫자만 있으며, 각 후보 숫자는 각 행, 각 열, 각 박스에 두 번씩만 나타납니다. 이러한 구조는 스도쿠에 여러 해를 가져오므로, 이 상황을 피하기 위해 {{posStr}}는 {{target}}이어야 합니다',
      SWORDFISH_ROW:
        '파란색 셀이 위치한 세 행에는 {{target}}에 대한 다른 후보 셀이 없습니다. 이 셀들의 값이 어떻게 결정되든, 해당하는 세 열에는 후보 숫자 {{target}}이 올 수 없습니다',
      SWORDFISH_COLUMN:
        '파란색 셀이 위치한 세 열에는 {{target}}에 대한 다른 후보 셀이 없습니다. 이 셀들의 값이 어떻게 결정되든, 해당하는 세 행에는 후보 숫자 {{target}}이 올 수 없습니다',
      JELLYFISH_ROW:
        '파란색 셀이 위치한 네 행에는 {{target}}에 대한 다른 후보 셀이 없습니다. 이 셀들의 값이 어떻게 결정되든, 해당하는 네 열에는 후보 숫자 {{target}}이 올 수 없습니다',
      JELLYFISH_COLUMN:
        '파란색 셀이 위치한 네 열에는 {{target}}에 대한 다른 후보 셀이 없습니다. 이 셀들의 값이 어떻게 결정되든, 해당하는 네 행에는 후보 숫자 {{target}}이 올 수 없습니다',
      DOUBLE_COLOR_CHAIN_delete:
        '{{posStr}}이(가) {{target}}일 때, 빨간 셀은 {{target}}이(가) 될 수 없습니다',
      DOUBLE_COLOR_CHAIN_s:
        '{{posStr1}}이(가) {{target1}}일 때, {{posStr2}}는 {{target2}}이(가) 됩니다',
      DOUBLE_COLOR_CHAIN_r:
        '{{posStr1}}이(가) {{target}}일 때, {{posStr2}}는 {{target}}이(가) 될 수 없습니다',
      DOUBLE_COLOR_CHAIN_q:
        '{{posStr1}}과(와) {{posStr2}}는 {{target}}에 대한 강한 연결을 형성하므로, {{posStr2}}는 {{target}}입니다',
      DOUBLE_COLOR_CHAIN_q_start:
        '{{posStr}}이(가) {{target1}}일 때, 현재 셀은 {{target2}}이(가) 될 수 없습니다',
      COMBINATION_CHAIN_AB_STRONG: '{{A}}와 {{B}}는 강한 연결을 형성합니다',
      COMBINATION_CHAIN_AB_WEAK: '{{A}}와 {{B}}는 약한 연결을 형성합니다',
      COMBINATION_CHAIN_END:
        '{{A}}가 참일 때 빨간 셀은 거짓이며, {{A}}가 거짓일 때 추론을 통해 {{B}}가 참이 되어 빨간 셀은 여전히 거짓입니다',
      SKYSCRAPER2_1:
        '{{As}} 두 셀 사이에 강한 연결이 있고, {{Bs}} 네 셀 사이에 강한 연결이 있으며, 이 두 강한 연결은 {{Cs}} 두 셀 사이의 약한 연결로 연결됩니다. {{A}}가 참일 때 빨간 셀은 거짓이며, {{A}}가 거짓일 때 {{B}}는 참이 되어 빨간 셀은 여전히 거짓입니다',
      SKYSCRAPER2_2:
        '{{As}} 두 셀 사이에 강한 연결이 있고, {{Bs}} 두 셀 사이에 강한 연결이 있으며, {{Cs}} 두 셀 사이에 강한 연결이 있습니다. 각 강한 연결은 약한 연결로 서로 연결됩니다. {{A}}가 참일 때 빨간 셀은 거짓이며, {{A}}가 거짓일 때 {{B}}는 참이 되어 빨간 셀은 여전히 거짓입니다',
    },
    back: '뒤로',
    next: '다음 레벨',
    errorDraft: '메모에 오류가 있습니다. 먼저 수정해주세요',
    pleaseConnectNetwork: '네트워크에 연결해주세요',
    setting: '설정',
    removeAD: '광고 제거',
    sound: '소리',
    notice: '알림',
    privacyPolicy: '개인정보 처리방침',
    serviceTerms: '서비스 이용약관',
    language: '언어',
    feedback: '피드백',
    feedbackMessage: '메시지:',
    congratulations: '축하합니다!',
    restore: '구매 복구',
    restoring: '구매 복구 중...',
    purchasing: '구매 중...',
    illegalPrompt:
      '시스템이 프로그램을 자주 종료하는 것을 감지했습니다. 광고 피하기 의심됩니다. 1분 기다린 후 다시 시도하세요.',
    highlight: '강조',
    myBoards: '내 수도쿠',
    Home: '홈',
    saveToMyBoards: '내 수도쿠에 저장',
    pleaseNameYourSudoku: '수도쿠의 이름을 지어주세요',
    success: '성공',
    sudokuSavedToMyBoards: '수도쿠가 내 수도쿠에 저장되었습니다!',
    error: '오류',
    saveFailedPleaseTryAgainLater: '저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
    confirm: '확인',
    noNetwork: '네트워크 연결이 없습니다. 계속하면 수도쿠가 저장되지 않습니다. 계속하시겠습니까?',
    loading: '로딩중...',
    pleaseCheckNetwork: '로딩에 실패했습니다. 네트워크 연결을 확인해주세요.',
    pleaseCheckiCloud: '로딩에 실패했습니다. iCloud 로그인 여부를 확인해주세요.',
    untitled: '무제',
    enlarge: '확대',
    encourage: '우리를 격려해주세요❤️',
    share: '앱 공유하기',
    shareMessage: '커스터마이징을 지원하는 수도쿠 게임, 즐겨보세요!',
    wether: '어떤 경우든, 빨간 셀에는 후보 숫자 {{target}}이 올 수 없습니다',
    case1: '경우 1:',
    case2: '경우 2:',
    case3: '경우 3:',
    comma: ',',
    period: '.',
    end1: '빨간 셀에는 후보 숫자 {{target}}이 올 수 없습니다',
    end2: '빨간 셀에는 여전히 후보 숫자 {{target}}이 올 수 없습니다',
    theme: '테마',
    selectTheme: '테마 선택',
    lightMode: '라이트 모드',
    darkMode: '다크 모드',
    strictMode: '엄격한 모드',
    reasonMode: '추론 모드',
    strictText: '엄격한 모드: 입력한 숫자가 답과 일치하지 않으면 오류 메시지가 표시됩니다',
    reasonText: '추론 모드: 입력한 숫자가 답과 일치하지 않으면 오류 메시지가 표시되지 않습니다',
    localGames: '로컬 수도쿠',
    statistics: '통계',
    entry: '입문',
    easy: '쉬움',
    medium: '중간',
    hard: '어려움',
    extreme: '극도로 어려움',
    dataSync: '데이터 동기화 설명',
    dataSyncDescription:
      '1.안내사항: 기기를 변경하면 iCloud 데이터가 새 기기에 즉시 동기화되지 않을 수 있습니다. 앱을 몇 번 다시 열거나 잠시 기다리는 것이 좋습니다. 이 기간 동안 로컬 퍼즐을 사용할 수 있습니다. 이전 데이터가 업데이트된 후, 앱이 자동으로 새 데이터를 통합해 드립니다.',
    total: '총계',
    pleaseLoginGameCenter:
      '먼저 GameCenter에 로그인하세요. 이미 로그인한 경우 앱을 다시 열어주세요.',
    tips: '힌트',
    dataSyncDescription2: '2.귀하의 순위는 24시간 이내에 전 세계적으로 동기화됩니다.',
    fastestTime: '가장 빠른',
    averageTime: '평균',
    fixedDescription:
      '이 작업은 현재 게임판의 숫자를 고정시킵니다. 고정된 숫자는 수정할 수 없게 됩니다. 실행하시겠습니까?',
    doNotShowAgain: '다시 보지 않기',
  },
};
