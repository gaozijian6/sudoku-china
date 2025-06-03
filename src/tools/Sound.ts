import Sound from 'react-native-sound';
import errorSound from '../assets/audio/error.wav';
import successSound from '../assets/audio/success.wav';
import switchSound from '../assets/audio/switch.wav';
import eraseSound from '../assets/audio/erase.wav';
import successSound2 from '../assets/audio/success2.wav';
import successSound3 from '../assets/audio/success3.wav';

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

export const playSound = async (type: SoundType, isSound: boolean) => {
  if (!isSound) {
    return;
  }

  // 在第一次播放时初始化音频
  initializeAudioOnFirstUse();

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
