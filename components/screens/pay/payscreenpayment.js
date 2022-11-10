import { View, Text } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";

export const PayScreenPayment = (props) => {
  return (
    <View style={props.style}>
      <View>
        <Text style={worldxstyles.text}>1</Text>
      </View>
      <View>
        <Text style={worldxstyles.text}>2</Text>
      </View>
      <View>
        <Text style={worldxstyles.text}>3</Text>
      </View>
    </View>
  );
};
