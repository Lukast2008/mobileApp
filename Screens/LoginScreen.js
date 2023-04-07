import React, { useEffect, useState } from "react";
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
  Dimensions,
  Alert,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/auth/authOperations";


const userData = {
  email: "",
  password: "",
  nickname: "",
};

export default function LoginScreen({ navigation }) {
  const [data, setData] = useState(userData);
  const [visibleButton, setVisibleButton] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [isFocusedInputName, setIsFocusedInputName] = useState("");

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

  const submit = () => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!reg.test(data.email)) {
      Alert.alert("Імеіл введено некоректно");
      return;
    }

    setShowPass(true);

    setData(userData);

    // navigation.navigate("Home", true);


    dispatch(authSignInUser(data));
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      console.log(width);
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <ImageBackground style={styles.image} source={require("./img/photo.jpg")}>
        <View
          style={{
            ...styles.form,
            width: dimensions + 32,
            paddingBottom: dimensions > 800 ? 20 : 0,
          }}
        >
          <View
            style={{
              ...styles.formItem,
              paddingBottom: dimensions > 800 ? 20 : 0,
            }}
          >
            <Text style={styles.title}>Ввійти</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                value={data.email}
                placeholder={"Електронна пошта"}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={() => {
                  keyBoardShow();
                  setIsFocusedInputName("email");
                }}
                style={{
                  ...styles.input,
                  borderColor:
                    isFocusedInputName === "email" ? "#ff6c00" : "#e8e8e8",
                }}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onBlur={() => {
                  setIsFocusedInputName(null);
                }}
                onSubmitEditing={() => keyBoardHide()}
              />

              <TextInput
                value={data.password}
                secureTextEntry={showPass && true}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, password: value }))
                }
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
                onBlur={() => {
                  setIsFocusedInputName(null);
                }}
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
                  <Text>Ввійти</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("RegistrationScreen")}
                >
                  <Text style={styles.loginButt}>
                    Немає акаунту? Зареєструватись
                  </Text>
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
  title: {
    fontSize: 30,
    fontWeight: 500,
    marginTop: 32,
    marginBottom: 33,
    textAlign: "center",
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
  buttInput: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 27,
    marginBottom: 16,
  },
  loginButt: {
    fontSize: 16,
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
  },
  visiblePassword: {
    position: "relative",
    top: -49,
    left: 240,
    fontSize: 16,
  },
  registerButt: {},
});
