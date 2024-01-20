import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

interface ISoundData {
  preview: string;
  title_short: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
    cover_small: string;
  };
}

const soundController = {
  fnController: {},
  play: async () => {
    const soundCurrent = await soundController.getSoundCurrent();

    if (soundController.fnController != undefined) {
      soundController.pause();
    }

    if (soundCurrent == null) {
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: soundCurrent.preview,
      });

      await sound.playAsync();
      soundController.fnController = sound;
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  },
  pause: async () => {
    try {
      await soundController.fnController.pauseAsync();
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  },
  setSoundCurrent: async (soundData: ISoundData, play = false) => {
    const storage = await AsyncStorage.setItem(
      `SoundCurrent`,
      JSON.stringify(soundData)
    );

    if (play) {
      soundController.play();
    }

    return storage;
  },
  getSoundCurrent: async (): Promise<ISoundData> => {
    const item = await AsyncStorage.getItem(`SoundCurrent`);
    return JSON.parse(item as string);
  },
  getStatusAsync: async () => {
    return await soundController.fnController.getStatusAsync();
  },
};

export { soundController };
