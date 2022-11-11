import { View, Text, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import { CircleContainer } from "../../utility/containers/circle";
import {
  RandomRangeFloat,
  RandomRangeInt,
  RandomString,
} from "../../utility/math/math";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ShadowContainer } from "../../utility/containers/shadow";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementAccumulatedCashback,
  pushToCashbackHistoryArray,
  setAccumulatedCashback,
} from "../../../features/paymentscreenslice";

export const PayScreenPayment = (props) => {
  const [isCashbackClicked, setIsCashbackClicked] = useState(false);
  const cashbackPercent = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice.cardCashbackPercent
  );
  const accumulatedCashback = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice.accumulatedCashback
  );
  const dispatch = useDispatch();

  const [paymentInfo, setPaymentInfo] = useState(null); //implicitly used to conditional render this component
  const [merchantName] = useState(RandomString(RandomRangeInt(3, 6)));
  const [paymentCost] = useState(RandomRangeFloat(1.0, 50.0).toFixed(2));
  const [cashbackLeft, setCashbackLeft] = useState(null);

  useEffect(() => {
    var totalCost;

    if (isCashbackClicked) {
      totalCost = (paymentCost - accumulatedCashback).toFixed(2);
      //if cashback is more than cost, then set overflow to accumulated cashback
      setCashbackLeft(totalCost < 0.0 ? Math.abs(totalCost) : 0.0);
    } else {
      totalCost = paymentCost;
      setCashbackLeft(accumulatedCashback);
    }

    setPaymentInfo({
      merchantName: merchantName,
      paymentCost: paymentCost,
      cashback: isCashbackClicked ? cashbackLeft : 0.0,
      totalCost: totalCost,
    });
  }, [isCashbackClicked]);

  return (
    paymentInfo && (
      <View style={props.style}>
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            { textAlign: "left", width: "100%" },
            styles.containerMargin,
          ]}
        >
          You are paying to:
        </Text>
        {/************** */}
        <View
          style={[
            {
              width: "100%",
              alignItems: "flex-start",
              backgroundColor: worldxstyleconstants.backgroundColor,
            },
            worldxstyles.bordered,
            styles.containerPadding,
          ]}
        >
          <View style={[worldxstyles.flexRow]}>
            <View style={[styles.imageContainer, worldxstyles.bordered]}>
              <Image
                source={require("../../../assets/WorldX/Icons/icon.png")}
                style={[styles.image]}
              />
            </View>
            <View style={[styles.containerMargin]}>
              <Text
                style={[
                  worldxstyles.text,
                  worldxstyles.textBold,
                  worldxstyles.textSmallMedium,
                ]}
              >
                {paymentInfo.merchantName} Merchant
              </Text>
              <Text style={[worldxstyles.text, { color: "grey" }]}>
                Supported partner
              </Text>
            </View>
          </View>
          <View
            style={[
              worldxstyles.flexRow,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <View
              style={[
                worldxstyles.flexRow,
                styles.containerMargin,
                { marginHorizontal: 0 },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsCashbackClicked(!isCashbackClicked);
                }}
              >
                <CircleContainer
                  style={[
                    worldxstyles.bordered,
                    styles.circle,
                    {
                      backgroundColor: isCashbackClicked ? "white" : undefined,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Text style={[worldxstyles.text, { marginHorizontal: 10 }]}>
                Use cashback ( ${accumulatedCashback} )
              </Text>
            </View>
            <View>
              <View>
                <Text
                  style={[
                    worldxstyles.text,
                    worldxstyles.textBold,
                    { marginBottom: 5 },
                  ]}
                >
                  Pay Amount:
                </Text>

                <ShadowContainer
                  style={[{ width: "100%" }]}
                  distance={2}
                  offset={[0, 0]}
                >
                  <LinearGradient
                    style={[{ borderRadius: 10, padding: 10, width: "100%" }]}
                    colors={[
                      worldxstyleconstants.backgroundColor,
                      "#3e2e55",
                      worldxstyleconstants.backgroundColor,
                    ]}
                    locations={[0.0, 0.5, 1.0]}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 1.0, y: 0.0 }}
                  >
                    <Text style={[worldxstyles.text, { textAlign: "center" }]}>
                      ${paymentInfo.totalCost}
                    </Text>
                  </LinearGradient>
                </ShadowContainer>
              </View>
            </View>
          </View>
        </View>
        {/************** */}
        <View
          style={[
            {
              width: "100%",
              flex: 1,
              justifyContent: "flex-start",
              padding: 10,
            },
          ]}
        >
          <View>
            <Text
              style={[
                worldxstyles.text,
                worldxstyles.textBold,
                worldxstyles.textSmallMedium,
              ]}
            >
              Bill
            </Text>
            <LinearGradient
              style={[
                worldxstyles.flexRow,
                {
                  padding: 2,
                  marginVertical: 10,
                  justifyContent: "space-between",
                },
              ]}
              colors={[worldxstyleconstants.backgroundColor, "#3e2e55"]}
              end={{ x: 1.0, y: 1.0 }}
            ></LinearGradient>
            <View>
              <View
                style={[
                  worldxstyles.flexRow,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={[worldxstyles.text]}>Payment amount</Text>
                <Text style={[worldxstyles.text]}>
                  ${paymentInfo.paymentCost}
                </Text>
              </View>
              <View
                style={[
                  worldxstyles.flexRow,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={[worldxstyles.text]}>Cashback</Text>
                <Text style={[worldxstyles.text]}>
                  -${paymentInfo.cashback}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <View
              style={[
                worldxstyles.flexRow,
                { justifyContent: "space-between" },
              ]}
            >
              <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                Total
              </Text>
              <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                ${paymentInfo.totalCost}
              </Text>
            </View>
            <View style={[{ alignSelf: "flex-end" }]}>
              <TouchableShadowButton
                style={[{ paddingVertical: 10, paddingHorizontal: 20 }]}
                containerStyle={{ marginVertical: 10 }}
                onPress={() => {
                  const cashback = parseFloat(
                    (
                      (paymentInfo.paymentCost * cashbackPercent) /
                      100.0
                    ).toFixed(2)
                  );

                  dispatch(
                    pushToCashbackHistoryArray({
                      merchantName: merchantName,
                      cashback: cashback,
                    })
                  );

                  if (!isCashbackClicked) {
                    dispatch(incrementAccumulatedCashback(cashback));
                  } else {
                    dispatch(setAccumulatedCashback(cashbackLeft.toFixed(2)));
                  }

                  setPaymentInfo(null); //stop rendering this component
                  props.setPaymentData(null); //render back the parent component
                }}
              >
                <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                  PAY
                </Text>
              </TouchableShadowButton>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

const styles = EStyleSheet.create({
  image: {
    aspectRatio: 1,
    height: "5rem",
    width: "5rem",
  },
  imageContainer: {
    backgroundColor: worldxstyleconstants.backgroundColor,
    padding: "0.5rem",
  },
  containerMargin: {
    margin: "1rem",
  },
  containerPadding: {
    padding: "1rem",
  },
  circle: {
    height: "1rem",
    width: "1rem",
  },
});
