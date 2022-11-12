import { Image, Text, TextInput, View } from "react-native";
import { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";

export const LoginScreen = (props) => {
  const [usernameLength, setUsernameLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);
  return (
    <Animatable.View
      useNativeDriver={true}
      animation="fadeInUp"
      duration={2000}
      style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
    >
      <TextInput
        style={[styles.input, worldxstyles.bordered]}
        placeholder={"Username"}
        maxFontSizeMultiplier={1}
        placeholderTextColor={"grey"}
        onChangeText={(text) => {
          setUsernameLength(text.length);
        }}
      />
      <TextInput
        style={[styles.input, worldxstyles.bordered]}
        placeholder={"Password"}
        maxFontSizeMultiplier={1}
        placeholderTextColor={"grey"}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPasswordLength(text.length);
        }}
      />

      <TouchableShadowButton
        style={[styles.buttons]}
        containerStyle={styles.buttonsShadow}
        onPress={() => {
          if (usernameLength > 0 && passwordLength > 0) {
            props.navigation.navigate("SplashScreen");
          }
        }}
      >
        <Text style={[worldxstyles.text, worldxstyles.textBold]}>LOGIN</Text>
      </TouchableShadowButton>
      {/******************* */}

      <Text style={[worldxstyles.text, worldxstyles.textBold]}>OR</Text>
      <TouchableShadowButton
        style={styles.buttons}
        containerStyle={styles.buttonsShadow}
        onPress={() => {
          props.navigation.navigate("SplashScreen");
        }}
      >
        <View style={[worldxstyles.flexRow]}>
          <Text style={[worldxstyles.text, worldxstyles.textBold]}>
            Login with MetaMask
          </Text>
          <Image
            source={require("../../../assets/WorldX/Icons/MetaMask.webp")}
            style={styles.image}
          />
        </View>
      </TouchableShadowButton>
      {/******************* */}
      <TouchableShadowButton
        style={styles.buttons}
        containerStyle={styles.buttonsShadow}
        onPress={() => {
          if (usernameLength > 0 && passwordLength > 0) {
            props.navigation.navigate("SplashScreen");
          }
        }}
      >
        <Text style={[worldxstyles.text, worldxstyles.textBold]}>REGISTER</Text>
      </TouchableShadowButton>
    </Animatable.View>
  );
};

const styles = EStyleSheet.create({
  input: {
    backgroundColor: worldxstyleconstants.backgroundColor,
    margin: "0.5rem",
    padding: "0.5rem",
    color: "white",
    width: "80%",
  },
  buttons: { padding: "0.5rem" },
  buttonsShadow: { margin: "0.5rem" },
  image: {
    width: "1rem",
    height: "1rem",
    resizeMode: "contain",
    marginLeft: "1rem",
  },
});
