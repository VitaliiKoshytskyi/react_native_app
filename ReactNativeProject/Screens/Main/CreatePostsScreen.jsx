import { View, Text, StyleSheet } from "react-native";
// import Arrow from '../../Components/Arrow'

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <Text>CreatePostsScreen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
     container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
  },
})