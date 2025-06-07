import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Pressable,
  Image,
  Linking,
  Platform,
  Share,
} from 'react-native';
import { useSudokuStore } from '../store';
import { useTranslation } from 'react-i18next';
import LanguageModal from '../components/LanguageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const PRIVACY_POLICY_URL = 'https://sites.google.com/view/sudokucustom';
const TERMS_OF_SERVICE_URL = 'https://sites.google.com/view/sudoku-custom-terms';

function Setting() {
  const isSound = useSudokuStore(state => state.isSound);
  const setIsSound = useSudokuStore(state => state.setIsSound);
  const isHighlight = useSudokuStore(state => state.isHighlight);
  const setIsHighlight = useSudokuStore(state => state.setIsHighlight);
  const isDark = useSudokuStore(state => state.isDark);
  const setIsDark = useSudokuStore(state => state.setIsDark);
  const isReason = useSudokuStore(state => state.isReason);
  const setIsReason = useSudokuStore(state => state.setIsReason);
  const setIsSetting = useSudokuStore(state => state.setIsSetting);
  const styles = createStyles(isDark);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  
  // 从设备信息获取应用版本号
  const APP_VERSION = DeviceInfo.getVersion();

  useEffect(() => {
    setIsSetting(true);
    return () => {
      setIsSetting(false);
    };
  }, []);

  const toogleSound = useCallback(() => {
    if (isSound) {
      setIsSound(false);
      AsyncStorage.setItem('isSound', 'false');
    } else {
      setIsSound(true);
      AsyncStorage.setItem('isSound', 'true');
    }
  }, [isSound, setIsSound]);

  const toogleHighlight = useCallback(() => {
    if (isHighlight) {
      setIsHighlight(false);
      AsyncStorage.setItem('isHighlight', 'false');
    } else {
      setIsHighlight(true);
      AsyncStorage.setItem('isHighlight', 'true');
    }
  }, [isHighlight, setIsHighlight]);

  const handleFeedback = useCallback(() => {
    const email = 'gaozijian32@gmail.com';
    const subject = `趣数独反馈 ${APP_VERSION}`;
    const body = `
App Version: ${APP_VERSION}
OS Version: ${Platform.OS} ${Platform.Version}
Language: ${i18n.language}

${t('feedbackMessage')}
    `.trim();

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl);
  }, [APP_VERSION, i18n.language, t]);

  const handlePrivacyPolicy = useCallback(() => {
    Linking.openURL(PRIVACY_POLICY_URL);
  }, []);

  const handleTermsOfService = useCallback(() => {
    Linking.openURL(TERMS_OF_SERVICE_URL);
  }, []);

  const handleRateApp = useCallback(() => {
    Linking.openURL('https://apps.apple.com/cn/app/id6741408233?action=write-review');
  }, []);

  const handleShare = useCallback(() => {
    Share.share({
      title: '趣数独',
      message: '趣数独',
      url: 'https://apps.apple.com/cn/app/%E8%B6%A3%E6%95%B0%E7%8B%AC-%E7%BB%8F%E5%85%B8%E7%9A%84%E7%9B%8A%E6%99%BA%E8%A7%A3%E8%B0%9C%E5%B0%8F%E6%B8%B8%E6%88%8F/id6741408233',
    });
  }, [t]);

  const handleContactAuthor = useCallback(() => {
    Linking.openURL('https://www.xiaohongshu.com/user/profile/67a2381a000000000e01f711');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.item}>
          <Image source={require('../assets/icon/sound.png')} style={styles.leftIcon} />
          <Text style={styles.itemText}>{t('sound')}</Text>
          <Switch
            value={isSound}
            onValueChange={toogleSound}
            trackColor={{
              false: '#f0f0f0',
              true: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
            }}
            thumbColor={isDark ? '#888' : '#f4f3f4'}
          />
        </View>

        <View style={styles.item}>
          <Image source={require('../assets/icon/highlight.png')} style={styles.leftIcon} />
          <Text style={styles.itemText}>{t('highlight')}</Text>
          <Switch
            value={isHighlight}
            onValueChange={toogleHighlight}
            trackColor={{ false: '#f0f0f0', true: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)' }}
            thumbColor={isDark ? '#888' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.item, styles.modeSelector]}>
          <Pressable
            style={[styles.modeButton, !isDark && styles.activeMode]}
            onPressIn={() => {
              setIsDark(false);
              AsyncStorage.setItem('isDark', 'false');
            }}
          >
            <Image source={require('../assets/icon/sun.png')} style={styles.sunIcon} />
            <Text style={[styles.modeText]}>{t('lightMode')}</Text>
          </Pressable>
          <Pressable
            style={[styles.modeButton, isDark && styles.activeMode]}
            onPressIn={() => {
              setIsDark(true);
              AsyncStorage.setItem('isDark', 'true');
            }}
          >
            <Image source={require('../assets/icon/moon.png')} style={styles.moonIcon} />
            <Text style={[styles.modeText]}>{t('darkMode')}</Text>
          </Pressable>
        </View>

        <View style={[styles.item, styles.modeSelector]}>
          <Pressable
            style={[styles.modeButton, !isReason && styles.activeMode]}
            onPressIn={() => {
              setIsReason(false);
              AsyncStorage.setItem('isReason', 'false');
            }}
          >
            <Image source={require('../assets/icon/strict.png')} style={styles.strictIcon} />
            <Text style={[styles.modeText]}>{t('strictMode')}</Text>
          </Pressable>
          <Pressable
            style={[styles.modeButton, isReason && styles.activeMode]}
            onPressIn={() => {
              setIsReason(true);
              AsyncStorage.setItem('isReason', 'true');
            }}
          >
            <Image source={require('../assets/icon/reason.png')} style={styles.reasonIcon} />
            <Text style={[styles.modeText]}>{t('reasonMode')}</Text>
          </Pressable>
        </View>

        <Pressable style={styles.item} onPress={() => setLanguageModalVisible(true)}>
          <Image source={require('../assets/icon/language.png')} style={styles.leftIcon} />
          <Text style={styles.itemText}>{t('language')}</Text>
          <Image source={require('../assets/icon/arrow.png')} style={styles.arrow} />
        </Pressable>

        <Pressable style={styles.item} onPress={handleFeedback}>
          <Image source={require('../assets/icon/email.png')} style={styles.leftIcon} />
          <Text style={styles.itemText}>{t('feedback')}</Text>
          <Image source={require('../assets/icon/arrow.png')} style={styles.arrow} />
        </Pressable>

        <Pressable style={styles.item} onPress={handleRateApp}>
          <Image source={require('../assets/icon/tongguo.png')} style={styles.leftIcon} />
          <Text style={[styles.itemText, styles.rateText]}>{t('encourage')}</Text>
          <Image source={require('../assets/icon/arrow.png')} style={styles.arrow} />
        </Pressable>

        <Pressable style={styles.item} onPress={handleShare}>
          <Image source={require('../assets/icon/share.png')} style={styles.leftIcon} />
          <Text style={styles.itemText}>{t('share')}</Text>
          <Image source={require('../assets/icon/arrow.png')} style={styles.arrow} />
        </Pressable>

        <Pressable style={styles.item} onPress={handleContactAuthor}>
          <Image source={require('../assets/icon/xiaohongshulogo.png')} style={styles.xiaohongshuIcon} />
          <Text style={styles.itemText}>{t('contactAuthor')}</Text>
          <Image source={require('../assets/icon/arrow.png')} style={styles.arrow} />
        </Pressable>
      </View>

      {/* 将版本号显示移到隐私政策上方 */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>{APP_VERSION}</Text>
      </View>

      <View style={styles.links}>
        <Pressable onPress={handlePrivacyPolicy}>
          <Text style={styles.linkText}>{t('privacyPolicy')}</Text>
        </Pressable>
        <Text style={styles.separator}>|</Text>
        <Pressable onPress={handleTermsOfService}>
          <Text style={styles.linkText}>{t('serviceTerms')}</Text>
        </Pressable>
      </View>

      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        currentLanguage={i18n.language}
        onSelectLanguage={lang => {
          i18n.changeLanguage(lang);
          setLanguageModalVisible(false);
        }}
      />
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 30,
      backgroundColor: isDark ? 'rgb(22,23,25)' : 'rgb(239,239,245)',
    },
    tarbar: {
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
      height: 40,
      width: '100%',
      position: 'relative',
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    tarbarText: {
      fontSize: 30,
      color: isDark ? '#888' : '#fff',
      flex: 1,
      textAlign: 'center',
    },
    content: {
      marginTop: 60,
      backgroundColor: isDark ? 'rgb( 32, 31, 33)' : '#fff',
      marginHorizontal: 15,
      borderRadius: 8,
      position: 'relative',
      top: -40,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgb(47, 47, 49)' : '#f0f0f0',
      paddingHorizontal: 15,
      borderRadius: 8,
      backgroundColor: isDark ? 'rgb( 32, 31, 33)' : '#fff',
    },
    itemText: {
      fontSize: 20,
      color: isDark ? 'rgb(148,148,150)' : '#333',
      flex: 1,
      marginLeft: 10,
    },
    arrow: {
      width: 20,
      height: 20,
      tintColor: 'rgb(148,148,150)',
    },
    headerLogo: {
      position: 'absolute',
      right: 15,
      top: 12,
      width: 25,
      height: 25,
    },
    backIconContainer: {
      width: 30,
      height: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 10,
      zIndex: 10,
    },
    backIcon: {
      height: 20,
      width: 20,
      tintColor: isDark ? '#888' : '#fff',
    },
    leftIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
      opacity: isDark ? 0.5 : 1,
    },
    links: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
    linkText: {
      fontSize: 14,
      color: '#666',
      paddingHorizontal: 10,
    },
    separator: {
      color: '#666',
      fontSize: 14,
    },
    modeSelector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    modeButton: {
      flex: 1,
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingLeft: 15,
      borderRadius: 0,
      height: '100%',
    },
    activeMode: {
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
    },
    modeText: {
      fontSize: 18,
      color: isDark ? '#888' : 'black',
      marginLeft: 5,
    },
    sunIcon: {
      width: 30,
      height: 30,
      opacity: isDark ? 0.5 : 1,
    },
    moonIcon: {
      width: 28,
      height: 28,
      opacity: isDark ? 0.5 : 1,
    },
    strictIcon: {
      width: 30,
      height: 30,
      opacity: isDark ? 0.5 : 1,
    },
    reasonIcon: {
      width: 30,
      height: 30,
      opacity: isDark ? 0.5 : 1,
    },
    xiaohongshuIcon: {
      width: 70,
      height: 30,
      marginRight: 10,
      opacity: isDark ? 0.5 : 1,
    },
    rateText: {
      color: isDark ? 'rgb(189, 114, 0)' : 'rgb(255, 149, 0)',
      fontWeight: '600',
    },
    versionContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
    },
    versionText: {
      fontSize: 14,
      color: '#666',
    },
  });

export default Setting;
