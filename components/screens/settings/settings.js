import EStyleSheet from "react-native-extended-stylesheet";
import { View, Text } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";

export const SettingsScreen = () => {
  return (
    <View style={[styles.screen]}>
      <Text style={[worldxstyles.text]}>Settings screen</Text>
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
});
