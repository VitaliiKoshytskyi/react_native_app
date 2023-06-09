import db from "../../firebase/config"
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    getAuth
} from 'firebase/auth';
import { auth } from '../../firebase/config';


export const authSignUp = async ({ email, password }) => {
    try {
      console.log("register",email,password)
   const user = await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

//  export const authSignUp = ({email,password,name}) => async (dispatch, getState) => {
//     try {
//         const user = await db.auth().createUserWithEmailAndPassword(email,password);
//         console.log("user", user)
//         console.log("EMAIL/PASS/NAME",email,password,name)
//     } catch (error) {
//         console.log("error", error);
//         console.log("error.message",error.message)
//     }
//  };
export const authSignIn = ({email,password}) => async (dispatch, getState) => {
      try {
      console.log("login",email,password)
          const user = await signInWithEmailAndPassword(auth, email, password);
          console.log("user",user)
  } catch (error) {
    throw error;
  }
};
  




export const authSignOut = () => async (dispatch, getState) => { };

