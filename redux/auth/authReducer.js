import { createSlice } from "@reduxjs/toolkit";
import {
  authSignUpUser,
  authSignInUser,
  refresh,
  signout,
} from "./authOperations";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickname: null,
    email: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        authSignUpUser.fulfilled,
        (state, { payload }) => (state = payload)
      )
      .addCase(
        authSignInUser.fulfilled,
        (state, { payload }) => (state = payload)
      )
    //   .addCase(refresh.fulfilled, (state, { payload }) => (state = payload))
    //   .addCase(signout.fulfilled, (state) => (state = initialState))
    //   .addCase(refresh.rejected, (state) => (state = initialState));
  },
});
