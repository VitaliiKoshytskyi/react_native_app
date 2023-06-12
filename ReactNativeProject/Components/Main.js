import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authStateChangeUser, } from "../Redux/auth/authOperations";

import CommentsScreen from '../Screens/Main/CommentsScreen'
import Home from "../Screens/Main/Home";
import MapScreen from '../Screens/Main/MapScreen'
import CreatePostsScreen from "../Screens/Main/CreatePostsScreen";
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";

const useRoute = (isAuth) => {
  const AuthStack = createStackNavigator();
  const MainStack = createStackNavigator();

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Login" children={(render = () => <LoginScreen />)} options={{   headerShown: false, }}/>
        <AuthStack.Screen  name="Registration"  children={(render = () => <RegistrationScreen />)}  options={{ headerShown: false }} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={Home} options={{ headerShown: false,}}/>
          <MainStack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
          <MainStack.Screen name="Comments" component={CommentsScreen}  options={{ title: "Коментарі", headerTitleAlign: "center", }}/>
          <MainStack.Screen name="CreatePostsScreen" component={CreatePostsScreen} options={{ title: "Створити публікацію", headerTitleAlign: "center", }}
      ></MainStack.Screen>
    </MainStack.Navigator>
  );
};

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const routing = useRoute(stateChange);

 useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  return <NavigationContainer>{routing}</NavigationContainer>;
};