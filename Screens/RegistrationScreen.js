import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../redux/auth/authOperations";

const userData = {
  nickname: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [visibleButton, setVisibleButton] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [isFocusedInputName, setIsFocusedInputName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState(userData);

  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const keyBoardShow = () => {
    setVisibleButton(true);
  };

  const keyBoardHide = () => {
    setVisibleButton(false);
    Keyboard.dismiss();
  };

  const showPasswordOrNot = () => {
    setShowPass(!showPass);
  };

  function validatePassword(password) {
    // Перевірка, чи пароль має не менше 8 символів
    if (password.length < 8) {
      Alert.alert("пароль має  менше 8 символів");
      return false;
    }

    // Перевірка, чи пароль містить хоча б одну цифру
    var regex = /\d/;
    if (!regex.test(password)) {
      Alert.alert("пароль має містити хоча б одну цифру");
      return false;
    }

    // Перевірка, чи пароль містить хоча б одну літеру в верхньому регістрі
    regex = /[A-Z]/;
    if (!regex.test(password)) {
      Alert.alert("пароль має містити хоча б одну літеру в верхньому регістрі");
      return false;
    }

    // Перевірка, чи пароль містить хоча б одну літеру в нижньому регістрі
    regex = /[a-z]/;
    if (!regex.test(password)) {
      Alert.alert("пароль має містити хоча б одну літеру  в нижньому регістрі");
      return false;
    }

    // Якщо всі перевірки пройдені, повертаємо true
    return true;
  }

  const submit = () => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (data.nickname.length < 3) {
      Alert.alert("Логін повиден містити більше 3 символів");
      return;
    }

    if (!reg.test(data.email)) {
      Alert.alert("Імеіл введено некоректно");
      return;
    }

    if (!validatePassword(data.password)) {
      return;
    }

    setShowPass(true);

    setData(userData);

    dispatch(authSignUpUser(data));

    // navigation.navigate("Home");
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setData((prevState) => ({
        ...prevState,
        avatarUri: result.assets[0].uri,
      }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <ImageBackground style={styles.image} source={require("./img/photo.jpg")}>
        <View
          style={{
            ...styles.form,
            width: dimensions + 32,
          }}
        >
          <View
            style={{
              ...styles.formItem,
              paddingBottom: dimensions > 800 ? 20 : 0,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={{ uri: avatar }} />
                <TouchableOpacity
                  style={styles.avatarButt}
                  onPress={pickAvatar}
                >
                  <AntDesign name="plus" size={16} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація </Text>

              <TextInput
                value={data.nickname}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, nickname: value }))
                }
                placeholder={"Ім'я"}
                onFocus={() => {
                  keyBoardShow();
                  setIsFocusedInputName("nickname");
                }}
                style={{
                  ...styles.input,
                  borderColor:
                    isFocusedInputName === "nickname" ? "#ff6c00" : "#e8e8e8",
                }}
                onBlur={() => {
                  setIsFocusedInputName(null);
                }}
                onSubmitEditing={() => keyBoardHide()}
              />

              <TextInput
                value={data.email}
                placeholder={"Електронна пошта"}
                onFocus={() => {
                  keyBoardShow();
                  setIsFocusedInputName("email");
                }}
                style={{
                  ...styles.input,
                  borderColor:
                    isFocusedInputName === "email" ? "#ff6c00" : "#e8e8e8",
                }}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, email: value }))
                }
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onBlur={() => setIsFocusedInputName(null)}
                onSubmitEditing={() => keyBoardHide()}
              />
              <TextInput
                value={data.password}
                secureTextEntry={showPass && true}
                placeholder={"Пароль"}
                onFocus={() => {
                  keyBoardShow();
                  setIsFocusedInputName("password");
                }}
                style={{
                  ...styles.input,
                  borderColor:
                    isFocusedInputName === "password" ? "#ff6c00" : "#e8e8e8",
                }}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, password: value }))
                }
                onBlur={() => setIsFocusedInputName(null)}
                onSubmitEditing={() => keyBoardHide()}
              />

              <TouchableOpacity
                style={{
                  ...styles.visiblePassword,
                  left: dimensions < 800 ? "75%" : "90%",
                }}
                onPress={showPasswordOrNot}
              >
                {showPass ? <Text>Показати</Text> : <Text>Приховати</Text>}
              </TouchableOpacity>
            </KeyboardAvoidingView>
            {visibleButton ? null : (
              <View
                style={{
                  ...styles.registerButt,
                  paddingBottom: dimensions > 800 ? 0 : 66,
                }}
              >
                <TouchableOpacity style={styles.buttInput} onPress={submit}>
                  <Text>Зареєструватись</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("LoginScreen")}
                  style={styles.loginButt}
                >
                  <Text style={styles.loginLing}>Вже є акаунт? Ввійти</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formItem: {
    marginHorizontal: 16,
  },

  avatar: {
    position: "relative",
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  avatarButt: {
    width: 15,
    height: 120,
    position: "absolute",
    top: 81,
    left: 107,
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FF6C00",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginTop: -32,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
  },
  input: {
    height: 50,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  visiblePassword: {
    position: "relative",
    top: -49,

    fontSize: 16,
  },
  buttInput: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 16,
  },
  loginButt: {},

  loginLing: {
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
  },
  registerButt: {},
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
