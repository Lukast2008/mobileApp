import React, { useState } from "react";
import { Alert } from "react-native";

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

const userData = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [visibleButton, setVisibleButton] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [isFocusedInputName, setIsFocusedInputName] = useState("");

  const [data, setData] = useState(userData);

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

    if (data.login.length < 3) {
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

    console.log(data);
    setShowPass(true);

    setData(userData);
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <ImageBackground style={styles.image} source={require("./img/photo.jpg")}>
        <View style={styles.form}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.formItem}>
              <Image style={styles.avatar} />
              <TouchableOpacity style={styles.avatarButt}>
                <Image source={require("./img/add.png")} />
              </TouchableOpacity>
              <Text style={styles.title}>Реєстрація</Text>

              <TextInput
                value={data.login}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, login: value }))
                }
                placeholder={"Логін"}
                onFocus={() => {
                  keyBoardShow();
                  setIsFocusedInputName("login");
                }}
                style={{
                  ...styles.input,
                  borderColor:
                    isFocusedInputName === "login" ? "#ff6c00" : "#e8e8e8",
                }}
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
              />

              <TouchableOpacity
                style={styles.visiblePassword}
                onPress={showPasswordOrNot}
              >
                {showPass ? <Text>Показати</Text> : <Text>Приховати</Text>}
              </TouchableOpacity>

              {visibleButton ? null : (
                <>
                  <TouchableOpacity style={styles.buttInput} onPress={submit}>
                    <Text>Зареєструватись</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.loginButt}>
                    <Text style={styles.loginLing}>Вже є акаунт? Ввійти</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
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
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    top: -60,
    marginHorizontal: 104,
  },
  avatarButt: {
    position: "relative",
    top: -100,
    left: 212,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginTop: -60,
    marginBottom: 33,
  },
  input: {
    height: 50,
    borderWidth: 1,
    // borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  visiblePassword: {
    position: "relative",
    top: -49,
    left: 240,
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
  loginLing: {
    textAlign: "center",
    marginBottom: 66,
  },
});
