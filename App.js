import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

export default function App() {
  const [visButton, setVisButton] = useState(false);

  return (
   
      <View style={styles.container}>
        <RegistrationScreen />
        {/* <LoginScreen/> */}
        <StatusBar style="auto" />
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
