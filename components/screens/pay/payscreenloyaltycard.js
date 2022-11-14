import FlipCard from "react-native-flip-card-plus";
import { View, Text, TouchableOpacity } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { useEffect, useRef, useState } from "react";

import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { RandomRangeFloat, RandomRangeInt } from "../../utility/math/math";
import { useSelector, useDispatch } from "react-redux";
import { saveLoyaltyCardSlice } from "../../../features/paymentscreenslice";

const CASHBACK_VALUES = [10, 15, 20, 25, 50];

export const PayScreenLoyaltyCard = (props) => {
  const card = useRef();
  const payLoyaltyState = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice
  );
  const dispatch = useDispatch();
  const [isPurchasedThisRender, setIsPurchasedThisRender] = useState(false);
  useEffect(() => {}, []);

  const Front = () => {
    return (
      <View
        style={[
          worldxstyles.bordered,
          {
            flex: 1,
            backgroundColor: "#1c0738",
            overflow: "hidden",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
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
            setIsPurchasedThisRender(true);
            card.current.flipHorizontal();
            //Generate a random cashback percentage if there is no loyalty purchased
            if (payLoyaltyState.isLoyalty == false) {
              const state = {
                cardCashbackPercent:
                  CASHBACK_VALUES[
                    RandomRangeInt(0, CASHBACK_VALUES.length - 1)
                  ],
                accumulatedCashback: 0.0,
                isLoyalty: true,
                cashbackHistoryArray: [],
              };

              dispatch(saveLoyaltyCardSlice(state));
            }
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
  };

  const Back = () => {
    return (
      <View
        style={[
          worldxstyles.bordered,
          {
            flex: 1,
            backgroundColor: "#1c0738",
            overflow: "hidden",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          },
        ]}
      >
        {/* ------------  */}
        <View style={[{ alignSelf: "flex-start", marginHorizontal: 10 }]}>
          <View style={[worldxstyles.flexRow, { alignItems: "flex-end" }]}>
            <Text
              style={[
                worldxstyles.text,
                worldxstyles.textBold,
                { marginVertical: 10 },
              ]}
            >
              Cashback Value:
            </Text>
            <Text
              style={[
                worldxstyles.text,
                worldxstyles.textMedium,
                worldxstyles.textBold,
                { color: "#ac8814" },
              ]}
            >
              {payLoyaltyState.cardCashbackPercent}%
            </Text>
          </View>
          <View>
            <Text style={[worldxstyles.text]}>
              Earn {payLoyaltyState.cardCashbackPercent}% cashback on all
              purchases!
            </Text>
          </View>
        </View>
        {/* ------------  */}
        <View
          style={[
            worldxstyles.flexRow,
            {
              alignItems: "center",
              alignSelf: "flex-end",
              marginHorizontal: 10,
            },
          ]}
        >
          <Text style={[worldxstyles.text, worldxstyles.textBold]}>
            Cashback Limit:
          </Text>
          <Text
            style={[
              worldxstyles.text,
              worldxstyles.textBold,
              worldxstyles.textSmallMedium,
              { color: "#ac8814" },
            ]}
          >
            ${payLoyaltyState.accumulatedCashback.toFixed(2)}/$100
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={props.style}>
      <Text
        style={[
          worldxstyles.text,
          worldxstyles.textBold,
          { alignSelf: "flex-start", marginBottom: 10 },
        ]}
      >
        Active Loyalty Card
      </Text>
      {/******************* */}
      <FlipCard
        flipDirection={"h"}
        ref={card}
        style={[{ flex: 1, width: "100%" }]}
        swipeable={false}
        perspective={5000}
        flipZoom={0.001}
        duration={300}
      >
        {payLoyaltyState.isLoyalty && !isPurchasedThisRender ? (
          <Back />
        ) : (
          <Front />
        )}
        {payLoyaltyState.isLoyalty && !isPurchasedThisRender ? (
          <Front />
        ) : (
          <Back />
        )}
      </FlipCard>
    </View>
  );
};
