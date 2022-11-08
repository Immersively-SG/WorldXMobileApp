import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useCallback, useEffect, useState, useRef } from "react";
import * as React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Entypo from "@expo/vector-icons/Entypo";
import * as Splashscreen from "expo-splash-screen";
import * as Font from "expo-font";

//SCREENS
import { SplashScreen } from "./components/screens/splashscreen/splashscreen.js";
import { MarketplaceScreen } from "./components/screens/marketplace/marketplacescreen.js";
import { HomeScreen } from "./components/screens/home/homescreen.js";
import { BottomNavigator } from "./components/navigator/bottomnavigator.js";
import { BeThereAndEarnScreen } from "./components/screens/bethereandearn/bethereandearnscreen.js";
import { PayScreen } from "./components/screens/pay/payscreen.js";

Splashscreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [currentRouteName, setCurrentRouteName] = useState("");

  const [appIsReady, setAppIsReady] = useState(false);
  //on initial render
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        //await new Promise((resolve) => setTimeout(resolve, SPLASH_SCREEN_TIME));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await Splashscreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer
        ref={navigationRef}
        theme={MyTheme}
        onStateChange={async () => {
          setCurrentRouteName(navigationRef.getCurrentRoute().name);
        }}
      >
        <ImageBackground
          source={backgroundImage}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        >
          <Stack.Navigator
            initialRouteName="SpashScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MarketPlace" component={MarketplaceScreen} />
            <Stack.Screen
              name="BeThereAndEarn"
              component={BeThereAndEarnScreen}
            />
            <Stack.Screen name="Pay" component={PayScreen} />
            <Stack.Screen name="Settings" component={HomeScreen} />
          </Stack.Navigator>
          <BottomNavigator
            currentScreen={currentRouteName}
            navStateReady={navigationRef?.isReady()}
          />
        </ImageBackground>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const backgroundImage = require("./assets/WorldX/Backgrounds/BG1.png");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
