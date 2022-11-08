import { View, Text } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { RandomRangeInt } from "../../utility/math/math";
export const PayScreenDetails = (props) => {
  return (
    <View style={props.style}>
      {props.isLoyalty ? (
        GenerateCashbackHistory()
      ) : (
        <Text style={worldxstyles.text}>No cashback records</Text>
      )}
    </View>
  );
};

const GenerateCashbackHistory = () => {
  const num = RandomRangeInt(1, 10);
  var historyArray = [];
  for (var i = 0; i < num; ++i) {
    historyArray.push(
      <View key={i}>
        <Text style={worldxstyles.text}>No cashback records</Text>
      </View>
    );
  }

  return historyArray;
};
