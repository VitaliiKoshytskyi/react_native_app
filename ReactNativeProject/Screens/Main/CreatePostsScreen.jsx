import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { requestCameraPermissionsAsync } from "expo-camera";
import { useNavigation } from '@react-navigation/native';
initialData = {
  name: "",
  location: "",
};

export default function CreatePostsScreen() {
  const navigation = useNavigation();
  const [cameraPermission, setCameraPermission] = useState(null);
  const [keyboard, setKeyboard] = useState(false);
  const [postData, setPostData] = useState(initialData);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");

      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);
  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboard(false);
  };
  const publish = postData.name && postData.location && image;

  

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <View style={{ flex: 1, width: "100%" }}>
          <View style={styles.uploadwrapper}>
            {image !== null ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Pressable
                style={{
                  marginTop: 8,
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={takePhoto}
              >
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </Pressable>
            )}
          </View>

          <View style={{ width: "100%" }}>
            <Text
              style={{
                marginTop: 8,
                color: "#BDBDBD",
              }}
            >
              Завантажте фото
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Назва"
            value={postData.name}
            onFocus={() => setKeyboard(true)}
            onChangeText={(value) =>
              setPostData((prev) => ({ ...prev, name: value }))
            }
          ></TextInput>
          <View style={{ position: "relative", width: "100%" }}>
            <TextInput
              value={postData.location}
              style={{ ...styles.input, paddingLeft: 28 }}
              placeholder="Місцевість..."
              onFocus={() => setKeyboard(true)}
              onChangeText={(value) =>
                setPostData((prev) => ({ ...prev, location: value }))
              }
            ></TextInput>
            <Feather
              style={styles.pin}
              name="map-pin"
              size={24}
              color="#BDBDBD"
            />
          </View>
          {publish ? (
            <TouchableOpacity
              style={{ ...styles.btn, backgroundColor: "#FF6C00" }}
              onPress={() => {
                navigation.navigate("Home", {
                  screen: "PostsScreen",
                  params: { ...postData, photo: image,  },
                });

              
              }}
            >
              <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
                Опублікувати
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.btn}>
              <Text  style={{ fontSize: 16, color: "#BDBDBD" }}>
                Опублікувати
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              setPostData(initialData);
              setImage(null);
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 34,
    backgroundColor: "#FFFFFF",
  },
  input: {
    height: 50,
    width: "100%",
    padding: 16,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 16,
    fontSize: 16,
  },
  uploadwrapper: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    position: "relative",
  },
  pin: {
    position: "absolute",
    top: 13,
    left: 4,
  },
  btn: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  delete: {
    width: 70,
    backgroundColor: "#F6F6F6",
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
