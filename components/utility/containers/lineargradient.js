import { LinearGradient } from "expo-linear-gradient";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
export const LinearGradientContainer = (props) => {
  return (
    <LinearGradient
      style={[
        worldxstyles.flexRow,
        { padding: 5, justifyContent: "space-between" },
        props.style,
      ]}
      colors={["#000000", "transparent"]}
      end={{ x: 1.0, y: 1.0 }}
      {...props}
    >
      {props.children}
    </LinearGradient>
  );
};
