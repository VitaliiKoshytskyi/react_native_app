import { getAuth } from "firebase/auth";
import firebase from '../../firebase/config'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserInfo, userSignOut, authStateChange,updateAvatar } = authSlice.actions;
const auth = getAuth(firebase);

export const authSignIn = (email, password) => async (dispatch, getState) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(
      updateUserInfo({
        userID: user.uid,
        email: user.email,
        nickname: user.displayName,
        photoURL:user.photoURL,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const authSignUp = (email, password, nickname,photoURL) => async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
       await updateProfile(auth.currentUser, {
         displayName: nickname,
         photoURL:photoURL,
      });
      dispatch(
        updateUserInfo({
          userID: user.uid,
          email: user.email,
          nickname: nickname,
          photoURL:photoURL,
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

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = auth.currentUser;
        const userUpdateProfile = {
          nickName: displayName,
          userID: uid,
          photoURL: photoURL,
          email: email,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserInfo(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log('Error occurred:', error);
  }
};

export const updateUserAvatar = (newPhotoURL) => async (dispatch) => {
  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: newPhotoURL,
      });
      const { photoURL } = auth.currentUser;
      dispatch(updateAvatar({ photoURL: photoURL }));
    } catch (error) {
      dispatch(authError(error.message));
    }
  }
};