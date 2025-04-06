import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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
import * as RNLocalize from 'react-native-localize';
// 获取设备语言的辅助函数
const getDeviceLanguage = () => {
  try {
    // 使用react-native-localize获取系统语言
    const locales = RNLocalize.getLocales();
    if (locales.length === 0) {
      return 'en'; // 没有获取到语言时使用英语作为默认值
    }

    const deviceLanguage = locales[0].languageCode;
    const countryCode = locales[0].countryCode;

    // 处理中文特殊情况
    if (deviceLanguage === 'zh') {
      // 中国大陆使用简体中文
      if (countryCode === 'CN') {
        return 'zh_CN';
      }
      // 台湾、香港使用繁体中文
      if (countryCode === 'TW' || countryCode === 'HK') {
        return 'zh_TW';
      }
      // 默认简体中文
      return 'zh_CN';
    }

    // 将获取到的语言代码转换为资源中对应的格式
    return deviceLanguage;
  } catch (error) {
    console.warn('获取设备语言失败:', error);
    return 'en'; // 默认返回英语
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
  // 设置默认语言，确保初始化不会出错
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // 默认使用英语初始化
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  // 异步获取用户语言和设备语言
  try {
    // 首先尝试获取用户保存的语言设置
    const savedLanguage = await getUserLanguage();
    // 检查语言是否存在于resources中
    if (savedLanguage && Object.keys(resources).includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // 如果没有用户设置的语言，则使用设备语言
      const deviceLang = getDeviceLanguage();
      if (deviceLang && Object.keys(resources).includes(deviceLang)) {
        i18n.changeLanguage(deviceLang);
      }
    }
  } catch (error) {
    console.warn('切换语言失败:', error);
  }
};

initI18n();

export default i18n;
