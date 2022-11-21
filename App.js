import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import Entypo from "@expo/vector-icons/Entypo";
import * as Splashscreen from "expo-splash-screen";
import * as Font from "expo-font";
import EStyleSheet from "react-native-extended-stylesheet";
import { LogBox } from "react-native";
import { toastConfig } from "./components/utility/config/toastconfig";
import { useFonts } from "expo-font";

//REDUX
import { store } from "./store";
import { Provider } from "react-redux";

//SCREENS
import { SplashScreen } from "./components/screens/splashscreen/splashscreen.js";
import { HomeScreen } from "./components/screens/home/homescreen.js";
import { BottomNavigator } from "./components/navigator/bottomnavigator.js";
import { BeThereAndEarnScreen } from "./components/screens/bethereandearn/bethereandearnscreen.js";
import { PayScreen } from "./components/screens/pay/payscreen.js";
import { LoginScreen } from "./components/screens/login/loginscreen.js";
import { RewardsScreen } from "./components/screens/rewards/rewardsscreen";
import { SettingsScreen } from "./components/screens/settings/settings";

//FONTS
import {
  MPLUS1p_400Regular,
  MPLUS1p_700Bold,
} from "@expo-google-fonts/m-plus-1p";

EStyleSheet.build(); //For global variables, but STILL MUST CALL OR ELSE THE STYLESHEETS WONT WORK
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message

Splashscreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [currentRouteName, setCurrentRouteName] = useState("");

  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    MPLUS1p_400Regular,
    MPLUS1p_700Bold,
  });
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
    <Provider store={store}>
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
              initialRouteName="LoginScreen"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Rewards" component={RewardsScreen} />
              <Stack.Screen
                name="BeThereAndEarn"
                component={BeThereAndEarnScreen}
              />
              <Stack.Screen name="Pay" component={PayScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
            <BottomNavigator
              currentScreen={currentRouteName}
              navStateReady={navigationRef?.isReady()}
            />
          </ImageBackground>
          <Toast config={toastConfig} />
          <StatusBar hidden />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
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
