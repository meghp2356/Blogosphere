import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.userStatus = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.userStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
