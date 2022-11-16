import { View, StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
export const BackgroundOverlay = () => {
  return <View style={[styles.overlay, StyleSheet.absoluteFillObject]}></View>;
};

const styles = EStyleSheet.create({
  overlay: {
    backgroundColor: "black",
    opacity: 0.8,
  },
});
