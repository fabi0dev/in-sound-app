import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { helpers } from "./Helpers";

interface ISoundData {
  id: string;
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
  uri: "",
  setUri: (uri: string) => {
    soundController.uri = uri;
  },
  play: async (uri: string = "") => {
    if (uri !== "") {
      soundController.uri = uri;
    }

    if (soundController.uri == "") {
      return;
    }

    if (soundController.fnController?.unloadAsync != undefined) {
      await soundController.fnController?.pauseAsync();
      await soundController.fnController?.unloadAsync();
    }

    try {
      const playSound = await Audio.Sound.createAsync({
        uri: soundController.uri,
      });

      await playSound.sound.playAsync();
      soundController.fnController = playSound.sound;
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
    try {
      return await soundController.fnController.getStatusAsync();
    } catch (e) {}
  },
};

export { soundController };
