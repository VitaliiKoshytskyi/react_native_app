import { StyleSheet,TouchableOpacity  } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import LogOut from "../../Components/Logout";

const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
   const navigation = useNavigation();
 
    
  return (
    <Tabs.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: {   alignItems: "center",   paddingHorizontal: 60, }, }}>
      <Tabs.Screen name="PostsScreen" component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: 'center',
          headerRight: LogOut,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />),}}/>

      <Tabs.Screen name="CreatePostsScreen" component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: 'center',
          tabBarButton: () => (
            <TouchableOpacity style={styles.inner}
              onPress={() => navigation.navigate("CreatePostsScreen")}>
              <AntDesign name="plus" size={15} color="white" />
            </TouchableOpacity>),}} />
      <Tabs.Screen name="ProfileScreen" component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />),}} />
    </Tabs.Navigator>
  
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  inner: {
    alignSelf: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
  }
})