import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import errorSound from '../assets/audio/error.wav';
import successSound from '../assets/audio/success.wav';
import switchSound from '../assets/audio/switch.wav';
import eraseSound from '../assets/audio/erase.wav';
import successSound2 from '../assets/audio/success2.wav';
import successSound3 from '../assets/audio/success3.wav';

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
  erase: {}, // 擦除音效暂时没有对应文件夹，保持原有默认音效
};

// 不要在启动时立即设置音频类别
// Sound.setActive(true);
// Sound.setCategory('Ambient');

interface SoundRefs {
  errorSoundsRef: React.MutableRefObject<Sound[]>;
  successSoundsRef: React.MutableRefObject<Sound[]>;
  switchSoundsRef: React.MutableRefObject<Sound[]>;
  eraseSoundsRef: React.MutableRefObject<Sound[]>;
  successSoundsRef2: React.MutableRefObject<Sound[]>;
  successSoundsRef3: React.MutableRefObject<Sound[]>;
}

type SoundType = 'error' | 'success' | 'switch' | 'erase' | 'success2' | 'success3';

const soundRefs: SoundRefs = {
  errorSoundsRef: { current: [] },
  successSoundsRef: { current: [] },
  switchSoundsRef: { current: [] },
  eraseSoundsRef: { current: [] },
  successSoundsRef2: { current: [] },
  successSoundsRef3: { current: [] },
};

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

// 按需创建音效的函数
const createSoundsForType = async (type: SoundType) => {
  const soundMap = {
    error: { ref: soundRefs.errorSoundsRef, asset: errorSound, count: 3 },
    success: { ref: soundRefs.successSoundsRef, asset: successSound, count: 3 },
    switch: { ref: soundRefs.switchSoundsRef, asset: switchSound, count: 3 },
    erase: { ref: soundRefs.eraseSoundsRef, asset: eraseSound, count: 3 },
    success2: { ref: soundRefs.successSoundsRef2, asset: successSound2, count: 3 },
    success3: { ref: soundRefs.successSoundsRef3, asset: successSound3, count: 1 },
  };

  const config = soundMap[type];
  if (!config || config.ref.current.length > 0) {
    return; // 已经创建过了
  }

  try {
    config.ref.current = await Promise.all(
      Array(config.count)
        .fill(0)
        .map(() => createSound(config.asset))
    );
  } catch (error) {
    console.error(`创建 ${type} 音效失败:`, error);
  }
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
  
  // 如果有自定义配置且不是默认音效，播放自定义音效
  if (soundConfig && soundConfig[type] && soundConfig[type] !== 'default') {
    const customSoundName = soundConfig[type];
    const customSoundAsset = customSounds[type][customSoundName];
    
    if (customSoundAsset) {
      await playCustomSound(customSoundAsset);
      return;
    }
  }

  // 否则播放默认音效
  const soundRefMap = {
    error: soundRefs.errorSoundsRef,
    success: soundRefs.successSoundsRef,
    switch: soundRefs.switchSoundsRef,
    erase: soundRefs.eraseSoundsRef,
    success2: soundRefs.successSoundsRef2,
    success3: soundRefs.successSoundsRef3,
  };

  const soundsRef = soundRefMap[type];
  
  // 如果音效还没有创建，先创建它们
  if (!soundsRef?.current?.length) {
    await createSoundsForType(type);
  }

  const sounds = soundsRef?.current;

  if (!sounds?.length) {
    return;
  }

  const availableSound = sounds.find(sound => sound?.isPlaying?.() === false);
  if (!availableSound) {
    return;
  }

  availableSound.play(success => {
    !success && console.log('播放音频失败:', availableSound.isPlaying());
  });
};
