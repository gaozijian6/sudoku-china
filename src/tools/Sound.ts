import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 自定义音效文件映射
const customSounds = {
  switch: {
    default: require('../assets/audio/音效/切换音效/default.wav'),
    音效1: require('../assets/audio/音效/切换音效/音效1.wav'),
    音效2: require('../assets/audio/音效/切换音效/音效2.mp3'),
    音效3: require('../assets/audio/音效/切换音效/音效3.mp3'),
    音效4: require('../assets/audio/音效/切换音效/音效4.wav'),
    音效5: require('../assets/audio/音效/切换音效/音效5.wav'),
    音效6: require('../assets/audio/音效/切换音效/音效6.wav'),
    音效7: require('../assets/audio/音效/切换音效/音效7.mp3'),
    音效8: require('../assets/audio/音效/切换音效/音效8.mp3'),
  },
  success: {
    default: require('../assets/audio/音效/成功音效1/default.wav'),
    音效1: require('../assets/audio/音效/成功音效1/音效1.wav'),
    音效2: require('../assets/audio/音效/成功音效1/音效2.mp3'),
    音效3: require('../assets/audio/音效/成功音效1/音效3.mp3'),
    音效4: require('../assets/audio/音效/成功音效1/音效4.mp3'),
    音效5: require('../assets/audio/音效/成功音效1/音效5.mp3'),
  },
  success2: {
    default: require('../assets/audio/音效/成功音效2/default.wav'),
    音效1: require('../assets/audio/音效/成功音效2/音效1.wav'),
    音效2: require('../assets/audio/音效/成功音效2/音效2.mp3'),
    音效3: require('../assets/audio/音效/成功音效2/音效3.mp3'),
    音效4: require('../assets/audio/音效/成功音效2/音效4.mp3'),
    音效5: require('../assets/audio/音效/成功音效2/音效5.mp3'),
  },
  success3: {
    default: require('../assets/audio/音效/通关音效/default.wav'),
    音效2: require('../assets/audio/音效/通关音效/音效2.mp3'),
    音效3: require('../assets/audio/音效/通关音效/音效3.mp3'),
    音效4: require('../assets/audio/音效/通关音效/音效4.wav'),
    音效5: require('../assets/audio/音效/通关音效/音效5.mp3'),
  },
  error: {
    default: require('../assets/audio/音效/错误音效/default.wav'),
    音效1: require('../assets/audio/音效/错误音效/音效1.mp3'),
    音效2: require('../assets/audio/音效/错误音效/音效2.mp3'),
  },
  erase: {
    default: require('../assets/audio/音效/擦除音效/default.wav'),
  },
};

type SoundType = 'error' | 'success' | 'switch' | 'erase' | 'success2' | 'success3';

// 添加一个标志来跟踪是否已经初始化
let isAudioInitialized = false;

const initializeAudioOnFirstUse = () => {
  if (!isAudioInitialized) {
    // 只在第一次播放音效时设置音频类别
    Sound.setCategory('Ambient', false); // 第二个参数设为 false
    Sound.setActive(true);
    isAudioInitialized = true;
  }
};

const createSound = (path: unknown): Promise<Sound> => {
  return new Promise((resolve, reject) => {
    const sound = new Sound(path as number, error => {
      if (error) {
        console.error('音效加载失败:', {
          path,
          errorCode: error.code,
          errorMessage: error.message,
          errorDomain: error.domain,
        });
        if (sound && typeof sound.release === 'function') {
          sound.release();
        }
        reject(error);
      } else {
        sound.setVolume(1.0);
        sound.setNumberOfLoops(0);
        resolve(sound);
      }
    });
  });
};

// 获取用户的自定义音效配置
const getSoundConfig = async () => {
  try {
    const savedConfig = await AsyncStorage.getItem('customSoundConfig');
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
  } catch (error) {
    console.error('读取音效配置失败:', error);
  }
  return null;
};

// 修改初始化函数，改为按需加载
export const initSounds = async () => {
  // 不在这里初始化音频类别，改为在播放时初始化
  // 这个函数可以为空，或者用来预加载音效（可选）
};

// 播放自定义音效
export const playCustomSound = async (soundAsset: any) => {
  // 在第一次播放时初始化音频
  initializeAudioOnFirstUse();

  try {
    const sound = await createSound(soundAsset);
    sound.play(success => {
      if (success) {
        sound.release(); // 播放完毕后释放资源
      } else {
        console.log('播放自定义音频失败');
        sound.release();
      }
    });
  } catch (error) {
    console.error('创建自定义音效失败:', error);
  }
};

// 修改主要的 playSound 函数，支持自定义音效
export const playSound = async (type: SoundType, isSound: boolean) => {
  if (!isSound) {
    return;
  }

  // 在第一次播放时初始化音频
  initializeAudioOnFirstUse();

  // 获取用户的自定义音效配置
  const soundConfig = await getSoundConfig();

  // 确定要播放的音效
  let soundToPlay = 'default'; // 默认使用default

  if (soundConfig && soundConfig[type]) {
    soundToPlay = soundConfig[type];
  }

  // 播放自定义音效（包括default）
  const customSoundAsset = customSounds[type][soundToPlay];
  if (customSoundAsset) {
    await playCustomSound(customSoundAsset);
    return;
  }

  // 兜底：如果找不到指定音效，播放default
  if (customSounds[type]['default']) {
    await playCustomSound(customSounds[type]['default']);
  }
};
