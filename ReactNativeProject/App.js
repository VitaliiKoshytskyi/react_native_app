import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './Screens/Auth/LoginScreen';
import RegistrationScreen from './Screens/Auth/RegistrationScreen';
// import PostsScreen from './Screens/Main/PostsScreen';
// import CreatePostsScreen from './Screens/Main/CreatePostsScreen';
// import ProfileScreen from './Screens/Main/ProfileScreen';
import HomeScreen from './Screens/Main/Home';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return <AuthStack.Navigator initialRouteName="Login">
           <AuthStack.Screen options={{headerShown:false}} name="Registration" component={RegistrationScreen} />
           <AuthStack.Screen  options={{headerShown:false}} name="Login" component={LoginScreen} />
       </AuthStack.Navigator> 
  }
  return  <MainTab.Navigator>
         <MainTab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
       </MainTab.Navigator>
}

export default function App() {

const routing = useRoute({})

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
      {routing}
     </NavigationContainer>

  )
}


