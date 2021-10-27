import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage";

const firebaseConfiguration = {
  apiKey: "AIzaSyBpgMncf5SyUkTb5AlDzoIKlyAeqHVJkfo",
  authDomain: "filolinko.firebaseapp.com",
  projectId: "filolinko",
  storageBucket: "filolinko.appspot.com",
  messagingSenderId: "282219652398",
  appId: "1:282219652398:web:6e6aacd607421ac02e46bf",
};

export const firebaseInstance = initializeApp(firebaseConfiguration);

export const authInstance = getAuth(firebaseInstance);
export const fireStoreInstance = getFirestore(firebaseInstance);
export const storage = getStorage(firebaseInstance);
