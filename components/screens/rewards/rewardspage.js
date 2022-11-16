import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import * as Animatable from "react-native-animatable";
import { RedeemSection } from "./sections/redeemsection.js";
import { RewardsSection } from "./sections/rewardsection";
import React, { useState } from "react";
import { View, Text } from "react-native";
const titleArray = ["Rewards", "Your Rewards", "Points Log"];

export const RewardsPage = (props) => {
  const PageSwitcher = (index) => {
    switch (index) {
      case 0: {
        return <RedeemSection />;
      }

      case 1: {
        return <RewardsSection />;
      }

      case 2: {
        return <PointsLogSection />;
      }

      default:
      //do nothing
    }
  };

  return (
    <View style={[props.style, styles.section]}>
      <Text
        style={[
          styles.title,
          worldxstyles.text,
          worldxstyles.textBold,
          worldxstyles.textSmallMedium,
        ]}
      >
        {titleArray[props.pageIndex]}
      </Text>
      {PageSwitcher(props.pageIndex)}
    </View>
  );
};

const PointsLogSection = (props) => {
  return (
    <Animatable.View style={props.style} animation={"fadeInUp"} duration={500}>
      <Text style={[worldxstyles.text]}>asdsadsadsadsa</Text>
    </Animatable.View>
  );
};

const styles = EStyleSheet.create({
  section: { paddingHorizontal: "1rem", flex: 1 },
  title: {
    marginBottom: "1rem",
  },
});
