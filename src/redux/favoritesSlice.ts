import { createSlice } from "@reduxjs/toolkit";

interface ITrack {
  id: number;
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

interface IFavorites {
  tracks: Array<ITrack>;
}

export const slice = createSlice({
  name: "favorites",
  initialState: {
    tracks: {
      data: [],
    },
  },
  reducers: {
    addTrack(state, { payload }) {
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
    removeTrack(state, { payload }) {
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
    clear(state) {
      return {
        ...state,
        tracks: {
          data: [],
        },
      };
    },
  },
});

export default slice.reducer;
export const { addTrack, clear, removeTrack } = slice.actions;
export const selectFavorites = (state: { favorites: IFavorites }) =>
  state.favorites;
