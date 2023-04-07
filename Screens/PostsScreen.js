import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CommentsScreen from "./CommentsScreen";

export default function PostsScreen({ navigation, route }) {
  const [postData, setPostData] = useState([]);

  const viewComments = () => {
    navigation.navigate("CommentsScreen");
  };

  useEffect(() => {
    if (route.params) {
      setPostData((prevState) => [...prevState, route.params.post]);
    }
  }, [route.params]);

  console.log(postData);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Публікації</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
          style={styles.logout}
        >
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.publishField}>
        <Image style={styles.avatarImage} />
        <View style={styles.textField}>
          <Text>Natali</Text>
          <Text>Email</Text>
        </View>
      </View>

      <FlatList
        data={postData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postField}>
            <Image style={styles.imagePost} source={{ uri: item.photoUri }} />
            <Text>{item.namePost}</Text>
            <View style={styles.postInfo}>
              <View style={styles.commentsCount}>
                <TouchableOpacity onPress={() => viewComments(item.photoUri)}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
                <Text style={styles.comments}>0</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("MapScreen")}
              >
                <AntDesign
                  style={styles.iconEnviromento}
                  name="enviromento"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>

              <Text>{item.location}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Roboto-Medium",
    marginTop: 20,
  },
  logout: {
    position: "absolute",
    top: 20,
    right: 20,
    marginTop: 20,
  },
  publishField: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 32,
    alignItems: "center",
    marginBottom: 32,
  },
  buttonBoard: {
    flexDirection: "row",
    height: 83,
    borderTopWidth: 2,
    justifyContent: "space-around",
    borderColor: "#E8E8E8",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  activeScreen: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    borderRadius: 20,
    // alignItems: "center",
    justifyContent: "center",
  },
  gridIcon: {
    height: 24,
    width: 24,
  },
  unionIcon: {
    height: 13,
    width: 13,
  },
  userIcon: { height: 24, width: 24 },
  avatarImage: {
    width: 60,
    height: 60,
    backgroundColor: "#111",
    borderRadius: 16,
  },
  textField: {
    marginLeft: 8,
  },
  postField: {
    paddingHorizontal: 16,
  },
  imagePost: {
    height: 240,
    width: "100%",
    backgroundColor: "#111",

    borderRadius: 8,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:34,
  },
  commentsCount: {
    flexDirection: "row",
  },
  comments: {
    fontSize: 16,
    marginLeft: 9,
    color: "#BDBDBD",
  },
});
