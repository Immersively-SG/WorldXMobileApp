import { LinearGradient } from "expo-linear-gradient";

export const LinearGradientContainer = (props) => {
  return (
    <LinearGradient
      style={[
        worldxstyles.flexRow,
        { padding: 5, justifyContent: "space-between" },
      ]}
      colors={["#000000", "transparent"]}
      end={{ x: 1.0, y: 1.0 }}
    >
      {props.children}
    </LinearGradient>
  );
};
