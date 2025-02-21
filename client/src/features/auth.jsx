import { createSlice } from "@reduxjs/toolkit";
export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    signin: (state, action) => {
      state.value = action.payload;
    },
    signout: (state) => {
      state.value = "";
    },
  },
});

export const { signin, signout } = tokenSlice.actions;
export default tokenSlice.reducer;
