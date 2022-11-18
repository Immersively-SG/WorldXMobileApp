import { LinearGradient } from "expo-linear-gradient";
import EStyleSheet from "react-native-extended-stylesheet";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { Text } from "react-native";
export const LinearGradientHeader = (props) => {
  return (
    <LinearGradient
      style={[worldxstyles.flexRow, props.style, styles.container]}
      colors={["#000000", "transparent"]}
      end={{ x: 1.0, y: 1.0 }}
      {...props}
    >
      <Text
        style={[
          worldxstyles.text,
          worldxstyles.textBold,
          worldxstyles.textMedium,
        ]}
      >
        {props.text}
      </Text>
    </LinearGradient>
  );
};
const styles = EStyleSheet.create({
  container: {
    padding: "0.5rem",
    justifyContent: "space-between",
  },
});
