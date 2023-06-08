import { View, Text, StyleSheet, Image } from "react-native";
import user from "../../assets/images/user.png";

export default function PostsScreen({ route }) {
  console.log(route.params)
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