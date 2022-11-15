import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { LinearGradientContainer } from "../../utility/containers/lineargradient";

export const RewardsHeader = (props) => {
  const worldxpointsState = useSelector((state) => state.worldxpoints);

  return (
    <View style={props.style}>
      <LinearGradientContainer>
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            worldxstyles.textMedium,
          ]}
        >
          WorldX Points
        </Text>
      </LinearGradientContainer>
      <Text style={[worldxstyles.text]}>{props.subText}</Text>
      <Text style={[worldxstyles.text, worldxstyles.textBold, styles.points]}>
        Points Balance: {worldxpointsState.totalPoints}
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  points: { marginTop: "1rem", fontSize: "1.1rem" },
});
