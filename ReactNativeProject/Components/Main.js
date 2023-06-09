import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import CreatePostsScreen from "../Screens/Main/CreatePostsScreen";
import Home from "../Screens/Main/Home";
import CommentsScreen from '../Screens/Main/CommentsScreen'
import MapScreen from '../Screens/Main/MapScreen'
import { useEffect } from "react";

const useRoute = (userID) => {
  const AuthStack = createStackNavigator();
  const MainStack = createStackNavigator();

  if (!userID) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          children={(render = () => <LoginScreen />)}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Registration"
          children={(render = () => <RegistrationScreen />)}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
          />
          <MainStack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
          <MainStack.Screen name="Comments" component={CommentsScreen} options={{headerShown:false}}/>
      <MainStack.Screen
        name="CreatePostsScreen"
        options={{ title: "Створити публікацію" }}
        component={CreatePostsScreen}
      ></MainStack.Screen>
    </MainStack.Navigator>
  );
};

export const Main = () => {
  const userID = useSelector((state) => state.auth.userID);

  useEffect(() => {}, [userID]);

  const routing = useRoute(userID);

  return <NavigationContainer>{routing}</NavigationContainer>;
};