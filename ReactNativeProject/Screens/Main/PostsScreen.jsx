import { View, Text, StyleSheet, Image,FlatList } from "react-native";
import user from "../../assets/images/user.png";
import { useState, useEffect } from "react";

export default function PostsScreen({ route }) {
  const [posts,setPosts] = useState([])
  console.log(route.params)

  useEffect(() => {
    if (route.params) {
      setPosts(prevState =>[...prevState,route.params])
    }
  }, [route.params])
  
console.log('posts',posts)

  return (
      <View style={styles.container}>
                <View style={styles.postsWrapper}>
                    <View style={styles.userWrapper}>
                        <Image source={user}></Image>
                        <View style={styles.userInfo}>
                            <Text>Natali Romanova</Text>
                            <Text>email@example.com</Text>
                        </View>
                    </View>
                    <View>
          <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <View><Image source={{ uri: item.photo }} style={ {width:300,height:200}} /></View>} />
                    </View>
                </View>
            </View>
  );
}


const styles = StyleSheet.create({
     container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    postsWrapper: {
        paddingHorizontal: 16,
    },
    userWrapper: {
        flexDirection: "row",
        paddingTop: 32,
    },
    userInfo: {
        justifyContent: "center",
        paddingLeft: 8,
    },
})