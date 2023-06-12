import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import {collection,getFirestore, doc, getDocs, query,} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {useNavigation}   from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/main/mainOperations";
import firebase from "../../firebase/config";

export default function PostsScreen({ route }) {
  const { posts } = useSelector((state) => state.main);
  const { email, nickname, photoURL } = useSelector((state) => state.auth);
  const [commentsCount, setCommentsCount] = useState({})
  const navigation = useNavigation();
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(getPosts());
   }, []);
  
  
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

 return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarwrapper}>
          <Image source={{ uri: photoURL }} style={styles.avatar} />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: 700, fontSize: 13 }}>{nickname}</Text>
          <Text style={{ fontWeight: 400, fontSize: 11 }}>{email}</Text>
        </View>
      </View>

      <FlatList
        style={{ marginTop: 15, width: "100%" }}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width: "100%" }}>
            <Image source={{ uri: item.photoURL }} style={styles.image} />
            <View style={{ width: "100%" }}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.infowrapper}>
              <View style={{gap: 27,flexDirection: "row", alignItems: "center", }} >
               <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.navigate('Comments', {item}) }>
                  <Feather name="message-circle" size={24} color={commentsCount[item.postId] > 0 ? "#FF6C00" : "#BDBDBD"} />
                </TouchableOpacity>
                 <Text style={{ marginLeft: 9,  }}>{commentsCount[item.postId] || 0}
                 </Text>
               </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }} >
                <TouchableOpacity onPress={() =>navigation.navigate("Map", { lat: item.latitude, lon: item.longitude,})}>
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={{ textDecorationLine: "underline" }}>
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
        )}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    columnGap: 8,
  },
  avatarwrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    color: "#212121",
    fontSize: 16,
    fontWeight: 500,
  },
  infowrapper: {
    width: "100%",
    flex: 1,
    marginTop: 11,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});