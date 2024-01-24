import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./playerBottomSlice";

export default configureStore({
  reducer: {
    music: musicSlice,
  },
});
