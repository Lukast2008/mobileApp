import db from "../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

const auth = getAuth();

export const authSignUpUser = createAsyncThunk(
  "auth/signup",

  async ({ email, password, nickname }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: nickname });
      const { uid, displayName } = auth.currentUser;
      return { userId: uid, name: displayName, email };
    } catch (error) {
      alert(error.code);
      console.log("error.message", error.message);
    }
  }
);

export const authSignInUser = createAsyncThunk(
  "auth/signin",
  async ({ email, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log("user returned from signInUser function > > > ", user);
      const { uid, displayName } = auth.currentUser;
      return { userId: uid, name: displayName, email };
    } catch (error) {
      alert("Invalid email or password");
      console.log("error.message", error.message);
    }
  }
);

// export const authSignOutUser = createAsyncThunk(
//   "user/fetchUserData",
//   async (_, { rejectWithValue }) => {
//     try {
//       const userData = await fetchDataFromServer();

//       return userData;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
