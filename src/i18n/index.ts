import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import zh_CN from './zh_CN';
import en from './en';
import zh_TW from './zh_TW';
import ja from './ja';
import ko from './ko';
import fr from './fr';
import de from './de';
import es from './es';
import it from './it';
import pt from './pt';
import ru from './ru';
// import ar from './ar';
import hi from './hi';
import tr from './tr';
import vi from './vi';
import th from './th';
import uk from './uk';
import nl from './nl';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 获取设备语言的辅助函数
const getDeviceLanguage = () => {
  // iOS
  if (Platform.OS === 'ios') {
    const locale =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
    switch (locale) {
      case 'zh-Hans':
      case 'zh_CN':
        return 'zh_CN';
      case 'zh-Hant':
      case 'zh_TW':
      case 'zh_HK':
        return 'zh_TW';
      default:
        return locale.split('_')[0];
    }
  }
  // Android
  const locale = NativeModules.I18nManager.localeIdentifier;
  switch (locale) {
    case 'zh-Hans':
    case 'zh_CN':
      return 'zh_CN';
    case 'zh-Hant':
    case 'zh_TW':
    case 'zh_HK':
      return 'zh_TW';
    default:
      return locale.split('_')[0];
  }
};

const resources = {
  en,
  zh_CN,
  zh_TW,
  ja,
  ko,
  fr,
  de,
  es,
  it,
  pt,
  ru,
  // ar,
  hi,
  tr,
  vi,
  th,
  uk,
  nl,
};

// 获取用户保存的语言设置
const getUserLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    return savedLanguage;
  } catch (error) {
    console.error('获取保存的语言设置失败:', error);
    return null;
  }
};

// 初始化 i18n
const initI18n = async () => {
  const savedLanguage = await getUserLanguage();
  
  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || getDeviceLanguage() || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
