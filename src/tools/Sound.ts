import Sound from 'react-native-sound';
import errorSound from '../assets/audio/error.wav';
import successSound from '../assets/audio/success.wav';
import switchSound from '../assets/audio/switch.wav';
import eraseSound from '../assets/audio/erase.wav';
import successSound2 from '../assets/audio/success2.wav';
import successSound3 from '../assets/audio/success3.wav';

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
  successSoundsRef3: { current: [] }
};

const createSound = (path: unknown): Promise<Sound> => {
  return new Promise((resolve, reject) => {
    // 使用 require 方式加载的资源会返回一个数字 ID
    const sound = new Sound(path as number, (error) => {
      if (error) { 
        console.error('音效加载失败:', {
          path,
          errorCode: error.code,
          errorMessage: error.message,
          errorDomain: error.domain
        });
        // 释放可能部分创建的音频资源
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

export const initSounds = async () => {
  soundRefs.errorSoundsRef.current = await Promise.all(
    Array(3).fill(0).map(() => createSound(errorSound))
  );
  soundRefs.successSoundsRef.current = await Promise.all(
    Array(3).fill(0).map(() => createSound(successSound))
  );
  soundRefs.switchSoundsRef.current = await Promise.all(
    Array(3).fill(0).map(() => createSound(switchSound))
  );
  soundRefs.eraseSoundsRef.current = await Promise.all(
    Array(3).fill(0).map(() => createSound(eraseSound))
  );
  soundRefs.successSoundsRef2.current = await Promise.all(
    Array(3).fill(0).map(() => createSound(successSound2))
  );
  soundRefs.successSoundsRef3.current = await Promise.all(
    Array(1).fill(0).map(() => createSound(successSound3))
  );
};

export const playSound = (type: SoundType, isSound: boolean) => {
  if (!isSound) {
    return;
  }
  const soundRefMap = {
    error: soundRefs.errorSoundsRef,
    success: soundRefs.successSoundsRef,
    switch: soundRefs.switchSoundsRef,
    erase: soundRefs.eraseSoundsRef,
    success2: soundRefs.successSoundsRef2,
    success3: soundRefs.successSoundsRef3
  };

  const soundsRef = soundRefMap[type];
  const sounds = soundsRef?.current;

  if (!sounds?.length) {
    return;
  }

  const availableSound = sounds.find(
    sound => sound?.isPlaying?.() === false,
  );
  if (!availableSound) {
    return;
  }

  availableSound.play(success => {
    !success && console.log('播放音频失败:', availableSound.isPlaying());
  });
};
