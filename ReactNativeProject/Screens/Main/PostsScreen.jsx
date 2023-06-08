import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import user from "../../assets/images/user.png";
import { useState, useEffect } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function PostsScreen({ route }) {
  console.log("ROUTE PARAMS",route.params)
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.postsWrapper}>
        <View style={styles.userWrapper}>
          <Image source={user} />
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
                {item && item.photo && (
                  <Image source={{ uri: item.photo }} style={styles.image} />
                )}
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>{item.name}</Text>
                  <View style={styles.iconContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
                      <Feather
                        onPress={() => navigation.navigate('Comments')}
                        name="message-circle"
                        size={24}
                        color="#FF6C00"
                      />
                      <Text>8</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Feather
                        onPress={() => navigation.navigate('Map', { location: route.params.location })}
                        style={styles.pin}
                        name="map-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                      {item && item.place && (
                        <Text style={{ textDecorationLine: "underline" }}>{item.place}</Text>
                      )}
                    </View>
                  </View>
                </View>
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
    borderRadius: 8,
    marginBottom: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 8,
  },
  captionContainer: {
    marginTop: 8,
  },
  captionText: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 16,
    marginTop: 8,
  },
});
