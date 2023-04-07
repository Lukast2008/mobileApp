import react, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import Home from "../Screens/Home";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
// import ProfileScreen from "./ProfileScreen";
// import MapScreen from "./MapScreen";
// import CreatePostsScreen from "./CreatePostsScreen";

import { SimpleLineIcons, Fontisto, Feather } from "@expo/vector-icons";
import {useSelector} from 'react-redux';

import { StyleSheet, View } from "react-native";

export const Router = () => {
  const [isAuth, setIsAuth] = useState(false);
  const user = useSelector((state) => state.auth);
  
  return (
    <Stack.Navigator>
      {!user.userId ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CreatePosts"
            component={CreatePostsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CommentsScreen"
            component={CommentsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="MapScreen"
            component={MapScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
  //   }
};

const styles = StyleSheet.create({
  activeScreen: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
