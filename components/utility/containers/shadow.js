import { Shadow } from "react-native-shadow-2";

export const ShadowContainer = (props) => {
  return (
    <Shadow
      style={props.style}
      distance={props.distance}
      startColor={"#000000"}
      endColor={"rgba(0,0,0,0)"}
      offset={props.offset}
    >
      {props.children}
    </Shadow>
  );
};
