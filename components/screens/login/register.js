import { Modal, View, Text, TextInput } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { useEffect, useRef, useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { worldxstyleconstants } from "../../../stylesheets/worldxstylesheet";

export const Register = (props) => {
  const [usernameLength, setUsernameLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);
  const [userValid, setUserValid] = useState(true);
  const [passValid, setPassValid] = useState(true);

  const userRef = useRef();
  const passRef = useRef();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => {
        props.setRegister(false);
      }}
      statusBarTranslucent={true}
    >
      <View style={[props.style]}>
        <View style={[props.modalContentStyle]}>
          <TextInput
            ref={userRef}
            style={[styles.input, worldxstyles.bordered]}
            placeholder={"Username"}
            maxFontSizeMultiplier={1}
            placeholderTextColor={"grey"}
            onChangeText={(text) => {
              setUsernameLength(text.length);
            }}
          />
          {!userValid ? (
            <Text style={[styles.errorText]}>
              Username must contain at least a character!
            </Text>
          ) : null}
          <TextInput
            ref={passRef}
            style={[styles.input, worldxstyles.bordered]}
            placeholder={"Password"}
            maxFontSizeMultiplier={1}
            placeholderTextColor={"grey"}
            secureTextEntry={true}
            onChangeText={(text) => {
              setPasswordLength(text.length);
            }}
          />
          {!passValid ? (
            <Text style={[styles.errorText]}>
              Password must contain at least a character!
            </Text>
          ) : null}
          {/************** */}
          <TouchableShadowButton
            style={styles.buttons}
            containerStyle={styles.buttonsShadow}
            onPress={() => {
              if (usernameLength > 0 && passwordLength > 0) {
                setUserValid(true);
                setPassValid(true);
                setUsernameLength(0);
                setPasswordLength(0);
                props.setRegister(false);
                return;
              }

              setUserValid(usernameLength > 0);
              setPassValid(passwordLength > 0);
            }}
          >
            <Text style={[worldxstyles.text]}>Register</Text>
          </TouchableShadowButton>
          <TouchableShadowButton
            style={styles.buttons}
            containerStyle={styles.buttonsShadow}
            onPress={() => {
              setUserValid(true);
              setPassValid(true);
              setUsernameLength(0);
              setPasswordLength(0);
              props.setRegister(false);
            }}
          >
            <Text style={[worldxstyles.text]}>close</Text>
          </TouchableShadowButton>
        </View>
      </View>
    </Modal>
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
  errorText: { color: "red", textAlign: "left" },
  buttons: { padding: "0.5rem" },
  buttonsShadow: { margin: "0.5rem", marginVertical: "0.5rem" },
  image: {
    width: "1rem",
    height: "1rem",
    resizeMode: "contain",
    marginLeft: "1rem",
  },
});
