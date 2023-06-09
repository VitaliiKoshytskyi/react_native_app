import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: null,
  nickname: null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, { payload }) => ({
      ...state,
      userID: payload.userID,
      email: payload.email,
      nickname: payload.nickname,
    }),
    userSignOut: () => initialState,
  },
});