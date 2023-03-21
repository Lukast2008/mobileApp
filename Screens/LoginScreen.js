import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <View style={styles.container}> */}
        {/* <ImageBackground
          style={styles.image}
          source={require("./img/photo.jpg")}
        > */}
          <View style={styles.form}>
            <Text style={styles.title}>Ввійти</Text>
            <TextInput style={styles.input} placeholder={"Електронна пошта"} />
            <TextInput style={styles.input} placeholder={"Пароль"} />

            <TouchableOpacity style={styles.visiblePassword}>
              <Text>Показати</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttInput}>
              <Text>Зареєструватись</Text>
            </TouchableOpacity>
            <Text style={styles.loginButt}>Немає акаунту? Зареєструватись</Text>
          </View>
        {/* </ImageBackground> */}
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     fontFamily: "Roboto",
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
  form: {
    flex: 1,
    top: 323,
    backgroundColor: "#fff",
    borderRadius: 25,

    // alignItems: "center",
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
    borderColor: "#E8E8E8",
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
  visiblePassword:{
    position: "relative",
    top: -49,
    left: 240,
    fontSize: 16,
  }
});
