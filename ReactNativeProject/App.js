import 'react-native-gesture-handler';
// import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useState, useEffect } from "react";
// import { Provider, useSelector } from 'react-redux';
// import {store} from './Redux/store'

// import LoginScreen from './Screens/Auth/LoginScreen';
// import RegistrationScreen from './Screens/Auth/RegistrationScreen';
// import HomeScreen from './Screens/Main/Home';
// import CommentsScreen from './Screens/Main/CommentsScreen'
// import MapScreen from './Screens/Main/MapScreen'

import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Main } from "./Components/Main";


// const useRoute = (userID) => {
//   const AuthStack = createStackNavigator();
// const MainTab = createStackNavigator();
//   if (!userID) {
//     return (
//       <AuthStack.Navigator initialRouteName="Login">
//         <AuthStack.Screen options={{ headerShown: false }} name="Registration">
//           {() => <RegistrationScreen setLoginStatus={setLoginStatus} />}
//         </AuthStack.Screen>
//         <AuthStack.Screen options={{ headerShown: false }} name="Login">
//           {() => <LoginScreen setLoginStatus={setLoginStatus} />}
//         </AuthStack.Screen>
//       </AuthStack.Navigator>
//     );
//   }
//   return  <MainTab.Navigator>
//     <MainTab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//     <MainTab.Screen name="Comments" component={CommentsScreen} options={{ headerShown: false }} />
//     <MainTab.Screen name="Map" component={MapScreen} options={{headerShown:false}}/>
//        </MainTab.Navigator>
// }

export default function App() {
  // const userID = useSelector((state) => state.auth.userID);
  // useEffect(() => { }, [userID]);


  //  const [user, setUser] = useState(null);
  


  // const unsubscribe = auth.onAuthStateChanged((user) => {
  //     // console.log("USER",user)
  //    setUser(user)
  //   });
  // db.auth().onAuthStateChanged((user)=>setUser(user))


// const routing = useRoute(userID)

  const [fontLoaded] = useFonts({
    "Roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-bolt": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }
   return (
     <Provider store={store}>
       
     <Main/>
       
     </Provider>

  )
}


