import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSudokuStore } from '../store';
import { playSound, playCustomSound } from '../tools/Sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 声音类型定义
type SoundType = 'error' | 'success' | 'switch' | 'erase' | 'success2' | 'success3';

// 可选择的声音文件
const soundOptions = {
  error: require('../assets/audio/error.wav'),
  success: require('../assets/audio/success.wav'),
  success2: require('../assets/audio/success2.wav'),
  success3: require('../assets/audio/success3.wav'),
  switch: require('../assets/audio/switch.wav'),
  erase: require('../assets/audio/erase.wav'),
};

// 自定义音效文件映射
const customSounds = {
  switch: {
    '音效1': require('../assets/audio/音效/切换音效/音效1.wav'),
    '音效2': require('../assets/audio/音效/切换音效/音效2.mp3'),
    '音效3': require('../assets/audio/音效/切换音效/音效3.mp3'),
    '音效4': require('../assets/audio/音效/切换音效/音效4.wav'),
    '音效5': require('../assets/audio/音效/切换音效/音效5.wav'),
    '音效6': require('../assets/audio/音效/切换音效/音效6.wav'),
    '音效7': require('../assets/audio/音效/切换音效/音效7.mp3'),
    '音效8': require('../assets/audio/音效/切换音效/音效8.mp3'),
  },
  success: {
    '音效1': require('../assets/audio/音效/成功音效1/音效1.wav'),
    '音效2': require('../assets/audio/音效/成功音效1/音效2.mp3'),
    '音效3': require('../assets/audio/音效/成功音效1/音效3.mp3'),
    '音效4': require('../assets/audio/音效/成功音效1/音效4.mp3'),
    '音效5': require('../assets/audio/音效/成功音效1/音效5.mp3'),
  },
  success2: {
    '音效1': require('../assets/audio/音效/成功音效2/音效1.wav'),
    '音效2': require('../assets/audio/音效/成功音效2/音效2.mp3'),
    '音效3': require('../assets/audio/音效/成功音效2/音效3.mp3'),
    '音效4': require('../assets/audio/音效/成功音效2/音效4.mp3'),
    '音效5': require('../assets/audio/音效/成功音效2/音效5.mp3'),
  },
  success3: {
    '音效2': require('../assets/audio/音效/通关音效/音效2.mp3'),
    '音效3': require('../assets/audio/音效/通关音效/音效3.mp3'),
    '音效4': require('../assets/audio/音效/通关音效/音效4.wav'),
    '音效5': require('../assets/audio/音效/通关音效/音效5.mp3'),
  },
  error: {
    '音效1': require('../assets/audio/音效/错误音效/音效1.mp3'),
    '音效2': require('../assets/audio/音效/错误音效/音效2.mp3'),
  },
};

interface CustomSoundModalProps {
  visible: boolean;
  onClose: () => void;
}

interface SoundConfig {
  [key in SoundType]: string; // 改为字符串，可以存储文件名或路径标识
}

const CustomSoundModal: React.FC<CustomSoundModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);
  const isSound = useSudokuStore(state => state.isSound);
  const styles = createStyles(isDark);

  // 动画值
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const [modalVisible, setModalVisible] = useState(false);

  // 二级弹窗状态
  const [soundSelectVisible, setSoundSelectVisible] = useState(false);
  const [currentSelectingType, setCurrentSelectingType] = useState<SoundType | null>(null);

  // 默认声音配置
  const defaultSoundConfig: SoundConfig = {
    error: 'default',
    success: 'default',
    switch: 'default',
    success2: 'default',
    success3: 'default',
  };

  // 保存的音效配置（从 AsyncStorage 读取的真实配置）
  const [savedSoundConfig, setSavedSoundConfig] = useState<SoundConfig>(defaultSoundConfig);
  // 当前临时的音效配置（用户在弹窗中的选择，未保存）
  const [soundConfig, setSoundConfig] = useState<SoundConfig>(defaultSoundConfig);

  // 声音类型的显示名称
  const soundTypeNames = {
    switch: t('switchSound'),
    success: t('successSound'),
    success2: t('successSound2'),
    error: t('errorSound'),
    success3: t('gameCompleteSound'),
  };

  // 处理弹窗显示/隐藏的动画
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      // 重置动画值
      scaleAnim.setValue(0.3);
      opacityAnim.setValue(0);
      translateYAnim.setValue(50);

      // 显示动画 - 使用弹性动画
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // 隐藏动画 - 快速但平滑
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 30,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, scaleAnim, opacityAnim, translateYAnim]);

  // 加载保存的声音配置
  useEffect(() => {
    const loadSoundConfig = async () => {
      const savedConfig = await AsyncStorage.getItem('customSoundConfig');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setSavedSoundConfig(config);
        setSoundConfig(config);
      } else {
        // 如果没有保存的配置，使用默认配置
        setSavedSoundConfig(defaultSoundConfig);
        setSoundConfig(defaultSoundConfig);
      }
    };
    loadSoundConfig();
  }, []);

  // 当弹窗显示时，重置临时配置为保存的配置
  useEffect(() => {
    if (visible) {
      setSoundConfig(savedSoundConfig);
    }
  }, [visible, savedSoundConfig]);

  // 关闭弹窗的处理函数
  const handleClose = useCallback(() => {
    // 关闭时重置临时配置为保存的配置
    setSoundConfig(savedSoundConfig);
    onClose();
  }, [onClose, savedSoundConfig]);

  // 保存声音配置
  const saveSoundConfig = useCallback(async () => {
    await AsyncStorage.setItem('customSoundConfig', JSON.stringify(soundConfig));
    // 更新保存的配置状态
    setSavedSoundConfig(soundConfig);
    // 直接关闭弹窗，不显示提示
    onClose();
  }, [soundConfig, onClose]);

  // 重置为默认配置
  const resetToDefault = useCallback(() => {
    Alert.alert(t('confirm'), t('resetSoundSettingsConfirm'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('confirm'),
        onPress: () => {
          setSoundConfig(defaultSoundConfig);
        },
      },
    ]);
  }, [t]);

  // 更改声音配置 - 改为显示二级弹窗
  const changeSoundForType = useCallback(
    (soundType: SoundType) => {
      if (customSounds[soundType] && Object.keys(customSounds[soundType]).length > 0) {
        setCurrentSelectingType(soundType);
        setSoundSelectVisible(true);
      } else {
        // 如果没有自定义音效，保持原有逻辑
        const options = Object.keys(soundOptions) as (keyof typeof soundOptions)[];
        const currentIndex = options.indexOf(soundConfig[soundType] as keyof typeof soundOptions);
        const nextIndex = (currentIndex + 1) % options.length;
        const nextOption = options[nextIndex];

        setSoundConfig(prev => ({
          ...prev,
          [soundType]: nextOption,
        }));
      }
    },
    [soundConfig]
  );

  // 选择自定义音效
  const selectCustomSound = useCallback(
    (soundName: string) => {
      if (currentSelectingType) {
        setSoundConfig(prev => ({
          ...prev,
          [currentSelectingType]: soundName,
        }));
      }
      setSoundSelectVisible(false);
      setCurrentSelectingType(null);
    },
    [currentSelectingType]
  );

  // 播放试听 - 支持自定义音效
  const previewSound = useCallback(
    (soundType: SoundType, customSoundName?: string) => {
      if (isSound) {
        // 如果没有传递自定义音效名称，使用当前配置的音效
        const soundToPlay = customSoundName || soundConfig[soundType];
        
        if (soundToPlay && soundToPlay !== 'default' && customSounds[soundType][soundToPlay]) {
          // 播放自定义音效
          playCustomSound(customSounds[soundType][soundToPlay]);
        } else {
          // 播放默认音效
          playSound(soundType, true);
        }
      }
    },
    [isSound, soundConfig]
  );

  // 获取当前音效显示名称
  const getCurrentSoundName = useCallback(
    (soundType: SoundType) => {
      const current = soundConfig[soundType];
      if (current === 'default') {
        return t('default');
      }
      // 使用getSoundDisplayName来获取翻译后的名称
      const soundNameMap: { [key: string]: string } = {
        '音效1': t('sound1'),
        '音效2': t('sound2'),
        '音效3': t('sound3'),
        '音效4': t('sound4'),
        '音效5': t('sound5'),
        '音效6': t('sound6'),
        '音效7': t('sound7'),
        '音效8': t('sound8'),
      };
      
      return soundNameMap[current] || current;
    },
    [soundConfig, t]
  );

  // 在CustomSoundModal组件中添加音效名称映射函数
  const getSoundDisplayName = useCallback(
    (soundName: string) => {
      // 音效名称映射
      const soundNameMap: { [key: string]: string } = {
        '音效1': t('sound1'),
        '音效2': t('sound2'),
        '音效3': t('sound3'),
        '音效4': t('sound4'),
        '音效5': t('sound5'),
        '音效6': t('sound6'),
        '音效7': t('sound7'),
        '音效8': t('sound8'),
      };
      
      return soundNameMap[soundName] || soundName;
    },
    [t]
  );

  // 渲染声音选择弹窗
  const renderSoundSelectModal = () => {
    if (!currentSelectingType || !customSounds[currentSelectingType]) return null;

    const options = customSounds[currentSelectingType];
    const currentSelected = soundConfig[currentSelectingType];

    return (
      <Modal
        visible={soundSelectVisible}
        transparent={true}
        onRequestClose={() => setSoundSelectVisible(false)}
      >
        <View style={styles.selectOverlay}>
          <View style={styles.selectModal}>
            <View style={styles.selectHeader}>
              <Text style={styles.selectTitle}>
                {t('selectSound')} - {soundTypeNames[currentSelectingType]}
              </Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setSoundSelectVisible(false)}
              >
                <Image source={require('../assets/icon/close.png')} style={styles.closeIcon} />
              </Pressable>
            </View>

            <ScrollView style={styles.selectContent}>
              {/* 默认选项 */}
              <Pressable
                style={[
                  styles.soundSelectOption,
                  currentSelected === 'default' && styles.selectedOption,
                ]}
                onPress={() => selectCustomSound('default')}
              >
                <Text style={styles.soundSelectText}>{t('default')}</Text>
                <Pressable
                  style={styles.previewButton}
                  onPress={() => previewSound(currentSelectingType, 'default')}
                >
                  <Image source={require('../assets/icon/sound.png')} style={styles.playIcon} />
                </Pressable>
              </Pressable>

              {/* 自定义音效选项 */}
              {Object.keys(options).map((soundName) => (
                <Pressable
                  key={soundName}
                  style={[
                    styles.soundSelectOption,
                    currentSelected === soundName && styles.selectedOption,
                  ]}
                  onPress={() => selectCustomSound(soundName)}
                >
                  <Text style={styles.soundSelectText}>{getSoundDisplayName(soundName)}</Text>
                  <Pressable
                    style={styles.previewButton}
                    onPress={() => previewSound(currentSelectingType, soundName)}
                  >
                    <Image source={require('../assets/icon/sound.png')} style={styles.playIcon} />
                  </Pressable>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // 渲染声音选项行
  const renderSoundOption = (soundType: SoundType) => {
    return (
      <View key={soundType} style={styles.soundOption}>
        <View style={styles.soundInfo}>
          <Text style={styles.soundTypeText}>{soundTypeNames[soundType]}</Text>
          <Text style={styles.currentSoundText}>
            {t('currentSound')}: {getCurrentSoundName(soundType)}
          </Text>
        </View>

        <View style={styles.soundControls}>
          <Pressable style={styles.playButton} onPress={() => previewSound(soundType)}>
            <Image source={require('../assets/icon/sound.png')} style={styles.playIcon} />
          </Pressable>

          <Pressable style={styles.changeButton} onPress={() => changeSoundForType(soundType)}>
            <Text style={styles.changeButtonText}>{t('change')}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={modalVisible} transparent={true} onRequestClose={handleClose}>
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <Pressable style={styles.overlayTouchable} onPress={handleClose} />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{t('customSound')}</Text>
            <Pressable style={styles.closeButton} onPress={handleClose}>
              <Image source={require('../assets/icon/close.png')} style={styles.closeIcon} />
            </Pressable>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>{t('customSoundDescription')}</Text>

            {(Object.keys(soundTypeNames) as SoundType[]).map(renderSoundOption)}
          </ScrollView>

          <View style={styles.footer}>
            <Pressable style={styles.resetButton} onPress={resetToDefault}>
              <Text style={styles.resetButtonText}>{t('resetToDefault')}</Text>
            </Pressable>

            <Pressable style={styles.saveButton} onPress={saveSoundConfig}>
              <Text style={styles.saveButtonText}>{t('save')}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>

      {/* 二级弹窗 */}
      {renderSoundSelectModal()}
    </Modal>
  );
};

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayTouchable: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    modalContainer: {
      width: '90%',
      maxHeight: '80%',
      backgroundColor: isDark ? 'rgb(32, 31, 33)' : '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.35,
      shadowRadius: 25,
      elevation: 15,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgb(47, 47, 49)' : '#f0f0f0',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? 'rgb(148,148,150)' : '#333',
    },
    closeButton: {
      padding: 5,
    },
    closeIcon: {
      width: 20,
      height: 20,
      tintColor: isDark ? 'rgb(148,148,150)' : '#666',
    },
    content: {
      padding: 20,
      maxHeight: 400,
    },
    description: {
      fontSize: 14,
      color: isDark ? 'rgb(148,148,150)' : '#666',
      marginBottom: 20,
      lineHeight: 20,
    },
    soundOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgb(47, 47, 49)' : '#f0f0f0',
    },
    soundInfo: {
      flex: 1,
    },
    soundTypeText: {
      fontSize: 16,
      fontWeight: '500',
      color: isDark ? 'rgb(148,148,150)' : '#333',
      marginBottom: 4,
    },
    currentSoundText: {
      fontSize: 12,
      color: isDark ? 'rgb(148,148,150)' : '#666',
    },
    soundControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playButton: {
      padding: 8,
      marginRight: 10,
      borderRadius: 6,
      backgroundColor: isDark ? 'rgba(39, 60, 95, 0.3)' : 'rgba(91,139,241,0.1)',
    },
    playIcon: {
      width: 16,
      height: 16,
      tintColor: isDark ? 'rgb(148,148,150)' : 'rgb(91,139,241)',
    },
    changeButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: isDark ? 'rgba(39, 60, 95, 0.3)' : 'rgba(91,139,241,0.1)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(39, 60, 95, 0.6)' : 'rgba(91,139,241,0.3)',
    },
    changeButtonText: {
      fontSize: 12,
      color: isDark ? 'rgb(148,148,150)' : 'rgb(91,139,241)',
      fontWeight: '500',
    },
    footer: {
      flexDirection: 'row',
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgb(47, 47, 49)' : '#f0f0f0',
    },
    resetButton: {
      flex: 1,
      paddingVertical: 12,
      marginRight: 10,
      borderRadius: 6,
      backgroundColor: isDark ? 'rgba(47, 47, 49, 0.5)' : '#f0f0f0',
      alignItems: 'center',
    },
    resetButtonText: {
      fontSize: 16,
      color: isDark ? 'rgb(148,148,150)' : '#666',
      fontWeight: '500',
    },
    saveButton: {
      flex: 1,
      paddingVertical: 12,
      marginLeft: 10,
      borderRadius: 6,
      backgroundColor: isDark ? 'rgb(39, 60, 95)' : 'rgb(91,139,241)',
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    // 二级弹窗样式
    selectOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectModal: {
      width: '85%',
      maxHeight: '70%',
      backgroundColor: isDark ? 'rgb(32, 31, 33)' : '#fff',
      borderRadius: 12,
      overflow: 'hidden',
    },
    selectHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgb(47, 47, 49)' : '#f0f0f0',
    },
    selectTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? 'rgb(148,148,150)' : '#333',
      flex: 1,
    },
    selectContent: {
      maxHeight: 300,
    },
    soundSelectOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgb(47, 47, 49)' : '#f0f0f0',
    },
    selectedOption: {
      backgroundColor: isDark ? 'rgba(39, 60, 95, 0.3)' : 'rgba(91,139,241,0.1)',
    },
    soundSelectText: {
      fontSize: 16,
      color: isDark ? 'rgb(148,148,150)' : '#333',
      flex: 1,
    },
    previewButton: {
      padding: 8,
      borderRadius: 6,
      backgroundColor: isDark ? 'rgba(39, 60, 95, 0.3)' : 'rgba(91,139,241,0.1)',
    },
  });

export default CustomSoundModal;
