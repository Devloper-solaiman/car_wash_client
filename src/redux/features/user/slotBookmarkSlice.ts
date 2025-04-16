// src/store/slices/slotBookmarkSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TSlotBookmark = {
  serviceId: string;
  slotId: string;
  serviceName: string;
  serviceImage: string;
  duration: number;
  price: number;
  startTime: string;
  endTime: string;
};

type SlotBookmarkState = {
  bookmarks: TSlotBookmark[];
};

const initialState: SlotBookmarkState = {
  bookmarks: [],
};

const slotBookmarkSlice = createSlice({
  name: "slotBookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<TSlotBookmark>) => {
      const bookmarkExists = state.bookmarks.some(
        (bookmark) => bookmark.slotId === action.payload.slotId
      );
      if (!bookmarkExists) {
        state.bookmarks.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.slotId !== action.payload
      );
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
    },
  },
});

export const { addBookmark, removeBookmark, clearBookmarks } =
  slotBookmarkSlice.actions;
export default slotBookmarkSlice.reducer;

export const getAllSlotBooking = (state: RootState) =>
  state.slotBookmarks.bookmarks;
