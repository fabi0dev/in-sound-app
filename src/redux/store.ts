import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import musicSlice from "./playerBottomSlice";
import playlistSlice from "./playlistSlice";
import favoritesSlice from "./favoritesSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  safelist: ["music", "playlist", "favorite"],
};

const reducers = combineReducers({
  music: musicSlice,
  playlist: playlistSlice,
  favorites: favoritesSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      /*  serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }, */
    }),
});

const persistor = persistStore(store);

export { store, persistor };
