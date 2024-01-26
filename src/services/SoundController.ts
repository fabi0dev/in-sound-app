import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

const soundController = {
  uri: "",
  fnController: <Sound>{},
  setUri: (uri: string) => {
    soundController.uri = uri;
  },
  load: async (uri: string) => {
    soundController.uri = uri;

    if (soundController.fnController?.unloadAsync != undefined) {
      await soundController.fnController?.pauseAsync();
      await soundController.fnController?.unloadAsync();
    }

    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: soundController.uri,
      });

      await sound.playAsync();
      soundController.fnController = sound;
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  },
  play: async () => {
    try {
      if (typeof soundController.fnController.playAsync !== undefined) {
        await soundController.fnController.playAsync();
      }
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  },
  pause: async () => {
    try {
      if (typeof soundController.fnController.pauseAsync !== undefined) {
        await soundController.fnController.pauseAsync();
      }
    } catch (e) {
      console.log(`cannot pause the sound file`, e);
    }
  },
};

export { soundController };
