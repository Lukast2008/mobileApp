import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainTab = createBottomTabNavigator();

export default function CommentsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>CommentsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  headerTitle: {
    fontSize: 17,
    fontFamily: "Roboto-Medium",
    marginTop: 20,
  },
});
