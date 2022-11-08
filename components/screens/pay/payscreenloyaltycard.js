import FlipCard from "react-native-flip-card-plus";
import { View, Text, TouchableOpacity } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { useEffect, useRef, useState } from "react";

import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { RandomRangeFloat, RandomRangeInt } from "../../utility/math/math";

export const PayScreenLoyaltyCard = (props) => {
  const card = useRef();
  const [cashbackVal, setCashbackVal] = useState(0);

  useEffect(() => {
    setCashbackVal(RandomRangeInt(10, 90));
  }, []);

  const Front = (
    <View
      style={[
        worldxstyles.bordered,
        {
          flex: 1,
          backgroundColor: "#1c0738",
          overflow: "hidden",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        },
      ]}
    >
      <Text
        style={[
          worldxstyles.text,
          worldxstyles.textBold,
          { textAlign: "center" },
        ]}
      >
        Oops! You have no loyalty card yet. Buy 1 to start earning cashback!
      </Text>

      <TouchableShadowButton
        onPress={() => {
          card.current.flipHorizontal();
          props.onPurchaseLoyalty(true);
        }}
        style={{ paddingVertical: 5, paddingHorizontal: 10 }}
      >
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            { textAlign: "center" },
          ]}
        >
          PURCHASE
        </Text>
      </TouchableShadowButton>
    </View>
  );

  const Back = (
    <View
      style={[
        worldxstyles.bordered,
        {
          flex: 1,
          backgroundColor: "#1c0738",
          overflow: "hidden",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        },
      ]}
    >
      {/* ------------  */}
      <View style={[{ alignSelf: "flex-start", marginHorizontal: 10 }]}>
        <View
          style={[
            worldxstyles.flexRow,
            { justifyContent: "space-between", alignItems: "flex-end" },
          ]}
        >
          <Text
            style={[
              worldxstyles.text,
              worldxstyles.textBold,
              { fontSize: 20, marginVertical: 10 },
            ]}
          >
            Cashback Value:
          </Text>
          <Text
            style={[
              worldxstyles.text,
              worldxstyles.textBold,
              { fontSize: 40, color: "#ac8814" },
            ]}
          >
            {cashbackVal}%
          </Text>
        </View>
        <View>
          <Text style={[worldxstyles.text]}>
            Earn {cashbackVal}% cashback on all purchases!
          </Text>
        </View>
      </View>
      {/* ------------  */}
      <View
        style={[
          worldxstyles.flexRow,
          { alignItems: "center", alignSelf: "flex-end", marginHorizontal: 10 },
        ]}
      >
        <Text style={[worldxstyles.text, worldxstyles.textBold]}>
          Cashback Limit:
        </Text>
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            worldxstyles.textMedium,
            { color: "#ac8814" },
          ]}
        >
          ${RandomRangeFloat(1, 100).toFixed(2)}/$100
        </Text>
      </View>
    </View>
  );

  return (
    <View style={props.style}>
      <Text
        style={[
          worldxstyles.text,
          worldxstyles.textBold,
          { alignSelf: "flex-start" },
        ]}
      >
        Active Loyalty Card
      </Text>
      <FlipCard
        flipDirection={"h"}
        ref={card}
        style={[{ flex: 1, width: "100%" }]}
        swipeable={false}
        perspective={5000}
        flipZoom={0.001}
        duration={300}
      >
        {Front}
        {Back}
      </FlipCard>
    </View>
  );
};
