// import react from "react";

// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();

// import LoginScreen from "./LoginScreen";
// import RegistrationScreen from "./RegistrationScreen";
// // import Home from "./Screens/Home";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
// import MapScreen from "./MapScreen";
import CreatePostsScreen from "./CreatePostsScreen";

import { SimpleLineIcons, Fontisto, Feather } from "@expo/vector-icons";

import { StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 83, paddingBottom: 30 },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="grid" size={24} color="#BDBDBD" />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePostScreen"
        component={CreatePostsScreen}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('CreatePosts');
          },
        })}

        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={styles.activeScreen}>
              <Fontisto name="plus-a" size={24} color="#fff" />
            </View>
          ),
          // tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color="#BDBDBD" />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

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
