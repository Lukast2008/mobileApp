import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera } from "expo-camera";
import {
  AntDesign,
  MaterialIcons,
  SimpleLineIcons,
  Fontisto,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { Keyboard } from "react-native";
import * as Location from "expo-location";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";

const initialState = {
  namePost: "",
  location: "",
  photoUri: "",
};

export default function CreatePostsScreen({ navigation }) {


  const [cameraRef, setCameraRef] = useState(null); // реф на компонент Camera
  const [photo, setPhoto] = useState(""); // фото, зроблене камерою
  const [post, setPost] = useState(initialState);//
  const [btn, setBtn] = useState(false);
  const [preview, serPreview] = useState(false);
  const { userId, nickname } = useSelector((state) => state.auth);

  const handleTakePhoto = async () => {
    if (!cameraRef) return; // перевірка наявності рефу
    const { uri } = await cameraRef.takePictureAsync(); // зробити фото
    setPhoto(uri); // зберегти фото
    setPost((prevState) => ({ ...prevState, photoUri: uri }));
    serPreview(true);

    const locationPhoto = await Location.getCurrentPositionAsync({});
    // console.log("latitude", locationPhoto.coords.latitude);
    // console.log("longitude", locationPhoto.coords.longitude);
  };

  const navPrevPage = async () => {
    await navigation.navigate("PostsScreen");
  };

  const sendData = () => {
    if (btn) {

      uploadPostToServer();
      navigation.navigate("PostsScreen", { post });
      
    }
  };

  const tryAgain = () => {
    serPreview(false);
    setPost((prevState) => ({ ...prevState, photoUri: "" }));
  };

  useEffect(() => {
    if (
      (post.namePost !== "") &
      (post.location !== "") &
      (post.photoUri !== "")
    ) {
      setBtn(true);
      return;
    }
    setBtn(false);
  }, [post]);

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    console.log({
      // photo,
      location,
      // userId,
      // nickname,
      // state,
      // title,
      // locationName,
    })
    // const createPost = await addDoc(collection(db, "posts"), {
    //   photo,
    //   location,
    //   userId,
    //   login,
    //   state,
    //   title,
    //   locationName,
    // });
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const data = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytesResumable(data, file);
    const downloadPhoto = await getDownloadURL(data);
    return downloadPhoto;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navPrevPage();
            }}
            style={styles.arrowLeft}
          >
            <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Створити публікацію</Text>
        </View>

        <View style={styles.cameraField}>
          <Camera style={styles.camera} ref={setCameraRef}>
            {photo && (
              <View
                style={{ ...styles.photoPreview, opacity: preview ? 1 : 0 }}
              >
                <Image
                  source={{ uri: photo }}
                  style={styles.photoPreviewImage}
                />
                <TouchableOpacity onPress={tryAgain} style={styles.tryAgain}>
                  <AntDesign name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={{
                ...styles.cameraBack,
                backgroundColor: !preview ? "#ffffff30" : "#ffffff00",
              }}
              onPress={() => !preview && handleTakePhoto()}
            >
              {!preview && (
                <MaterialIcons name="camera-alt" size={24} color="#fff" />
              )}
            </TouchableOpacity>
          </Camera>
        </View>
        <View style={styles.loadPhoto}>
          <Text>Завантажити фото</Text>
        </View>

        <View style={styles.inputField}>
          <TextInput
            placeholder={"Назва"}
            style={styles.input}
            onChangeText={(value) =>
              setPost((prevState) => ({ ...prevState, namePost: value }))
            }
          />

          <View>
            <TextInput
              placeholder={"Місцевість"}
              style={{ ...styles.input, paddingLeft: 30 }}
              onChangeText={(value) =>
                setPost((prevState) => ({ ...prevState, location: value }))
              }
            />
            <AntDesign
              style={styles.iconEnviromento}
              name="enviromento"
              size={24}
              color="#BDBDBD"
            />
          </View>

          <TouchableOpacity
            style={{
              ...styles.inputBtn,
              backgroundColor: btn ? "#FF6C00" : "#F6F6F6",
            }}
            onPress={sendData}
          >
            <Text>Опоблікувати</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.deleteField}>
          <TouchableOpacity style={styles.delete}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
    flexDirection: "row",
  },
  arrowLeft: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  headerTitle: {
    fontSize: 17,
    alignItems: "center",
  },
  cameraField: {
    marginHorizontal: 16,
    borderWidth: 1,
    // background: "#BDBDBD",
    borderRadius: 8,
    marginTop: 32,
    overflow: "hidden",
    borderColor: "#BDBDBD",
    height: 240,
    justifyContent: "center",
  },
  camera: {
    height: 480,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    borderWidth: 2,
    borderColor: "#fff",
    color: "#fff",
  },
  photoPreview: {
    position: "absolute",
    top: 0,
    left: 0,
    // borderColor: "#fff",
    // borderWidth: 1,
    height: "100%",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  cameraBack: {
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  photoPreviewImage: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
  loadPhoto: {
    paddingHorizontal: 16,
    marginTop: 8,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  inputField: {
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 16,
    height: 50,
    width: "100%",
    marginTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#BDBDBD",
    // backgroundColor: "#BDBDBD",
  },
  iconEnviromento: {
    position: "absolute",
    top: "40%",
  },
  inputBtn: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  tryAgain: {
    height: 26,
    width: 26,
    backgroundColor: "#ffffff30",
    position: "absolute",
    color: "#fff",
    top: 130,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  deleteField: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 30,
  },
  delete: {
    height: 40,
    width: 70,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
