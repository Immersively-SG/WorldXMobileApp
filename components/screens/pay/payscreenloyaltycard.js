import CardFlip from "react-native-card-flip";
import { View, Text, TouchableOpacity } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { useRef } from "react";

export const PayScreenLoyaltyCard = (props) => {
  const card = useRef(null);

  return (
    <CardFlip style={[props.style]} ref={card}>
      <View style={[worldxstyles.bordered]}>
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            { textAlign: "center" },
          ]}
        >
          Oops! You have no loyalty card yet. Buy 1 to start earning cashback!
        </Text>
        <TouchableOpacity
          style={[worldxstyles.bordered]}
          onPress={() => {
            card.current.flip();
          }}
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
        </TouchableOpacity>
      </View>
      <View style={[worldxstyles.bordered]}>
        <TouchableOpacity
          style={[worldxstyles.bordered]}
          onPress={() => {
            card.current.flip();
          }}
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
        </TouchableOpacity>
      </View>
    </CardFlip>
  );
};
