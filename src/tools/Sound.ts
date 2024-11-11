import Sound from 'react-native-sound';
import errorSound from '../assets/audio/error.wav';
import successSound from '../assets/audio/success.wav';
import switchSound from '../assets/audio/switch.wav';
import eraseSound from '../assets/audio/erase.wav';
import successSound2 from '../assets/audio/success2.wav';
import successSound3 from '../assets/audio/success3.wav';

interface SoundRefs {
  errorSoundsRef: React.RefObject<Sound[]>;
  successSoundsRef: React.RefObject<Sound[]>;
  switchSoundsRef: React.RefObject<Sound[]>;
  eraseSoundsRef: React.RefObject<Sound[]>;
  successSoundsRef2: React.RefObject<Sound[]>;
  successSoundsRef3: React.RefObject<Sound[]>;
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
    const sound = new Sound(path, error => {
      if (error) {
        console.log('加载音效失败:', error);
        reject(error);
      } else {
        sound.setVolume(1.0);
        sound.setNumberOfLoops(0);
        resolve(sound);
      }
    });
  });
};

const initSounds = async () => {
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

// 初始化音效
initSounds();

export const playSound = (type: SoundType) => {
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
    console.log('音效还未加载完成');
    return;
  }

  const availableSound = sounds.find(
    sound => sound?.isPlaying?.() === false,
  );
  if (!availableSound) {
    console.log(
      '没有可用的音效实例,当前正在播放的实例数:',
      sounds.filter(s => s?.isPlaying()).length,
    );
    return;
  }

  availableSound.play(success => {
    !success && console.log('播放音频失败:', availableSound.isPlaying());
  });
};
