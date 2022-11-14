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

import { useSelector, useDispatch } from "react-redux";
import { Shadow } from "react-native-shadow-2";

export const PayScreenDetails = (props) => {
  const cashbackHistory = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice.cashbackHistoryArray
  );

  const isLoyalty = useSelector((state) => {
    return state.paymentScreen.loyaltyCardSlice.isLoyalty;
  });

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
      {isLoyalty && cashbackHistory.length > 0 ? (
        <FlatList
          style={{ width: "100%" }}
          data={cashbackHistory}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View
                useNativeDriver={true}
                animation="fadeInUp"
                duration={1000}
              >
                <LinearGradient
                  key={index}
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
                    {item.merchantName} product
                  </Text>
                  <Text style={[worldxstyles.text, { color: "green" }]}>
                    + ${item.cashback}
                  </Text>
                </LinearGradient>
              </Animatable.View>
            );
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
              { color: "grey", textAlign: "center" },
            ]}
          >
            No cashback records
          </Text>
        </View>
      )}
    </View>
  );
};
