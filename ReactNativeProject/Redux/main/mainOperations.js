import firebase from "../../firebase/config";
import { mainSlice } from "./mainReducer";

import { getFirestore } from "firebase/firestore";
import { collection, getDocs,orderBy } from "firebase/firestore";

const { setPostsList } = mainSlice.actions;

export const getPosts = () => async (dispatch) => {
  const base = getFirestore(firebase);
  try {
    let list = [];
    const querySnapshot = await getDocs(collection(base, "posts"), orderBy("createdDate", "desc"));
    querySnapshot.forEach((doc) => {
    list.push({ ...doc.data(), postId: doc.id });
    
    });
    dispatch(setPostsList(list));
  } catch (error) {
    console.log(error);
  }
};