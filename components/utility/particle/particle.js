import { Image } from "react-native";
import { Shadow } from "react-native-shadow-2";

export const Particle = () => {
  return (
    <Image
      source={require("../../../assets/WorldX/Icons/particle.png")}
      style={{ aspectRatio: 1, width: 20, height: 20 }}
    ></Image>
  );
};
