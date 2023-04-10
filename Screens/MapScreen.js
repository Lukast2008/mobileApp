import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapView, { Marker } from "react-native-maps";

const MainTab = createBottomTabNavigator();

export default function MapScreen({ navigation , route }) {

  const { coords } = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
