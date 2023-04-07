import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapView, { Marker } from "react-native-maps";

const MainTab = createBottomTabNavigator();

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.3927524,
          longitude: 25.9460334,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Marker coordinate={{ latitude: 48.3927524, longitude: 25.9460334 }} />
      </MapView>
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
  map: {
    width: "100%",
    height: "100%",
  },
});
