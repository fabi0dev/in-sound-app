import { createSlice } from "@reduxjs/toolkit";
interface ISound {
  id: number;
  preview: string;
  title_short: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
  };
}

interface MusicState {
  playing: boolean;
  sound: ISound;
}

export const slice = createSlice({
  name: "music",
  initialState: {
    playing: false,
    sound: {
      id: "",
      preview: "",
      title_short: "",
      artist: {
        name: "",
      },
      album: {
        title: "",
        cover_small: "",
        cover_medium: "",
        cover_big: "",
      },
    },
  },
  reducers: {
    playPause(state, { payload }: { payload: boolean }) {
      return { ...state, playing: payload };
    },
    changeMusic(state, { payload }) {
      return { ...state, sound: payload, playing: true };
    },
  },
});

export const { playPause, changeMusic } = slice.actions;
export default slice.reducer;
export const selectPlayerBottom = (state: { music: MusicState }) => state.music;
