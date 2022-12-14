import { LinearGradient } from "expo-linear-gradient";
import EStyleSheet from "react-native-extended-stylesheet";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
export const LinearGradientContainer = (props) => {
  return (
    <LinearGradient
      style={[worldxstyles.flexRow, props.style, styles.container]}
      colors={["#000000", "transparent"]}
      end={{ x: 1.0, y: 0.0 }}
      {...props}
    >
      {props.children}
    </LinearGradient>
  );
};
const styles = EStyleSheet.create({
  container: {
    padding: "0.5rem",
    justifyContent: "space-between",
  },
});
