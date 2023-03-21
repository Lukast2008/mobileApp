import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";

export default function RegistrationScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.authForm}>
        <Image style={styles.avatar} />
        <TouchableOpacity>
          <Image style={styles.avatarButt} source={require("./img/add.png")} />
        </TouchableOpacity>
        <View style={styles.form}>
          <Text style={styles.title}>Регістрація</Text>

          <TextInput style={styles.input} placeholder={"Логін"} />
          <TextInput style={styles.input} placeholder={"Електронна пошта"} />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder={"Пароль"}
          />
          <TouchableOpacity style={styles.visiblePassword}>
            <Text>Показати</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttInput}>
            <Text>Зареєструватись</Text>
          </TouchableOpacity>
          <Text style={styles.loginButt}>Вже є акаунт? Ввійти</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  authForm: {
    flex: 1,
    backgroundColor: "#ffffff",
    top: 263,
    borderRadius: 25,
  },
  avatar: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    top: -60,
    marginHorizontal: 120,
  },
  avatarButt: {
    position: "relative",
    top: -100,
    left: 225,
  },
  form: {
    flex: 1,
    marginHorizontal: 16,
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
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,

    paddingHorizontal: 16,
    marginBottom: 15,
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
  visiblePassword: {
    position: "relative",
    top: -49,
    left: 240,
    fontSize: 16,
  },
  loginButt: {
    fontSize: 16,
    textAlign: "center",
  },
});
