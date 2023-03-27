import { useState } from "react";
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

const userData = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [visibleButton, setVisibleButton] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [isFocusedInputName, setIsFocusedInputName] = useState("");
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);

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

  const changeInput = (item) => {
    switch (isFocusedInputName) {
      case "email":
        setEmail(item);
        break;
      case "password":
        setPassword(item);
        break;
      default:
    }
    return userData;
  };

  const submit = () => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!reg.test(email)) {
      Alert.alert('Імеіл введено некоректно');
      return;
    }


    console.log("Email", email, "Password", password);
    setShowPass(true);

    setEmail(userData.email)
    setPassword(userData.password)
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <ImageBackground style={styles.image} source={require("./img/photo.jpg")}>
        <View style={styles.form}>
          <Text style={styles.title}>Ввійти</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              value={email}
              placeholder={"Електронна пошта"}
              onChangeText={changeInput}
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

            />

            <TextInput
              value={password}
              secureTextEntry={showPass && true}
              onChangeText={changeInput}
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
            />

            <TouchableOpacity
              style={styles.visiblePassword}
              onPress={showPasswordOrNot}
            >
              {showPass ?<Text>Показати</Text>:<Text>Приховати</Text> } 
            </TouchableOpacity>
          </KeyboardAvoidingView>

          {visibleButton ? null : (
            <>
              <TouchableOpacity style={styles.buttInput} onPress={submit}>
                <Text>Зареєструватись</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.loginButt}>
                  Немає акаунту? Зареєструватись
                </Text>
              </TouchableOpacity>
            </>
          )}
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
    // alignItems:"center",
  },
  form: {
    flex: 1,
    top: 323,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
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
  },
  visiblePassword: {
    position: "relative",
    top: -49,
    left: 240,
    fontSize: 16,
  },
});
