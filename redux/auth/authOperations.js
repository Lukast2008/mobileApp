// import db from "../../firebase/config";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   updateProfile,
//   signInWithEmailAndPassword,
//   getAuth,
// } from "firebase/auth";


// const auth = getAuth();



// export const authSignUpUser = createAsyncThunk(
//   "auth/signup",
//   async ({ email, password, nickname }) => {
//     try {
//       const user = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(auth.currentUser, { displayName: nickname });
//       const { uid, displayName } = auth.currentUser;
//       return { userId: uid, name: displayName, email };
//     } catch (error) {
//       alert(error.code);
//       console.log("error.message", error.message);
//     }
//   }
// );

// export const authSignInUser = createAsyncThunk(
//   "auth/signin",
//   async ({ email, password }) => {
//     try {
//       const user = await signInWithEmailAndPassword(auth, email, password);
//       const { uid, displayName } = auth.currentUser;
//       return { userId: uid, name: displayName, email };
//     } catch (error) {
//       alert("Invalid email or password");
//       console.log("error.message", error.message);
//     }
//   }
// );

// export const authSignOutUser = createAsyncThunk(
//   "auth/signout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const userData = await fetchDataFromServer();

//       return userData;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

import { auth } from "../../firebase/config";
import { signIn } from "./authReducer";

import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const { authSignOut, authStateChange, updateUserProfile } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, { displayName: nickname });
      const { displayName, uid } = auth.currentUser;

      const userUpdateProfile = {
        nickname: displayName,
        userId: uid,
      };
      console.log("displayName", displayName);
      console.log("uid", uid);

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const { displayName, uid } = userCredential.user;

          dispatch(signIn({ nickname: displayName, userId: uid }));
        }
      );
      dispatch(authStateChange({ stateChange: true }));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authStateCahngeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        nickname: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};
