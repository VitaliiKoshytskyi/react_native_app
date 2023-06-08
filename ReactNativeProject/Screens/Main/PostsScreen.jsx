import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import user from "../../assets/images/user.png";
import { useState, useEffect } from "react";

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);
  console.log(route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts", posts);

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
        <View style={styles.postsBox}>
          <FlatList
            style={styles.list}
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.photo }} style={styles.image} />
              </View>
            )}
          />
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
    paddingBottom: 32,
  },
  userInfo: {
    justifyContent: "center",
    paddingLeft: 8,
  },
  postsBox: {},
  list: {},
  imageContainer: {
    height: 240,
    width: "100%",
    // paddingTop: 32,
    borderRadius: 8,
    marginBottom: 91,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 8,
  },
});
