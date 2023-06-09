// // Your web app's Firebase configuration
// import * as firebase from "firebase";
// import "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyA4G4IdYpxDWsFkY4QRgt3qG_GByjY41Zo",
//   authDomain: "reactnativeproject-f10a9.firebaseapp.com",
//   projectId: "reactnativeproject-f10a9",
//   storageBucket: "reactnativeproject-f10a9.appspot.com",
//   messagingSenderId: "181881893924",
//   appId: "1:181881893924:web:53d4a1f7cfab51687e14b1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default firebase





// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4G4IdYpxDWsFkY4QRgt3qG_GByjY41Zo",
  authDomain: "reactnativeproject-f10a9.firebaseapp.com",
  projectId: "reactnativeproject-f10a9",
  storageBucket: "reactnativeproject-f10a9.appspot.com",
  messagingSenderId: "181881893924",
  appId: "1:181881893924:web:53d4a1f7cfab51687e14b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
