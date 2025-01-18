import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import {useSudokuStore} from '../store';
import TarBars from '../components/tarBars';
import FeedbackModal from '../components/FeedbackModal';
import {useTranslation} from 'react-i18next';
import LanguageModal from '../components/LanguageModal';

interface SettingProps {
  slideAnim: Animated.Value;
  closeSetting: () => void;
}

const Setting: React.FC<SettingProps> = ({
  slideAnim,
  closeSetting,
}) => {
  const {isSound, setIsSound} = useSudokuStore();
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const {t, i18n} = useTranslation();

  const toogleSound = useCallback(() => {
    setIsSound(!isSound);
  }, [isSound, setIsSound]);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: slideAnim,
            },
          ],
        },
      ]}>
      <TarBars />
      <View style={styles.tarbar}>
        <Pressable onPressIn={closeSetting} style={styles.backIconContainer}>
          <Image
            source={require('../assets/icon/back.png')}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.tarbarText}>{t('setting')}</Text>
      </View>

      <View style={styles.content}>
        <Pressable style={[styles.item]}>
          <Image
            source={require('../assets/icon/closeAD.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>{t('removeAD')}</Text>
          <Image
            source={require('../assets/icon/arrow.png')}
            style={styles.arrow}
          />
        </Pressable>

        <View style={styles.item}>
          <Image
            source={require('../assets/icon/sound.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>{t('sound')}</Text>
          <Switch
            value={isSound}
            onValueChange={toogleSound}
            trackColor={{false: '#f0f0f0', true: 'rgb(91,139,241)'}}
            thumbColor={isSound ? '#fff' : '#fff'}
          />
        </View>

        <Pressable style={styles.item}>
          <Image
            source={require('../assets/icon/notice.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>{t('notice')}</Text>
          <Switch
            value={isSound}
            onValueChange={toogleSound}
            trackColor={{false: '#f0f0f0', true: 'rgb(91,139,241)'}}
            thumbColor={isSound ? '#fff' : '#fff'}
          />
        </Pressable>

        <Pressable 
          style={styles.item}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Image
            source={require('../assets/icon/language.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>{t('language')}</Text>
          <Image
            source={require('../assets/icon/arrow.png')}
            style={styles.arrow}
          />
        </Pressable>

        {/* <Pressable 
          style={styles.item} 
          onPress={() => setFeedbackVisible(true)}
        >
          <Image
            source={require('../assets/icon/email.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>意见反馈</Text>
          <Image
            source={require('../assets/icon/arrow.png')}
            style={styles.arrow}
          />
        </Pressable> */}
      </View>

      <View style={styles.links}>
        <Pressable>
          <Text style={styles.linkText}>{t('privacyPolicy')}</Text>
        </Pressable>
        <Text style={styles.separator}>|</Text>
        <Pressable>
          <Text style={styles.linkText}>{t('serviceTerms')}</Text>
        </Pressable>
      </View>

      <FeedbackModal 
        visible={feedbackVisible}
        onClose={() => setFeedbackVisible(false)}
      />

      <LanguageModal 
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        currentLanguage={i18n.language}
        onSelectLanguage={(lang) => {
          i18n.changeLanguage(lang);
          setLanguageModalVisible(false);
        }}
      />

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
    backgroundColor: 'rgb(239,239,245)',
  },
  tarbar: {
    backgroundColor: 'rgb(91,139,241)',
    height: 40,
    width: '100%',
    position: 'relative',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tarbarText: {
    fontSize: 30,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    marginTop: 60,
    backgroundColor: '#fff',
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
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 20,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  arrow: {
    width: 20,
    height: 20,
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
  },
  leftIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
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
});

export default Setting;
