import {StyleSheet,Text,View,ImageBackground,Pressable,Image,FlatList,TouchableOpacity} from "react-native";
import {collection,getFirestore,doc,getDocs,query,} from "firebase/firestore";
import {  Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useState,useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { updateUserAvatar } from "../../Redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../firebase/config";
import LogOut from '../../Components/Logout'

export default function ProfileScreen() {
  const [commentsCount, setCommentsCount] = useState({})
  const { userID, nickname, photoURL } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.main);
  const myPosts = posts.filter((item) => item.userID === userID);
  
  const navigation = useNavigation();
  const dispatch = useDispatch()
  
  useEffect(() => {
  posts.forEach((post) => {
    getCommentsCount(post.postId);
  });
}, [posts]);
  
const getCommentsCount = async (postId) => {
  const base = getFirestore(firebase);
  const postRef = doc(base, "posts", postId);
  const commentsCollectionRef = collection(postRef, "comments");
  const commentsQuery = query(commentsCollectionRef);
  const snapshot = await getDocs(commentsQuery);
  const commentsCount = snapshot.size;

  setCommentsCount((prevCounts) => ({
    ...prevCounts,
    [postId]: commentsCount,
  }));
};

  
  const uploadPhotoToServer = async (photoURL) => {
    const storage = getStorage(firebase);
    const filename = photoURL.substring(photoURL.lastIndexOf("/") + 1);
    const photo = await fetch(photoURL);
    const blob = await photo.blob();
    const storageRef = ref(storage, "avatars/" + filename);
    try {
      await uploadBytes(storageRef, blob);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log(error);
    }
  }; 

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
      if (!result.canceled) {
      const photo = await uploadPhotoToServer(result.assets[0].uri);
      await dispatch(updateUserAvatar(photo));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",}}>
      <ImageBackground source={require("../../assets/images/Photo.png")} style={styles.background}>
        <View style={styles.topform}>
          <View style={styles.uploadwrapper}>
          </View>
                <View style={styles.uploadwrapper}>
                 <View style={styles.upload}>
                  <Image style={styles.upload} source={{ uri: photoURL }} />
                    <Pressable onPress={pick} style={styles.addicon}>
                      <AntDesign name="pluscircleo" size={25}  />
                    </Pressable>
                  </View>
                </View>
          <View style={styles.titlewrapper}>
            <Text style={styles.title}>{nickname}</Text>
          </View>
          <View style={styles.logout}>
            <LogOut />
          </View>
          <FlatList
            style={{ marginTop: 15, width: "100%" }}
            data={myPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ width: "100%", marginTop: 25 }}>
                <View style={{ width: "100%" }}>
                  <Image source={{ uri: item.photoURL }} style={styles.foto} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.box} >
                  <View style={{ gap: 27,  flexDirection: "row",  alignItems: "center", }}>
                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => navigation.navigate('Comments', {item,})}>
                   <Feather name="message-circle" size={24} color={commentsCount[item.postId] > 0 ? '#FF6C00' : '#BDBDBD'}/>
                   </TouchableOpacity>
                  <Text style={{ marginLeft: 9 }}>{commentsCount[item.postId] || 0}
                      </Text>
                    </View>
                    <View style={{gap: 9, flexDirection: "row", alignItems: "center", }}>
                      <Feather name="thumbs-up" size={24} color="#FF6C00" />
                      <Text> {commentsCount[item.postId] || 0}</Text>
                    </View>
                  </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                 <TouchableOpacity onPress={() => navigation.navigate('Map', { lat: item.latitude,lon: item.longitude,})}>
                   <Feather style={styles.pin} name="map-pin" size={24} color="#BDBDBD"/>
                 </TouchableOpacity>
                  <Text style={{ textDecorationLine: 'underline' }}> {item.location}
                  </Text>
                  </View>
                </View>
              </View>
            )}
          ></FlatList>
        </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  background: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
    addicon: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  topform: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 325,
  },
  box: {
     width: "100%",
     justifyContent: "space-between",
     marginTop: 11,
     flexDirection: "row",
    },
  foto: {
     width: "100%",
     backgroundColor: "#E8E8E8",
     height: 240,
     alignItems: "center",
     justifyContent: "center",
    },
    borderRadius: 8,
  uploadwrapper: {
    marginTop: -60,
    marginBottom: 32,
  },
  upload: {
    width: 120,
    height: 120,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addicon: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  titlewrapper: {
    alignItems: "center",

  },
  title: {
    fontSize: 30,
    fontWeight: 500,
  },
  logout: {
    position: "absolute",
    top: 22,
    right: 0,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  name: {
    marginTop: 8,
    color: "#212121",
    fontSize: 16,
    fontWeight: 500,
  },
});