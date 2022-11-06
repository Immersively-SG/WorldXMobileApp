import { View, ImageBackground } from "react-native";

export const SplashScreen = ({ navigation }) => {
  const SPLASH_TIME = 2000;

  //go to home page after 2s
  setTimeout(() => {
    navigation.navigate("Home");
  }, SPLASH_TIME);

  return (
    <View>
      <ImageBackground
        source={require("../../../assets/WorldX/Splash/worldxsplashgif.gif")}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      ></ImageBackground>
    </View>
  );
};
