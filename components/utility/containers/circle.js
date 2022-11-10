import { View, Dimensions, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const CircleContainer = (props) => {
  return (
    <View style={[styles.circle, props.style]}>
      {props.children}
      <Text></Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  circle: { borderRadius: Dimensions.get("window").width / 2, aspectRatio: 1 },
});
