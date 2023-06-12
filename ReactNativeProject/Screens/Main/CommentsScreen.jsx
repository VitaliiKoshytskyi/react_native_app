import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, } from "react-native";
import { collection, addDoc, getFirestore, doc, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "../../firebase/config";
import  Input  from "../../Components/Input";
import moment from "moment";

export default function CommentsScreen({ route }) {
  const [data, setData] = useState("");
  const [comments, setComments] = useState([]);
  const [keyboard, setKeyboard] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0)
  const { item } = route.params;
  const { nickname, photoURL } = useSelector((state) => state.auth);

  useEffect(() => {
    getComments();
  }, [route]);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const addComment = async () => {
    const base = getFirestore(firebase);
    const postRef = doc(base, "posts", item.postId);
    const commentsCollectionRef = collection(postRef, "comments");
    await addDoc(commentsCollectionRef, {
      userID: item.userID,
      nickname: nickname,
      photoURL: photoURL,
      comment: data,
      createdAt: serverTimestamp(),
    });
    getComments();
    hideKeyboard();
    setData("");
  };

    const getComments = async () => {
    const base = getFirestore(firebase);
    const postRef = doc(base, "posts", item.postId);
    const commentsCollectionRef = collection(postRef, "comments");
    const commentsQuery = query(commentsCollectionRef, orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const comments = [];
      snapshot.forEach((doc) => {
        comments.push({ ...doc.data() });
      });
      setComments(comments);
      setCommentsCount(comments.length); 
    });
    return unsubscribe;
  };


   return (
    
    <View style={styles.container}>
       <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View>
          <View>
            <Image source={{ uri: item.photoURL }} style={styles.image} />
          </View>
          <View style={styles.infowrapper}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <Text style={{ textDecorationLine: "underline" }}>
                {item.location}
              </Text>
            </View>
          </View>
           </View>
      </TouchableWithoutFeedback>
      <FlatList
        style={{ flex: 1 }}
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{   marginTop: 10, flexDirection: index % 2 === 0 ? "row" : "row-reverse", gap: 15, alignItems: "flex-start", }}>
           <Image source={{ uri: item.photoURL }} style={{ width: 45, height: 45, borderRadius: 45 }} />
           <View style={{flex: 1,backgroundColor: "#F6F6F6",padding: 16, borderRadius: 6,}}>
           <Text style={{ fontSize: 13 }}>{item.nickname}</Text>
           <Text style={{ fontSize: 13 }}>{item.comment}</Text>
           <View style={{ alignItems: "flex-end" }}>
            {item.createdAt && (
                  <Text style={{ fontSize: 11, color: "#BDBDBD" }}> {moment.unix(item.createdAt.seconds).format("MMMM D YYYY | HH:mm")}
                  </Text>)}
              </View>
            </View>
          </View>
        )}/>
        <View style={{ postion: "relative" }}>
        <Input style={styles.input} placeholder="Коментувати..." value={data} onFocus={() => setKeyboard(true)} onChangeText={(value) => setData(value)} ></Input>
        <TouchableOpacity style={styles.send} onPress={addComment}>
          <Feather name="arrow-up" size={24} color="#FFFFFF" />
        </TouchableOpacity>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
   commentCount: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    gap: 16,
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  infowrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    fontSize: 16,
  },
  text: {
    marginTop: 8,
    color: "#212121",
    fontSize: 16,
    fontWeight: 500,
  },
  send: {
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 8,
    right: 8,
  },
});