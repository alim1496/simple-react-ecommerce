import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeSlice } from "../../models/HomeSlice";

const initialState: HomeSlice = {
  isBannerVisible: localStorage.getItem("isBannerVisibleClosed") === "true" ? false : true,
  isDarkMode: false,
  isLoading: false,
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    updateBanner: (state, action: PayloadAction<boolean>) => {
      return { ...state, isBannerVisible: action.payload };
    },
    updateDarkMode: (state, action: PayloadAction<boolean>) => {
      return { ...state, isDarkMode: action.payload };
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { updateBanner, updateDarkMode, updateLoading } =
  homeSlice.actions;
export default homeSlice.reducer;
