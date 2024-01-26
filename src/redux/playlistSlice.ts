import { createSlice } from "@reduxjs/toolkit";

interface ITrack {
  id: string;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
  preview: string;
}
interface IPlaylist {
  id: string;
  title: string;
  tracks: {
    data: Array<Itrack>;
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
export const selectPlaylist = (state: { playlist: IPlaylist }) =>
  state.playlist;
