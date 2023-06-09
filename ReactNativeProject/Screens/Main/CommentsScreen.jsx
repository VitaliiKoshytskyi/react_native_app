import { View, Text, StyleSheet, Image } from "react-native";

export default function CommentsScreen({ route }) {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", paddingHorizontal: 16 }}>
      <View style={{ paddingTop: 32, paddingBottom: 32 }}>
        <Image
          source={{ uri: route.params.photo.photo }}
          style={{
            width: "100%",
            height: 240,
            backgroundColor: "#E8E8E8",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
       
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor:"#fff"
  },
});