import { createSlice } from "@reduxjs/toolkit";

interface IPlaylist {
  id: string;
  title: string;
  tracks: {
    data: Array<{
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
    }>;
  };
}

export const slice = createSlice({
  name: "playlist",
  initialState: {
    id: "",
    title: "",
    tracks: {
      data: [],
    },
  },
  reducers: {
    changePlaylist(state, { payload }) {
      return payload;
    },
  },
});

export default slice.reducer;
export const { changePlaylist } = slice.actions;
export const selectPlaylist = (state: { playlist: IPlaylist }) =>
  state.playlist;
