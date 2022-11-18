import FlipCard from "react-native-flip-card-plus";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { useEffect, useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";

import { useSelector, useDispatch } from "react-redux";
import {
  rerollLoyaltyCard,
  setLimitReached,
  resetLoyaltyCard,
} from "../../../features/paymentscreenslice";
import EStyleSheet from "react-native-extended-stylesheet";

export const PayScreenLoyaltyCard = (props) => {
  const card = useRef();
  const cardContainerRef = useRef();
  const cashpackpercentRef = useRef();
  const payLoyaltyState = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice
  );
  const accumulatedCashback = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice.accumulatedCashback
  );

  const dispatch = useDispatch();
  const [isPurchasedThisRender, setIsPurchasedThisRender] = useState(false);
  useEffect(() => {
    accumulatedCashback >= payLoyaltyState.cashbackLimit
      ? dispatch(setLimitReached(true))
      : dispatch(setLimitReached(false));
  }, [accumulatedCashback]);

  const Overlay = () => {
    return (
      <View
        style={[
          {
            ...StyleSheet.absoluteFill,

            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            ...StyleSheet.absoluteFill,
            opacity: 0.8,
            backgroundColor: "black",
          }}
        />
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            worldxstyles.container,
            { textAlign: "center" },
          ]}
        >
          Your card has reached the cashback limit. Purchase a new one to
          continue earning cashback!
        </Text>
        <TouchableShadowButton
          onPress={() => {
            setIsPurchasedThisRender(true);
            card.current.flipHorizontal();
            dispatch(resetLoyaltyCard());

            cardContainerRef.current.pulse(100);
          }}
          style={[{ paddingVertical: 5, paddingHorizontal: 10 }]}
          containerStyle={[worldxstyles.container]}
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

  const Front = () => {
    return (
      <View
        style={[
          worldxstyles.bordered,
          {
            flex: 1,
            backgroundColor: "#1c0738",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          },
        ]}
      >
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            worldxstyles.container,
            { textAlign: "center" },
          ]}
        >
          Oops! You have no loyalty card yet. Buy 1 to start earning cashback!
        </Text>

        <TouchableShadowButton
          onPress={() => {
            setIsPurchasedThisRender(true);

            cardContainerRef.current.rubberBand(500);
            card.current.flipHorizontal();
          }}
          style={{ paddingVertical: 5, paddingHorizontal: 10 }}
          containerStyle={[worldxstyles.container]}
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
      <View style={[{ flex: 1, overflow: "hidden" }, worldxstyles.bordered]}>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: "#1c0738",
              overflow: "hidden",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              opacity: payLoyaltyState.isLimitReached ? 0.5 : 1.0,
            },
          ]}
        >
          {/* ------------  */}
          <View
            style={[
              {
                alignSelf: "flex-start",
                marginHorizontal: 10,
              },
            ]}
          >
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
              <Animatable.Text
                ref={cashpackpercentRef}
                style={[
                  worldxstyles.text,
                  worldxstyles.textMedium,
                  worldxstyles.textBold,
                  styles.cashbackpercenttext,
                  { color: "#ac8814" },
                ]}
              >
                {payLoyaltyState.cardCashbackPercent}%
              </Animatable.Text>
            </View>
            <View>
              <Text style={[worldxstyles.text]}>
                Earn {payLoyaltyState.cardCashbackPercent}% cashback on all
                purchases!
              </Text>
            </View>
          </View>
          {/* ------------  */}
          <View style={[{ alignSelf: "flex-end" }]}>
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
                Current Cashback:
              </Text>
              <Text
                style={[
                  worldxstyles.text,
                  worldxstyles.textBold,
                  worldxstyles.textSmallMedium,
                  { color: "#ac8814" },
                ]}
              >
                ${parseFloat(payLoyaltyState.currentCashback).toFixed(2)}
              </Text>
            </View>
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
                Accumulated Cashback:
              </Text>
              <Text
                style={[
                  worldxstyles.text,
                  worldxstyles.textBold,
                  worldxstyles.textSmallMedium,
                  { color: "#ac8814" },
                ]}
              >
                ${payLoyaltyState.accumulatedCashback.toFixed(2)}/$
                {payLoyaltyState.cashbackLimit.toFixed(0)}
              </Text>
            </View>
          </View>
        </View>
        {payLoyaltyState.isLimitReached ? <Overlay /> : null}
      </View>
    );
  };

  return (
    <Animatable.View
      ref={cardContainerRef}
      style={props.style}
      direction={"alternate"}
      useNativeDriver={true}
      easing={"ease-in-out-quad"}
    >
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
        onFlipEnd={(side) => {
          if (side == 1) {
            //Generate a random cashback percentage if there is no loyalty purchased
            if (payLoyaltyState.isLoyalty == false) {
              dispatch(rerollLoyaltyCard());
              cashpackpercentRef.current.tada(1000);
            }
          }
        }}
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
    </Animatable.View>
  );
};
const styles = EStyleSheet.create({
  cashbackpercenttext: {
    marginHorizontal: "1rem",
  },
});
