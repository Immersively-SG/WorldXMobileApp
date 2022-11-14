import { Image, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import * as Animatable from "react-native-animatable";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { Register } from "./register";

export const LoginScreen = (props) => {
  const [usernameLength, setUsernameLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);

  const [isRegister, setIsRegister] = useState(false);
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
      <TouchableOpacity
        style={styles.buttons}
        containerStyle={styles.buttonsShadow}
        onPress={() => {
          setIsRegister(true);
        }}
      >
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            { textDecorationLine: "underline" },
          ]}
        >
          Register
        </Text>
      </TouchableOpacity>
      {/******************* */}

      <Register
        style={[styles.register]}
        modalContentStyle={[styles.modalContent]}
        isModalVisible={isRegister}
        setRegister={setIsRegister}
      />
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
  register: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: worldxstyleconstants.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "75%",
  },
});
