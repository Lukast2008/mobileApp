import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiNZGCUOupz3OODA1Cje82jsVU_hZnb2c",

  authDomain: "socialapp-d8ca3.firebaseapp.com",

  projectId: "socialapp-d8ca3",

  storageBucket: "socialapp-d8ca3.appspot.com",

  messagingSenderId: "414781206398",

  appId: "1:414781206398:web:d8e84f7c8f9cd8be95cd2f",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, auth, storage };
