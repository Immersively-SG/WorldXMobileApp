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
  setCurrentCashback,
  resetLoyaltyCard,
} from "../../../features/paymentscreenslice";
import * as Animatable from "react-native-animatable";

export const PayScreenPayment = (props) => {
  const [isPaid, setIsPaid] = useState(false);
  const [isCashbackClicked, setIsCashbackClicked] = useState(false);
  const cashbackPercent = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice.cardCashbackPercent
  );
  const accumulatedCashback = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice.accumulatedCashback
  );
  const currentCashback = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice.currentCashback
  );
  const isLimitReached = useSelector(
    (state) => state.paymentScreen.loyaltyCardSlice.isLimitReached
  );
  const dispatch = useDispatch();

  const [paymentInfo, setPaymentInfo] = useState(null); //implicitly used to conditional render this component

  const [paymentCost] = useState(RandomRangeFloat(1.0, 50.0).toFixed(2));
  const [merchantName] = useState(RandomString(RandomRangeInt(3, 6)));

  useEffect(() => {
    var totalCost = paymentCost;
    var cashbackLeft = currentCashback;
    var cashbackEarned;
    var cashbackUsed;
    if (isCashbackClicked) {
      if (paymentCost < cashbackLeft) {
        cashbackUsed = paymentCost;
        totalCost = 0.0;
        cashbackLeft = parseFloat(cashbackLeft - paymentCost).toFixed(2);
      } else {
        cashbackUsed = cashbackLeft;
        totalCost = parseFloat(paymentCost - cashbackLeft).toFixed(2);
        cashbackLeft = 0.0;
      }
    } else {
      cashbackUsed = 0.0;
    }

    //cashback earned is always based on totalcost (as long as you pay something, irregardless of using any cashback or not)
    //Also, if limit is reached, cannot earn cashback
    cashbackEarned = !isLimitReached
      ? parseFloat(totalCost * (cashbackPercent / 100.0)).toFixed(2)
      : 0.0;

    cashbackLeft += cashbackEarned;

    setPaymentInfo({
      merchantName: merchantName,
      paymentCost: paymentCost,
      totalCost: totalCost,
      cashbackEarned: cashbackEarned,
      cashbackUsed: cashbackUsed,
      cashbackLeft: parseFloat(cashbackLeft).toFixed(2),
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
          {isPaid ? "You have paid:" : "You are paying to:"}
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
          {!isPaid && (
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
                        backgroundColor: isCashbackClicked
                          ? "white"
                          : undefined,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <Text style={[worldxstyles.text, { marginHorizontal: 10 }]}>
                  Use cashback ( ${currentCashback.toFixed(2)} )
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
                      <Text
                        style={[worldxstyles.text, { textAlign: "center" }]}
                      >
                        ${paymentInfo.totalCost}
                      </Text>
                    </LinearGradient>
                  </ShadowContainer>
                </View>
              </View>
            </View>
          )}
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
              {isPaid ? "Receipt" : "Bill"}
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
                <Text style={[worldxstyles.text]}>Cashback used</Text>
                <Text style={[worldxstyles.text]}>
                  {isCashbackClicked
                    ? "$" + parseFloat(paymentInfo.cashbackUsed).toFixed(2)
                    : "$0.00"}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 50 }}>
            <View
              style={[
                worldxstyles.flexRow,
                { justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[
                  worldxstyles.text,
                  worldxstyles.textBold,
                  worldxstyles.textSmallMedium,
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  worldxstyles.text,
                  worldxstyles.textBold,
                  { textAlignVertical: "center" },
                ]}
              >
                ${paymentInfo.totalCost}
              </Text>
            </View>
            {isPaid && (
              <Animatable.View
                useNativeDriver={true}
                animation="bounceIn"
                easing={"ease-in-out-sine"}
                duration={1000}
              >
                {!isLimitReached && (
                  <View
                    style={[
                      worldxstyles.flexRow,
                      { justifyContent: "space-between" },
                    ]}
                  >
                    <Text style={[worldxstyles.text]}>Cashback earned</Text>
                    <Text style={[worldxstyles.text, { color: "#22d606" }]}>
                      ${parseFloat(paymentInfo.cashbackEarned).toFixed(2)}
                    </Text>
                  </View>
                )}
                <View
                  style={[
                    worldxstyles.flexRow,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text style={[worldxstyles.text]}>Points earned</Text>
                  <Text style={[worldxstyles.text, { color: "#22d606" }]}>
                    {parseFloat(paymentInfo.totalCost * 100).toFixed(0)}
                  </Text>
                </View>
              </Animatable.View>
            )}
            <View style={[{ alignSelf: "flex-end" }]}>
              {!isPaid ? (
                <TouchableShadowButton
                  style={[{ paddingVertical: 10, paddingHorizontal: 20 }]}
                  containerStyle={{ marginVertical: 10 }}
                  onPress={() => {
                    if (!isLimitReached) {
                      dispatch(
                        pushToCashbackHistoryArray({
                          merchantName: paymentInfo.merchantName,
                          cashback: parseFloat(
                            paymentInfo.cashbackEarned
                          ).toFixed(2),
                        })
                      );

                      dispatch(
                        incrementAccumulatedCashback(
                          parseFloat(paymentInfo.cashbackEarned).toFixed(2)
                        )
                      );

                      dispatch(
                        setCurrentCashback(
                          parseFloat(paymentInfo.cashbackLeft).toFixed(2)
                        )
                      );
                    }

                    setIsPaid(true);
                    props.onPaid(true);
                  }}
                >
                  <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                    PAY
                  </Text>
                </TouchableShadowButton>
              ) : (
                <TouchableShadowButton
                  style={[{ paddingVertical: 10, paddingHorizontal: 20 }]}
                  containerStyle={{ marginVertical: 10 }}
                  onPress={() => {
                    setPaymentInfo(null); //stop rendering this component
                    setIsPaid(false);
                    props.onPaid(false);
                    props.setPaymentData(null); //render back the parent component
                  }}
                >
                  <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                    CLOSE
                  </Text>
                </TouchableShadowButton>
              )}
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
