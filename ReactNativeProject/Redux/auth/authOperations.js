import auth from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserInfo, userSignOut,authStateChange } = authSlice.actions;

export const authSignIn = (email, password) => async (dispatch, getState) => {
  console.log("LOGIN ", email, password);
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    // console.log(user);
    dispatch(
      updateUserInfo({
        userID: user.uid,
        email: user.email,
        nickname: user.displayName,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const authSignUp = (email, password, nickname) => async (dispatch, getState) => {
    console.log("REG ", email, password);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const updated = await updateProfile(auth.currentUser, {
        displayName: nickname,
      });
      dispatch(
        updateUserInfo({
          userID: user.uid,
          email: user.email,
          nickname: nickname,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  try {
    const response = await signOut(auth);
    dispatch(userSignOut());
  } catch (error) {
    console.log(error);
  }
};

export const authStateChanged = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserInfo({
            userID: user.uid,
            email: user.email,
            nickname: user.displayName,
          })
        );
       
      } else {
       dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log(error);
  }
};