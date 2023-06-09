
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import "firebase/auth";
// import "firebase/storage";
// import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4G4IdYpxDWsFkY4QRgt3qG_GByjY41Zo",
  authDomain: "reactnativeproject-f10a9.firebaseapp.com",
  projectId: "reactnativeproject-f10a9",
  storageBucket: "reactnativeproject-f10a9.appspot.com",
  messagingSenderId: "181881893924",
  appId: "1:181881893924:web:53d4a1f7cfab51687e14b1"
};

const app = firebase.initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// export default auth;