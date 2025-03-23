export default {
  translation: {
    home: {
      title: 'Sudoku',
      startGame: 'Bắt đầu',
      createGame: 'Tạo trò chơi',
      settings: 'Cài đặt',
    },
    game: {
      pause: 'Tạm dừng',
      resume: 'Tiếp tục',
      restart: 'Bắt đầu lại',
      quit: 'Thoát',
    },
    difficulty: {
      title: 'Chọn độ khó',
      entry: '😀Nhập môn',
      easy: '🤔Dễ',
      medium: '😮Trung bình',
      hard: '😣Khó',
      extreme: '🤯Cực khó',
      custom: 'Tùy chỉnh',
    },
    start: 'Bắt đầu',
    continue: 'Tiếp tục',
    undo: 'Hoàn tác',
    erase: 'Xóa',
    notes: 'Ghi chú',
    autoNote: 'Ghi chú tự động',
    hint: 'Gợi ý',
    apply: 'Áp dụng',
    cancel: 'Hủy',
    selectMode: 'Chọn chế độ',
    legal: 'Hợp lệ',
    solving: 'Đang giải...',
    illegal: 'Không hợp lệ',
    answer: 'Đáp án',
    incomplete: 'Chưa hoàn thành',
    CHECK_CANDIDATE: 'Kiểm tra ứng viên',
    SINGLE_CANDIDATE: 'Ứng viên duy nhất',
    HIDDEN_SINGLE_ROW: 'Số ẩn duy nhất',
    HIDDEN_SINGLE_COLUMN: 'Số ẩn duy nhất',
    HIDDEN_SINGLE_BOX: 'Số ẩn duy nhất',
    BLOCK_ELIMINATION_ROW: 'Loại trừ khối',
    BLOCK_ELIMINATION_COLUMN: 'Loại trừ khối',
    BLOCK_ELIMINATION_BOX_ROW: 'Loại trừ khối',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Loại trừ khối',
    NAKED_PAIR_ROW: 'Cặp số hiển',
    NAKED_PAIR_COLUMN: 'Cặp số hiển',
    NAKED_PAIR_BOX: 'Cặp số hiển',
    NAKED_TRIPLE_ROW1: 'Bộ ba số hiển',
    NAKED_TRIPLE_COLUMN1: 'Bộ ba số hiển',
    NAKED_TRIPLE_BOX1: 'Bộ ba số hiển',
    NAKED_TRIPLE_ROW2: 'Bộ ba số hiển',
    NAKED_TRIPLE_COLUMN2: 'Bộ ba số hiển',
    NAKED_TRIPLE_BOX2: 'Bộ ba số hiển',
    HIDDEN_PAIR_ROW: 'Cặp số ẩn',
    HIDDEN_PAIR_COLUMN: 'Cặp số ẩn',
    HIDDEN_PAIR_BOX: 'Cặp số ẩn',
    HIDDEN_TRIPLE_ROW: 'Bộ ba số ẩn',
    HIDDEN_TRIPLE_COLUMN: 'Bộ ba số ẩn',
    HIDDEN_TRIPLE_BOX: 'Bộ ba số ẩn',
    NAKED_QUADRUPLE_ROW: 'Bộ tứ số hiển',
    NAKED_QUADRUPLE_COLUMN: 'Bộ tứ số hiển',
    NAKED_QUADRUPLE_BOX: 'Bộ tứ số hiển',
    X_WING_ROW: 'X-Wing',
    X_WING_COLUMN: 'X-Wing',
    X_WING_VARIENT_ROW: 'X-Wing có vây',
    X_WING_VARIENT_COLUMN: 'X-Wing có vây',
    XY_WING: 'XY-Wing',
    XYZ_WING: 'XYZ-Wing',
    SKYSCRAPER: 'Nhà chọc trời',
    SKYSCRAPER2: 'Nhà chọc trời 2',
    REMOTE_PAIR: 'Cặp số từ xa',
    COMBINATION_CHAIN: 'Chuỗi kết hợp',
    SWORDFISH_ROW: 'Cá kiếm',
    SWORDFISH_COLUMN: 'Cá kiếm',
    JELLYFISH_ROW: 'Sứa biển',
    JELLYFISH_COLUMN: 'Sứa biển',
    WXYZ_WING: 'WXYZ-Wing',
    LOOP: 'Vòng',
    UNIQUE_RECTANGLE: 'Hình chữ nhật duy nhất',
    BINARY_UNIVERSAL_GRAVE: 'Hố thần tối',
    DOUBLE_COLOR_CHAIN: 'Chuỗi Hai Màu',
    TRIPLE_COLOR_CHAIN: 'Chuỗi Ba Màu',
    TRIAL_AND_ERROR: 'Thử và sai',
    duration: 'Thời gian',
    mistakes: 'Số lỗi',
    hintCount: 'Số gợi ý',
    hints: {
      SINGLE_CANDIDATE:
        'Ô R{{row}}C{{col}} chỉ còn {{target}} là ứng viên duy nhất, vì vậy giá trị của ô này phải là {{target}}',
      HIDDEN_SINGLE_ROW:
        'Số {{target}} trong hàng {{row}} chỉ có thể xuất hiện tại một ô, vì vậy giá trị của ô này phải là {{target}}',
      HIDDEN_SINGLE_COLUMN:
        'Số {{target}} trong cột {{col}} chỉ có thể xuất hiện tại một ô, vì vậy giá trị của ô này phải là {{target}}',
      HIDDEN_SINGLE_BOX:
        'Số {{target}} trong khối {{box}} chỉ có thể xuất hiện tại một ô, vì vậy giá trị của ô này phải là {{target}}',
      TRIAL_AND_ERROR:
        'Thử điền số {{target}} vào ô có ít ứng viên nhất, nếu không có lời giải, điền {{target}} là sai, thử số khác',
      BLOCK_ELIMINATION_ROW:
        'Trong khối {{box}}, số {{target}} chỉ xuất hiện tại các vị trí {{positions}}, do đó các vị trí khác trong cùng hàng không thể có số {{target}}',
      BLOCK_ELIMINATION_COLUMN:
        'Trong khối {{box}}, số {{target}} chỉ xuất hiện tại các vị trí {{positions}}, do đó các vị trí khác trong cùng cột không thể có số {{target}}',
      BLOCK_ELIMINATION_BOX_ROW:
        'Trong hàng {{row}}, số {{target}} chỉ xuất hiện tại các vị trí {{positions}}, do đó các vị trí khác trong cùng khối không thể có số {{target}}',
      BLOCK_ELIMINATION_BOX_COLUMN:
        'Trong cột {{col}}, số {{target}} chỉ xuất hiện tại các vị trí {{positions}}, do đó các vị trí khác trong cùng khối không thể có số {{target}}',
      NAKED_PAIR_ROW:
        'Trong hàng {{row}}, vì số {{target}} chỉ có thể xuất hiện tại hai ô {{positions}}, nên các ô khác trong hàng không thể có số {{target}}',
      NAKED_PAIR_COLUMN:
        'Trong cột {{col}}, vì số {{target}} chỉ có thể xuất hiện tại hai ô {{positions}}, nên các ô khác trong cột không thể có số {{target}}',
      NAKED_PAIR_BOX:
        'Trong khối {{box}}, vì số {{target}} chỉ có thể xuất hiện tại hai ô {{positions}}, nên các ô khác trong khối không thể có số {{target}}',
      NAKED_TRIPLE_ROW1:
        'Trong hàng {{row}}, vì số {{target}} chỉ có thể xuất hiện tại ba ô {{positions}}, nên các ô khác trong hàng không thể có số {{target}}',
      NAKED_TRIPLE_COLUMN1:
        'Trong cột {{col}}, vì số {{target}} chỉ có thể xuất hiện tại ba ô {{positions}}, nên các ô khác trong cột không thể có số {{target}}',
      NAKED_TRIPLE_BOX1:
        'Trong khối {{box}}, vì số {{target}} chỉ có thể xuất hiện tại ba ô {{positions}}, nên các ô khác trong khối không thể có số {{target}}',
      NAKED_TRIPLE_ROW2:
        'Trong hàng {{row}}, vì số {{target}} chỉ có thể xuất hiện tại ba ô {{positions}}, nên các ô khác trong hàng không thể có số {{target}}',
      NAKED_TRIPLE_COLUMN2:
        'Trong cột {{col}}, vì số {{target}} chỉ có thể xuất hiện tại ba ô {{positions}}, nên các ô khác trong cột không thể có số {{target}}',
      NAKED_TRIPLE_BOX2:
        'Trong khối {{box}}, vì số {{target}} chỉ có thể xuất hiện tại ba ô {{positions}}, nên các ô khác trong khối không thể có số {{target}}',
      NAKED_QUADRUPLE_ROW:
        'Trong hàng {{row}}, vì số {{target}} chỉ có thể xuất hiện tại bốn ô {{positions}}, nên các ô khác trong hàng không thể có số {{target}}',
      NAKED_QUADRUPLE_COLUMN:
        'Trong cột {{col}}, vì số {{target}} chỉ có thể xuất hiện tại bốn ô {{positions}}, nên các ô khác trong cột không thể có số {{target}}',
      NAKED_QUADRUPLE_BOX:
        'Trong khối {{box}}, vì số {{target}} chỉ có thể xuất hiện tại bốn ô {{positions}}, nên các ô khác trong khối không thể có số {{target}}',
      HIDDEN_PAIR_ROW:
        'Trong hàng {{row}}, vì các số {{candStr}} chỉ xuất hiện tại hai ô {{positions}}, nên hai ô này không thể có các số khác',
      HIDDEN_PAIR_COLUMN:
        'Trong cột {{col}}, vì các số {{candStr}} chỉ xuất hiện tại hai ô {{positions}}, nên hai ô này không thể có các số khác',
      HIDDEN_PAIR_BOX:
        'Trong khối {{box}}, vì các số {{candStr}} chỉ xuất hiện tại hai ô {{positions}}, nên hai ô này không thể có các số khác',
      HIDDEN_TRIPLE_ROW:
        'Trong hàng {{row}}, vì các số {{candStr}} chỉ xuất hiện tại ba ô {{positions}}, nên ba ô này không thể có các số khác',
      HIDDEN_TRIPLE_COLUMN:
        'Trong cột {{col}}, vì các số {{candStr}} chỉ xuất hiện tại ba ô {{positions}}, nên ba ô này không thể có các số khác',
      HIDDEN_TRIPLE_BOX:
        'Trong khối {{box}}, vì các số {{candStr}} chỉ xuất hiện tại ba ô {{positions}}, nên ba ô này không thể có các số khác',
      X_WING_ROW:
        'Trong hàng {{row1}} và {{row2}}, số {{candStr}} mỗi hàng đều có hai ô ứng viên và có cùng số cột, trong bốn ô này bất kể hai ô nào là đúng, các vị trí khác trong hai cột này đều không thể có số {{candStr}}',
      X_WING_COLUMN:
        'Trong cột {{col1}} và {{col2}}, số {{candStr}} mỗi cột đều có hai ô ứng viên và có cùng số hàng, trong bốn ô này bất kể hai ô nào là đúng, các vị trí khác trong hai hàng này đều không thể có số {{candStr}}',
      X_WING_VARIENT_ROW:
        'Trong {{length}} ô {{positions}}, bất kể hai ô nào có số {{candStr}}, ô R{{row}}C{{col}} không thể có số {{candStr}}',
      X_WING_VARIENT_COLUMN:
        'Trong {{length}} ô {{positions}}, bất kể hai ô nào có số {{candStr}}, ô R{{row}}C{{col}} không thể có số {{candStr}}',
      XY_WING:
        'Bất kể ba ô {{positions}} có giá trị nào, {{deleteStr}} không thể có số {{candStr}}',
      XYZ_WING:
        'Bất kể ba ô {{positions}} có giá trị nào, {{deleteStr}} không thể có số {{candStr}}',
      SKYSCRAPER:
        'Các ô màu xanh {{positions}} tạo thành chuỗi liên kết, bất kể R{{row1}}C{{col1}} hay R{{row2}}C{{col2}} có giá trị {{target}}, {{deleteStr}} không thể có số {{target}}',
      SKYSCRAPER2:
        'Ô R{{row1}}C{{col1}} và R{{row2}}C{{col2}} tạo thành một chuỗi mạnh, ô R{{row3}}C{{col3}} và R{{row4}}C{{col4}} tạo thành một chuỗi mạnh khác, hai chuỗi này được kết nối bởi chuỗi yếu giữa R{{row3}}C{{col3}} và R{{row2}}C{{col2}}. Nếu R{{row1}}C{{col1}} đúng, {{deleteStr}} phải sai. Nếu R{{row1}}C{{col1}} sai, R{{row4}}C{{col4}} phải đúng, điều này cũng làm cho {{deleteStr}} sai. Trong mọi trường hợp, số {{target}} không thể xuất hiện trong {{deleteStr}}.',
      REMOTE_PAIR:
        '{{posStr1}} tạo thành cặp số từ xa, hai cặp số từ xa này thông qua {{posStr2}} tạo thành chuỗi mạnh, bất kể {{posStr1}} nào đúng, {{posStr}} không thể có số {{target}}',
      WXYZ_WING:
        '{{candStr}} tạo thành WXYZ-Wing, trong đó R{{row1}}C{{col1}} là trục, bất kể bốn ô này có giá trị nào, số {{target}} không thể xuất hiện trong {{deleteStr}}',
      COMBINATION_CHAIN_3_2_1_STRONG:
        '{{candStr1}} kết hợp với {{candStr2}} tạo thành chuỗi mạnh, bất kể {{candStr4}} nào là đúng, số {{target}} không thể xuất hiện trong {{posStr}}',
      COMBINATION_CHAIN_3_2_1_WEAK:
        '{{candStr1}} kết hợp với {{candStr2}} tạo thành chuỗi mạnh, {{candStr3}} bốn ô tạo thành chuỗi mạnh, hai chuỗi mạnh này được kết nối bởi chuỗi yếu qua {{pivotStr}}, bất kể {{candStr4}} nào là đúng, số {{target}} không thể xuất hiện trong {{posStr}}',
      COMBINATION_CHAIN_3_2_2_WEAK:
        '{{candStr1}} kết hợp với {{candStr2}} tạo thành chuỗi mạnh, {{candStr3}} hai ô tạo thành chuỗi mạnh, hai chuỗi mạnh này được kết nối bởi chuỗi yếu qua tổng thể của hai ô {{pivotStr1}} và {{pivotStr2}}, bất kể {{candStr4}} nào là đúng, số {{target}} không thể xuất hiện trong {{posStr}}',
      COMBINATION_CHAIN_3_2_2_STRONG:
        '{{candStr1}} kết hợp với {{candStr2}} tạo thành chuỗi mạnh, {{candStr3}} hai ô tạo thành chuỗi mạnh, hai chuỗi mạnh này được kết nối bởi chuỗi mạnh qua tổng thể của hai ô {{pivotStr1}} và {{pivotStr2}}, bất kể {{candStr4}} nào là đúng, số {{target}} không thể xuất hiện trong {{posStr}}',
      LOOP_3_2_2:
        '{{nodeStr1}} tạo thành chuỗi mạnh, {{nodeStr2}} tạo thành chuỗi mạnh, {{nodeStr3}} tạo thành chuỗi mạnh. Ba chuỗi mạnh này được kết nối bởi chuỗi yếu, tạo thành vòng, giả sử {{rootNodeStr}} sai và bắt đầu từ nó, sau đó logic suy luận theo cả hai hướng sẽ dẫn đến mâu thuẫn trong vòng, do đó {{rootNodeStr}} phải đúng.',
      LOOP_3_2:
        '{{nodeStr1}} tạo thành chuỗi mạnh, {{nodeStr2}} tạo thành chuỗi mạnh. Hai chuỗi mạnh này được kết nối bởi chuỗi yếu, tạo thành vòng, giả sử {{rootNodeStr}} sai và bắt đầu từ nó, sau đó logic suy luận theo cả hai hướng sẽ dẫn đến mâu thuẫn trong vòng, do đó {{rootNodeStr}} phải đúng.',
      UNIQUE_RECTANGLE1:
        '{{nodeStr}} và {{deleteStr}} tạo thành cấu trúc hình chữ nhật duy nhất, tức là trên bảng có bốn ô, vị trí của chúng tạo thành hình chữ nhật và bên trong có hai số ứng viên giống nhau, vị trí của chúng nằm trong hai khối. Khi trên bảng xuất hiện cấu trúc này, điều đó có nghĩa là Sudoku hiện tại không hợp lệ, do đó {{deleteStr}} phải xóa số ứng viên {{target}} để đảm bảo Sudoku có lời giải duy nhất',
      UNIQUE_RECTANGLE2:
        'Nếu ô màu đỏ có giá trị là {{target}}, thì bốn ô {{nodeStr}} sẽ tạo thành cấu trúc hình chữ nhật duy nhất, tức là trên bảng có bốn ô, vị trí của chúng tạo thành hình chữ nhật và bên trong có hai số ứng viên giống nhau, vị trí của chúng nằm trong hai khối. Khi trên bảng xuất hiện cấu trúc này, điều đó có nghĩa là Sudoku hiện tại không hợp lệ, do đó ô màu đỏ không thể có số ứng viên {{target}}',
      BINARY_UNIVERSAL_GRAVE:
        'Giả sử {{posStr}} không phải là {{target}}, tất cả các ô ứng viên trên bảng chỉ có hai số ứng viên, và mỗi số ứng viên chỉ xuất hiện hai lần trong mỗi hàng, mỗi cột và mỗi khối. Cấu trúc này sẽ dẫn đến nhiều lời giải cho Sudoku, để tránh tình huống này xảy ra, {{posStr}} phải là {{target}}',
      SWORDFISH_ROW:
        'Các ô màu xanh nằm trên ba hàng không có ô ứng viên nào khác về {{target}}, bất kể các ô này có giá trị nào, số ứng viên {{target}} không thể xuất hiện trên ba cột tương ứng',
      SWORDFISH_COLUMN:
        'Các ô màu xanh nằm trên ba cột không có ô ứng viên nào khác về {{target}}, bất kể các ô này có giá trị nào, số ứng viên {{target}} không thể xuất hiện trên ba hàng tương ứng',
      JELLYFISH_ROW:
        'Các ô màu xanh nằm trên bốn hàng không có ô ứng viên nào khác về {{target}}, bất kể các ô này có giá trị nào, số ứng viên {{target}} không thể xuất hiện trên bốn cột tương ứng',
      JELLYFISH_COLUMN:
        'Các ô màu xanh nằm trên bốn cột không có ô ứng viên nào khác về {{target}}, bất kể các ô này có giá trị nào, số ứng viên {{target}} không thể xuất hiện trên bốn hàng tương ứng',
      DOUBLE_COLOR_CHAIN_delete:
        'khi {{posStr}} có giá trị {{target}}, ô màu đỏ không thể có giá trị {{target}}',
      DOUBLE_COLOR_CHAIN_s:
        'khi {{posStr1}} có giá trị {{target1}}, điều này sẽ dẫn đến {{posStr2}} có giá trị {{target2}}',
      DOUBLE_COLOR_CHAIN_r:
        'khi {{posStr1}} có giá trị {{target}}, điều này sẽ khiến {{posStr2}} không thể có giá trị {{target}}',
      DOUBLE_COLOR_CHAIN_q:
        'vì {{posStr1}} và {{posStr2}} tạo thành liên kết mạnh đối với {{target}}, nên {{posStr2}} phải là {{target}}',
      DOUBLE_COLOR_CHAIN_q_start:
        'khi {{posStr}} có giá trị {{target1}}, ô hiện tại không thể có giá trị {{target2}}',
    },
    back: 'Quay lại',
    next: 'Tiếp theo',
    errorDraft: 'Ghi chú có lỗi, vui lòng sửa trước',
    pleaseConnectNetwork: 'Vui lòng kết nối mạng',
    setting: 'Cài đặt',
    removeAD: 'Xóa quảng cáo',
    sound: 'Âm thanh',
    notice: 'Thông báo',
    privacyPolicy: 'Chính sách bảo mật',
    serviceTerms: 'Điều khoản dịch vụ',
    language: 'Ngôn ngữ',
    feedback: 'Phản hồi',
    feedbackMessage: 'Lời nhắn:',
    congratulations: 'Chúc mừng!',
    restore: 'Khôi phục mua hàng',
    restoring: 'Khôi phục mua hàng...',
    purchasing: 'Mua hàng...',
    illegalPrompt:
      'Hệ thống đã phát hiện bạn đang thoát khỏi chương trình thường xuyên, có thể là đang cố tình tránh quảng cáo. Vui lòng đợi 1 phút và thử lại.',
    highlight: 'Nổi bật',
    myBoards: 'Sổ số tùy chỉnh',
    Home: 'Trang chủ',
    saveToMyBoards: 'Lưu vào Sổ số tùy chỉnh',
    pleaseNameYourSudoku: 'Vui lòng đặt tên cho Sổ số tùy chỉnh của bạn',
    success: 'Thành công',
    sudokuSavedToMyBoards: 'Sổ số tùy chỉnh đã được lưu!',
    error: 'Lỗi',
    saveFailedPleaseTryAgainLater: 'Lưu không thành công, vui lòng thử lại sau',
    confirm: 'Xác nhận',
    noNetwork:
      'Bạn không có kết nối internet. Nếu bạn tiếp tục, sổ số tùy chỉnh của bạn sẽ không được lưu. Bạn có muốn tiếp tục?',
    loading: 'Đang tải...',
    pleaseCheckNetwork: 'Tải không thành công, vui lòng kiểm tra xem có kết nối internet không',
    pleaseCheckiCloud: 'Tải không thành công, vui lòng kiểm tra xem có đăng nhập iCloud không',
    untitled: 'Không tên',
    enlarge: 'Phóng to',
    encourage: 'Hãy ủng hộ chúng tôi❤️',
    share: 'Chia sẻ',
    shareMessage: 'Một trò chơi Sudoku hỗ trợ tùy chỉnh, hãy thử nó!',
    wether: 'Bất kể trường hợp nào, ô đỏ không thể chứa {{target}}',
    case1: 'Trường hợp 1:',
    case2: 'Trường hợp 2:',
    case3: 'Trường hợp 3:',
    comma: ',',
    period: '.',
    end1: 'Ô đỏ không thể chứa {{target}}',
    end2: 'Ô đỏ vẫn không thể chứa {{target}}',
    theme: 'Chủ đề',
    selectTheme: 'Chọn chủ đề',
    lightMode: 'Chủ đề sáng',
    darkMode: 'Chủ đề tối',
  },
};
