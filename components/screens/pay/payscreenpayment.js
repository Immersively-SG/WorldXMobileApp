import { View, Text, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import { CircleContainer } from "../../utility/containers/circle";
import { RandomRangeInt, RandomString } from "../../utility/math/math";
import { useState } from "react";
import { LinearGradient } from "react-native-svg";

export const PayScreenPayment = (props) => {
  const [isCashbackClicked, setIsCashbackClicked] = useState(false);
  const [merchantName, setMerchantName] = useState(
    RandomString(RandomRangeInt(3, 6))
  );

  const [paymentCost, setPaymentCost] = useState(
    RandomString(RandomRangeInt(3, 6))
  );

  //const [paymentBreakdown] = useState

  return (
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
              {merchantName} Merchant
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
                  { backgroundColor: isCashbackClicked ? "white" : undefined },
                ]}
              />
            </TouchableOpacity>
            <Text style={[worldxstyles.text]}>Use cashback</Text>
          </View>
          <View>
            <View>
              <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                Pay Amount:
              </Text>
            </View>
            <LinearGradient
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
              <Text style={[worldxstyles.text]}></Text>
            </LinearGradient>
          </View>
        </View>
      </View>
      {/************** */}
      <View></View>
    </View>
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
