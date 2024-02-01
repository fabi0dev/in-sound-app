import { createSlice } from "@reduxjs/toolkit";
interface ITrack {
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
  sound: ITrack;
}

const initialState = {
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
};

export const slice = createSlice({
  name: "music",
  initialState,
  reducers: {
    playPause(state, { payload }: { payload: boolean }) {
      return { ...state, playing: payload };
    },
    changeMusic(state, { payload }) {
      return { ...state, sound: payload, playing: true };
    },
    cleanPlayer() {
      return initialState;
    },
  },
});

export const { playPause, changeMusic, cleanPlayer } = slice.actions;
export default slice.reducer;
export const selectPlayerBottom = (state: { music: MusicState }) => state.music;
