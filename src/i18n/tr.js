export default {
  translation: {
    home: {
      title: 'Sudoku',
      startGame: 'Oyuna Başla',
      createGame: 'Oyun Oluştur',
      settings: 'Ayarlar',
    },
    game: {
      pause: 'Duraklat',
      resume: 'Devam Et',
      restart: 'Yeniden Başlat',
      quit: 'Çıkış',
    },
    difficulty: {
      title: 'Zorluk Seçin',
      entry: '😀Giriş',
      easy: '🤔Kolay',
      medium: '😮Orta',
      hard: '😣Zor',
      extreme: '🤯Çok Zor',
      custom: 'Özel',
    },
    start: 'Başla',
    continue: 'Devam Et',
    undo: 'Geri Al',
    erase: 'Sil',
    notes: 'Notlar',
    autoNote: 'Otomatik Not',
    hint: 'İpucu',
    apply: 'Uygula',
    cancel: 'İptal',
    selectMode: 'Mod Seç',
    legal: 'Geçerli Sudoku',
    solving: 'Çözülüyor...',
    illegal: 'Geçersiz Sudoku',
    answer: 'Cevap',
    incomplete: 'Tamamlanmamış Sudoku',
    CHECK_CANDIDATE: 'Aday Kontrolü',
    SINGLE_CANDIDATE: 'Tek Aday',
    HIDDEN_SINGLE_ROW: 'Gizli Tek Satır',
    HIDDEN_SINGLE_COLUMN: 'Gizli Tek Sütun',
    HIDDEN_SINGLE_BOX: 'Gizli Tek Kutu',
    BLOCK_ELIMINATION_ROW: 'Blok Eleme',
    BLOCK_ELIMINATION_COLUMN: 'Blok Eleme',
    BLOCK_ELIMINATION_BOX_ROW: 'Blok Eleme',
    BLOCK_ELIMINATION_BOX_COLUMN: 'Blok Eleme',
    NAKED_PAIR_ROW: 'Açık İkili',
    NAKED_PAIR_COLUMN: 'Açık İkili',
    NAKED_PAIR_BOX: 'Açık İkili',
    NAKED_TRIPLE_ROW1: 'Açık Üçlü',
    NAKED_TRIPLE_COLUMN1: 'Açık Üçlü',
    NAKED_TRIPLE_BOX1: 'Açık Üçlü',
    NAKED_TRIPLE_ROW2: 'Açık Üçlü',
    NAKED_TRIPLE_COLUMN2: 'Açık Üçlü',
    NAKED_TRIPLE_BOX2: 'Açık Üçlü',
    HIDDEN_PAIR_ROW: 'Gizli İkili',
    HIDDEN_PAIR_COLUMN: 'Gizli İkili',
    HIDDEN_PAIR_BOX: 'Gizli İkili',
    HIDDEN_TRIPLE_ROW: 'Gizli Üçlü',
    HIDDEN_TRIPLE_COLUMN: 'Gizli Üçlü',
    HIDDEN_TRIPLE_BOX: 'Gizli Üçlü',
    NAKED_QUADRUPLE_ROW: 'Açık Dörtlü',
    NAKED_QUADRUPLE_COLUMN: 'Açık Dörtlü',
    NAKED_QUADRUPLE_BOX: 'Açık Dörtlü',
    X_WING_ROW: 'X-Kanadı',
    X_WING_COLUMN: 'X-Kanadı',
    X_WING_VARIENT_ROW: 'Kanatlı X-Kanadı',
    X_WING_VARIENT_COLUMN: 'Kanatlı X-Kanadı',
    XY_WING: 'XY-Kanadı',
    XYZ_WING: 'XYZ-Kanadı',
    SKYSCRAPER: 'Gökdelen',
    SKYSCRAPER2: 'İki güçlü bağlantı',
    THREESTRONGLINKS: 'Üç güçlü bağlantı',
    XCHAIN: 'X-Zincir',
    COMBINATION_CHAIN: 'Kombinasyon Zinciri',
    SWORDFISH_ROW: 'Kılıçbalığı',
    SWORDFISH_COLUMN: 'Kılıçbalığı',
    JELLYFISH_ROW: 'Denizanası',
    JELLYFISH_COLUMN: 'Denizanası',
    WXYZ_WING: 'WXYZ-Kanadı',
    LOOP: 'Döngü',
    UNIQUE_RECTANGLE: 'Tekil Dikdörtgen',
    BINARY_UNIVERSAL_GRAVE: 'İkili Evrensel Kuyruk',
    DOUBLE_COLOR_CHAIN: 'İki Renkli Zincir',
    TRIPLE_COLOR_CHAIN: 'Üç Renkli Zincir',
    TWO_STRING_KITE: 'İki İpli Uçurtma',
    TRIAL_AND_ERROR: 'Deneme Yanılma',
    duration: 'Süre',
    mistakes: 'Hata Sayısı',
    hintCount: 'İpucu Sayısı',
    hints: {
      SINGLE_CANDIDATE:
        'R{{row}}C{{col}} hücresinde sadece {{target}} adayı kaldı, bu yüzden bu hücrenin değeri {{target}} olmalı',
      HIDDEN_SINGLE_ROW:
        '{{target}} adayı {{row}}. satırda sadece bir hücrede bulunuyor, bu yüzden bu hücrenin değeri {{target}} olmalı',
      HIDDEN_SINGLE_COLUMN:
        '{{target}} adayı {{col}}. sütunda sadece bir hücrede bulunuyor, bu yüzden bu hücrenin değeri {{target}} olmalı',
      HIDDEN_SINGLE_BOX:
        '{{target}} adayı {{box}}. kutuda sadece bir hücrede bulunuyor, bu yüzden bu hücrenin değeri {{target}} olmalı',
      TRIAL_AND_ERROR:
        'En az aday sayısına sahip hücreye {{target}} değerini deneyerek çözmeyi deneyin. Eğer çözüm bulunamazsa, {{target}} yanlıştır ve diğer adaylar denenmelidir',
      BLOCK_ELIMINATION_ROW:
        '{{box}}. kutuda, {{target}} adayı sadece {{positions}} konumlarında bulunuyor. Bu nedenle, aynı satırdaki diğer hücrelerde {{target}} adayı olamaz',
      BLOCK_ELIMINATION_COLUMN:
        '{{box}}. kutuda, {{target}} adayı sadece {{positions}} konumlarında bulunuyor. Bu nedenle, aynı sütundaki diğer hücrelerde {{target}} adayı olamaz',
      BLOCK_ELIMINATION_BOX_ROW:
        '{{row}}. satırda, {{target}} adayı sadece {{positions}} konumlarında bulunuyor. Bu nedenle, aynı kutudaki diğer hücrelerde {{target}} adayı olamaz',
      BLOCK_ELIMINATION_BOX_COLUMN:
        '{{col}}. sütunda, {{target}} adayı sadece {{positions}} konumlarında bulunuyor. Bu nedenle, aynı kutudaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_PAIR_ROW:
        '{{row}}. satırda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu satırdaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_PAIR_COLUMN:
        '{{col}}. sütunda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu sütundaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_PAIR_BOX:
        '{{box}}. kutuda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu kutudaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_TRIPLE_ROW1:
        '{{row}}. satırda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu satırdaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_TRIPLE_COLUMN1:
        '{{col}}. sütunda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu sütundaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_TRIPLE_BOX1:
        '{{box}}. kutuda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu kutudaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_TRIPLE_ROW2:
        '{{row}}. satırda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu satırdaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_TRIPLE_COLUMN2:
        '{{col}}. sütunda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu sütundaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_TRIPLE_BOX2:
        '{{box}}. kutuda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu kutudaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_QUADRUPLE_ROW:
        '{{row}}. satırda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu satırdaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_QUADRUPLE_COLUMN:
        '{{col}}. sütunda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu sütundaki diğer hücrelerde {{target}} adayı olamaz',
      NAKED_QUADRUPLE_BOX:
        '{{box}}. kutuda, {{target}} adayı sadece {{positions}} konumlarında bulunabiliyor. Bu nedenle, bu kutudaki diğer hücrelerde {{target}} adayı olamaz',
      HIDDEN_PAIR_ROW:
        '{{row}}. satırda, {{candStr}} adayları sadece {{positions}} konumlarında bulunuyor. Bu nedenle, bu hücrelerde başka aday olamaz',
      HIDDEN_PAIR_COLUMN:
        '{{col}}. sütunda, {{candStr}} adayları sadece {{positions}} konumlarında bulunuyor. Bu nedenle, bu hücrelerde başka aday olamaz',
      HIDDEN_PAIR_BOX:
        '{{box}}. kutuda, {{candStr}} adayları sadece {{positions}} konumlarında bulunuyor. Bu nedenle, bu hücrelerde başka aday olamaz',
      HIDDEN_TRIPLE_ROW:
        '{{row}}. satırda, {{candStr}} adayları sadece {{positions}} konumlarında bulunuyor. Bu nedenle, bu hücrelerde başka aday olamaz',
      HIDDEN_TRIPLE_COLUMN:
        '{{col}}. sütunda, {{candStr}} adayları sadece {{positions}} konumlarında bulunuyor. Bu nedenle, bu hücrelerde başka aday olamaz',
      HIDDEN_TRIPLE_BOX:
        '{{box}}. kutuda, {{candStr}} adayları sadece {{positions}} konumlarında bulunuyor. Bu nedenle, bu hücrelerde başka aday olamaz',
      X_WING_ROW:
        '{{row1}}. ve {{row2}}. satırlarda, {{candStr}} adayı her satırda iki konumda ve aynı sütunlarda bulunuyor. Bu dört konum içinde hangi ikisi doğru olursa olsun, bu sütunlardaki diğer konumlarda {{candStr}} adayı olamaz',
      X_WING_COLUMN:
        '{{col1}}. ve {{col2}}. sütunlarda, {{candStr}} adayı her sütunda iki konumda ve aynı satırlarda bulunuyor. Bu dört konum içinde hangi ikisi doğru olursa olsun, bu satırlardaki diğer konumlarda {{candStr}} adayı olamaz',
      X_WING_VARIENT_ROW:
        '{{positions}} konumlarındaki {{length}} hücreden herhangi ikisinde {{candStr}} bulunursa, R{{row}}C{{col}} hücresinde {{candStr}} adayı olamaz',
      X_WING_VARIENT_COLUMN:
        '{{positions}} konumlarındaki {{length}} hücreden herhangi ikisinde {{candStr}} bulunursa, R{{row}}C{{col}} hücresinde {{candStr}} adayı olamaz',
      XY_WING:
        '{{positions}} konumlarındaki üç hücre nasıl değer alırsa alsın, {{deleteStr}} konumunda {{candStr}} adayı olamaz',
      XYZ_WING:
        '{{positions}} konumlarındaki üç hücre nasıl değer alırsa alsın, {{deleteStr}} konumunda {{candStr}} adayı olamaz',
      SKYSCRAPER:
        '{{positions}} konumlarındaki mavi hücre bir zincir oluşturuyor. R{{row1}}C{{col1}} veya R{{row2}}C{{col2}} değeri {{target}} olsun, {{deleteStr}} konumunda {{target}} adayı olamaz',
      SKYSCRAPER2:
        'R{{row1}}C{{col1}} ve R{{row2}}C{{col2}} hücreleri bir güçlü bağ, R{{row3}}C{{col3}} ve R{{row4}}C{{col4}} hücreleri başka bir güçlü bağ oluşturuyor. Bu iki güçlü bağ, R{{row3}}C{{col3}} ve R{{row2}}C{{col2}} arasındaki zayıf bağla bağlanıyor. R{{row1}}C{{col1}} doğruysa, {{deleteStr}} yanlış olmalı. R{{row1}}C{{col1}} yanlışsa, R{{row4}}C{{col4}} doğru olmalı, bu da yine {{deleteStr}} konumunun yanlış olmasını gerektirir. Her durumda, {{target}} adayı {{deleteStr}} konumunda bulunamaz',
      WXYZ_WING:
        '{{candStr}} WXYZ-Kanadı oluşturuyor, R{{row1}}C{{col1}} merkez noktası olarak. Bu dört hücre nasıl değer alırsa alsın, {{target}} adayı {{deleteStr}} konumunda bulunamaz',
      COMBINATION_CHAIN_3_2_1_STRONG:
        '{{candStr1}} kombinasyonu ve {{candStr2}} güçlü bağ oluşturuyor. {{candStr4}} hangisi doğru olursa olsun, {{target}} adayı {{posStr}} konumunda bulunamaz',
      COMBINATION_CHAIN_3_2_1_WEAK:
        '{{candStr1}} kombinasyonu ve {{candStr2}} güçlü bağ oluşturuyor, {{candStr3}} dört hücresi güçlü bağ oluşturuyor. Bu iki güçlü bağ {{pivotStr}} üzerinden zayıf bağla bağlanıyor. {{candStr4}} hangisi doğru olursa olsun, {{target}} adayı {{posStr}} konumunda bulunamaz',
      COMBINATION_CHAIN_3_2_2_WEAK:
        '{{candStr1}} kombinasyonu ve {{candStr2}} güçlü bağ oluşturuyor, {{candStr3}} iki hücresi güçlü bağ oluşturuyor. Bu iki güçlü bağ {{pivotStr1}} ve {{pivotStr2}} hücrelerinin oluşturduğu zayıf bağla bağlanıyor. {{candStr4}} hangisi doğru olursa olsun, {{target}} adayı {{posStr}} konumunda bulunamaz',
      COMBINATION_CHAIN_3_2_2_STRONG:
        '{{candStr1}} kombinasyonu ve {{candStr2}} güçlü bağ oluşturuyor, {{candStr3}} iki hücresi güçlü bağ oluşturuyor. Bu iki güçlü bağ {{pivotStr1}} ve {{pivotStr2}} hücrelerinin oluşturduğu güçlü bağla bağlanıyor. {{candStr4}} hangisi doğru olursa olsun, {{target}} adayı {{posStr}} konumunda bulunamaz',
      LOOP_3_2_2:
        '{{nodeStr1}} bir güçlü zincir oluşturuyor, {{nodeStr2}} bir güçlü zincir oluşturuyor, {{nodeStr3}} bir güçlü zincir oluşturuyor. Bu üç güçlü zincir zayıf zincirle birlikte bir döngü oluşturuyor. {{rootNodeStr}} yanlışsa ve ondan başlarsanız, hem saat yönü hem ters yönde mantıksal çıkarım yapmanız sonunda döngüdeki bir çelişkiye yol açar, bu yüzden {{rootNodeStr}} doğru olmalıdır.',
      LOOP_3_2:
        '{{nodeStr1}} bir güçlü zincir oluşturuyor, {{nodeStr2}} bir güçlü zincir oluşturuyor. Bu iki güçlü zincir zayıf zincirle birlikte bir döngü oluşturuyor. {{rootNodeStr}} yanlışsa ve ondan başlarsanız, hem saat yönü hem ters yönde mantıksal çıkarım yapmanız sonunda döngüdeki bir çelişkiye yol açar, bu yüzden {{rootNodeStr}} doğru olmalıdır.',
      UNIQUE_RECTANGLE1:
        "{{nodeStr}} ve {{deleteStr}} benzersiz bir dikdörtgen yapısı oluşturur. Yani, tahtada dört hücre vardır ve bu hücrelerin konumları bir dikdörtgen oluşturur, iki farklı kutu içinde yer alır ve içinde aynı adaylardan ikişer tane bulunur. Bu tür bir yapı tahtada belirdiğinde, bu sudoku'nun geçersiz olduğunu gösterir, bu nedenle {{deleteStr}} aday {{target}}ı silerek sudoku'nun tek bir çözümü olmasını sağlamalıdır",
      UNIQUE_RECTANGLE2:
        "Kırmızı hücreye {{target}} girilirse, {{nodeStr}} dört hücre benzersiz bir dikdörtgen yapısı oluşturur. Yani, tahtada dört hücre vardır ve bu hücrelerin konumları bir dikdörtgen oluşturur, iki farklı kutu içinde yer alır ve içinde aynı adaylardan ikişer tane bulunur. Bu tür bir yapı tahtada belirdiğinde, bu sudoku'nun geçersiz olduğunu gösterir, bu nedenle kırmızı hücrede aday {{target}} olamaz",
      BINARY_UNIVERSAL_GRAVE:
        "{{posStr}}'nin {{target}} olmadığını varsayarsak, tahtadaki tüm aday hücrelerde sadece iki aday vardır ve her aday her satırda, her sütunda ve her kutuda sadece iki kez görünür. Bu tür bir yapı sudoku'nun birden fazla çözüm getirmesine neden olur, bu durumu önlemek için {{posStr}} {{target}} olmalıdır",
      SWORDFISH_ROW:
        'Mavi karelerin bulunduğu üç satırda {{target}} adayı için başka aday hücre yoktur. Bu hücreler nasıl değer alırsa alsın, karşılık gelen üç sütunda {{target}} adayı bulunamaz',
      SWORDFISH_COLUMN:
        'Mavi karelerin bulunduğu üç sütunda {{target}} adayı için başka aday hücre yoktur. Bu hücreler nasıl değer alırsa alsın, karşılık gelen üç satırda {{target}} adayı bulunamaz',
      JELLYFISH_ROW:
        'Mavi karelerin bulunduğu dört satırda {{target}} adayı için başka aday hücre yoktur. Bu hücreler nasıl değer alırsa alsın, karşılık gelen dört sütunda {{target}} adayı bulunamaz',
      JELLYFISH_COLUMN:
        'Mavi karelerin bulunduğu dört sütunda {{target}} adayı için başka aday hücre yoktur. Bu hücreler nasıl değer alırsa alsın, karşılık gelen dört satırda {{target}} adayı bulunamaz',
      DOUBLE_COLOR_CHAIN_delete:
        '{{posStr}} {{target}} değerini aldığında, kırmızı hücre {{target}} değerini alamaz',
      DOUBLE_COLOR_CHAIN_s:
        '{{posStr1}} {{target1}} değerini alırsa, {{posStr2}} {{target2}} değerini alır',
      DOUBLE_COLOR_CHAIN_r:
        '{{posStr1}} {{target}} değerini aldığında, {{posStr2}} {{target}} değerini alamaz',
      DOUBLE_COLOR_CHAIN_q:
        '{{posStr1}} ve {{posStr2}} {{target}} için güçlü bir bağ oluşturduğundan, {{posStr2}} {{target}} olmalıdır',
      DOUBLE_COLOR_CHAIN_q_start:
        '{{posStr}} {{target1}} değerini aldığında, mevcut hücre {{target2}} değerini alamaz',
      COMBINATION_CHAIN_AB_STRONG: '{{A}} ve {{B}} güçlü bir bağlantı oluşturur',
      COMBINATION_CHAIN_AB_WEAK: '{{A}} ve {{B}} zayıf bir bağlantı oluşturur',
      COMBINATION_CHAIN_END:
        '{{A}} doğru olduğunda, kırmızı hücre yanlıştır. {{A}} yanlış olduğunda, çıkarım yoluyla {{B}} doğru olur ve kırmızı hücre yine yanlıştır',
      SKYSCRAPER2_1:
        '{{As}} iki hücre arasında güçlü bir bağlantı vardır, {{Bs}} dört hücre arasında güçlü bir bağlantı vardır ve bu iki güçlü bağlantı, {{Cs}} iki hücre arasındaki zayıf bir bağlantı ile bağlanır. {{A}} doğru olduğunda, kırmızı hücre yanlıştır. {{A}} yanlış olduğunda, {{B}} doğrudur ve kırmızı hücre yine yanlıştır',
      SKYSCRAPER2_2:
        '{{As}} iki hücre arasında güçlü bir bağlantı vardır, {{Bs}} iki hücre arasında güçlü bir bağlantı vardır ve {{Cs}} iki hücre arasında güçlü bir bağlantı vardır. Her güçlü bağlantı, zayıf bağlantılarla diğerlerine bağlanır. {{A}} doğru olduğunda, kırmızı hücre yanlıştır. {{A}} yanlış olduğunda, {{B}} doğrudur ve kırmızı hücre yine yanlıştır',
    },
    back: 'Geri',
    next: 'Sonraki',
    errorDraft: 'Notlarda hata var, lütfen düzeltin',
    pleaseConnectNetwork: 'Lütfen internet bağlantınızı kontrol edin',
    setting: 'Ayarlar',
    removeAD: 'Reklamları Kaldır',
    sound: 'Ses',
    notice: 'Bildirimler',
    privacyPolicy: 'Gizlilik Politikası',
    serviceTerms: 'Hizmet Şartları',
    language: 'Dil',
    feedback: 'Geri Bildirim',
    feedbackMessage: 'Mesaj:',
    congratulations: 'Tebrikler!',
    restore: 'Satın Alınıyor...',
    restoring: 'Satın Alınıyor...',
    purchasing: 'Satın Alınıyor...',
    illegalPrompt:
      'Sistem, programınızı sık sık kapatmanızı tespit etti. Bu, reklam kaçınma ile ilgili olabilir. Lütfen bir dakika bekleyin ve yeniden deneyin.',
    highlight: 'Vurgu',
    myBoards: 'Özel Sudoku',
    Home: 'Anasayfa',
    saveToMyBoards: "Özel Sudoku'ya Kaydet",
    pleaseNameYourSudoku: "Özel Sudoku'ya bir isim verin",
    success: 'Başarılı',
    sudokuSavedToMyBoards: "Özel Sudoku'ya kaydedildi!",
    error: 'Hata',
    saveFailedPleaseTryAgainLater: 'Kayıt hatası, lütfen daha sonra tekrar deneyin',
    confirm: 'Onayla',
    noNetwork:
      'İnternet bağlantınız yok. Devam ettiğinizde sudoku kaydedilmeyecektir. Devam etmek istiyor musunuz?',
    loading: 'Yükleniyor...',
    pleaseCheckNetwork: 'Yükleme hatası, lütfen internet bağlantınızı kontrol edin',
    pleaseCheckiCloud: 'Yükleme hatası, lütfen iCloud bağlantınızı kontrol edin',
    untitled: 'Başlıksız',
    enlarge: 'Büyüt',
    encourage: 'Bizi teşvik edin❤️',
    share: 'Paylaş',
    shareMessage: 'Özel Sudoku, kendinize özel sudoku oluşturmanıza olanak tanır. Hemen deneyin!',
    wether: 'Ne olursa olsun, kırmızı hücre {{target}} adayı içeremez',
    case1: 'Durum 1:',
    case2: 'Durum 2:',
    case3: 'Durum 3:',
    comma: ',',
    period: '.',
    end1: 'Kırmızı hücre {{target}} içeremez',
    end2: 'Kırmızı hücre hala {{target}} içeremez',
    theme: 'Tema',
    selectTheme: 'Tema seç',
    lightMode: 'Açık tema',
    darkMode: 'Koyu tema',
    strictMode: 'Kesinlikle',
    reasonMode: 'Neden',
    strictText: 'Kesinlikle: Girilen değer doğru değilse, hata mesajı görüntülenir',
    reasonText: 'Neden: Girilen değer doğru değilse, hata mesajı görüntülenmez',
    localGames: 'Yerel Sudoku',
    statistics: 'İstatistikler',
    entry: 'Giriş',
    easy: 'Kolay',
    medium: 'Orta',
    hard: 'Zor',
    extreme: 'Çok Zor',
    dataSync: 'Veri Senkronizasyonu Açıklaması',
    dataSyncDescription:
      '1.Dostça hatırlatma: Cihazınızı değiştirirseniz, iCloud verileri yeni cihaza hemen senkronize olmayabilir. Uygulamayı birkaç kez yeniden açmanızı veya bir süre beklemenizi öneririz. Bu süre zarfında, yerel bulmacalar üzerinde çalışabilirsiniz. Eski veriler güncellendikten sonra, uygulama otomatik olarak yeni verileri bir araya getirmenize yardımcı olacaktır.',
    total: 'Toplam',
    pleaseLoginGameCenter:
      "Lütfen önce GameCenter'a giriş yapın. Zaten giriş yaptıysanız, uygulamayı yeniden açın.",
    tips: 'İpucu',
    dataSyncDescription2: '2.Sıralamanız 24 saat içinde dünya çapında senkronize edilecektir.',
    fastestTime: 'En hızlı',
    averageTime: 'Ortalama',
    fixedDescription:
      'Bu işlem, tahtadaki mevcut sayıları sabitleyecektir. Sabitlenmiş sayıları değiştiremeyeceksiniz. Devam etmek istediğinizden emin misiniz?',
    doNotShowAgain: 'Bir daha gösterme',
  },
};
