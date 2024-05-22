import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeSlice } from "../../models/HomeSlice";

const initialState: HomeSlice = {
  // isBannerVisible: !(
  //   localStorage.getItem("banner-popup-showed") !== null &&
  //   localStorage.getItem("banner-popup-showed") !== "true"
  // ),
  isBannerVisible: false,
  isDarkMode: false,
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
  },
});

export const { updateBanner, updateDarkMode } = homeSlice.actions;
export default homeSlice.reducer;
