import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { LinearGradientHeader } from "../../utility/containers/header";

export const RewardsHeader = (props) => {
  const worldxpointsState = useSelector((state) => state.worldxpoints);

  return (
    <View style={props.style}>
      <LinearGradientHeader text="WorldX Points" />

      <Text style={[worldxstyles.text]}>{props.subText}</Text>
      <Text style={[worldxstyles.text, worldxstyles.textBold, styles.points]}>
        Points Balance: {worldxpointsState.totalPoints} points
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  points: { marginTop: "2rem", fontSize: "1.1rem" },
});
