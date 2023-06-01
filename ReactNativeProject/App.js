import {ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import bkgImage from "./assets/images/Photo.png"
import { StatusBar } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './Screens/LoginScreen';


export default function App() {

  const [fontLoaded] = useFonts({
    "Roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-bolt": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }
   return (
     <>
       <ImageBackground source={bkgImage} style={styles.image}>
          {/* <RegistrationScreen /> */}
        <LoginScreen />
       </ImageBackground>
     </>
      
      
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent:'center'
  }
});
