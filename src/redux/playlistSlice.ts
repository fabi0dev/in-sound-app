import { createSlice } from "@reduxjs/toolkit";

interface ITrack {
  id: number;
  title: string;
  title_short: string;
  artist: {
    name: string;
    picture_medium: string;
    picture_big: string;
  };
  album: {
    title: string;
    cover_medium: string;
    cover_small: string;
  };
  preview: string;
}
interface IPlaylist {
  id: number;
  title: string;
  tracks: {
    data: Array<ITrack>;
  };
}

const initialState = {
  id: "",
  title: "",
  tracks: {
    data: [],
  },
};

export const slice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    changePlaylist(state, { payload }) {
      return payload;
    },
    addTrackInPlaylist(state, { payload }) {
      const isAdd = state.tracks.data.filter(
        (item: ITrack) => item.id == payload.id
      );

      if (isAdd.length > 0) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        tracks: {
          data: [...state.tracks.data, payload as never],
        },
      };
    },
    removeTrackPlaylist(state, { payload }) {
      const data = state.tracks.data.filter(
        (item: ITrack) => item.id != payload.id
      );

      return {
        ...state,
        tracks: {
          data,
        },
      };
    },
    cleanPlaylist() {
      return initialState;
    },
  },
});

export default slice.reducer;
export const {
  changePlaylist,
  addTrackInPlaylist,
  removeTrackPlaylist,
  cleanPlaylist,
} = slice.actions;
export const selectPlaylist = (state: { playlist: IPlaylist }): IPlaylist =>
  state.playlist;
