import EStyleSheet from "react-native-extended-stylesheet";
import { View, Text, Touchable } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { Linking, Image } from "react-native";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
export const UploadNFT = () => {
  return (
    <View style={[styles.screen]}>
      <Text style={[worldxstyles.text, worldxstyles.textBold]}>
        Upload your own NFT via Refinable!
      </Text>
      <TouchableShadowButton
        onPress={async () => {
          await Linking.openURL("https://creator.refinable.com/signup");
        }}
        containerStyle={styles.button}
      >
        <Image
          source={require("../../../assets/WorldX/Logo/refinable.png")}
          style={styles.logo}
        />
      </TouchableShadowButton>
    </View>
  );
};

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: "5rem",
    height: "5rem",
  },
  button: {
    marginVertical: "1rem",
  },
});
