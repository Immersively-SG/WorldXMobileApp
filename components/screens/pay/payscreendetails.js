import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import {
  RandomRangeFloat,
  RandomRangeInt,
  RandomString,
} from "../../utility/math/math";

export const PayScreenDetails = (props) => {
  const [cashbackHistory, setCashbackHistory] = useState(null);

  useEffect(() => {
    setCashbackHistory(() => GenerateCashbackHistory());
  }, []);

  return (
    <View style={props.style}>
      {props.isLoyalty ? (
        <FlatList
          style={{ width: "100%" }}
          data={cashbackHistory}
          renderItem={({ item }) => {
            return item;
          }}
        />
      ) : (
        <Text style={worldxstyles.text}>No cashback records</Text>
      )}
    </View>
  );
};

const GenerateCashbackHistory = () => {
  const num = RandomRangeInt(1, 100);
  var historyArray = [];
  for (var i = 0; i < num; ++i) {
    historyArray.push(
      <LinearGradient
        key={i}
        style={[
          worldxstyles.flexRow,
          { width: "100%", justifyContent: "space-between", padding: 5 },
        ]}
        colors={[worldxstyleconstants.backgroundColor, "#000000"]}
        end={{ x: 1.0, y: 1.0 }}
      >
        <Text style={worldxstyles.text}>
          {RandomString(RandomRangeInt(3, 5))} product
        </Text>
        <Text style={[worldxstyles.text, { color: "green" }]}>
          + ${RandomRangeFloat(0.1, 10.0).toFixed(2)}
        </Text>
      </LinearGradient>
    );
  }

  return historyArray;
};
