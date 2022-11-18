import { TouchableOpacity, Text } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { Shadow } from "react-native-shadow-2";

export const TouchableShadowButton = (props) => {
  return (
    <Shadow
      distance={2}
      startColor={"#000000"}
      endColor={"rgba(0,0,0,0)"}
      offset={[0, 5]}
      containerStyle={props.containerStyle}
    >
      <TouchableOpacity
        {...props}
        style={[
          worldxstyles.bordered,
          {
            backgroundColor: "#1c0738",
            alignItems: "center",
            borderRadius: 10,
          },
          props.style,
        ]}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableOpacity>
    </Shadow>
  );
};
