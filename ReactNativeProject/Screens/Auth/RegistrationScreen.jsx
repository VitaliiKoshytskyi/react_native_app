import {Text,View,StyleSheet,ImageBackground,Pressable,useWindowDimensions,TouchableOpacity,Keyboard,TouchableWithoutFeedback,Platform,KeyboardAvoidingView,Image,ActivityIndicator} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { authSignUp } from "../../Redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../firebase/config";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import bkgImage from "../../assets/images/Photo.png"


const initialState = {
  nickname: '',
  email: '',
  password:'',
}

export default function RegistrationScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [data, setData] = useState(initialState);
  const [state, setState] = useState("");
  const [image, setImage] = useState(null);
  
  const uploadPhotoToServer = async () => {
    const storage = getStorage(firebase);
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const photo = await fetch(image);
    const blob = await photo.blob();
    const storageRef = ref(storage, "avatars/" + filename);
    try {
      setState(`loading`);
      await uploadBytes(storageRef, blob);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
   const URL = await uploadPhotoToServer();
    dispatch(authSignUp(data.email, data.password, data.nickname, URL));
    setState("");
    };
  
   const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
         <ImageBackground style={(styles.image, { height })} source={bkgImage}>
          <KeyboardAvoidingView style={styles.innerBox} behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style={styles.registraionBox}>
              <View style={styles.registraionOuterBox}>
                 {image ? (<View style={styles.uploadwrapper}>
                  <View style={styles.upload}>
                  <Image style={styles.upload} source={{ uri: image }} />
                  <Pressable onPress={() => setImage(null)} style={styles.addicon}>
                    <AntDesign name="closecircleo" size={25} color="#FF6C00" />
                    </Pressable>
                    </View>
                </View>
              ) : (
                <View style={styles.uploadwrapper}>
                  <View style={styles.upload}>
                    <Pressable onPress={pick} style={styles.addicon}>
                      <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                    </Pressable>
                  </View>
                </View>
              )}
                <Text style={styles.text}>Реєстрація</Text>
                <View style={styles.form}>
                   <Input placeholder="Логін" inputMode="text"  value={data.nickname} onChangeText={(value) =>
                  setData((prev) => ({ ...prev, nickname: value }))
                }/>
                   <Input placeholder="Адреса електронної пошти" inputMode="email" value={data.email} onChangeText={(value) =>
                  setData((prev) => ({ ...prev, email: value }))
                } />
                   <Input placeholder="Пароль" inputMode="text" secureTextEntry={!isPasswordVisible} value={data.password} onChangeText={(value) =>
                  setData((prev) => ({ ...prev, password: value }))
                } />
                  <TouchableOpacity style={styles.hideBtn} onPress={togglePasswordVisibility}>
                    <Text style={styles.hideText}>{isPasswordVisible ? 'Приховати' : 'Показати'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.box}>
            <Button text="Зареєстуватися" onPress={()=>{dispatch(onSubmit)}} />
            <Text style={styles.loginText}> Вже є акаунт? 
              <Text onPress={() => navigation.navigate("Login")} style={styles.loginText}> Увійти</Text>
              </Text>
          </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerBox: {
    flex: 1,
  },
  uploadwrapper: {
      
    marginTop: -60,
      marginBottom: 32,
      alignItems: "center",
   
  },
   addicon: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  removeicon: {
    position: "absolute",
    right: "32%",
    bottom:15,
   },
  upload: {
    width: 120,
    height: 120,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  input: {
    minWidth: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontFamily: "Roboto-regular",
    fontSize: 16,
  },
  hideBtn: {
    position: "absolute",
    right: 26,
    bottom: 31,
  },
  hideText: {
    color: "#1B4371",
    fontFamily: "Roboto-regular",
    fontSize: 16,
  },
  registraionBox: {
    flex: 1,
    justifyContent: "flex-end",
  },
  profilePhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -60,
    marginTop: -60,
  },

  registraionOuterBox: {
    position:"relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  text: {
    
    marginBottom: 33,
    fontFamily: "Roboto-regular",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
  },
  btn: {
    width: 343,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-regular",
    fontSize: 16,
  },
  form: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  box: {
    backgroundColor: "#fff",
    alignItems: "center",
  },

  loginText: {
    marginBottom: 45,
    color: "#1B4371",
    fontFamily: "Roboto-regular",
    fontSize: 16,
    lineHeight: 19,
  },
});
