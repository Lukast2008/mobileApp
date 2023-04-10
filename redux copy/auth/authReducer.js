import { createSlice } from "@reduxjs/toolkit";
import {
  authSignUpUser,
  authSignInUser,
  refresh,
  authSignOutUser,
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
      .addCase(authSignOutUser.fulfilled, 
        (state) => (state = initialState));

      // .addCase(refresh.fulfilled, (state, { payload }) => (state = payload))
      
    // .addCase(refresh.rejected, (state) => (state = initialState));
  },
});
