import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import * as Font from "expo-font";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Router } from "./Component/NavigateComponent";
// import {Home} from './Screens/Home'
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  // return  <View style={{flex: 1, backgroundColor: 'teal'}}/>

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          {/* <View style={{flex: 1, backgroundColor: 'tomato'}} /> */}
          <Router/>
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Roboto-Regular",
  },
});

// {
/* <TouchableOpacity>
<AntDesign name="arrowleft" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity>
<AntDesign name="arrowup" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity>
<MaterialIcons name="logout" size={24} color="black" />
</TouchableOpacity>
<View style={{ flexDirection: 'row', gap: 16, marginVertical: 16 }}>
<TouchableOpacity>
  <SimpleLineIcons name="grid" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity>
  <Fontisto name="plus-a" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity>
  <Feather name="user" size={24} color="black" />
</TouchableOpacity>
</View>
<TouchableOpacity>
<Feather name="trash-2" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity>
<AntDesign name="enviromento" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity>
<MaterialIcons name="camera-alt" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity>
<Feather name="thumbs-up" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity>
<Ionicons
  name="chatbubble-sharp"
  size={24}
  color="black"
  style={{ transform: [{ scaleX: -1 }] }}
/>
</TouchableOpacity>
<TouchableOpacity>
<Ionicons
  name="chatbubble-outline"
  size={24}
  color="black"
  style={{ transform: [{ scaleX: -1 }] }}
/>
</TouchableOpacity> */
// }
