import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/auth/authSlice';
import SlotBookmarkReducer from './features/user/slotBookmarkSlice';
import FavoriteServiceReducer from './features/service/serviceSlice'; // Import favoriteServiceSlice
import { baseApi } from './api/baseApi';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const slotBookmarkPersistConfig = {
  key: 'slotBookmarks',
  storage,
};

const favoriteServicePersistConfig = {
  key: 'favoriteServices',
  storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer);
const persistedSlotBookmarkReducer = persistReducer(
  slotBookmarkPersistConfig,
  SlotBookmarkReducer
);
const persistedFavoriteServiceReducer = persistReducer(
  favoriteServicePersistConfig,
  FavoriteServiceReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    slotBookmarks: persistedSlotBookmarkReducer,
    favoriteServices: persistedFavoriteServiceReducer, // Add the persisted favorite services reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
