import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './Screens/Auth/LoginScreen';
import RegistrationScreen from './Screens/Auth/RegistrationScreen';
import { NavigationContainer } from '@react-navigation/native';

const AuthStack = createStackNavigator()

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
     <NavigationContainer>
       <AuthStack.Navigator initialRouteName="Login">
           <AuthStack.Screen options={{headerShown:false}} name="Registration" component={RegistrationScreen} />
           <AuthStack.Screen  options={{headerShown:false}} name="Login" component={LoginScreen} />
       </AuthStack.Navigator>
     </NavigationContainer>

  )
}


