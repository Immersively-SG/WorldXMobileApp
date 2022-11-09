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
import * as Animatable from "react-native-animatable";
import { Shadow } from "react-native-shadow-2";

export const PayScreenDetails = (props) => {
  const [cashbackHistory, setCashbackHistory] = useState(null);

  useEffect(() => {
    setCashbackHistory(() => GenerateCashbackHistory());
  }, []);

  return (
    <View style={props.style}>
      <Text
        style={[
          worldxstyles.text,
          worldxstyles.textBold,
          { marginTop: 20, alignSelf: "flex-start", marginBottom: 10 },
        ]}
      >
        Recent cashback
      </Text>
      {props.isLoyalty && cashbackHistory ? (
        <FlatList
          style={{ width: "100%" }}
          data={cashbackHistory}
          renderItem={({ item }) => {
            return item;
          }}
        />
      ) : (
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
            },
          ]}
        >
          <Text
            style={[
              worldxstyles.text,
              worldxstyles.textBold,
              worldxstyles.textMedium,
              { color: "grey" },
            ]}
          >
            No cashback records
          </Text>
        </View>
      )}
    </View>
  );
};

const GenerateCashbackHistory = () => {
  const num = RandomRangeInt(1, 100);
  var historyArray = [];
  for (var i = 0; i < num; ++i) {
    historyArray.push(
      <Animatable.View
        useNativeDriver={true}
        animation="fadeInUp"
        duration={500}
        delay={(i + 1) * 100}
      >
        <LinearGradient
          key={i}
          style={[
            worldxstyles.flexRow,
            {
              width: "100%",
              justifyContent: "space-between",
              padding: 20,
              marginBottom: 10,
              borderRadius: 10,
            },
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
      </Animatable.View>
    );
  }

  return historyArray;
};
