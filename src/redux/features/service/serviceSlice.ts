// src/store/slices/favoriteServiceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TService = {
  image: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type FavoriteServiceState = {
  favorites: TService[];
};

const initialState: FavoriteServiceState = {
  favorites: [],
};

const favoriteServiceSlice = createSlice({
  name: 'favoriteServices',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<TService>) => {
      const serviceExists = state.favorites.some(
        (service) => service._id === action.payload._id
      );
      if (!serviceExists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (service) => service._id !== action.payload
      );
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoriteServiceSlice.actions;
export default favoriteServiceSlice.reducer;

// Selector to get all favorite services
export const getAllFavoriteServices = (state: RootState) =>
  state.favoriteServices.favorites;
