
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4G4IdYpxDWsFkY4QRgt3qG_GByjY41Zo",
  authDomain: "reactnativeproject-f10a9.firebaseapp.com",
  projectId: "reactnativeproject-f10a9",
  storageBucket: "reactnativeproject-f10a9.appspot.com",
  messagingSenderId: "181881893924",
  appId: "1:181881893924:web:53d4a1f7cfab51687e14b1"
};

export default firebase.initializeApp(firebaseConfig)