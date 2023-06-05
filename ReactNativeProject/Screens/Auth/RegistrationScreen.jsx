import {Text,View,StyleSheet,ImageBackground,useWindowDimensions,TouchableOpacity,Keyboard,TouchableWithoutFeedback,Platform,KeyboardAvoidingView,} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import bkgImage from "../../assets/images/Photo.png"


export default function RegistrationScreen() {
   const navigation = useNavigation();
   const { height } = useWindowDimensions();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const onSubmit = () => {
        setName("");
        setEmail("");
        setPassword("");
        console.log({ name, email, password });
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
                <View style={styles.profilePhoto}>
                  <View style={styles.icon}>
                    <AntDesign name="pluscircleo" size={25} color="#FF6C00"/>
                  </View>
                </View>
                <Text style={styles.text}>Реєстрація</Text>
                <View style={styles.form}>
                   <Input placeholder="Логін" inputMode="text"  value={name} setValue={setName}/>
                   <Input placeholder="Адреса електронної пошти" inputMode="email" value={email} setValue={setEmail} />
                   <Input placeholder="Пароль" inputMode="text" secureTextEntry={!isPasswordVisible} value={password} setValue={setPassword} />
                  <TouchableOpacity style={styles.hideBtn} onPress={togglePasswordVisibility}>
                    <Text style={styles.hideText}>{isPasswordVisible ? 'Приховати' : 'Показати'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.box}>
             <Button text="Зареєстуватися" onPress={onSubmit}/>
            <Text  onPress={() => navigation.navigate("Login")} style={styles.loginText}>Вже є акаунт? Увійти</Text>
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
  icon: {
    position: "absolute",
    top: "65%",
    left: "90%",
  },
  registraionOuterBox: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  text: {
    marginTop: 92,
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