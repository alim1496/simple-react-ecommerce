import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeSlice } from "../../models/HomeSlice";

const initialState: HomeSlice = {
  isBannerVisible: true,
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    updateBanner: (state, action: PayloadAction<boolean>) => {
      return { ...state, isBannerVisible: action.payload };
    },
  },
});

export const { updateBanner } = homeSlice.actions;
export default homeSlice.reducer;
