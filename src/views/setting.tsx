import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  Linking,
  Platform,
} from 'react-native';
import { useSudokuStore } from '../store';
import TarBars from '../components/tarBars';
import { useTranslation } from 'react-i18next';
import LanguageModal from '../components/LanguageModal';
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
  ProductPurchase,
  PurchaseError,
} from 'react-native-iap';
import * as RNIap from 'react-native-iap';
import rewardedVideo from '../tools/RewardedVideo';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingProps {
  slideAnim: Animated.Value;
  closeSetting: () => void;
}

const APP_VERSION = '1.0.0';

// 商品 ID
const itemSKUs = Platform.select({
  ios: ['sudoku'],
  android: []
});

const PRIVACY_POLICY_URL = 'https://sites.google.com/view/sudokucustom';
const TERMS_OF_SERVICE_URL = 'https://sites.google.com/view/sudoku-custom-terms';

const Setting: React.FC<SettingProps> = ({
  slideAnim,
  closeSetting,
}) => {
  const { isSound, setIsSound, setIsVip } = useSudokuStore();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const toogleSound = useCallback(() => {
    setIsSound(!isSound);
  }, [isSound, setIsSound]);

  const handleFeedback = useCallback(() => {
    const email = 'gaozijian32@gmail.com';
    const subject = `Feedback Sudoku ${APP_VERSION}`;
    const body = `
App Version: ${APP_VERSION}
OS Version: ${Platform.OS} ${Platform.Version}
Language: ${i18n.language}

${t('feedbackMessage')}
    `.trim();

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl);
  }, [i18n.language]);

  // 初始化 IAP
  useEffect(() => {
    let purchaseUpdateSubscription: any;
    let purchaseErrorSubscription: any;

    const initIAP = async () => {
      if (typeof RNIap === 'undefined') {
        console.warn('RNIap 模块未加载');
        return;
      }

      try {
        await RNIap.initConnection();

        // 监听购买更新
        purchaseUpdateSubscription = purchaseUpdatedListener(
          async (purchase: ProductPurchase) => {
            if (purchase.transactionReceipt) {
              await RNIap.finishTransaction({
                purchase,
                isConsumable: false,
              });
              rewardedVideo.setIsVip(true);
              setIsVip(true);
              AsyncStorage.setItem('isVip', 'true');
              setPurchasing(false);
            }
          }
        );

        // 监听购买错误
        purchaseErrorSubscription = purchaseErrorListener(
          (error: PurchaseError) => {
            console.warn('购买错误', error);
            setPurchasing(false);
          }
        );

      } catch (err) {
        console.warn('初始化 IAP 错误:', err);
      }
    };

    initIAP();

    return () => {
      if (typeof RNIap !== 'undefined') {
        purchaseUpdateSubscription?.remove();
        purchaseErrorSubscription?.remove();
        RNIap.endConnection();
      }
    };
  }, []);

  // 处理购买
  const handlePurchase = useCallback(async () => {
    if (purchasing) {
      return;
    }

    try {
      setPurchasing(true);

      // 确保连接已初始化
      await RNIap.initConnection();

      const products = await RNIap.getProducts({ skus: itemSKUs || [] });

      if (products.length === 0) {
        throw new Error('没有找到可用商品');
      }

      await RNIap.requestPurchase({
        sku: products[0].productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false
      });
    } catch (err) {
      console.error('购买错误:', err);
      setPurchasing(false);
      // 这里可以添加错误提示
    }
  }, [purchasing]);

  // 处理恢复购买
  const handleRestore = useCallback(async () => {
    if (restoring) {
      return;
    }

    try {
      setRestoring(true);

      // 确保连接已初始化
      await RNIap.initConnection();

      const purchases = await RNIap.getAvailablePurchases();

      if (purchases.length > 0) {
        // 查找是否有移除广告的购买记录
        const adRemovalPurchase = purchases.find(
          purchase => itemSKUs?.includes(purchase.productId)
        );

        if (adRemovalPurchase) {
          rewardedVideo.setIsVip(true);
          setIsVip(true);
          AsyncStorage.setItem('isVip', 'true');
        }
      }
    } catch (err) {
      console.error('恢复购买错误:', err);
    } finally {
      setRestoring(false);
    }
  }, [restoring]);

  const handlePrivacyPolicy = useCallback(() => {
    Linking.openURL(PRIVACY_POLICY_URL);
  }, []);

  const handleTermsOfService = useCallback(() => {
    Linking.openURL(TERMS_OF_SERVICE_URL);
  }, []);

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
        <Pressable
          style={[styles.item]}
          onPress={handlePurchase}
          disabled={purchasing}>
          <Image
            source={require('../assets/icon/closeAD.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>
            {purchasing ? t('purchasing') : t('removeAD')}
          </Text>
          <Image
            source={require('../assets/icon/arrow.png')}
            style={styles.arrow}
          />
        </Pressable>

        <Pressable
          style={[styles.item]}
          onPress={handleRestore}
          disabled={restoring}>
          <Image
            source={require('../assets/icon/restore.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>
            {restoring ? t('restoring') : t('restore')}
          </Text>
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
            trackColor={{ false: '#f0f0f0', true: 'rgb(91,139,241)' }}
            thumbColor={isSound ? '#fff' : '#fff'}
          />
        </View>

        {/* <Pressable style={styles.item}>
          <Image
            source={require('../assets/icon/notice.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>{t('notice')}</Text>
          <Switch
            value={isSound}
            onValueChange={toogleSound}
            trackColor={{ false: '#f0f0f0', true: 'rgb(91,139,241)' }}
            thumbColor={isSound ? '#fff' : '#fff'}
          />
        </Pressable> */}

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

        <Pressable
          style={styles.item}
          onPress={handleFeedback}
        >
          <Image
            source={require('../assets/icon/email.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>{t('feedback')}</Text>
          <Image
            source={require('../assets/icon/arrow.png')}
            style={styles.arrow}
          />
        </Pressable>
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
